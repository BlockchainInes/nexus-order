import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useReadContract } from "wagmi"
import OrderBook from "./components/OrderBook"
import OrderTable from "./components/OrderTable"
import { ORDERBOOK_ADDRESS, ORDERBOOK_ABI } from "./lib/orderbook"

export default function App() {
  const { data: nextOrderId } = useReadContract({
    address: ORDERBOOK_ADDRESS,
    abi: ORDERBOOK_ABI,
    functionName: "nextOrderId",
  })

  const count = nextOrderId ? Number(nextOrderId) : 0

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-blue-400">Nexus Order</h1>
          <p className="text-xs text-gray-500">On-Chain Limit Order DEX</p>
        </div>
        <ConnectButton />
      </header>
      <main className="max-w-6xl mx-auto px-6 py-8">
        <OrderBook />
        <OrderTable count={count} />
      </main>
    </div>
  )
}