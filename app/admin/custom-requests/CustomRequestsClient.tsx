"use client";

import { useState } from "react";
import { Eye, X } from "lucide-react";

type RequestType = {
  id: string;
  name: string;
  phone: string;
  description: string;
  status: string;
  createdAt: Date;
};

export default function CustomRequestsClient({ requests }: { requests: RequestType[] }) {
  const [selectedRequest, setSelectedRequest] = useState<RequestType | null>(null);

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
                <th className="p-4">Date</th>
                <th className="p-4">Name</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Message Preview</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    No custom requests found.
                  </td>
                </tr>
              ) : (
                requests.map((request) => (
                  <tr key={request.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="p-4 text-gray-500">{new Date(request.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 font-medium text-gray-900">{request.name}</td>
                    <td className="p-4 text-gray-500">{request.phone}</td>
                    <td className="p-4 truncate max-w-[200px]">{request.description}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${request.status === "NEW" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => setSelectedRequest(request)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors inline-block"
                        title="View Full Request"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Request Details</h2>
              <button 
                onClick={() => setSelectedRequest(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Customer Name</p>
                  <p className="font-medium text-gray-900">{selectedRequest.name}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Date Submitted</p>
                  <p className="font-medium text-gray-900">{new Date(selectedRequest.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Phone / WhatsApp</p>
                  <a href={`https://wa.me/${selectedRequest.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">
                    {selectedRequest.phone}
                  </a>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Status</p>
                  <span className={`px-2 py-1 text-xs rounded-full inline-block ${selectedRequest.status === "NEW" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}>
                    {selectedRequest.status}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Full Message Description</p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {selectedRequest.description}
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 sticky bottom-0">
              <button 
                onClick={() => setSelectedRequest(null)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 bg-gray-100 rounded-lg transition-colors"
              >
                Close
              </button>
              <a 
                href={`https://wa.me/${selectedRequest.phone.replace(/[^0-9]/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-medium text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-lg transition-colors shadow-sm"
              >
                Reply on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
