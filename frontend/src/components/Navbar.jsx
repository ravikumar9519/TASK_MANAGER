import { useState, useRef, useEffect } from "react"
import { Settings, ChevronDown, LogOut, Zap } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Navbar = ({ user = {}, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const menuRef = useRef(null)

  const handleMenuToggle = () => setMenuOpen((prev) => !prev)
  const handleLogout = () => {
    setMenuOpen(false)
    onLogout()
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500 text-white shadow-md backdrop-blur-md border-b border-purple-200">
      <div className="flex items-center justify-between px-4 py-3 md:px-6 max-w-7xl mx-auto">
        {/* Logo + Brand */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="relative w-11 h-11 flex items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm shadow-lg group-hover:scale-105 transition-transform duration-300">
            <Zap className="w-6 h-6 text-yellow-300" />
            <div className="absolute -bottom-1 w-3 h-3 bg-yellow-300 rounded-full animate-ping" />
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-yellow-300 via-white to-lime-300 bg-clip-text text-transparent tracking-wide drop-shadow-md">
            TASK_MANAGER
          </span>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <button
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition duration-300"
            onClick={() => navigate("/profile")}
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>

          <div ref={menuRef} className="relative">
            <button
              onClick={handleMenuToggle}
              className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/10 transition duration-300"
            >
              <div className="relative">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    className="w-9 h-9 rounded-full object-cover shadow-sm border-2 border-white"
                  />
                ) : (
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 text-white font-bold shadow-sm">
                    {user.name?.[0]?.toUpperCase() || "U"}
                  </div>
                )}
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
              </div>

              <div className="text-left hidden md:block">
                <p className="text-sm font-semibold text-white">{user.name || "Guest User"}</p>
                <p className="text-xs text-purple-100">{user.email || "user@TASK_MANAGER.com"}</p>
              </div>

              <ChevronDown
                className={`w-4 h-4 text-white transition-transform duration-300 ${
                  menuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {menuOpen && (
              <ul className="absolute top-14 right-0 w-60 bg-white text-gray-700 rounded-xl shadow-2xl border border-purple-100 z-50 overflow-hidden animate-fadeIn">
                <li className="p-2">
                  <button
                    onClick={() => {
                      setMenuOpen(false)
                      navigate("/profile")
                    }}
                    className="w-full px-4 py-2.5 text-left hover:bg-purple-50 text-sm transition-colors flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4 text-purple-600" />
                    Profile Settings
                  </button>
                </li>
                <li className="p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2.5 text-left hover:bg-red-100 text-sm text-red-600 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
