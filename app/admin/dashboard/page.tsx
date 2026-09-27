import { getDashboardStats } from "@/services/admin.service";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart, Clock, Package, DollarSign } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const statCards = [
    { label: "Total Orders", value: stats.totalOrders, icon: ShoppingCart, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Pending Payment", value: stats.pendingOrders, icon: Clock, color: "text-amber-600", bg: "bg-amber-100" },
    { label: "Total Revenue", value: formatPrice(stats.totalRevenue), icon: DollarSign, color: "text-green-600", bg: "bg-green-100" },
    { label: "Active Products", value: stats.totalProducts, icon: Package, color: "text-purple-600", bg: "bg-purple-100" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${stat.bg}`}>
                <Icon className={stat.color} size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/admin/products/new" className="px-4 py-3 rounded-md bg-gray-50 text-gray-700 font-medium hover:bg-gray-100 transition-colors">
              + Add New Product
            </Link>
            <Link href="/admin/orders?status=PENDING_PAYMENT" className="px-4 py-3 rounded-md bg-amber-50 text-amber-700 font-medium hover:bg-amber-100 transition-colors">
              Review Pending Payments
            </Link>
            <Link href="/admin/custom-requests" className="px-4 py-3 rounded-md bg-blue-50 text-blue-700 font-medium hover:bg-blue-100 transition-colors">
              View Custom Requests
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
