"use client";

import { useState } from "react";
import { OrderStatus } from "@prisma/client";
import { updateOrderStatusAction } from "@/app/actions/admin.actions";
import { ORDER_STATUS_MAP } from "@/lib/utils";

interface OrderStatusUpdaterProps {
  orderId: string;
  currentStatus: OrderStatus;
  paymentVerified: boolean;
}

export default function OrderStatusUpdater({ orderId, currentStatus, paymentVerified }: OrderStatusUpdaterProps) {
  const [status, setStatus] = useState<OrderStatus>(currentStatus);
  const [isVerified, setIsVerified] = useState(paymentVerified);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    setIsUpdating(true);
    await updateOrderStatusAction(orderId, status, isVerified);
    setIsUpdating(false);
  };

  return (
    <div className="space-y-4 text-sm">
      <div className="space-y-2">
        <label className="block text-gray-700 font-medium">Order Status</label>
        <select 
          value={status}
          onChange={(e) => setStatus(e.target.value as OrderStatus)}
          className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#C9A84C]"
        >
          {Object.entries(ORDER_STATUS_MAP).map(([key, info]) => (
            <option key={key} value={key}>{info.label}</option>
          ))}
        </select>
      </div>

      <div className="pt-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="checkbox" 
            checked={isVerified}
            onChange={(e) => setIsVerified(e.target.checked)}
            className="w-4 h-4 text-[#C9A84C] focus:ring-[#C9A84C] rounded"
          />
          <span className="text-gray-700 font-medium">Payment Verified</span>
        </label>
        <p className="text-xs text-gray-500 mt-1 ml-6">
          Check this when you have manually confirmed the bank transfer.
        </p>
      </div>

      <button
        onClick={handleUpdate}
        disabled={isUpdating || (status === currentStatus && isVerified === paymentVerified)}
        className="w-full mt-4 bg-[#1a1208] text-white py-2 rounded-md font-medium hover:bg-[#1a1208]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isUpdating && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
        Update Order
      </button>
    </div>
  );
}
