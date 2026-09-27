"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductFormValues } from "@/lib/validations";
import { useRouter } from "next/navigation";
import { createProductAction, updateProductAction } from "@/app/actions/admin.actions";
import { Plus, Trash2, ArrowLeft, Upload, X } from "lucide-react";
import Link from "next/link";
import ImageUploader from "./ImageUploader";
import { Theme, Subtheme, Space, Panel } from "@/prisma/generated/client";
import { SIZE_CHART_LABELS, SIZE_CHARTS } from "@/lib/size-charts";
import Image from "next/image";

interface ProductFormProps {
  initialData?: any;
  themes: (Theme & { subthemes: Subtheme[] })[];
  spaces: Space[];
  panels: Panel[];
}

export default function ProductForm({ initialData, themes, spaces, panels }: ProductFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>(
    initialData?.images?.map((img: any) => img.url) || []
  );
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: initialData ? {
      title: initialData.title,
      slug: initialData.slug,
      designNumber: initialData.designNumber || "",
      description: initialData.description,
      basePrice: Number(initialData.basePrice),
      mainImage: initialData.mainImage,
      themeId: initialData.themeId || undefined,
      subthemeId: initialData.subthemeId || undefined,
      spaceId: initialData.spaceId || undefined,
      panelId: initialData.panelId || undefined,
      sizeChartTemplate: initialData.sizeChartTemplate || undefined,
      isAvailable: initialData.isAvailable,
      isFeatured: initialData.isFeatured,
      tags: initialData.tags || [],
      sizes: initialData.sizes?.map((s: any) => ({ label: s.label, price: Number(s.price) })) || [],
      frames: initialData.frames?.map((f: any) => ({ label: f.label, price: Number(f.price) })) || [],
      additionalImages: initialData.images?.map((img: any) => img.url) || [],
    } : {
      title: "",
      slug: "",
      designNumber: "",
      description: "",
      basePrice: 0,
      mainImage: "",
      isAvailable: true,
      isFeatured: false,
      tags: [],
      sizes: [],
      frames: [],
      additionalImages: [],
      sizeChartTemplate: "",
    },
  });

  const watchThemeId = useWatch({ control: form.control, name: "themeId" });
  const selectedTheme = themes.find(t => t.id === watchThemeId);


  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setError("");
    // Sync gallery state into form values before submitting
    const payload = { ...data, additionalImages: galleryImages };

    try {
      const result = initialData 
        ? await updateProductAction(initialData.id, payload)
        : await createProductAction(payload);
        
      if (result.error) {
        setError(result.error);
      } else {
        router.push("/admin/products");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setIsUploadingGallery(true);
    const uploaded: string[] = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
        const json = await res.json();
        if (json.url) uploaded.push(json.url);
      } catch {}
    }
    setGalleryImages((prev) => [...prev, ...uploaded]);
    setIsUploadingGallery(false);
    e.target.value = "";
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/products" className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          {initialData ? "Edit Product" : "New Product"}
        </h1>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Main Info */}
          <div className="space-y-6 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-semibold border-b pb-2">Basic Info</h2>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Title</label>
              <input
                {...form.register("title", {
                  onChange: (e) => {
                    if (!initialData) {
                      form.setValue(
                        "slug", 
                        e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""), 
                        { shouldValidate: true }
                      );
                    }
                  }
                })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent outline-none"
                placeholder="E.g. Misty Forest 3-Piece"
              />
              {form.formState.errors.title && (
                <p className="text-red-500 text-xs">{form.formState.errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Design Number (SKU)</label>
              <input
                {...form.register("designNumber")}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C9A84C] outline-none"
                placeholder="E.g. VIN-1001"
              />
              {form.formState.errors.designNumber && (
                <p className="text-red-500 text-xs">{form.formState.errors.designNumber.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Slug</label>
              <input
                {...form.register("slug")}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C9A84C] outline-none"
                placeholder="misty-forest-3-piece"
              />
              <p className="text-xs text-gray-500">URL friendly, lowercase, hyphens only.</p>
              {form.formState.errors.slug && (
                <p className="text-red-500 text-xs">{form.formState.errors.slug.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea
                {...form.register("description")}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C9A84C] outline-none"
              />
              {form.formState.errors.description && (
                <p className="text-red-500 text-xs">{form.formState.errors.description.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Base Price (LKR)</label>
              <input
                type="number"
                {...form.register("basePrice", { valueAsNumber: true })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C9A84C] outline-none"
              />
              {form.formState.errors.basePrice && (
                <p className="text-red-500 text-xs">{form.formState.errors.basePrice.message}</p>
              )}
            </div>

            <ImageUploader 
              label="Main Image" 
              value={form.watch("mainImage")} 
              onChange={(url) => form.setValue("mainImage", url, { shouldValidate: true })} 
            />
            {form.formState.errors.mainImage && (
              <p className="text-red-500 text-xs">{form.formState.errors.mainImage.message}</p>
            )}
          </div>

          {/* Taxonomy & Settings */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
              <h2 className="text-lg font-semibold border-b pb-2">Organization</h2>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Theme</label>
                <select 
                  {...form.register("themeId")}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C9A84C] outline-none"
                >
                  <option value="">None</option>
                  {themes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>

              {selectedTheme && selectedTheme.subthemes.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Subtheme</label>
                  <select 
                    {...form.register("subthemeId")}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C9A84C] outline-none"
                  >
                    <option value="">None</option>
                    {selectedTheme.subthemes.map(st => <option key={st.id} value={st.id}>{st.name}</option>)}
                  </select>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Space</label>
                <select 
                  {...form.register("spaceId")}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C9A84C] outline-none"
                >
                  <option value="">None</option>
                  {spaces.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Panel Type</label>
                <select 
                  {...form.register("panelId")}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C9A84C] outline-none"
                >
                  <option value="">None</option>
                  {panels.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Size Chart Template</label>
                <div className="flex flex-col gap-3">
                  <select 
                    {...form.register("sizeChartTemplate")}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C9A84C] outline-none"
                  >
                    <option value="">None</option>
                    {Object.entries(SIZE_CHART_LABELS).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                  {form.watch("sizeChartTemplate") && SIZE_CHARTS[form.watch("sizeChartTemplate") as string] && (
                    <div className="relative w-full aspect-[4/3] bg-gray-50 border border-gray-200 rounded-md overflow-hidden">
                      <Image
                        src={SIZE_CHARTS[form.watch("sizeChartTemplate") as string]}
                        alt="Size Chart Preview"
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold border-b pb-2">Status</h2>
              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" {...form.register("isAvailable")} className="w-4 h-4 text-[#C9A84C] focus:ring-[#C9A84C]" />
                  <span className="text-sm text-gray-700">Product is available for purchase</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" {...form.register("isFeatured")} className="w-4 h-4 text-[#C9A84C] focus:ring-[#C9A84C]" />
                  <span className="text-sm text-gray-700">Feature on homepage</span>
                </label>
              </div>
            </div>
          </div>
        </div>



        {/* Gallery Images */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <div>
              <h2 className="text-lg font-semibold">Gallery Images</h2>
              <p className="text-xs text-gray-500 mt-0.5">Additional images shown in the product detail page</p>
            </div>
            <label className="flex items-center gap-2 px-3 py-2 bg-[#1a1208] text-white text-sm rounded-md cursor-pointer hover:bg-[#1a1208]/80 transition-colors">
              {isUploadingGallery ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Upload size={16} />
              )}
              Add Images
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleGalleryUpload}
                disabled={isUploadingGallery}
              />
            </label>
          </div>

          {galleryImages.length === 0 ? (
            <p className="text-sm text-gray-500">No gallery images yet. Upload images above.</p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {galleryImages.map((url, index) => (
                <div key={index} className="relative group aspect-square">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-full object-cover rounded-md border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="absolute top-1 right-1 p-0.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                  <span className="absolute bottom-1 left-1 text-[10px] bg-black/60 text-white px-1 rounded">{index + 1}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-[#1a1208] text-white font-medium rounded-md hover:bg-[#1a1208]/90 transition-colors disabled:opacity-70 flex items-center gap-2"
          >
            {isSubmitting && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {initialData ? "Save Changes" : "Create Product"}
          </button>
        </div>

      </form>
    </div>
  );
}
