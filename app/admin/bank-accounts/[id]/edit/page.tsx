import prisma from "@/lib/prisma";
import BankAccountForm from "@/components/admin/BankAccountForm";
import { notFound } from "next/navigation";

export default async function EditBankAccountPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bankAccount = await prisma.bankAccount.findUnique({
    where: { id },
  });

  if (!bankAccount) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Bank Account</h1>
      <BankAccountForm initialData={bankAccount} />
    </div>
  );
}
