import 'dotenv/config';
import prisma from '../lib/prisma';

async function testOrderFlow() {
  console.log("Starting Order Flow Test...");

  // 1. Get a product
  const product = await prisma.product.findFirst();
  
  if (!product) {
    console.log("No products found in the database. Please create a product first.");
    return;
  }
  
  console.log(`Found product: ${product.title} (ID: ${product.id})`);

  // 2. Prepare order payload
  const payload = {
    name: "Test Customer",
    phone: "0771234567",
    whatsapp: "0771234567",
    address: "123 Test Street",
    city: "Colombo",
    deliveryNotes: "Please deliver carefully",
    items: [
      {
        productId: product.id,
        quantity: 1,
        unitPrice: Number(product.basePrice)
      }
    ]
  };

  // 3. Hit the local API
  console.log("Submitting order to API...");
  try {
    const response = await fetch("http://localhost:3000/api/public/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    console.log("API Response Status:", response.status);
    console.log("API Response Data:", result);

    if (result.success && result.data?.orderId) {
      console.log(`✅ Order successfully created! Order ID: ${result.data.orderId}`);
      
      // 4. Verify in DB
      const orderInDb = await prisma.order.findUnique({
        where: { orderId: result.data.orderId },
        include: { items: true, customer: true }
      });
      
      if (orderInDb) {
        console.log("✅ Order verified in Database!");
        console.log("Customer:", orderInDb.customer.name);
        console.log("Total Amount:", orderInDb.totalAmount);
        console.log("Items Count:", orderInDb.items.length);
      } else {
        console.log("❌ Order not found in DB after creation!");
      }
    } else {
      console.log("❌ API did not return success.");
    }
  } catch (error) {
    console.error("Error calling API:", error);
  }
}

testOrderFlow()
  .catch(console.error)
  .finally(() => process.exit(0));
