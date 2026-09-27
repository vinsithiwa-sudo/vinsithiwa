"use client";

import { useState } from "react";
import { submitCustomRequest } from "@/app/actions/public.actions";
import { Send, CheckCircle } from "lucide-react";

export default function CustomOrderForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; message?: string }>({ type: "idle" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "idle" });
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      whatsapp: formData.get("whatsapp") as string,
      spaceType: formData.get("spaceType") as string,
      budget: formData.get("budget") as string,
      description: formData.get("description") as string,
    };

    const result = await submitCustomRequest(data);
    
    if (result.error) {
      setStatus({ type: "error", message: result.error });
    } else {
      setStatus({ type: "success" });
      (e.target as HTMLFormElement).reset();
    }
    
    setIsSubmitting(false);
  };

  if (status.type === "success") {
    return (
      <div className="bg-green-50 text-green-800 p-10 rounded-2xl text-center border border-green-100 flex flex-col items-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={32} />
        </div>
        <h3 className="text-2xl font-bold mb-3">Request Received!</h3>
        <p className="max-w-md text-green-700 leading-relaxed mb-8">
          Thank you for trusting us with your custom art vision. One of our design consultants will review your request and contact you via WhatsApp within 24 hours.
        </p>
        <button 
          onClick={() => setStatus({ type: "idle" })}
          className="bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {status.type === "error" && (
        <div className="p-4 bg-red-50 text-red-700 rounded-md border border-red-100 text-sm">
          {status.message}
        </div>
      )}

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        <h3 className="text-xl font-semibold text-obsidian border-b pb-4">Personal Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-obsidian">Full Name *</label>
            <input 
              name="name" required
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A84C] transition-colors"
              placeholder="Your name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-obsidian">Phone Number *</label>
            <input 
              name="phone" required
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A84C] transition-colors"
              placeholder="077 123 4567"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-obsidian">WhatsApp Number (if different)</label>
            <input 
              name="whatsapp"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A84C] transition-colors"
              placeholder="077 123 4567"
            />
            <p className="text-xs text-gray-500 mt-1">We will use this to send you quotes and previews.</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        <h3 className="text-xl font-semibold text-obsidian border-b pb-4">Project Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-obsidian">Type of Space</label>
            <select name="spaceType" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A84C] transition-colors">
              <option value="">Select space...</option>
              <option value="Living Room">Living Room</option>
              <option value="Bedroom">Bedroom</option>
              <option value="Office">Office / Workspace</option>
              <option value="Hotel/Restaurant">Hotel / Restaurant</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-obsidian">Approximate Budget</label>
            <select name="budget" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A84C] transition-colors">
              <option value="">Select budget range...</option>
              <option value="Under 25,000 LKR">Under 25,000 LKR</option>
              <option value="25,000 - 50,000 LKR">25,000 - 50,000 LKR</option>
              <option value="50,000 - 100,000 LKR">50,000 - 100,000 LKR</option>
              <option value="100,000+ LKR">100,000+ LKR</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-obsidian">Describe your vision *</label>
          <textarea 
            name="description" required rows={6}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A84C] transition-colors resize-none"
            placeholder="Tell us about the colors, style, themes, and dimensions you have in mind..."
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#1a1208] text-[#C9A84C] py-5 rounded-md font-bold text-lg hover:bg-black transition-colors disabled:opacity-70 flex items-center justify-center gap-3 shadow-xl"
      >
        {isSubmitting ? (
          <div className="w-6 h-6 border-2 border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin" />
        ) : (
          <>
            Request Consultation <Send size={20} />
          </>
        )}
      </button>
    </form>
  );
}
