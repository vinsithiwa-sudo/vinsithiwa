"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createSpaceAction, updateSpaceAction } from "@/app/actions/admin.actions";

export default function SpaceForm({ initialData }: { initialData?: { id: string; name: string; slug: string; icon?: string | null; description?: string | null; color?: string | null } }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [icon, setIcon] = useState(initialData?.icon || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [color, setColor] = useState(initialData?.color || "#E8E2D9");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) {
      setError("Name and slug are required.");
      return;
    }
    
    setIsSubmitting(true);
    setError("");
    
    const result = initialData
      ? await updateSpaceAction(initialData.id, name, slug, icon, description, color)
      : await createSpaceAction(name, slug, icon, description, color);
      
    setIsSubmitting(false);
    
    if (result.error) {
      setError(result.error);
    } else {
      router.push("/admin/spaces");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/spaces" className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          {initialData ? "Edit Space" : "New Space"}
        </h1>
      </div>

      {error && <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Space Name</label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (!initialData) {
                setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
              }
            }}
            className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#C9A84C]"
            placeholder="e.g. Living Room"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Slug</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#C9A84C]"
            placeholder="e.g. living-room"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Icon (Emoji)</label>
          <input
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#C9A84C]"
            placeholder="e.g. 🎮"
          />
          <p className="text-xs text-gray-500">Paste an emoji to represent this space.</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Short Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#C9A84C]"
            placeholder="e.g. Premium wall art for gaming setups."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Accent Color</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-10 h-10 p-1 border border-gray-300 rounded-md outline-none cursor-pointer"
            />
            <span className="text-sm text-gray-500 uppercase">{color}</span>
          </div>
          <p className="text-xs text-gray-500">Used for the top border of the space card.</p>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-[#1a1208] text-white rounded-md hover:bg-[#1a1208]/90 transition-colors disabled:opacity-70"
          >
            {isSubmitting ? "Saving..." : "Save Space"}
          </button>
        </div>
      </form>
    </div>
  );
}
