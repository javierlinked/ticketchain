// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";

/// @custom:security-contact @javierlinked
contract TicketService is ERC1155, Ownable, ERC1155Burnable {

    uint256 public constant CINEMA = 1;
    uint256 public constant FUTBOL = 2;

    constructor() ERC1155("") {
        _mint(msg.sender, CINEMA, 100, "");
        _mint(msg.sender, FUTBOL, 100, "");
    }

    // TODO: adapt to IPFS
    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }
}
