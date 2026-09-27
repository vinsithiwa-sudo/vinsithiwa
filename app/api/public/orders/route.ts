import { NextResponse } from "next/server";
import { orderFormSchema } from "@/lib/validations";
import { createOrder } from "@/services/orders.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Validate data
    const parsedData = orderFormSchema.safeParse(body);
    if (!parsedData.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsedData.error.issues },
        { status: 400 }
      );
    }

    // 2. Create the order
    const order = await createOrder(parsedData.data);

    return NextResponse.json({
      success: true,
      data: { orderId: order.orderId },
    });
  } catch (error: any) {
    console.error("Failed to create order:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
