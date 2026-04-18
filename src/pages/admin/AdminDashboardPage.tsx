import { DollarSign, ShoppingCart, Package, AlertTriangle, TrendingUp } from 'lucide-react';
import { sampleOrders, sampleProducts } from '@/data/products';
import { getStatusColor } from '@/lib/helpers';

const AdminDashboardPage = () => {
  const totalSales = sampleOrders.reduce((s, o) => s + o.totalPrice, 0);
  const orderCount = sampleOrders.length;
  const lowStock = sampleProducts.filter(p => p.stock < 15);

  const stats = [
    { label: 'Total Sales', value: `$${totalSales.toFixed(2)}`, icon: DollarSign, color: 'text-success' },
    { label: 'Orders', value: orderCount, icon: ShoppingCart, color: 'text-blue-500' },
    { label: 'Products', value: sampleProducts.length, icon: Package, color: 'text-purple-500' },
    { label: 'Low Stock', value: lowStock.length, icon: AlertTriangle, color: 'text-warning' },
  ];

  return (
    <div>
      <h1 className="text-xl font-medium mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className="bg-background border border-border p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground tracking-wider uppercase">{s.label}</span>
              <s.icon className={`w-4 h-4 ${s.color}`} />
            </div>
            <p className="text-2xl font-semibold">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-background border border-border p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-sm font-medium">Recent Orders</h2>
          </div>
          <div className="space-y-3">
            {sampleOrders.slice(0, 5).map(order => (
              <div key={order.id} className="flex items-center justify-between text-sm border-b border-border pb-3 last:border-0">
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-xs text-muted-foreground">{order.customerName}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${order.totalPrice.toFixed(2)}</p>
                  <span className={`text-[10px] px-2 py-0.5 tracking-wider uppercase ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-background border border-border p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-warning" />
            <h2 className="text-sm font-medium">Low Stock Alerts</h2>
          </div>
          {lowStock.length > 0 ? (
            <div className="space-y-3">
              {lowStock.map(p => (
                <div key={p.id} className="flex items-center justify-between text-sm border-b border-border pb-3 last:border-0">
                  <div className="flex items-center gap-3">
                    <img src={p.images[0]} alt={p.name} className="w-10 h-12 object-cover bg-muted" />
                    <span className="font-medium">{p.name}</span>
                  </div>
                  <span className="text-warning font-medium">{p.stock} left</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">All products are well-stocked.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
