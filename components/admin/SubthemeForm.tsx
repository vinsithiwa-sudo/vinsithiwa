"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createSubthemeAction, updateSubthemeAction } from "@/app/actions/admin.actions";

export default function SubthemeForm({ 
  initialData, 
  themes 
}: { 
  initialData?: { id: string; name: string; slug: string; themeId: string },
  themes: { id: string; name: string }[] 
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [themeId, setThemeId] = useState(initialData?.themeId || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug || !themeId) {
      setError("Name, slug, and parent theme are required.");
      return;
    }
    
    setIsSubmitting(true);
    setError("");
    
    const result = initialData
      ? await updateSubthemeAction(initialData.id, name, slug, themeId)
      : await createSubthemeAction(name, slug, themeId);
      
    setIsSubmitting(false);
    
    if (result.error) {
      setError(result.error);
    } else {
      router.push("/admin/subthemes");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/subthemes" className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          {initialData ? "Edit Subtheme" : "New Subtheme"}
        </h1>
      </div>

      {error && <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Parent Theme</label>
          <select
            value={themeId}
            onChange={(e) => setThemeId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#C9A84C]"
          >
            <option value="">Select a theme...</option>
            {themes.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Subtheme Name</label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (!initialData) {
                setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
              }
            }}
            className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#C9A84C]"
            placeholder="e.g. Forest"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Slug</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#C9A84C]"
            placeholder="e.g. forest"
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-[#1a1208] text-white rounded-md hover:bg-[#1a1208]/90 transition-colors disabled:opacity-70"
          >
            {isSubmitting ? "Saving..." : "Save Subtheme"}
          </button>
        </div>
      </form>
    </div>
  );
}
