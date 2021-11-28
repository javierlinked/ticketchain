To get a developer certification for the course, your project must:

- [x] Following this naming format https://github.com/YOUR_GITHUB_USERNAME_HERE/blockchain-developer-bootcamp-final-project
- [ ] Contain a README.md file which describes the project, describes the directory structure, and where the frontend project can be accessed (see #8). Please also include your public Ethereum account if you would like to receive your certification as an NFT (this is optional). 

- [x] Contain smart contract(s) which:
    - [x] Are commented to the specs described here
    - [x] Use at least two design patterns from the "Smart Contracts" section (SEE A LIST OF DESIGN PATTERNS HERE)
    - [x] Protect against two attack vectors from the "Smart Contracts" section with its SWC number (SEE A LIST OF ATTACK VECTORS HERE)
    - [x] Inherits from at least one library or interface
    - [x] Can be easily compiled, migrated and tested (see #5) (we just need to compile and test it locally.)

- [x] `design_pattern_decisions.md`
- [x] `avoiding_common_attacks.md`

- [x] Have at least five unit tests for your smart contract(s) that pass. 
    - [x] In the code, include a sentence or two explaining what the tests are covering their expected behavior. You are not required to build unit tests for your frontend, just your smart contracts.

- [x] Contain a `deployed_address.txt` file which contains the testnet address and network where your contract(s) have been deployed

- [x] Have a frontend interface built with a framework like React or plain HTML/CSS/JS that:
    - [x] Detects the presence of MetaMask
    - [x] Connects to the current account
    - [x] Displays information from your smart contract
    - [x] Allows a user to submit a transaction to update smart contract state
    - [x] Updates the frontend if the transaction is successful or not
    - [x] Hosted on Github Pages, Netlify, Fleek, Surge, Heroku or some other free frontend service that gives users a public interface to your decentralized application. That address should be in your README.md document.

- [ ] In your README.md, be sure to have clear instructions on: 
    - [ ] Installing dependencies for your project 
    - [ ] Accessing or—if your project needs a server (not required)—running your project
    - [ ] Running your smart contract unit tests and which port a local testnet should be running on.

Note: This section used to require three bash scripts but has been revised.
A screencast of you walking through your project, including submitting transactions and seeing the updated state. You can use a screenrecorder of your choosing or something like Loom, and you can share the link to the recording in your README.md
