"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

interface DeleteButtonProps {
  id: string;
  action: (id: string) => Promise<{ success?: boolean; error?: string }>;
}

export default function DeleteButton({ id, action }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item? This action cannot be undone.")) return;

    setIsDeleting(true);
    const result = await action(id);
    setIsDeleting(false);

    if (result?.error) {
      alert(result.error);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className={`p-2 rounded-md transition-colors ${
        isDeleting 
          ? "text-gray-400 cursor-not-allowed" 
          : "text-red-600 hover:bg-red-50"
      }`}
      title="Delete"
    >
      <Trash2 size={16} className={isDeleting ? "opacity-50" : ""} />
    </button>
  );
}
