import { useState } from 'react';
import { sampleOrders } from '@/data/products';
import type { Order } from '@/data/products';
import { getStatusColor, formatPrice } from '@/lib/helpers';

const statuses: Order['status'][] = ['new', 'processing', 'shipped', 'delivered'];

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState(sampleOrders);

  const updateStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  return (
    <div>
      <h1 className="text-xl font-medium mb-6">Orders ({orders.length})</h1>
      <div className="bg-background border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="p-3 text-xs tracking-wider uppercase text-muted-foreground font-medium">Order ID</th>
              <th className="p-3 text-xs tracking-wider uppercase text-muted-foreground font-medium">Customer</th>
              <th className="p-3 text-xs tracking-wider uppercase text-muted-foreground font-medium">Total</th>
              <th className="p-3 text-xs tracking-wider uppercase text-muted-foreground font-medium">Status</th>
              <th className="p-3 text-xs tracking-wider uppercase text-muted-foreground font-medium">Date</th>
              <th className="p-3 text-xs tracking-wider uppercase text-muted-foreground font-medium">Update</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                <td className="p-3 font-medium">{o.id}</td>
                <td className="p-3">
                  <div>
                    <p>{o.customerName}</p>
                    <p className="text-xs text-muted-foreground">{o.phone}</p>
                  </div>
                </td>
                <td className="p-3 font-medium">{formatPrice(o.totalPrice)}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 text-[10px] tracking-wider uppercase font-medium ${getStatusColor(o.status)}`}>{o.status}</span>
                </td>
                <td className="p-3 text-muted-foreground">{o.createdAt}</td>
                <td className="p-3">
                  <select
                    value={o.status}
                    onChange={e => updateStatus(o.id, e.target.value as Order['status'])}
                    className="border border-border px-2 py-1 text-xs bg-background"
                  >
                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
