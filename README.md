# TicketChain

Lightweight decentralized ticketing prototype (frontend + contracts). Intended for engineers: concise, runnable, and focused on development.

Supported (from package manifests):

- Node / package manager: Yarn
- Frontend: Next.js, React, TypeScript
- Styling: Tailwind CSS, DaisyUI
- Web3: wagmi, viem, @reown/appkit
- Contracts: Hardhat, Solidity, OpenZeppelin Contracts

Repository layout (important paths):

```
packages/app        # Next.js frontend
packages/hardhat    # contracts, tests, ignition deployment modules
```

Quick start

1. Clone and install

```bash
git clone git@github.com:javierlinked/ticketchain.git
cd ticketchain
yarn install
```

2. Configure runtime env for the frontend

Create `packages/app/.env.local` with at minimum:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
# optional per-network contract addresses
NEXT_PUBLIC_SEPOLIA_CONTRACT_ADDRESS=0x...
```

3. Run frontend (development)

```bash
cd packages/app
yarn dev
```

4. Contracts

Build/compile and run tests from the contracts package:

```bash
cd packages/hardhat
yarn build      # runs `hardhat compile`
yarn test       # runs hardhat test (REPORT_GAS=true)
```

Deploy (example, Sepolia via ignition):

```bash
cd packages/hardhat
yarn hardhat ignition deploy ./ignition/modules/TicketContract.ts --network sepolia
```

Notes and expectations

- This repo is a developer prototype. Security/audit not included.
- Default frontend expects a deployed contract address; set env vars as needed.
- Type generation and contract ABIs: the frontend reads generated ABIs/types produced by the Hardhat compile step (check `packages/app/src/abis.ts`).

Troubleshooting

- No provider / wallet errors: ensure a browser wallet or WalletConnect project ID is configured.
- Type errors: run `yarn tsc --noEmit` at repo root or inside `packages/app`.

Contributing

See `CONTRIBUTING.md` for contribution guidelines and tests.


References

- Security notes: `avoiding_common_attacks.md` — quick summary of mitigations and assumptions.
- Design notes: `design_pattern_decisions.md` — access control and inheritance choices used in contracts.
- Deployed contract (example): `deployed_address.txt` — Sepolia address and explorer link.
- License: `LICENSE` (MIT).

Deployed contract (example)

The repository includes a recorded deployment to Sepolia. See `deployed_address.txt` for the address and explorer link. Current recorded address:

`0x95638257fc0421E18415d83bF5579cf136B56e97` (Sepolia)

