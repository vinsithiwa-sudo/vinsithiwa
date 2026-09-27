"use server";

import prisma from "@/lib/prisma";

export async function submitCustomRequest(data: {
  name: string;
  phone: string;
  whatsapp: string;
  description: string;
  budget?: string;
  spaceType?: string;
}) {
  try {
    const request = await prisma.customRequest.create({
      data: {
        name: data.name,
        phone: data.phone,
        whatsapp: data.whatsapp,
        description: data.description,
        budget: data.budget,
        spaceType: data.spaceType,
      },
    });
    return { success: true, request };
  } catch (error) {
    console.error("Failed to submit custom request:", error);
    return { error: "Failed to submit request. Please try again or contact us via WhatsApp." };
  }
}
