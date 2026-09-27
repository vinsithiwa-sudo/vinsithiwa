import Link from "next/link";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import Footer from "@/components/layout/Footer";
import prisma from "@/lib/prisma";
import { buildWhatsAppUrl } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

const GOLD = "#C9A84C";
const DARK = "#1a1208";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Confirmation | Vinsith Interior Wall Art",
  description: "Your order has been received. Please find bank transfer details and instructions to confirm your payment.",
  robots: { index: false, follow: false },
};

export default async function OrderConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // Fetch order and bank details
  // Note: If DB is not connected, this will fail. We wrap it to handle mock gracefully.
  let order = null;
  let bankAccount = null;
  let whatsappNumber = "+94770697626"; // fallback
  
  try {
    order = await prisma.order.findUnique({
      where: { orderId: id },
      include: {
        customer: true,
        items: { include: { product: { select: { title: true } } } },
      },
    });
    
    bankAccount = await prisma.bankAccount.findFirst({
      where: { isActive: true },
    });

    const settings = await prisma.setting.findMany();
    const waSetting = settings.find(s => s.key === "whatsappNumber");
    if (waSetting) whatsappNumber = waSetting.value;
  } catch (error) {
    console.error("Database fetch failed for order confirmation:", error);
  }

  if (!order) {
    return (
      <>
        <NavbarWrapper />
        <main className="pt-32 pb-24 min-h-screen bg-[#FAF8F4] flex items-center justify-center">
          <p>Order not found.</p>
        </main>
        <Footer />
      </>
    );
  }

  const whatsappUrl = buildWhatsAppUrl(
    whatsappNumber,
    order.orderId,
    `LKR ${Number(order.totalAmount).toLocaleString()}`,
    order.items.map(item => ({
      title: item.product.title,
      quantity: item.quantity,
      selectedSize: item.selectedSize ?? undefined,
    }))
  );

  return (
    <>
      <NavbarWrapper />
      <main className="pt-32 pb-24 bg-[#FAF8F4] min-h-screen">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12 text-center">
          
          <div className="flex justify-center mb-6">
            <CheckCircle2 size={64} style={{ color: "#4CAF50" }} />
          </div>

          <h1 className="font-display font-bold text-3xl md:text-4xl mb-4" style={{ color: DARK }}>
            Order Received
          </h1>
          <p className="font-body text-base mb-2" style={{ color: "#8C7B6A" }}>
            Thank you, {order.customer?.name}. Your order has been placed successfully.
          </p>
          <p className="font-body text-sm mb-10" style={{ color: "#8C7B6A" }}>
            Order ID: <span className="font-medium" style={{ color: DARK }}>{order.orderId}</span>
          </p>

          {/* Payment Instructions */}
          <div className="bg-white p-8 border text-left mb-10" style={{ borderColor: "#E8E2D9" }}>
            <h2 className="font-display font-semibold text-xl mb-6" style={{ color: DARK }}>
              Next Steps: Bank Transfer
            </h2>
            <p className="font-body text-sm mb-6" style={{ color: "#8C7B6A" }}>
              To complete your order, please transfer the total amount to the bank account below and send us the deposit slip via WhatsApp.
            </p>

            <div className="bg-[#FAF8F4] p-6 mb-6">
              <div className="flex flex-col gap-3 font-body text-sm">
                <div className="flex justify-between border-b pb-3" style={{ borderColor: "#E8E2D9" }}>
                  <span style={{ color: "#8C7B6A" }}>Total Amount</span>
                  <span className="font-semibold" style={{ color: DARK }}>LKR {Number(order.totalAmount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span style={{ color: "#8C7B6A" }}>Bank Name</span>
                  <span className="font-medium" style={{ color: DARK }}>{bankAccount?.bankName || "Commercial Bank"}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "#8C7B6A" }}>Account Name</span>
                  <span className="font-medium" style={{ color: DARK }}>{bankAccount?.accountName || "Vinsith Interior"}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "#8C7B6A" }}>Account Number</span>
                  <span className="font-medium" style={{ color: DARK }}>{bankAccount?.accountNo || "1234567890"}</span>
                </div>
                {bankAccount?.branch && (
                  <div className="flex justify-between">
                    <span style={{ color: "#8C7B6A" }}>Branch</span>
                    <span className="font-medium" style={{ color: DARK }}>{bankAccount.branch}</span>
                  </div>
                )}
              </div>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-4 font-body text-sm tracking-widest uppercase font-medium transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#25D366", color: "#fff", borderRadius: "1px" }}
            >
              Send Slip on WhatsApp
            </a>
            <p className="text-center font-body text-[10px] tracking-wide mt-4" style={{ color: "#8C7B6A" }}>
              Please mention your Order ID ({order.orderId}) when sending the slip.
            </p>
          </div>

          <Link
            href="/catalog"
            className="inline-block font-body text-sm tracking-widest uppercase pb-1 transition-colors hover:opacity-70"
            style={{ color: DARK, borderBottom: `1px solid ${DARK}` }}
          >
            Continue Shopping
          </Link>

        </div>
      </main>
      <Footer />
    </>
  );
}
