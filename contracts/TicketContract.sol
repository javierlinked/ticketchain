// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Pausable.sol";


/// @custom:security-contact @javierlinked
contract TicketContract is ERC1155, Ownable, ERC1155Pausable, ERC1155Burnable {
    uint public nonce;
    uint[] public tokenIds;

    struct Ticket {
        uint id;
        string name;
        uint price; // in gwei
        string showTime;
        uint maxSellPerPerson;
    }

    mapping(uint => Ticket) public tickets;

    event TicketCreated(
        uint indexed id,
        address indexed minter,
        string indexed name,
        uint price,
        uint amount,
        uint maxSellPerPerson
    );

    event TicketSold(
        uint indexed id,
        address indexed seller,
        address indexed buyer,
        uint amount
    );

    modifier paidExactly(uint amount, uint id) {
        uint total = amount * tickets[id].price;
        require(total == msg.value, "Incorrect amount");
        _;
    }

    modifier allowedSell(uint amount, uint id) {
        require(amount > 0, "Amount must bigger than 0");
        require(balanceOf(owner(), id) >= amount, "Not enough tickets");
        require(
            amount <= tickets[id].maxSellPerPerson,
            "Max ammount per person reached"
        );
        _;
    }

    modifier validate(uint id) {
        require(tickets[id].price != 0, "Ticket does not exist");
        _;
    }

    constructor() ERC1155("") {
        nonce = 0;
    }

    function create(
        string memory name,
        uint price,
        uint amount,
        string memory showTime,
        uint maxSellPerPerson,
        bytes memory data
    ) public onlyOwner whenNotPaused {
        address owner = msg.sender;
        uint newId = ++nonce;
        Ticket memory newTicket = Ticket(newId, name, price, showTime, maxSellPerPerson);
        tickets[newId] = newTicket;
        tokenIds.push(newId);
        _mint(owner, newId, amount, data);
        emit TicketCreated(newId, owner, name, price, amount, maxSellPerPerson);
    }

    function buy(
        uint id,
        uint amount,
        bytes memory data
    )
        public
        payable
        allowedSell(amount, id)
        paidExactly(amount, id)
        validate(id)
        whenNotPaused
    {
        address payable owner = payable(owner());
        address buyer = msg.sender;
        (bool sent, ) = owner.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        _safeTransferFrom(owner, buyer, id, amount, data);
        emit TicketSold(id, owner, buyer, amount);
    }

    function burn(
        address account,
        uint id,
        uint amount
    ) public override
    /**   onlyOwner ???*/ 
    whenNotPaused {
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
