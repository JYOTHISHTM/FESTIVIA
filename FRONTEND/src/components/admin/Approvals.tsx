"use client";

import { useEffect, useState } from "react";
import { ClipboardCheck, CheckCircle, XCircle } from "lucide-react";
import { getPendingCreators,approveCreator,rejectCreator} from "../../services/admin/adminService"


import Navbar from "../layout/admin/SideBar";

interface Creator {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  status: "pending" | "approved" | "rejected";
}

export default function ApprovalsPage() {
  const [pendingCreators, setPendingCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    const fetchPending = async () => {
      try {
        const data = await getPendingCreators();
        setPendingCreators(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPending();
  }, []);

 const handleApprove = async (creatorId: string) => {
    try {
      const data = await approveCreator(creatorId);
      console.log(data.message);
      setPendingCreators(pendingCreators.filter(c => c._id !== creatorId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (creatorId: string) => {
    const reason = prompt("Please enter the rejection reason:");
    if (!reason) {
      alert("Rejection reason is required.");
      return;
    }

    try {
      const data = await rejectCreator(creatorId, reason);
      console.log(data.message);
      setPendingCreators(pendingCreators.filter(c => c._id !== creatorId));
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <Navbar />
      <div className="w-3xl">
        {/* Page Header */}
        <div className="flex items-center mb-7">
          <ClipboardCheck className="h-8 w-8 text-green-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Pending Creator Approvals</h1>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="text-center p-8">Loading...</div>
          ) : pendingCreators.length === 0 ? (
            <div className="text-center p-8 text-gray-500">No pending approvals.</div>
          ) : (
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-black text-white uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 text-left">Name</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Registration Date</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingCreators.map((creator) => (
                  <tr key={creator._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{creator.name}</td>
                    <td className="px-6 py-4">{creator.email}</td>
                    <td className="px-6 py-4">{new Date(creator.createdAt).toDateString()}</td>
                    <td className="px-6 py-4 flex items-center justify-center space-x-3">
                      <button
                        className="flex items-center px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md text-xs"
                        onClick={() => handleApprove(creator._id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </button>
                      <button
                        className="flex items-center px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-xs"
                        onClick={() => handleReject(creator._id)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}