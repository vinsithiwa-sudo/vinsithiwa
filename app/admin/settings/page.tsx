import prisma from "@/lib/prisma";
import SettingsForm from "./SettingsForm";

export default async function AdminSettingsPage() {
  const settingsRecords = await prisma.setting.findMany();
  
  // Convert array of key/value pairs to an object
  const settings = settingsRecords.reduce((acc: Record<string, string>, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {});

  // Default values
  if (!settings.whatsappNumber) settings.whatsappNumber = "+94770697626";
  if (!settings.contactEmail) settings.contactEmail = "hello@vinsithiwa.com";

  return (
    <div className="max-w-3xl mx-auto pb-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Site Settings</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        <SettingsForm initialSettings={settings} />
      </div>
    </div>
  );
}
