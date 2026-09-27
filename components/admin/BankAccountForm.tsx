"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBankAccountAction, updateBankAccountAction } from "@/app/actions/admin.actions";
import { BankAccount } from "@prisma/client";

interface BankAccountFormProps {
  initialData?: BankAccount;
}

export default function BankAccountForm({ initialData }: BankAccountFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      bankName: formData.get("bankName") as string,
      accountName: formData.get("accountName") as string,
      accountNo: formData.get("accountNo") as string,
      branch: formData.get("branch") as string,
    };

    let result;
    if (initialData) {
      result = await updateBankAccountAction(initialData.id, data);
    } else {
      result = await createBankAccountAction(data);
    }

    setIsSubmitting(false);

    if (result.error) {
      setError(result.error);
    } else {
      router.push("/admin/bank-accounts");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name *</label>
          <input
            name="bankName"
            defaultValue={initialData?.bankName}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Account Name *</label>
          <input
            name="accountName"
            defaultValue={initialData?.accountName}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Account Number *</label>
          <input
            name="accountNo"
            defaultValue={initialData?.accountNo}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Branch (Optional)</label>
          <input
            name="branch"
            defaultValue={initialData?.branch || ""}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
          />
        </div>
      </div>

      <div className="flex gap-4 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-[#1a1208] text-white rounded-md hover:bg-[#1a1208]/90 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Bank Account"}
        </button>
      </div>
    </form>
  );
}
