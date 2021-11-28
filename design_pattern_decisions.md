# Design patterns used

## Access Control Design Patterns

- `Ownable` design pattern used in three functions: `create()`, `pause()` and `unpause()`. Only owner of the contract can call these functions.

## Inheritance and Interfaces

- `TicketService` inherits from `ERC1155`, `Ownable`, `ERC1155Pausable`, `ERC1155Burnable` and delegates its calls to base contracts. `ERC1155PresetMinterPauser` was not used as it relies on access control by roles, and there was no time for this for this first.