// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Pausable.sol";

/// @title Contract for modeling ticket sales on ERC1155 tokens
/// @author Javier Rojo
/// @notice Allows an organizer to publish events, and other users to buy tickets, more for the future
/// @custom:security-contact @javierlinked
contract TicketContract is ERC1155, Ownable, ERC1155Pausable, ERC1155Burnable {
    /// @dev variariables and counters used by the contract and by the frontend, in order to crate a list
    uint256 public nonce;
    uint256[] public tokenIds;
    uint256 public tokenIdsLength;

    struct Ticket {
        uint256 id;
        string name;
        uint256 price; // in gwei
        uint256 maxSellPerPerson; // max number of tickets that can be kept per person
        string infoUrl; // this is to be removed and kept off-chain
    }

    mapping(uint256 => Ticket) public tickets;

    /// @notice This event is emmited when a ticket is created
    /// @param id the id of the ticket
    /// @param minter address of the minter
    /// @param name name of the ticket
    /// @param price price of the ticket
    /// @param amount total supply of tickets
    /// @param maxSellPerPerson the maximum number of tickets that can be hold per person
    event TicketCreated(
        uint256 indexed id,
        address indexed minter,
        string indexed name,
        uint256 price,
        uint256 amount,
        uint256 maxSellPerPerson
    );

    /// @notice this event is emmited when a ticket is sold
    /// @param id the id of the ticket
    /// @param seller the address of the seller
    /// @param buyer the address of the buyer
    /// @param amount the amount of tickets sold
    event TicketSold(uint256 indexed id, address indexed seller, address indexed buyer, uint256 amount);

    /// @notice verifies if amount is valid
    modifier validAmount(uint256 amount, uint256 maxSellPerPerson) {
        require(amount > 0, "Incorrect amount");
        require(maxSellPerPerson > 0, "Incorrect maxSellPerPerson");
        require(amount >= maxSellPerPerson, "Incorrect amount");
        _;
    }

    /// @notice this verifies the payment is exact or cancels the transaction
    modifier paidExactly(uint256 amount, uint256 id) {
        uint256 total = amount * tickets[id].price;
        require(total == msg.value, "Incorrect amount");
        _;
    }

    /// @notice this verifies the minter has enough tickets to sell
    modifier allowedSell(uint256 amount, uint256 id) {
        require(amount > 0, "Amount must bigger than 0");
        require(balanceOf(owner(), id) >= amount, "Not enough tickets");
        uint256 buying = balanceOf(msg.sender, id) + amount;
        require(buying <= tickets[id].maxSellPerPerson, "Max ammount per person reached");
        _;
    }

    modifier validate(uint256 id) {
        require(tickets[id].price != 0, "Ticket does not exist");
        _;
    }

    /// @notice constructor is trivial, but can be used to set parameters on deployment
    constructor() ERC1155("") {
        nonce = 0;
    }

    /// @notice Crates a ticket
    /// @dev After validations and internal variable set, delegates to the ERC1155 contract and emmits the event
    /// @param name name of the ticket
    /// @param price price of the ticket
    /// @param amount total supply of tickets
    /// @param maxSellPerPerson the maximum number of tickets that can be hold per person
    /// @param infoUrl extra info about the ticket
    /// @param data data required by ERC1155
    function create(
        string memory name,
        uint256 price,
        uint256 amount,
        uint256 maxSellPerPerson,
        string memory infoUrl,
        bytes memory data
    ) public onlyOwner validAmount(amount, maxSellPerPerson) whenNotPaused {
        uint256 newId = ++nonce;

        address owner = msg.sender;
        Ticket memory newTicket = Ticket(newId, name, price, maxSellPerPerson, infoUrl);
        tokenIds.push(newId);
        tokenIdsLength = tokenIds.length;
        tickets[newId] = newTicket;
        _mint(owner, newId, amount, data);
        emit TicketCreated(newId, owner, name, price, amount, maxSellPerPerson);
    }

    /// @notice sells a ticket
    /// @dev It makes verifications, then transfers payment, later delegates to the ERC1155 transfer of the token
    /// and finally emits the event
    /// @param id token id
    /// @param amount amount of tickets to sell
    /// @param data data required by ERC1155
    function buy(
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public payable allowedSell(amount, id) paidExactly(amount, id) validate(id) whenNotPaused {
        address payable owner = payable(owner());
        address buyer = msg.sender;
        (bool sent, ) = owner.call{ value: msg.value }("");
        require(sent, "Failed to send Ether");
        _safeTransferFrom(owner, buyer, id, amount, data);
        emit TicketSold(id, owner, buyer, amount);
    }

    /// @notice burns a token. This funtion is used when the ticket is USED.
    /// @dev after verifications delegates to the ERC1155 burn of the token
    function burn(
        address account,
        uint256 id,
        uint256 amount
    ) public override whenNotPaused {
        // NOTE:  to myself, not related to _balances[][] but to existence of tokens in the contract
        _burn(account, id, amount);
    }

    /**
     * @dev Pauses all token transfers.
     *
     * See {ERC1155Pausable} and {Pausable-_pause}.
     *
     * Requirements:
     *
     * - the caller must be owner.
     */
    function pause() public virtual onlyOwner {
        _pause();
    }

    /**
     * @dev Unpauses all token transfers.
     *
     * See {ERC1155Pausable} and {Pausable-_unpause}.
     *
     * Requirements:
     *
     * - the caller owner.
     */
    function unpause() public virtual onlyOwner {
        _unpause();
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override(ERC1155, ERC1155Pausable) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
