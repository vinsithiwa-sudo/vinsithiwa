import BankAccountForm from "@/components/admin/BankAccountForm";

export default function NewBankAccountPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Bank Account</h1>
      <BankAccountForm />
    </div>
  );
}
