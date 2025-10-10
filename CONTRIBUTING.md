# Contributing to TicketChain Modern

Thank you for your interest in contributing to TicketChain Modern! This document provides guidelines and instructions for contributing to this decentralized ticketing platform.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Blockchain Development](#blockchain-development)

## Code of Conduct

This project adheres to professional standards of conduct. Please be respectful and constructive in all interactions.

## Getting Started

### Prerequisites

- **Node.js**: v18+ (v20+ recommended)
- **Yarn**: Package manager
- **Git**: Version control
- **MetaMask** or another Web3 wallet for testing
- **WalletConnect Project ID**: Get one from [WalletConnect Cloud](https://cloud.walletconnect.com/)

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/ticketchain-modern.git
   cd ticketchain-modern
   ```

2. **Install Dependencies**
   ```bash
   yarn install
   ```

3. **Configure Environment Variables**

   Create `.env.local` in `packages/app/`:
   ```env
   # WalletConnect (Required)
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
   
   # Contract Addresses (per network)
   NEXT_PUBLIC_SEPOLIA_CONTRACT_ADDRESS=0x...
   NEXT_PUBLIC_MAINNET_CONTRACT_ADDRESS=0x...
   NEXT_PUBLIC_ARBITRUM_CONTRACT_ADDRESS=0x...
   NEXT_PUBLIC_BASE_CONTRACT_ADDRESS=0x...
   NEXT_PUBLIC_OPTIMISM_CONTRACT_ADDRESS=0x...
   NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS=0x...
   ```

4. **Start Development Server**
   ```bash
   # Start Next.js app
   cd packages/app
   yarn dev
   
   # In another terminal, start Hardhat node (if testing contracts)
   cd packages/hardhat
   yarn hardhat node
   ```

5. **Access the Application**
   - Frontend: http://localhost:3000
   - Hardhat Network: http://localhost:8545

## Project Structure

```
ticketchain-modern/
├── packages/
│   ├── app/                    # Next.js frontend
│   │   ├── src/
│   │   │   ├── app/           # App Router pages
│   │   │   ├── components/    # Reusable UI components
│   │   │   ├── hooks/         # Custom React hooks
│   │   │   ├── services/      # Business logic & API services
│   │   │   ├── context/       # React Context providers
│   │   │   ├── utils/         # Utility functions
│   │   │   └── types/         # TypeScript type definitions
│   │   └── public/            # Static assets
│   │
│   └── hardhat/               # Smart contract development
│       ├── contracts/         # Solidity smart contracts
│       ├── test/              # Contract tests
│       ├── ignition/          # Deployment scripts
│       └── typechain-types/   # Generated TypeScript types
│
├── .github/
│   └── instructions/          # Development guidelines
└── README.md
```

## Development Workflow

### Branch Strategy

- `main`: Production-ready code
- `develop`: Development branch
- `feature/*`: New features
- `bugfix/*`: Bug fixes
- `hotfix/*`: Critical production fixes

### Creating a Feature

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Follow coding standards (see below)
   - Write meaningful commit messages
   - Test your changes thoroughly

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add ticket transfer functionality"
   ```

4. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## Coding Standards

### TypeScript

- **Strict Mode**: Always enabled
- **Type Definitions**: Explicit types for parameters and return values
- **No `any`**: Use `unknown` if type is truly dynamic
- **Interfaces**: Prefer interfaces for object shapes

```typescript
// ✅ Good
interface TicketProps {
  id: bigint
  name: string
  price: bigint
}

function formatTicket(ticket: TicketProps): string {
  return `${ticket.name} - ${ticket.price}`
}

// ❌ Bad
function formatTicket(ticket: any) {
  return ticket.name + ' - ' + ticket.price
}
```

### React Components

- **Server Components**: Default for data fetching
- **'use client'**: Only when needed (interactivity, hooks, browser APIs)
- **Component Organization**: One component per file
- **Props Interface**: Always define prop types

```tsx
// ✅ Server Component (default)
export default async function TicketsPage() {
  const data = await fetchTickets()
  return <div>{data}</div>
}

// ✅ Client Component (when needed)
'use client'
export function InteractiveButton() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

### Custom Hooks

- **Naming**: Always start with `use`
- **JSDoc**: Document parameters, return values, and usage
- **Dependencies**: Properly specify in `useEffect`, `useCallback`, `useMemo`

```typescript
/**
 * Hook to fetch ticket data from smart contract
 * @param ticketId - The ticket ID to fetch
 * @returns Ticket data, loading state, and error
 */
export function useTicketData(ticketId: bigint) {
  // Implementation
}
```

### Styling

- **Tailwind CSS**: Primary styling method
- **Semantic Classes**: Use meaningful class names
- **Responsive**: Mobile-first design
- **DaisyUI**: Leverage component classes when appropriate

```tsx
// ✅ Good
<button className="btn btn-primary w-full sm:w-auto">
  Purchase Ticket
</button>

// ❌ Bad (inline styles)
<button style={{ backgroundColor: 'blue', padding: '10px' }}>
  Purchase Ticket
</button>
```

### Web3 Integration

- **Multi-chain Support**: Always pass `chain` parameter
- **Error Handling**: Graceful fallbacks for failed transactions
- **Type Safety**: Use Viem types (`Address`, `Hash`, etc.)
- **BigInt**: Use native BigInt for wei values

```typescript
// ✅ Good
async function buyTicket(
  ticketId: bigint,
  quantity: number,
  chain: Chain
) {
  const totalPrice = price * BigInt(quantity)
  // ...
}

// ❌ Bad (missing chain, number for wei)
async function buyTicket(ticketId: number, quantity: number) {
  const totalPrice = price * quantity // Wrong type!
  // ...
}
```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code formatting (no logic change)
- `refactor:` Code restructuring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

```bash
# ✅ Good
git commit -m "feat: add ticket transfer functionality"
git commit -m "fix: resolve infinite retry bug in contractService"
git commit -m "docs: update README with environment variables"

# ❌ Bad
git commit -m "updates"
git commit -m "fix stuff"
```

## Testing

### Frontend Testing

```bash
cd packages/app
yarn test
```

### Contract Testing

```bash
cd packages/hardhat
yarn hardhat test
```

### Type Checking

```bash
cd packages/app
yarn tsc --noEmit
```

### Linting

```bash
cd packages/app
yarn lint
```

## Submitting Changes

### Pull Request Process

1. **Update Documentation**
   - Update README if adding features
   - Add JSDoc comments to new functions
   - Update CHANGELOG if applicable

2. **Ensure Quality**
   - [ ] Code follows style guidelines
   - [ ] All tests pass
   - [ ] No TypeScript errors
   - [ ] ESLint passes
   - [ ] Changes are documented

3. **Create Pull Request**
   - Clear title and description
   - Reference related issues
   - Include screenshots for UI changes
   - Request review from maintainers

4. **Code Review**
   - Address reviewer feedback
   - Update PR as needed
   - Maintain clean commit history

## Blockchain Development

### Smart Contract Changes

1. **Modify Contract**
   - Edit `packages/hardhat/contracts/TicketContract.sol`
   - Follow Solidity best practices
   - Add comprehensive tests

2. **Test Changes**
   ```bash
   cd packages/hardhat
   yarn hardhat test
   ```

3. **Generate TypeScript Types**
   ```bash
   yarn hardhat compile
   ```

4. **Deploy to Testnet**
   ```bash
   yarn hardhat ignition deploy ./ignition/modules/TicketContract.ts --network sepolia
   ```

5. **Update Frontend**
   - Copy new contract address to `.env.local`
   - Update ABIs if interface changed
   - Test integration thoroughly

### Gas Optimization

- Use `calldata` for read-only array parameters
- Minimize storage operations
- Batch operations when possible
- Use events for off-chain data

### Security Considerations

- Reentrancy guards for state-changing functions
- Access control for admin functions
- Input validation for all parameters
- Consider common attack vectors

## Questions or Issues?

- **Bug Reports**: [Open an issue](https://github.com/javierlinked/ticketchain-modern/issues)
- **Feature Requests**: [Open an issue](https://github.com/javierlinked/ticketchain-modern/issues)
- **Questions**: [Discussions](https://github.com/javierlinked/ticketchain-modern/discussions)

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to TicketChain Modern! 🎫
