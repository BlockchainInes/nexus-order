# Nexus Order — On-Chain Limit Order DEX

A fully on-chain order book DEX with limit orders, built with Solidity, Foundry, and React.

![Nexus Order UI](https://raw.githubusercontent.com/BlockchainInes/nexus-order/main/Captura%20de%20pantalla%20NEXUS%20ORDER.png)

## Live Contract
- **Network:** Sepolia Testnet
- **Address:** [0x098622fd935216c2a14300ffc3cb5b0e08736964](https://sepolia.etherscan.io/address/0x098622fd935216c2a14300ffc3cb5b0e08736964#code)
- **Verified:** ✅ on Etherscan

## Features
- ✅ Place limit buy and sell orders on-chain
- ✅ Automatic order matching engine in Solidity
- ✅ Cancel orders
- ✅ Real-time order book UI
- ✅ Wallet connect via RainbowKit
- ✅ 5 Foundry tests, all passing

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Smart Contracts | Solidity ^0.8.24, Foundry |
| Frontend | React 19, TypeScript, Vite |
| Web3 | Wagmi, Viem, RainbowKit |
| Styling | Tailwind CSS v4 |
| Testing | Forge (5/5 passing) |
| Network | Ethereum Sepolia Testnet |

## How It Works
The `OrderBook` smart contract stores all orders on-chain. When a new order is placed, the contract automatically runs a matching engine against existing orders. If a buy price meets a sell price, they are matched and an `OrderMatched` event is emitted.

## Getting Started

### Contracts
```bash
cd contracts
forge build
forge test -v
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Tests
[PASS] test_CancelOrder
[PASS] test_CannotCancelOthersOrder
[PASS] test_OrderMatching
[PASS] test_PlaceBuyOrder
[PASS] test_PlaceSellOrder
5 passed; 0 failed

## License
MIT
