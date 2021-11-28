## Smart Contract based ticket sell point ⚽️ 🏆
With this project we want to solution a common problem in the entertainment industry such as ticket sell point, ownership and delegation.
### 1) Problem statement 🙇🏻‍♂️
Tickets for futbol matches can be purchased through various channels. We will only consider online purchases.
In some occasions, in [Argentina](https://duckduckgo.com/?q=argentina&t=hx&va=g&iar=images&iax=images&ia=images) for example, the audience must pick up the physical ticket a few days before the match.
Paper tickets with several physical security measures such as special inks or holographic bands, are still the option of choice when it comes to prevent counterfeiting. The printed ticket for matches is issued upon presentation of ID. This pair is currently considered more secure than options such as QR codes.
Very often the viewer lives in another city or country, and then must depend on agents for this tasks. There are fees involved.
This could be extended to every show with presale tickets.
### 2) The solution ⛓
Sale points are a platform mounted on *Blockchain*. Tickets themselves are *NFTs*. They can be transferable to someone other than the original purchaser, according to the organisers' requirement. Different providers on show industry can subscribe to this service and issue their tickets through them.
### 3) Benefits 🔐
- Locals and people living in far places in same conditions when it comes to access to a show. 
- There are still place for tourist operator to offer tickets on behalf of the customer buying a package.
- Cut forgery risks. SECURITY.
- Immediate delivery of tickets.
- Eventual traceability.
### 4) Minimal workflow ✨
-   The user buys a ticket online, pays and receives an NFT.
-   The user attends the show / match and shows the NFT. How is it validated?
-   NFT is transferable? In case user can't attend.
### 5) Architectural design 📐
### 6) Proposed tech stack ⚒️


#### Project Structure
```
.
├── build/                   # Truffle build (alternatively `build`)
├── contracts/               # Truffle contracts (alternatively `contracts`)
├── migrations/              # Truffle migrations (alternatively `migrations`)
├── test/                    # Automated tests (alternatively `tests`)
├── truffle-config.js        # Truffle config
└── README.md

```

#### End of course NFT address

address: `0x23db5E49544C5A5104316E6eE9734120F3eec357`

#### Front end for the project (mvp & testing purposes)


https://javierlinked-consensys.vercel.app/


// TODO

frontend React
add UI support for pausable
add list of owned tokens and ammounts

use SafeMath
move ownable to roles approach
evaluate gas optimizations
Migrate metadata of a token to a json file in infura or some other offchain solution
ERC1155PresetMinterPauser



networks: {
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*" // Match any network id
    }