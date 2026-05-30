import { useReadContract } from "wagmi"
import { ORDERBOOK_ADDRESS, ORDERBOOK_ABI } from "../lib/orderbook"

function OrderRow({ id }: { id: number }) {
  const { data: order } = useReadContract({
    address: ORDERBOOK_ADDRESS,
    abi: ORDERBOOK_ABI,
    functionName: "getOrder",
    args: [BigInt(id)],
  })

  if (!order || !order.active) return null

  return (
    <tr className="border-b border-gray-800">
      <td className="py-3 px-4 text-gray-400">{id}</td>
      <td className="py-3 px-4">
        <span className={order.isBuy ? "text-green-400" : "text-red-400"}>
          {order.isBuy ? "BUY" : "SELL"}
        </span>
      </td>
      <td className="py-3 px-4 font-mono">{order.price.toString()}</td>
      <td className="py-3 px-4 font-mono">{order.amount.toString()}</td>
      <td className="py-3 px-4 font-mono text-xs text-gray-500">
        {order.user.slice(0, 6)}...{order.user.slice(-4)}
      </td>
    </tr>
  )
}

export default function OrderTable({ count }: { count: number }) {
  if (count === 0) return (
    <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 mt-6">
      <h2 className="text-lg font-semibold mb-4">Open Orders</h2>
      <p className="text-gray-500 text-center py-8">No orders yet</p>
    </div>
  )

  return (
    <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 mt-6">
      <h2 className="text-lg font-semibold mb-4">Open Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700 text-gray-400 text-left">
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">User</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: count }, (_, i) => (
              <OrderRow key={i} id={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}