import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock, Truck, Package, XCircle } from "lucide-react";
import { formatPrice, ORDER_STATUS_MAP } from "@/lib/utils";
import OrderStatusUpdater from "./OrderStatusUpdater";
import Image from "next/image";

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { orderId: id },
    include: {
      customer: true,
      bankAccount: true,
      items: {
        include: {
          product: {
            include: {
              images: true
            }
          }
        }
      }
    }
  });

  if (!order) {
    notFound();
  }

  const statusInfo = ORDER_STATUS_MAP[order.status] || { label: order.status, color: "#999" };

  return (
    <div className="max-w-5xl mx-auto pb-10">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/orders" className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            Order {order.orderId}
            <span 
              className="text-xs px-2.5 py-1 rounded-full font-medium tracking-wide"
              style={{ backgroundColor: `${statusInfo.color}20`, color: statusInfo.color }}
            >
              {statusInfo.label}
            </span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Placed on {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Order Items & Notes */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold">Order Items</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {order.items.map((item) => (
                <div key={item.id} className="p-6 flex gap-6">
                  <div className="w-24 h-24 relative rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                    {item.product.mainImage ? (
                      <Image 
                        src={item.product.mainImage} 
                        alt={item.product.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Package size={24} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{item.product.title}</h3>
                      <div className="text-sm text-gray-500 mt-1 flex gap-3">
                        {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                        {item.selectedFrame && <span>Frame: {item.selectedFrame}</span>}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm font-medium">Qty: {item.quantity}</span>
                      <span className="font-semibold">{formatPrice(item.unitPrice)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 bg-gray-50 flex justify-between items-center border-t border-gray-100">
              <span className="font-medium text-gray-700">Total Amount</span>
              <span className="text-xl font-bold text-gray-900">{formatPrice(order.totalAmount)}</span>
            </div>
          </div>

          {order.deliveryNotes && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold mb-3">Delivery Notes</h2>
              <p className="text-gray-700 text-sm whitespace-pre-wrap bg-yellow-50 p-4 rounded-md border border-yellow-100">
                {order.deliveryNotes}
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Customer, Payment, Actions */}
        <div className="space-y-6">
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold mb-4">Update Status</h2>
            <OrderStatusUpdater 
              orderId={order.id} 
              currentStatus={order.status} 
              paymentVerified={order.paymentVerified} 
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold mb-4">Customer Details</h2>
            <div className="space-y-4 text-sm">
              <div>
                <span className="block text-gray-500 mb-1">Name</span>
                <span className="font-medium text-gray-900">{order.customer.name}</span>
              </div>
              <div>
                <span className="block text-gray-500 mb-1">Phone</span>
                <a href={`tel:${order.customer.phone}`} className="font-medium text-blue-600 hover:underline">
                  {order.customer.phone}
                </a>
              </div>
              <div>
                <span className="block text-gray-500 mb-1">WhatsApp</span>
                <a 
                  href={`https://wa.me/${order.customer.whatsapp.replace(/[^0-9]/g, "")}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-medium text-green-600 hover:underline"
                >
                  {order.customer.whatsapp}
                </a>
              </div>
              <div>
                <span className="block text-gray-500 mb-1">Address</span>
                <span className="font-medium text-gray-900 block">{order.customer.address}</span>
                <span className="font-medium text-gray-900">{order.customer.city}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Status:</span>
                {order.paymentVerified ? (
                  <span className="flex items-center gap-1 text-green-600 font-medium">
                    <CheckCircle2 size={16} /> Verified
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-amber-600 font-medium">
                    <Clock size={16} /> Pending Verification
                  </span>
                )}
              </div>
              
              {order.bankAccount && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="block text-gray-500 mb-2">Selected Bank Account</span>
                  <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                    <div className="font-medium">{order.bankAccount.bankName}</div>
                    <div className="text-gray-600">{order.bankAccount.accountNo}</div>
                    <div className="text-gray-500 text-xs mt-1">{order.bankAccount.accountName}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
