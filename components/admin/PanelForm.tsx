"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createPanelAction, updatePanelAction } from "@/app/actions/admin.actions";

export default function PanelForm({ initialData }: { initialData?: { id: string; name: string; count: number } }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  const [name, setName] = useState(initialData?.name || "");
  const [count, setCount] = useState(initialData?.count || 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || count < 1) {
      setError("Name is required and pieces count must be at least 1.");
      return;
    }
    
    setIsSubmitting(true);
    setError("");
    
    const result = initialData
      ? await updatePanelAction(initialData.id, name, count)
      : await createPanelAction(name, count);
      
    setIsSubmitting(false);
    
    if (result.error) {
      setError(result.error);
    } else {
      router.push("/admin/panels");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/panels" className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          {initialData ? "Edit Panel" : "New Panel"}
        </h1>
      </div>

      {error && <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Panel Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#C9A84C]"
            placeholder="e.g. 3 Pieces"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Pieces Count</label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value) || 1)}
            min={1}
            max={10}
            className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#C9A84C]"
            placeholder="e.g. 3"
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-[#1a1208] text-white rounded-md hover:bg-[#1a1208]/90 transition-colors disabled:opacity-70"
          >
            {isSubmitting ? "Saving..." : "Save Panel"}
          </button>
        </div>
      </form>
    </div>
  );
}
