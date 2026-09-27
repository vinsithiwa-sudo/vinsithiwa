import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteBankAccountAction } from "@/app/actions/admin.actions";

export default async function AdminBankAccountsPage() {
  const accounts = await prisma.bankAccount.findMany({
    orderBy: { bankName: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Bank Accounts</h1>
        <Link
          href="/admin/bank-accounts/new"
          className="flex items-center gap-2 bg-[#1a1208] text-white px-4 py-2 rounded-md hover:bg-[#1a1208]/90 transition-colors"
        >
          <Plus size={16} /> Add Account
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
                <th className="p-4">Bank Name</th>
                <th className="p-4">Account Name</th>
                <th className="p-4">Account Number</th>
                <th className="p-4">Branch</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {accounts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    No bank accounts found.
                  </td>
                </tr>
              ) : (
                accounts.map((account) => (
                  <tr key={account.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">{account.bankName}</td>
                    <td className="p-4">{account.accountName}</td>
                    <td className="p-4 text-gray-500">{account.accountNo}</td>
                    <td className="p-4">{account.branch || "-"}</td>
                    <td className="p-4">
                      {account.isActive ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Active</span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Inactive</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/bank-accounts/${account.id}/edit`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        >
                          <Edit size={16} />
                        </Link>
                        <DeleteButton id={account.id} action={deleteBankAccountAction} />
                      </div>
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
