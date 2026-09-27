import prisma from "@/lib/prisma";
import CustomRequestsClient from "./CustomRequestsClient";

export default async function AdminCustomRequestsPage() {
  const requests = await prisma.customRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Custom Requests</h1>
      </div>

      <CustomRequestsClient requests={requests} />
    </div>
  );
}
