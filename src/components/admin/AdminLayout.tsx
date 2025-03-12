
import React, { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { 
  LayoutDashboard, Package, Settings, LogOut, Menu, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { adminEmail, logout } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/spe43al-adm1n-p4nel/dashboard', 
      icon: LayoutDashboard,
      current: location.pathname === '/spe43al-adm1n-p4nel/dashboard' 
    },
    { 
      name: 'Zamówienia', 
      href: '/spe43al-adm1n-p4nel/orders', 
      icon: Package,
      current: location.pathname === '/spe43al-adm1n-p4nel/orders' 
    },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/spe43al-adm1n-p4nel');
  };

  return (
    <div className="min-h-screen bg-background">
      <div 
        className={cn(
          "fixed inset-0 bg-background/80 z-30 lg:hidden backdrop-blur-sm",
          sidebarOpen ? "block" : "hidden"
        )}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transition-transform duration-300 ease-in-out transform bg-sidebar",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/d54cd97a-3024-4d2f-87fd-23769403237c.png" 
              alt="Secret Sparks Logo" 
              className="h-8"
            />
            <span className="ml-2 font-semibold text-lg text-sidebar-foreground">Admin Panel</span>
          </div>
          <button
            type="button"
            className="lg:hidden text-sidebar-foreground"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                  item.current 
                    ? "bg-sidebar-accent text-sidebar-primary" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon className={cn(
                  "mr-3 h-5 w-5",
                  item.current ? "text-sidebar-primary" : "text-sidebar-foreground"
                )} />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-sidebar-border">
            <div className="mb-2 text-xs text-sidebar-foreground/70">
              Zalogowany jako:
            </div>
            <div className="flex items-center justify-between">
              <div className="truncate text-sm font-medium text-sidebar-foreground">
                {adminEmail}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent/50"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <div className="flex h-16 items-center px-4 border-b border-border bg-card lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="mr-4 text-foreground"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Otwórz menu</span>
          </button>

          <img 
            src="/lovable-uploads/d54cd97a-3024-4d2f-87fd-23769403237c.png" 
            alt="Secret Sparks Logo" 
            className="h-8"
          />
          <span className="ml-2 font-semibold text-lg text-foreground">Admin Panel</span>
        </div>

        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
