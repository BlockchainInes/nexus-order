export const ORDERBOOK_ADDRESS = "0x098622fd935216c2a14300ffc3cb5b0e08736964" as const

export const ORDERBOOK_ABI = [
  {
    name: "placeOrder",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "price", type: "uint256" },
      { name: "amount", type: "uint256" },
      { name: "isBuy", type: "bool" }
    ],
    outputs: []
  },
  {
    name: "cancelOrder",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "id", type: "uint256" }],
    outputs: []
  },
  {
    name: "getOrder",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "id", type: "uint256" }],
    outputs: [{
      type: "tuple",
      components: [
        { name: "id", type: "uint256" },
        { name: "user", type: "address" },
        { name: "price", type: "uint256" },
        { name: "amount", type: "uint256" },
        { name: "isBuy", type: "bool" },
        { name: "active", type: "bool" }
      ]
    }]
  },
  {
    name: "nextOrderId",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }]
  },
  {
    name: "OrderPlaced",
    type: "event",
    inputs: [
      { name: "id", type: "uint256", indexed: false },
      { name: "user", type: "address", indexed: false },
      { name: "price", type: "uint256", indexed: false },
      { name: "amount", type: "uint256", indexed: false },
      { name: "isBuy", type: "bool", indexed: false }
    ]
  },
  {
    name: "OrderMatched",
    type: "event",
    inputs: [
      { name: "buyId", type: "uint256", indexed: false },
      { name: "sellId", type: "uint256", indexed: false },
      { name: "price", type: "uint256", indexed: false },
      { name: "amount", type: "uint256", indexed: false }
    ]
  },
  {
    name: "OrderCancelled",
    type: "event",
    inputs: [{ name: "id", type: "uint256", indexed: false }]
  }
] as const