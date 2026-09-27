"use client";

import { useState } from "react";
import { updateSettingsAction } from "@/app/actions/admin.actions";
import { Save } from "lucide-react";

export default function SettingsForm({ initialSettings }: { initialSettings: Record<string, string> }) {
  const [whatsapp, setWhatsapp] = useState(initialSettings.whatsappNumber || "");
  const [email, setEmail] = useState(initialSettings.contactEmail || "");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ text: "", type: "" });

    try {
      // Update both settings sequentially
      await updateSettingsAction("whatsappNumber", whatsapp);
      await updateSettingsAction("contactEmail", email);
      
      setMessage({ text: "Settings saved successfully", type: "success" });
    } catch (error) {
      setMessage({ text: "Failed to save settings", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      
      {message.text && (
        <div className={`p-4 rounded-md text-sm ${
          message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
        }`}>
          {message.text}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            WhatsApp Number
          </label>
          <input
            type="text"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="+94770697626"
            className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#C9A84C]"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Used for the WhatsApp order confirmation button. Include country code (e.g. +94).
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="hello@vinsithiwa.com"
            className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#C9A84C]"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Used for general inquiries and contact form submissions.
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <button
          type="submit"
          disabled={isSaving}
          className="bg-[#1a1208] text-white px-6 py-2.5 rounded-md font-medium hover:bg-[#1a1208]/90 transition-colors flex items-center gap-2"
        >
          {isSaving ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save size={18} />
          )}
          Save Settings
        </button>
      </div>
    </form>
  );
}
