// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Pausable.sol";

// import "@openzeppelin/contracts/utils/Strings.sol";
// import "base64-sol/base64.sol";

/// @custom:security-contact @javierlinked
contract TicketContract is ERC1155, Ownable, ERC1155Pausable, ERC1155Burnable {
    uint256 public nonce;

    struct Ticket {
        string name;
        uint256 price; // in Ether
        uint256 maxSellPerPerson;
    }

    mapping(uint256 => Ticket) public tickets;

    event TicketCreated(
        uint256 indexed id,
        address indexed minter,
        string indexed name,
        uint256 price,
        uint256 amount,
        uint256 maxSellPerPerson
    );

    event TicketSold(
        uint256 indexed id,
        address indexed from,
        address indexed to,
        uint256 amount
    );

    modifier paidEnough(uint256 amount, uint256 id) {
        uint256 total = amount * tickets[id].price;
        require(total != msg.value, "Incorrect amount1");
        _;
    }

    modifier allowedSell(uint256 amount, uint256 id) {
        require(balanceOf(owner(), id) >= amount, "Not enough tickets");
        require(amount > 0, "Invalid ammount");
        require(amount <= tickets[id].maxSellPerPerson, "Incorrect amount2");
        _;
    }

    constructor() ERC1155("") {}

    function create(
        string memory name,
        uint256 price,
        uint256 amount,
        uint256 maxSell,
        bytes memory data
    ) public onlyOwner returns (uint256 id) {
        address owner = msg.sender;
        uint256 newId = ++nonce;
        Ticket memory newTicket = Ticket(name, price, maxSell);
        tickets[newId] = newTicket;
        _mint(owner, newId, amount, data);
        emit TicketCreated(newId, owner, name, price, amount, maxSell);
        return newId;
    }

    function buy(
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public payable allowedSell(amount, id) paidEnough(amount, id) {
        
        require(tickets[id].price != 0, "Ticket does not exist");

        address payable owner = payable(owner());
        address buyer = msg.sender;

        (bool sent, ) = owner.call{value: msg.value}("");
        require(sent, "Failed to send Ether");

        _safeTransferFrom(owner, buyer, id, amount, data);

        emit TicketSold(id, owner, buyer, amount);
    }

    // function buyItem(uint sku)
    //     public
    //     payable
    //     forSale(sku)
    //     paidEnough(items[sku].price)
    //     checkValue(sku)
    // {
    //     items[sku].buyer = msg.sender;
    //     items[sku].state = State.Sold;

    //     (bool success, ) = items[sku].seller.call.value(items[sku].price)("");
    //     require(success, "Transfer failed.");

    //     emit LogSold(sku);
    // }

    function burn(
        address account,
        uint256 id,
        uint256 amount
    ) public override onlyOwner {
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

    //test
    // function buildMetadata(uint256 _tokenId)
    //     public
    //     view
    //     returns (string memory)
    // {
    //     Ticket memory currentTicket = tickets[_tokenId];

    //     string memory json = Base64.encode(
    //         bytes(
    //             abi.encodePacked(
    //                 '{"name":"',
    //                 currentTicket.name,
    //                 '", "description":"',
    //                 currentTicket.description,
    //                 '", "price": "',
    //                 currentTicket.price,
    //                 '", "imageURI": "',
    //                 currentTicket.imageURI,
    //                 '", "linkURI": "',
    //                 currentTicket.linkURI,
    //                 '"}'
    //             )
    //         )
    //     );

    //     string memory output = string(
    //         abi.encodePacked("data:application/json;base64,", json)
    //     );

    //     return output;
    // }
}
