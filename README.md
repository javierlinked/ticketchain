# TicketChain Modern 🎫

A modern decentralized ticketing platform built with Next.js 15, Ethereum smart contracts, and Web3 technologies. Create, buy, and manage event tickets on the blockchain with full multi-chain support.

![TicketChain Modern](https://nexth.vercel.app/opengraph-image)

## Features ✨

- **🎟️ NFT-based Tickets**: ERC1155 smart contracts for flexible ticket management
- **🌐 Multi-Chain Support**: Ethereum, Arbitrum, Base, Optimism, Polygon, and Sepolia testnet
- **💳 Wallet Integration**: WalletConnect v2 with Reown AppKit for seamless wallet connections
- **📱 Responsive Design**: Mobile-first UI with Tailwind CSS and DaisyUI
- **⚡ Server Components**: Optimized performance with Next.js 15 App Router
- **🔒 Type Safety**: Full TypeScript coverage with strict mode
- **🎨 Modern UI**: Glassmorphism effects, smooth animations, and intuitive design

## Tech Stack 🛠️

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Strict type safety
- **Tailwind CSS v4**: Utility-first styling with new @import syntax
- **DaisyUI v5**: UI component library
- **React 19**: Latest React features

### Web3
- **Wagmi v2**: React hooks for Ethereum
- **Viem v2**: TypeScript Ethereum library
- **Reown AppKit**: Wallet connection UI
- **WalletConnect**: Multi-wallet support

### Smart Contracts
- **Solidity**: ERC1155 implementation
- **Hardhat**: Development environment
- **OpenZeppelin**: Secure contract libraries

## Quick Start 🚀

### Prerequisites

- Node.js 18+ (v20+ recommended)
- Yarn package manager
- MetaMask or compatible Web3 wallet
- WalletConnect Project ID ([Get one free](https://cloud.walletconnect.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/javierlinked/ticketchain.git
   cd ticketchain
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Configure environment variables**

   Create `packages/app/.env.local`:
   ```env
   # WalletConnect Project ID (Required)
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
   
   # Contract Addresses (Optional - defaults to Sepolia if not set)
   NEXT_PUBLIC_SEPOLIA_CONTRACT_ADDRESS=0x...
   NEXT_PUBLIC_MAINNET_CONTRACT_ADDRESS=0x...
   NEXT_PUBLIC_ARBITRUM_CONTRACT_ADDRESS=0x...
   NEXT_PUBLIC_BASE_CONTRACT_ADDRESS=0x...
   NEXT_PUBLIC_OPTIMISM_CONTRACT_ADDRESS=0x...
   NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS=0x...
   ```

4. **Start development server**
   ```bash
   cd packages/app
   yarn dev
   ```

5. **Access the app**
   Open [http://localhost:3000](http://localhost:3000)

## Environment Variables 🔐

### Required

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect Cloud project ID | [WalletConnect Cloud](https://cloud.walletconnect.com/) |

### Optional (Contract Addresses)

| Variable | Network | Default |
|----------|---------|---------|
| `NEXT_PUBLIC_SEPOLIA_CONTRACT_ADDRESS` | Sepolia Testnet | Falls back to default |
| `NEXT_PUBLIC_MAINNET_CONTRACT_ADDRESS` | Ethereum Mainnet | Falls back to default |
| `NEXT_PUBLIC_ARBITRUM_CONTRACT_ADDRESS` | Arbitrum One | Falls back to default |
| `NEXT_PUBLIC_BASE_CONTRACT_ADDRESS` | Base | Falls back to default |
| `NEXT_PUBLIC_OPTIMISM_CONTRACT_ADDRESS` | Optimism | Falls back to default |
| `NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS` | Polygon | Falls back to default |

## Project Structure 📁

```
ticketchain/
├── packages/
│   ├── app/                          # Next.js frontend application
│   │   ├── src/
│   │   │   ├── app/                 # App Router pages and layouts
│   │   │   │   ├── tickets/         # Ticket management pages
│   │   │   │   ├── api/             # API routes
│   │   │   │   ├── error.tsx        # Error boundary
│   │   │   │   ├── not-found.tsx    # 404 page
│   │   │   │   └── global-error.tsx # Global error handler
│   │   │   ├── components/          # Reusable UI components
│   │   │   │   ├── icons/           # SVG icon library
│   │   │   │   ├── alert-box.tsx    # Alert component
│   │   │   │   ├── loading-spinner.tsx
│   │   │   │   └── ...
│   │   │   ├── hooks/               # Custom React hooks
│   │   │   │   ├── tickets/         # Ticket-related hooks
│   │   │   │   └── web3/            # Web3 interaction hooks
│   │   │   ├── services/            # Business logic layer
│   │   │   │   └── contract/        # Smart contract services
│   │   │   ├── context/             # React Context providers
│   │   │   ├── utils/               # Utility functions
│   │   │   └── types/               # TypeScript definitions
│   │   ├── public/                  # Static assets
│   │   └── tailwind.config.ts       # Tailwind configuration
│   │
│   └── hardhat/                     # Smart contract development
│       ├── contracts/               # Solidity contracts
│       │   └── TicketContract.sol   # ERC1155 ticket contract
│       ├── test/                    # Contract tests
│       ├── ignition/                # Deployment modules
│       └── typechain-types/         # Generated TypeScript types
│
├── .github/
│   └── instructions/                # Development guidelines
├── CONTRIBUTING.md                  # Contribution guide
└── README.md                        # This file
```

## Development 🧑‍💻

### Running the Frontend

```bash
cd packages/app
yarn dev          # Start development server
yarn build        # Build for production
yarn start        # Start production server
yarn lint         # Run ESLint
yarn tsc          # Type check
```

### Smart Contract Development

```bash
cd packages/hardhat
yarn hardhat compile                 # Compile contracts
yarn hardhat test                    # Run tests
yarn hardhat node                    # Start local node
yarn hardhat ignition deploy         # Deploy contracts
```

### Deploying Contracts

1. **Deploy to Sepolia testnet**
   ```bash
   cd packages/hardhat
   yarn hardhat ignition deploy ./ignition/modules/TicketContract.ts --network sepolia
   ```

2. **Copy contract address**
   - Find deployed address in terminal output
   - Add to `packages/app/.env.local`

3. **Update frontend configuration**
   - Contract ABIs are auto-generated in `packages/app/src/abis.ts`
   - Update contract addresses in environment variables

## Usage 👥

### For Event Organizers (Contract Owners)

1. **Connect Wallet** - Click "Connect Wallet" button
2. **Create Tickets** - Fill in ticket details (name, price, max per person, info URL)
3. **Submit Transaction** - Approve the blockchain transaction
4. **Manage Tickets** - View all created tickets

### For Attendees

1. **Connect Wallet** - Click "Connect Wallet" button
2. **Browse Tickets** - View available tickets from events
3. **Purchase Tickets** - Select quantity and buy tickets
4. **View Collection** - See owned tickets in your wallet

## Key Features Explained 🔑

### Multi-Chain Support
- Automatically detects connected network
- Switches between mainnet and L2s seamlessly
- Per-network contract configuration

### Server Components
- Initial data fetching on server
- Reduced client-side JavaScript
- Improved SEO and performance

### Error Handling
- Route-level error boundaries
- Global error fallback
- Graceful degradation

### Type Safety
- Strict TypeScript mode
- Viem for type-safe contract calls
- Generated contract types from ABIs

## Contributing 🤝

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for:
- Development setup guide
- Coding standards
- Commit message conventions
- Pull request process
- Testing requirements

## Packages 📦

- [App](./packages/app) - Next.js 15 with App Router
- [Hardhat](./packages/hardhat/) - Smart contract development

## Deployment 🚢

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjavierlinked%2Fticketchain)

This project is optimized for Vercel with monorepo support. See [DEPLOYMENT.md](./DEPLOYMENT.md) for:

- ✅ Complete Vercel setup guide
- ✅ Environment variables configuration
- ✅ Monorepo build optimization
- ✅ CI/CD workflow
- ✅ Custom domain setup
- ✅ Troubleshooting guide

**Quick Deploy:**
1. Click the Deploy button above
2. Add `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` in environment variables
3. Deploy!

### Self-Hosted

```bash
yarn build
cd packages/app
yarn start
```

Server runs on `http://localhost:3000`. See [DEPLOYMENT.md](./DEPLOYMENT.md) for advanced options.

## Troubleshooting 🔧

### Common Issues

**"No provider found" error**
- Ensure MetaMask or compatible wallet is installed
- Check that WalletConnect Project ID is set correctly

**Contract not found**
- Verify contract is deployed on the connected network
- Check contract address in environment variables
- Ensure you're connected to the correct network

**Transaction failing**
- Check wallet has sufficient ETH for gas
- Verify ticket purchase doesn't exceed max per person limit
- Ensure contract owner has created tickets

**TypeScript errors**
- Run `yarn tsc --noEmit` to check types
- Regenerate contract types: `cd packages/hardhat && yarn hardhat compile`

**Build warnings (CSS @property)**
- ⚠️ Warning: "Unknown at rule: @property" from DaisyUI is harmless
- Build succeeds normally - this is a known compatibility notice
- See [BUILD_NOTES.md](packages/app/BUILD_NOTES.md) for details

## Roadmap 🗺️

- [ ] Secondary ticket marketplace
- [ ] QR code generation for tickets
- [ ] Ticket transfer functionality
- [ ] Event management dashboard
- [ ] Ticket validation system
- [ ] IPFS metadata storage
- [ ] Batch ticket operations
- [ ] Gasless transactions (meta-transactions)

## Security 🔒

- Smart contracts follow OpenZeppelin standards
- Input validation on all user inputs
- Restricted image domains to prevent SSRF
- Environment-based console logging
- Rate limiting on API routes

**Audit Status**: Not yet audited - use at your own risk

## License 📄

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments 🙏

Built with inspiration from:
- [Nexth](https://github.com/wslyvh/nexth) - Next.js + Ethereum starter
- [OpenZeppelin](https://www.openzeppelin.com/) - Secure smart contract libraries
- [WalletConnect](https://walletconnect.com/) - Web3 wallet connection protocol

## Support 💬

- **Issues**: [GitHub Issues](https://github.com/javierlinked/ticketchain/issues)
- **Discussions**: [GitHub Discussions](https://github.com/javierlinked/ticketchain/discussions)

## Funding

This project is funding its core dependencies with [Drips protocol](https://www.drips.network/app/projects/github/wslyvh/nexth?exact). A split contract that splits 60% of all proceeds with core contributors and 40% for dependencies.

### Contributors

Contributors to this repository are rewarded based on their contributions to the project. Their contribution score is calculated based on a combination of the commits, issues, pull requests, and other contributions that determine the amount of funding they receives.

The score is calculated using [Contributor Graph](https://github.com/wslyvh/contributor-graph).

### Distribution

- In 2024 the project received $7,075 USD in funding. 60% ($4,245) is distributed to core contributors.
  - https://arbiscan.io/tx/0x95d6cd302374d64a401e35a27570fec9793bd9751cbfdeec36d3ade3b1965c24

---

**Built with ❤️ for the decentralized web**
