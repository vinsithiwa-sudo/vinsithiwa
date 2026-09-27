import prisma from "@/lib/prisma";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { Eye } from "lucide-react";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const statusFilter = resolvedSearchParams.status ? { status: resolvedSearchParams.status as any } : {};

  const orders = await prisma.order.findMany({
    where: statusFilter,
    include: {
      customer: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <div className="flex gap-2">
          <Link href="/admin/orders" className={`px-3 py-1.5 rounded-md text-sm ${!resolvedSearchParams.status ? "bg-gray-200 text-gray-800" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}>All</Link>
          <Link href="/admin/orders?status=PENDING_PAYMENT" className={`px-3 py-1.5 rounded-md text-sm ${resolvedSearchParams.status === "PENDING_PAYMENT" ? "bg-amber-200 text-amber-800" : "bg-amber-50 text-amber-700 hover:bg-amber-100"}`}>Pending Payment</Link>
          <Link href="/admin/orders?status=PROCESSING" className={`px-3 py-1.5 rounded-md text-sm ${resolvedSearchParams.status === "PROCESSING" ? "bg-blue-200 text-blue-800" : "bg-blue-50 text-blue-700 hover:bg-blue-100"}`}>Processing</Link>
          <Link href="/admin/orders?status=READY_FOR_DELIVERY" className={`px-3 py-1.5 rounded-md text-sm ${resolvedSearchParams.status === "READY_FOR_DELIVERY" ? "bg-purple-200 text-purple-800" : "bg-purple-50 text-purple-700 hover:bg-purple-100"}`}>Ready for Delivery</Link>
          <Link href="/admin/orders?status=DELIVERED" className={`px-3 py-1.5 rounded-md text-sm ${resolvedSearchParams.status === "DELIVERED" ? "bg-green-200 text-green-800" : "bg-green-50 text-green-700 hover:bg-green-100"}`}>Delivered</Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
                <th className="p-4">Order ID</th>
                <th className="p-4">Date</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">{order.orderId}</td>
                    <td className="p-4 text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">{order.customer?.name}</td>
                    <td className="p-4 font-medium">{formatPrice(order.totalAmount)}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        order.status === "PENDING_PAYMENT" ? "bg-amber-100 text-amber-700" :
                        order.status === "PROCESSING" ? "bg-blue-100 text-blue-700" :
                        order.status === "READY_FOR_DELIVERY" ? "bg-purple-100 text-purple-700" :
                        order.status === "DELIVERED" ? "bg-green-100 text-green-700" :
                        "bg-gray-100 text-gray-700"
                      }`}>
                        {order.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/admin/orders/${order.orderId}`}
                        className="inline-flex items-center gap-1 p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      >
                        <Eye size={16} /> <span className="text-xs font-medium">View</span>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
