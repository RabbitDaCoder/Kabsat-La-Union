import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Bed,
  CalendarCheck,
  LogOut,
  Menu,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/store";

const navItems = [
  { href: "/owner", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/owner/rooms", icon: Bed, label: "Rooms" },
  { href: "/owner/bookings", icon: CalendarCheck, label: "Bookings" },
];

/**
 * Navigation content for sidebar
 */
function NavContent({ pathname, onNavClick, onLogout }) {
  const isActive = (path) => {
    if (path === "/owner") {
      return pathname === "/owner";
    }
    return pathname.startsWith(path);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6">
        <Link to="/owner" className="flex items-center gap-2">
          <img src="/logo.png" alt="Kabsat La Union" className="h-8 w-auto" />
          <span className="font-serif text-xl tracking-[0.1em] text-ocean-950">
            KABSAT
          </span>
        </Link>
        <p className="text-xs text-ocean-500 mt-1 uppercase tracking-wider">
          Owner Portal
        </p>
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={onNavClick}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(item.href)
                  ? "bg-ocean-100 text-ocean-950"
                  : "text-ocean-600 hover:bg-ocean-50 hover:text-ocean-950"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <Separator />

      {/* Bottom Actions */}
      <div className="p-4 space-y-2">
        <Link
          to="/"
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-ocean-600 hover:bg-ocean-50 hover:text-ocean-950 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="text-sm font-medium">Back to Site</span>
        </Link>
        <button
          onClick={onLogout}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-ocean-600 hover:bg-red-50 hover:text-red-600 transition-colors w-full"
        >
          <LogOut className="h-5 w-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}

/**
 * Owner dashboard layout with sidebar navigation
 */
export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/owner/login");
  };

  const handleNavClick = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-ocean-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-white border-r border-ocean-200">
        <NavContent
          pathname={location.pathname}
          onNavClick={handleNavClick}
          onLogout={handleLogout}
        />
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-ocean-200">
        <div className="flex items-center justify-between px-4 h-16">
          <Link
            to="/owner"
            className="font-serif text-xl tracking-[0.1em] text-ocean-950"
          >
            KABSAT
          </Link>
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <SheetHeader className="sr-only">
                <SheetTitle>Owner Navigation</SheetTitle>
              </SheetHeader>
              <NavContent
                pathname={location.pathname}
                onNavClick={handleNavClick}
                onLogout={handleLogout}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main Content */}
      <main className="lg:pl-64">
        <div className="pt-16 lg:pt-0 min-h-screen">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
