import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../layout/creator/SideBar';

interface Subscription {
  name: string;
  price: number;
  duration: number;
  features: string[];
  subscribedAt: string;
  endDate: string;
  paymentMethod: string;
  status: string;
}





export default function SubscriptionHistory() {
  const [history, setHistory] = useState<Subscription[]>([]);
  const [fullHistory, setFullHistory] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = localStorage.getItem('creatorToken');
  const creator = JSON.parse(localStorage.getItem('creator') || '{}');

  useEffect(() => {
    if (!token || !creator?.id) return;

    axios
      .get(`https://festivia-api.jothish.online/creator/subscription-history?creatorId=${creator.id}&all=true`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setFullHistory(res.data.history || []))
      .catch((err) => console.error('Failed to fetch full history', err));
  }, []);

  useEffect(() => {
    if (!token || !creator?.id) {
      setIsLoading(false);
      return;
    }

    axios
      .get(`https://festivia-api.jothish.online/creator/subscription-history?page=${page}&creatorId=${creator.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        setHistory(res.data.history || []);
        setTotalPages(res.data.totalPages || 1);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error:', err);
        setIsLoading(false);
      });
  }, [page]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    const statusClasses: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800',
      expired: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800',
    };

    return statusClasses[status.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  const isActive = (subscribedAt: string, endDate: string) => {
    const now = new Date();
    return now >= new Date(subscribedAt) && now <= new Date(endDate);
  };

  // const activeSubscriptions = history.filter(sub =>
  //   isActive(sub.subscribedAt, sub.endDate)
  // );

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Subscription History</h1>
          </header>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <h2 className="text-gray-500 text-sm font-medium mb-1">Total Subscriptions</h2>
                  <p className="text-3xl font-bold text-gray-800">{fullHistory.length}</p>
                  <p className="mt-2 text-sm text-gray-500">All-time purchases</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <h2 className="text-gray-500 text-sm font-medium mb-1">Active Subscriptions</h2>
                  <p className="text-3xl font-bold text-green-600">
                    {fullHistory.filter((sub) => isActive(sub.subscribedAt, sub.endDate)).length}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">Currently valid</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <h2 className="text-gray-500 text-sm font-medium mb-1">Total Spent</h2>
                  <p className="text-3xl font-bold text-gray-800">
                    ₹{fullHistory.reduce((sum, sub) => sum + sub.price, 0).toLocaleString()}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">Lifetime value</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-800">Subscription Details</h2>
                </div>

                <div className="overflow-x-auto">
                  {history.length > 0 ? (
                    <>
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">End Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {history.map((sub, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4">{sub.name}</td>
                              <td className="px-6 py-4">₹{sub.price.toLocaleString()}</td>
                              <td className="px-6 py-4">{sub.duration} days</td>
                              <td className="px-6 py-4">{formatDate(sub.subscribedAt)}</td>
                              <td className="px-6 py-4">{formatDate(sub.endDate)}</td>
                              <td className="px-6 py-4 capitalize">{sub.paymentMethod}</td>
                              <td className="px-6 py-4">
                                <span
                                  className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusBadge(sub.status)}`}
                                >
                                  {sub.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>


                    </>
                  ) : (
                    <div className="text-center py-12">
                      <div className="mx-auto h-16 w-16 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No subscriptions found</h3>
                      <p className="mt-1 text-sm text-gray-500">You haven't purchased any subscriptions yet.</p>
                    </div>
                  )}

                </div>

              </div>
            </>

          )}
          <div className="flex justify-center mt-6">
            <div className="inline-flex space-x-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${page === 1
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
              >
                Previous
              </button>

              <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${page === totalPages
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
