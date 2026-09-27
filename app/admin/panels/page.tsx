import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";
import { deletePanelAction } from "@/app/actions/admin.actions";

export default async function AdminPanelsPage() {
  const panels = await prisma.panel.findMany({
    include: {
      _count: {
        select: { products: true }
      }
    },
    orderBy: { count: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Panels</h1>
        <Link
          href="/admin/panels/new"
          className="flex items-center gap-2 bg-[#1a1208] text-white px-4 py-2 rounded-md hover:bg-[#1a1208]/90 transition-colors"
        >
          <Plus size={16} /> Add Panel
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
                <th className="p-4">Name</th>
                <th className="p-4">Pieces Count</th>
                <th className="p-4">Products Count</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {panels.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    No panels found. Add one to get started.
                  </td>
                </tr>
              ) : (
                panels.map((panel) => (
                  <tr key={panel.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">{panel.name}</td>
                    <td className="p-4 text-gray-500">{panel.count}</td>
                    <td className="p-4">{panel._count.products}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/panels/${panel.id}/edit`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        >
                          <Edit size={16} />
                        </Link>
                        <DeleteButton id={panel.id} action={deletePanelAction} />
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
