// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Pausable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


// import "base64-sol/base64.sol";

/// @custom:security-contact @javierlinked
contract TicketContract is ERC1155, Ownable, ERC1155Pausable, ERC1155Burnable {
    using Counters for Counters.Counter;
    Counters.Counter public tokenIdCounter;

    struct Ticket {
        string name;
        uint price; // in gwei
        string showTime;
        uint maxSellPerPerson;
    }

    mapping(uint256 => Ticket) public tickets;

    event TicketCreated(
        uint256 indexed id,
        address indexed minter,
        string indexed name,
        uint price,
        uint amount,
        uint maxSellPerPerson
    );

    event TicketSold(
        uint256 indexed id,
        address indexed from,
        address indexed to,
        uint amount
    );

    modifier paidEnough(uint amount, uint256 id) {
        uint total = amount * tickets[id].price;
        require(total <= msg.value, "Incorrect amount");
        _;
    }

    modifier allowedSell(uint amount, uint256 id) {
        require(amount > 0, "Amount must bigger than 0");
        require(balanceOf(owner(), id) >= amount, "Not enough tickets");
        require(
            amount <= tickets[id].maxSellPerPerson,
            "Max ammount per person reached"
        );
        _;
    }

    modifier validate(uint256 id) {
        require(tickets[id].price != 0, "Ticket does not exist");
        _;
    }

    constructor() ERC1155("") {}

    function create(
        string memory name,
        uint price,
        uint amount,
        string memory showTime,
        uint maxSellPerPerson,
        bytes memory data
    ) public onlyOwner whenNotPaused {
        address owner = msg.sender;
        tokenIdCounter.increment();
        Ticket memory newTicket = Ticket(name, price, showTime, maxSellPerPerson);
        uint256 newId = tokenIdCounter.current();
        tickets[newId] = newTicket;
        _mint(owner, newId, amount, data);
        emit TicketCreated(newId, owner, name, price, amount, maxSellPerPerson);
    }

    function buy(
        uint256 id,
        uint amount,
        bytes memory data
    )
        public
        payable
        allowedSell(amount, id)
        paidEnough(amount, id)
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
        uint256 id,
        uint amount
    ) public override onlyOwner whenNotPaused {
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
