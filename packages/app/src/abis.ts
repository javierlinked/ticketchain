import {
  createReadContract,
  createWriteContract,
  createSimulateContract,
  createWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TicketContract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const ticketContractAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'account', internalType: 'address', type: 'address', indexed: true },
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'account', internalType: 'address', type: 'address', indexed: false }],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'minter', internalType: 'address', type: 'address', indexed: true },
      { name: 'name', internalType: 'string', type: 'string', indexed: true },
      { name: 'price', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'maxSellPerPerson', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'TicketCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'seller', internalType: 'address', type: 'address', indexed: true },
      { name: 'buyer', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'TicketSold',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]', indexed: false },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]', indexed: false },
    ],
    name: 'TransferBatch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'TransferSingle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'URI',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'account', internalType: 'address', type: 'address', indexed: false }],
    name: 'Unpaused',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'balanceOfBatch',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'burnBatch',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'buy',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'price', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'maxSellPerPerson', internalType: 'uint256', type: 'uint256' },
      { name: 'infoUrl', internalType: 'string', type: 'string' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'create',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'nonce',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  { type: 'function', inputs: [], name: 'pause', outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  { type: 'function', inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'tickets',
    outputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'price', internalType: 'uint256', type: 'uint256' },
      { name: 'maxSellPerPerson', internalType: 'uint256', type: 'uint256' },
      { name: 'infoUrl', internalType: 'string', type: 'string' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenIds',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'tokenIdsLength',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'function', inputs: [], name: 'unpause', outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'uri',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
] as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const ticketContractAddress = {
  11155111: '0x95638257fc0421E18415d83bF5579cf136B56e97',
} as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const ticketContractConfig = { address: ticketContractAddress, abi: ticketContractAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ticketContractAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const readTicketContract = /*#__PURE__*/ createReadContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const readTicketContractBalanceOf = /*#__PURE__*/ createReadContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"balanceOfBatch"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const readTicketContractBalanceOfBatch = /*#__PURE__*/ createReadContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'balanceOfBatch',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"isApprovedForAll"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const readTicketContractIsApprovedForAll = /*#__PURE__*/ createReadContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'isApprovedForAll',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"nonce"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const readTicketContractNonce = /*#__PURE__*/ createReadContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'nonce',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const readTicketContractOwner = /*#__PURE__*/ createReadContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"paused"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const readTicketContractPaused = /*#__PURE__*/ createReadContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'paused',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const readTicketContractSupportsInterface = /*#__PURE__*/ createReadContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"tickets"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const readTicketContractTickets = /*#__PURE__*/ createReadContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'tickets',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"tokenIds"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const readTicketContractTokenIds = /*#__PURE__*/ createReadContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'tokenIds',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"tokenIdsLength"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const readTicketContractTokenIdsLength = /*#__PURE__*/ createReadContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'tokenIdsLength',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"uri"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const readTicketContractUri = /*#__PURE__*/ createReadContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'uri',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ticketContractAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const writeTicketContract = /*#__PURE__*/ createWriteContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"burn"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const writeTicketContractBurn = /*#__PURE__*/ createWriteContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'burn',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"burnBatch"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const writeTicketContractBurnBatch = /*#__PURE__*/ createWriteContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'burnBatch',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"buy"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const writeTicketContractBuy = /*#__PURE__*/ createWriteContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'buy',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"create"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const writeTicketContractCreate = /*#__PURE__*/ createWriteContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'create',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"pause"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const writeTicketContractPause = /*#__PURE__*/ createWriteContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'pause',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const writeTicketContractRenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'renounceOwnership',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"safeBatchTransferFrom"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const writeTicketContractSafeBatchTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'safeBatchTransferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const writeTicketContractSafeTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const writeTicketContractSetApprovalForAll = /*#__PURE__*/ createWriteContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const writeTicketContractTransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"unpause"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const writeTicketContractUnpause = /*#__PURE__*/ createWriteContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'unpause',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ticketContractAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const simulateTicketContract = /*#__PURE__*/ createSimulateContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"burn"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const simulateTicketContractBurn = /*#__PURE__*/ createSimulateContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'burn',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"burnBatch"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const simulateTicketContractBurnBatch = /*#__PURE__*/ createSimulateContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'burnBatch',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"buy"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const simulateTicketContractBuy = /*#__PURE__*/ createSimulateContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'buy',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"create"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const simulateTicketContractCreate = /*#__PURE__*/ createSimulateContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'create',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"pause"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const simulateTicketContractPause = /*#__PURE__*/ createSimulateContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'pause',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const simulateTicketContractRenounceOwnership = /*#__PURE__*/ createSimulateContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'renounceOwnership',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"safeBatchTransferFrom"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const simulateTicketContractSafeBatchTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'safeBatchTransferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const simulateTicketContractSafeTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const simulateTicketContractSetApprovalForAll = /*#__PURE__*/ createSimulateContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const simulateTicketContractTransferOwnership = /*#__PURE__*/ createSimulateContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ticketContractAbi}__ and `functionName` set to `"unpause"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const simulateTicketContractUnpause = /*#__PURE__*/ createSimulateContract({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  functionName: 'unpause',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ticketContractAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const watchTicketContractEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ticketContractAbi,
  address: ticketContractAddress,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ticketContractAbi}__ and `eventName` set to `"ApprovalForAll"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const watchTicketContractApprovalForAllEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  eventName: 'ApprovalForAll',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ticketContractAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const watchTicketContractOwnershipTransferredEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  eventName: 'OwnershipTransferred',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ticketContractAbi}__ and `eventName` set to `"Paused"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const watchTicketContractPausedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  eventName: 'Paused',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ticketContractAbi}__ and `eventName` set to `"TicketCreated"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const watchTicketContractTicketCreatedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  eventName: 'TicketCreated',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ticketContractAbi}__ and `eventName` set to `"TicketSold"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const watchTicketContractTicketSoldEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  eventName: 'TicketSold',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ticketContractAbi}__ and `eventName` set to `"TransferBatch"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const watchTicketContractTransferBatchEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  eventName: 'TransferBatch',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ticketContractAbi}__ and `eventName` set to `"TransferSingle"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const watchTicketContractTransferSingleEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  eventName: 'TransferSingle',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ticketContractAbi}__ and `eventName` set to `"URI"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const watchTicketContractUriEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  eventName: 'URI',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ticketContractAbi}__ and `eventName` set to `"Unpaused"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x95638257fc0421E18415d83bF5579cf136B56e97)
 */
export const watchTicketContractUnpausedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ticketContractAbi,
  address: ticketContractAddress,
  eventName: 'Unpaused',
})
