import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Tag, Star, LogOut } from 'lucide-react';
import { useEffect } from 'react';

const navItems = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Products', path: '/admin/products', icon: Package },
  { label: 'Orders', path: '/admin/orders', icon: ShoppingCart },
  { label: 'Coupons', path: '/admin/coupons', icon: Tag },
  { label: 'Reviews', path: '/admin/reviews', icon: Star },
];

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('admin_demo') !== 'true') {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_demo');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen flex bg-muted">
      <aside className="w-60 bg-background border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <Link to="/" className="font-heading text-lg font-semibold tracking-wider uppercase">Brand Store</Link>
          <p className="text-[10px] text-muted-foreground tracking-widest uppercase mt-0.5">Admin</p>
        </div>
        <nav className="flex-1 py-4 space-y-1 px-2">
          {navItems.map(item => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`admin-sidebar-link ${active ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border">
          <button onClick={handleLogout} className="admin-sidebar-link text-muted-foreground hover:text-foreground w-full">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
