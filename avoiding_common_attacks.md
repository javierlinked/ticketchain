# Avoiding Common Attacks

The contract is *Ownable* and *Pausable* from `OpenZeppelin` to stop it if an attack is detected.
### https://swcregistry.io/docs/SWC-115

- `msg.sender` is used wherever necessary. The contract is ownable.

### https://swcregistry.io/docs/SWC-102 and https://swcregistry.io/docs/SWC-103

- Fixed updated pragma in Solidity compiler set to 0.8.10
### https://swcregistry.io/docs/SWC-100

- There are no private functions, but modifiers; externally callable functions have been properly set to 'public'. 



