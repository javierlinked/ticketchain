# TicketChain Modern - AI Coding Agent Instructions

## Project Overview
Decentralized ticketing platform using Next.js 15, ERC1155 smart contracts, and multi-chain Web3 integration. NFT-based tickets on Ethereum mainnet + L2s (Arbitrum, Base, Optimism, Polygon) with Sepolia testnet support.

## Architecture

### Monorepo Structure (Yarn Workspaces)
```
packages/
├── app/          # Next.js 15 frontend (TypeScript, React 19)
└── hardhat/      # Solidity contracts + deployment (Hardhat, Ignition)
```

**Critical Commands:**
- **Root:** `yarn dev` runs ALL packages in parallel
- **Build All:** `yarn build` (builds hardhat contracts first, then app)
- **App Only:** `cd packages/app && yarn dev`
- **Contracts:** `cd packages/hardhat && yarn hardhat compile|test|node`

### Smart Contract Integration Flow
1. **Solidity** → Compile (`hardhat compile`) → Generates TypeScript types in `typechain-types/`
2. **Wagmi CLI** → Reads Hardhat artifacts → Generates `packages/app/src/abis.ts` with:
   - Contract ABIs (type-safe)
   - `ticketContractAddress` mapping (chain ID → address)
   - Wagmi hooks (`readTicketContract`, `writeTicketContract`, etc.)
3. **Frontend** → Imports from `@/abis` → Always uses generated types

**After contract changes:**
```bash
cd packages/hardhat && yarn hardhat compile
cd packages/app && yarn wagmi  # Regenerate ABIs
```

### Multi-Chain Contract Resolution
- `wagmi.config.ts` defines deployments per chain ID (e.g., `11155111: '0x833a...'`)
- `getContractConfig(chain)` in `services/contract/contractConfig.ts`:
  - Returns `{address, abi, chainId}` for requested chain
  - **Auto-fallback to Sepolia** if contract not deployed (dev only, logs warning)
  - Use everywhere contracts are accessed
- Contract addresses stored in `ticketContractAddress[chainId]` object (from wagmi codegen)

## Development Standards

### Server vs Client Components (Next.js 15 App Router)
**Default: Server Components** (no directive needed)
- Data fetching, layout, static content
- Examples: `app/layout.tsx`, `components/footer.tsx`, `components/header.tsx`

**Client Components:** Require `'use client'` at top
- Hooks (`useState`, `useEffect`, wagmi hooks)
- Browser APIs, interactivity, context providers
- Examples: All files in `context/`, `app/tickets/components/tickets-page.tsx`

**Pattern:** Fetch data in server components → pass to client children for interactivity

### Web3 Integration (Wagmi v2 + Viem v2)
**Provider Setup:**
- Root: `app/layout.tsx` → `<AppProviders cookies={cookies}>` (needs SSR cookies)
- Providers stack: `Web3Provider` (wagmi) → `NotificationProvider` → `TokenProvider`
- `Web3Provider` uses Reown AppKit (WalletConnect v2) for wallet connection

**Type Safety:**
- Use Viem types: `Address` (not `string`), `Hash`, `TransactionReceipt`
- Use `bigint` for wei values (never `number` or `BigNumber`)
- Chain parameter required for all contract reads/writes

**Multi-Chain Pattern:**
```typescript
const { address, chain } = useAccount()  // wagmi hook
const { address: contractAddr, abi } = useContractConfig(chain)
const { data } = useReadContract({
  address: contractAddr,
  abi,
  functionName: 'tickets',
  args: [ticketId],
  chainId: chain?.id
})
```

**Contract Service Layer:**
- `services/contract/contractService.ts`: Abstraction for Viem `publicClient`
- `readContract()` has **automatic retry with exponential backoff** (3 attempts, 1s/2s/3s delays)
- Always pass `chain` parameter to read/write functions

### Custom Hooks Architecture
**Ticket Hooks** (`hooks/tickets/`):
- `useTicketIds()`: Fetches all ticket IDs from contract
- `useAvailableTickets(contractAddr, ids, chain)`: Fetches ticket details for IDs
- `useOwnedTickets(contractAddr, address, chain)`: Fetches user's owned tickets
- `useBuyTicket()`: Handles purchase transaction + notifications

**Web3 Hooks** (`hooks/web3/`):
- `useContractOwnership()`: Checks if user is contract owner
- `useTransactionState()`: Manages transaction lifecycle

**Pattern:** All hooks accept `chain` parameter, handle loading/error states, support refresh keys

### Styling & UI

**Tailwind CSS v4:**
- Uses new `@import 'tailwindcss'` syntax (not old @tailwind directives)
- Imports in `globals.css`: `@import 'tailwindcss'; @plugin "daisyui";`
- Custom classes: `.bg-app` (gradient vignette), `.bg-grid`, `.header-blur`, `.text-gradient`

**DaisyUI v5:**
- Theme: `business` (dark mode)
- Set on `<body data-theme="business">`
- Use semantic classes: `btn`, `btn-primary`, `card`, `loading`, `alert`

**Responsive Design:**
- Mobile-first breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Grid layouts: `grid-cols-1 xl:grid-cols-2`

**Network Colors:**
- `GetNetworkColor(chain, 'color'|'bgVariant')` from `utils/network.ts`
- Returns network-specific colors (ethereum→indigo, arbitrum→sky, base→blue, etc.)

### Error Handling & UX

**Error Boundaries:**
- Route-level: `app/error.tsx` (client component with reset)
- Global: `app/global-error.tsx` (catches root errors)
- Component-level: `<ErrorBoundary>` wrapper from `components/error-boundary.tsx`

**Loading States:**
- Route: `loading.tsx` (automatic Suspense boundary)
- Component: `<LoadingSpinner size="sm|md|lg" />` from DaisyUI

**Network Guard:**
- `<NetworkGuard>` component checks wallet connection
- Shows "Connect Wallet" prompt if disconnected
- Wraps pages that need Web3 access

**Notifications:**
- `NotificationProvider` uses `react-toastify`
- Import via `useNotify()` hook (if available) or directly
- Style in `assets/notifications.css`

### Environment Variables

**Required:**
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` - Get from [dashboard.reown.com](https://dashboard.reown.com/)

**Optional (Contract Addresses):**
- NOT used in current implementation (uses wagmi.config.ts deployments instead)
- Legacy env vars: `NEXT_PUBLIC_*_CONTRACT_ADDRESS` (Sepolia, Mainnet, etc.)

**Add New Chain Deployment:**
1. Deploy contract: `cd packages/hardhat && yarn hardhat ignition deploy --network <network>`
2. Update `packages/app/wagmi.config.ts` → add `chainId: 'address'` to deployments
3. Run `yarn wagmi` to regenerate ABIs
4. Add network to `ETH_CHAINS` in `utils/network.ts` if not already present

## Code Patterns

### Component File Naming
- Files: lowercase with dashes (`footer.tsx`, `network-status.tsx`)
- Imports: Match component name (`import { Footer } from './footer'`)
- Components: PascalCase (`export function Footer()`)

### TypeScript Conventions
- Strict mode enabled
- Explicit types for function params/returns
- Interfaces for object shapes (prefer over `type` for extensibility)
- `unknown` over `any`
- JSDoc comments on hooks/functions with params/return description

### Commit Messages (Conventional Commits)
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `refactor:` Code restructuring
- `chore:` Maintenance (deps, config)

## Common Tasks

### Adding a New Smart Contract Function
1. Edit `packages/hardhat/contracts/TicketContract.sol`
2. Run `yarn hardhat compile` (generates typechain types)
3. Write test in `packages/hardhat/test/`
4. Run `yarn hardhat test`
5. In `packages/app`, run `yarn wagmi` (regenerates `abis.ts`)
6. Use in frontend with type-safe hooks from `@/abis`

### Creating a New Page
1. Create in `app/` directory (e.g., `app/my-page/page.tsx`)
2. Server component by default (no `'use client'`)
3. If needs interactivity, create client component in `components/` and import
4. Add loading state: `app/my-page/loading.tsx`
5. Add error handling: wrap with `<ErrorBoundary>` or use `error.tsx`

### Debugging Contract Issues
1. Check network: `useAccount()` → `chain.name`
2. Verify contract deployed: `getContractConfig(chain)` logs warning if fallback used
3. Check wagmi.config.ts has correct address for chain ID
4. View transaction: Use `useTransactionState()` hook or Etherscan/block explorer
5. Test on Sepolia first (always has contract deployed)

## Security & Best Practices
- **CRITICAL:** Never chage TicketContract.sol unless you are explicitly so instructed
- **CRITICAL:** Never upgrade OpenZeppelin and in general tooling from /packages/hardhat/package.json unless you are explicitly so instructed
- **BigInt Arithmetic:** Always use `BigInt()` for wei calculations, never float math
- **Input Validation:** Validate ticket quantity, price before transactions
- **Image Sources:** Only allow configured domains (see `next.config.mjs` remotePatterns)
- **Wallet State:** Always check `isConnected` before contract interactions
- **Gas Estimation:** Let wagmi handle gas estimation (don't override unless necessary)

## Testing

- **Hardhat Tests:** `cd packages/hardhat && yarn test`
- **Coverage:** `yarn coverage` (in hardhat package)
- **Type Check:** `cd packages/app && yarn tsc --noEmit`
- **Lint:** `yarn lint --fix`

## Key Files Reference

| File | Purpose |
|------|---------|
| `packages/app/src/abis.ts` | Generated contract ABIs & addresses (don't edit manually) |
| `packages/app/wagmi.config.ts` | Contract deployment addresses per chain |
| `packages/app/src/services/contract/contractConfig.ts` | Multi-chain contract resolution logic |
| `packages/app/src/context/app-providers.tsx` | Provider hierarchy setup |
| `packages/hardhat/contracts/TicketContract.sol` | ERC1155 ticket smart contract |
| `packages/hardhat/ignition/modules/TicketContract.ts` | Hardhat Ignition deployment module |
| `packages/app/tailwind.config.ts` | Tailwind + DaisyUI configuration |
| `packages/app/src/assets/globals.css` | Global styles, custom CSS classes |

---

**When uncertain:** Check existing patterns in `hooks/tickets/`, `services/contract/`, or similar components before creating new abstractions.
