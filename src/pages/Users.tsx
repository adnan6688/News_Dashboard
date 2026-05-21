import { useQuery } from "@tanstack/react-query"
import { getAllUsersApi, type TUser } from "../api/newsapi"
import image from './../assets/unknown.png'
import Pagination from "../Components/Pagination"
import { useEffect, useState } from "react"
const roles = ["All", "USER", "GUEST"];

export default function Users() {

  const [currentPage, setCurrentpage] = useState<number>(1)
  const [activeRole, setActiveRole] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { data: getUsers, isLoading: usersLoading } = useQuery({
    queryKey: ['get-users', currentPage, activeRole, debouncedSearch],
    queryFn: () => getAllUsersApi(10, currentPage, activeRole, debouncedSearch),
    retry: false,
    refetchOnWindowFocus: false,
  })

  console.log(getUsers?.data)

  useEffect(() => {
    const interval = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 1000);

    return () => clearTimeout(interval);
  }, [searchText]);

  // Helper to format date nicely
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };


  const onPrev = () => {
    setCurrentpage(currentPage - 1)
  }

  const onNext = () => {
    setCurrentpage(currentPage + 1)
  }



  return (
    <div>

      <div className="w-full p-4 sm:p-6 bg-sky-50 rounded-2xl border border-sky-100 ">


        <div className="flex flex-col gap-4 mb-6 lg:flex-row lg:items-center lg:justify-between">

          {/* Left Content */}
          <div className="w-full">
            <h2 className="text-lg sm:text-xl font-bold bg-linear-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              User Analytics Dashboard
            </h2>

            <p className="text-xs sm:text-sm text-blue-950/70 font-medium mt-1">
              Manage users and track their engagement metrics.
            </p>
          </div>

          {/* Right Controls */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto lg:items-center">

            {/* Search Box */}
            <div className="relative w-full sm:w-65 md:w-75">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>

              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-white text-slate-800 placeholder-slate-400 rounded-xl border border-slate-200 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 transition-all"
              />
            </div>

            {/* Role Filter */}
            <div className="flex items-center p-1 bg-slate-200/60 rounded-xl border border-slate-200/40 gap-1 overflow-x-auto scrollbar-hide">

              {roles?.map((role) => (
                <button
                  key={role}
                  onClick={() => setActiveRole(role)}
                  className={`shrink-0 px-3 py-1.5 rounded-lg transition-all text-sm font-medium whitespace-nowrap

          ${activeRole === role
                      ? "bg-white text-cyan-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                    }

          `}
                >
                  {role}
                </button>
              ))}

            </div>
          </div>
        </div>


        <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-200 bg-white ">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 uppercase text-slate-500 text-[14px] font-semibold tracking-wider">
                <th className="py-4 px-6">User</th>
                <th className="py-4 px-6">Role</th>
                <th className="py-4 px-6">Birth Date</th>
                <th className="py-4 px-6 text-center">Clicks</th>
                <th className="py-4 px-6 text-center">Impressions</th>
                <th className="py-4 px-6 text-center">Total</th>
                <th className="py-4 px-6 text-center">Installs / Uninstalls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {usersLoading ? <tr>
                <td colSpan={10} className="py-10 text-center">
                  <h1 className="text-lg font-semibold text-slate-500">
                    Searching........
                  </h1>
                </td>
              </tr> : !getUsers?.data?.length ? <tr>
                <td colSpan={10} className="py-10 text-center">
                  <h1 className="text-lg font-semibold text-slate-500">
                    No users found 😕
                  </h1>

                  <p className="text-sm text-slate-400 mt-1">
                    Try searching with another keyword.
                  </p>
                </td>
              </tr> : getUsers?.data?.map((user: TUser) => (
                <tr key={user._id} className="hover:bg-slate-50/50 transition-colors duration-200">
                  {/* Profile Pic, Name, Email */}
                  <td className="py-4 px-6 flex items-center gap-3">
                    <img
                      src={user.image || image}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-cyan-500/10"
                    />
                    <div>
                      <div className="font-semibold text-slate-800">{user.name}</div>
                      <div className="text-[14px] text-slate-500">{user.email}</div>
                    </div>
                  </td>

                  {/* Role Badge */}
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 text-[14px] font-medium rounded-md bg-cyan-50 text-cyan-700 border border-cyan-200/50">
                      {user.role}
                    </span>
                  </td>

                  {/* Birth Date */}
                  <td className="py-4 px-6 text-slate-600">
                    {formatDate ? formatDate(user.birth_date) : user.birth_date}
                  </td>

                  {/* Metrics */}
                  <td className="py-4 px-6 text-center font-medium text-slate-600">{user.clicks}</td>
                  <td className="py-4 px-6 text-center font-medium text-slate-600">{user.impressions}</td>
                  <td className="py-4 px-6 text-center font-bold text-blue-600">{user.total}</td>

                  {/* Installs / Uninstalls Grid */}
                  <td className="py-4 px-6">
                    <div className="flex justify-center gap-4 text-[14px] font-mono">
                      <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">↓ {user.installCount}</span>
                      <span className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">↑ {user.uninstallCount}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- Mobile View (Cards) --- */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {usersLoading ? <div className="flex justify-center items-center p-4">

            <h1>Loading....</h1>
          </div> : !getUsers?.data?.length ? <div className="py-10 text-center">
            <h1 className="text-lg font-semibold text-slate-500">
              No users found 😕
            </h1>

            <p className="text-sm text-slate-400 mt-1">
              Try searching with another keyword.
            </p>
          </div> :
            getUsers?.data?.map((user: TUser) => (
              <div key={user._id} className="bg-white p-5 rounded-xl border border-slate-200  flex flex-col gap-4">
                {/* Top Row: Info & Role */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.image || image}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-cyan-500/10"
                    />
                    <div>
                      <div className="font-semibold text-slate-800 text-base">{user.name}</div>
                      <div className="text-sm text-slate-500">{user.role == 'USER' ? user.email : ""}</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-[14px] font-medium rounded-md bg-cyan-50 text-cyan-700 border border-cyan-200/50">
                    {user.role}
                  </span>
                </div>

                <hr className="border-slate-100" />

                {/* Quick Details */}
                <div className="grid grid-cols-2 gap-3 text-[14px] sm:text-sm">
                  <div>
                    <span className="block text-slate-400 font-medium mb-0.5">Birth Date</span>
                    <span className="text-slate-600 font-medium">{formatDate ? formatDate(user.birth_date) : user.birth_date}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 font-medium mb-0.5">Total Score</span>
                    <span className="text-blue-600 font-bold">{user.total}</span>
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="grid grid-cols-4 gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100 text-center text-[14px]">
                  <div>
                    <div className="text-slate-500 font-medium">Clicks</div>
                    <div className="text-slate-800 font-bold mt-0.5">{user.clicks}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 font-medium">Impr.</div>
                    <div className="text-slate-800 font-bold mt-0.5">{user.impressions}</div>
                  </div>
                  <div>
                    <div className="text-emerald-600 font-medium">Installs</div>
                    <div className="text-emerald-600 font-bold mt-0.5">↓ {user.installCount}</div>
                  </div>
                  <div>
                    <div className="text-rose-600 font-medium">Uninst.</div>
                    <div className="text-rose-600 font-bold mt-0.5">↑ {user.uninstallCount}</div>
                  </div>
                </div>
              </div>
            ))}
        </div>



        <Pagination currentPage={currentPage} onNext={onNext} onPrev={onPrev} totalPages={getUsers?.meta?.totalpage}></Pagination>

      </div>
    </div>
  )
}
