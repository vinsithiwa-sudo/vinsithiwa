import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";

export default async function AdminThemesPage() {
  const themes = await prisma.theme.findMany({
    include: {
      subthemes: true,
      _count: {
        select: { products: true }
      }
    },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Themes</h1>
        <Link
          href="/admin/themes/new"
          className="flex items-center gap-2 bg-[#1a1208] text-white px-4 py-2 rounded-md hover:bg-[#1a1208]/90 transition-colors"
        >
          <Plus size={16} /> Add Theme
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
                <th className="p-4">Name</th>
                <th className="p-4">Slug</th>
                <th className="p-4">Subthemes Count</th>
                <th className="p-4">Products Count</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {themes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No themes found. Add one to get started.
                  </td>
                </tr>
              ) : (
                themes.map((theme) => (
                  <tr key={theme.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">{theme.name}</td>
                    <td className="p-4 text-gray-500">{theme.slug}</td>
                    <td className="p-4">{theme.subthemes.length}</td>
                    <td className="p-4">{theme._count.products}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/themes/${theme.id}/edit`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        >
                          <Edit size={16} />
                        </Link>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
