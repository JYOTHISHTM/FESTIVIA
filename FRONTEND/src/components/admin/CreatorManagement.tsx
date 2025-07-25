import { useEffect, useState } from "react";
import { Users, Search, AlertCircle } from "lucide-react";
import Sidebar from "../../components/layout/admin/SideBar";
import Swal from "sweetalert2";
import { getCreators, toggleCreatorBlockStatus } from "../../services/admin/adminService";
import { debounce } from "lodash";

interface Creator {
  _id: string;
  name: string;
  email: string;
  isBlocked: boolean;
}

const CreatorsManagement = () => {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  // useEffect(() => {
  //   fetchCreators();
  // }, []);

  // const fetchCreators = async () => {
  //   try {
  //     const data = await getCreators();
  //     setCreators(data);
  //   } catch (err) {
  //     console.error("Failed to fetch creators.");
  //   }
  // };

  // Inside component
useEffect(() => {
  fetchCreators(searchTerm);
}, [searchTerm]);

const fetchCreators = debounce(async (term: string) => {
  try {
    const res = await getCreators(term); // send search term to backend
    setCreators(res);
  } catch (err) {
    console.error("Failed to fetch creators.");
  }
}, 500); // 500ms debounce

  const toggleBlockCreator = async (creatorId: string, isBlocked: boolean) => {
    const action = isBlocked ? "Unblock" : "Block";

    const confirm = await Swal.fire({
      title: `Are you sure you want to ${action} this creator?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: isBlocked ? "#3085d6" : "#d33",
      cancelButtonColor: "#555",
      confirmButtonText: `Yes, ${action}`,
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await toggleCreatorBlockStatus(creatorId);
      setCreators(creators.map(creator => (creator._id === creatorId ? { ...creator, isBlocked: !creator.isBlocked } : creator)));

      Swal.fire({
        title: res.message,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire("Error", "Failed to update creator status.", "error");
    }
  };

  const filteredCreators = creators.filter(creator =>
    creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    creator.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredCreators.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCreators = filteredCreators.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1); 
  }, [searchTerm]);

  const Pagination = () => (
    <div className="flex justify-center mt-6 space-x-2">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(prev => prev - 1)}
        className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
      >
        Previous
      </button>
      {[...Array(totalPages)].map((_, idx) => {
        const page = idx + 1;
        return (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded ${currentPage === page ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
          >
            {page}
          </button>
        );
      })}
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(prev => prev + 1)}
        className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-200">
      <Sidebar />
      <div className="flex-1 p-4 lg:p-8 mt-30">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <Users className="h-8 w-8 text-indigo-600 mr-3" />
                <h1 className="text-2xl font-bold text-gray-900">Creators Management</h1>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search creators..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-full sm:w-auto"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Creators Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Email
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedCreators.length > 0 ? (
                    paginatedCreators.map((creator) => (
                      <tr key={creator._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{creator.name}</div>
                          <div className="text-sm text-gray-500 md:hidden">{creator.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                          <div className="text-sm text-gray-900">{creator.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                            ${creator.isBlocked 
                              ? "bg-red-100 text-red-800" 
                              : "bg-green-100 text-green-800"
                            }`}>
                            {creator.isBlocked ? "Blocked" : "Active"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button
                            onClick={() => toggleBlockCreator(creator._id, creator.isBlocked)}
                            className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white
                              ${creator.isBlocked
                                ? "bg-indigo-600 hover:bg-indigo-700"
                                : "bg-red-600 hover:bg-red-700"
                              } transition-colors duration-150`}
                          >
                            {creator.isBlocked ? "Unblock" : "Block"}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <AlertCircle className="h-12 w-12 mb-4" />
                          <p className="text-lg font-medium">No creators found</p>
                          <p className="text-sm">Try adjusting your search criteria</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {totalPages > 1 && <Pagination />}
        </div>
      </div>
    </div>
  );
};

export default CreatorsManagement;
