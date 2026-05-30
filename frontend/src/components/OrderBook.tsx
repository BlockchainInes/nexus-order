import { useState } from "react"
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { ORDERBOOK_ADDRESS, ORDERBOOK_ABI } from "../lib/orderbook"

export default function OrderBook() {
  const { address, isConnected } = useAccount()
  const [price, setPrice] = useState("")
  const [amount, setAmount] = useState("")
  const [isBuy, setIsBuy] = useState(true)

  const { data: nextOrderId } = useReadContract({
    address: ORDERBOOK_ADDRESS,
    abi: ORDERBOOK_ABI,
    functionName: "nextOrderId",
  })

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  function placeOrder() {
    if (!price || !amount) return
    writeContract({
      address: ORDERBOOK_ADDRESS,
      abi: ORDERBOOK_ABI,
      functionName: "placeOrder",
      args: [BigInt(price), BigInt(amount), isBuy],
    })
  }

  const btnLabel = isPending ? "Confirming..." : isConfirming ? "Processing..." : isBuy ? "Place Buy Order" : "Place Sell Order"
  const buyBtnClass = "flex-1 py-2 font-semibold transition-colors " + (isBuy ? "bg-green-600 text-white" : "bg-gray-800 text-gray-400")
  const sellBtnClass = "flex-1 py-2 font-semibold transition-colors " + (!isBuy ? "bg-red-600 text-white" : "bg-gray-800 text-gray-400")
  const submitBtnClass = "w-full mt-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed " + (isBuy ? "bg-green-600 hover:bg-green-500" : "bg-red-600 hover:bg-red-500")

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
        <h2 className="text-lg font-semibold mb-6">Place Order</h2>
        <div className="flex rounded-lg overflow-hidden mb-6">
          <button onClick={() => setIsBuy(true)} className={buyBtnClass}>Buy</button>
          <button onClick={() => setIsBuy(false)} className={sellBtnClass}>Sell</button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Price</label>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="0" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Amount</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
          </div>
        </div>
        <button onClick={placeOrder} disabled={!isConnected || isPending || isConfirming} className={submitBtnClass}>
          {btnLabel}
        </button>
        {isSuccess && <p className="mt-3 text-green-400 text-sm text-center">Order placed successfully!</p>}
        {!isConnected && <p className="mt-3 text-gray-500 text-sm text-center">Connect wallet to place orders</p>}
      </div>
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
        <h2 className="text-lg font-semibold mb-6">Market Info</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-gray-800">
            <span className="text-gray-400">Total Orders</span>
            <span className="font-mono text-white">{nextOrderId?.toString() ?? "0"}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-800">
            <span className="text-gray-400">Contract</span>
            <span className="text-blue-400 font-mono text-sm">{ORDERBOOK_ADDRESS.slice(0, 6)}...{ORDERBOOK_ADDRESS.slice(-4)}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-800">
            <span className="text-gray-400">Network</span>
            <span className="text-yellow-400">Sepolia Testnet</span>
          </div>
          {address && (
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-400">Your Address</span>
              <span className="font-mono text-sm">{address.slice(0, 6)}...{address.slice(-4)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}