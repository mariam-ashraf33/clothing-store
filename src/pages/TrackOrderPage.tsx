import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { sampleOrders } from '@/data/products';
import { getStatusColor } from '@/lib/helpers';

const TrackOrderPage = () => {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get('id') || '');
  const [phone, setPhone] = useState('');
  const [result, setResult] = useState<typeof sampleOrders[0] | null | 'not-found'>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const found = sampleOrders.find(o =>
      o.id.toLowerCase() === orderId.toLowerCase() ||
      (orderId && o.id.toLowerCase().includes(orderId.toLowerCase()))
    );
    setResult(found || 'not-found');
  };

  const statusSteps = ['new', 'processing', 'shipped', 'delivered'];
  const statusIcons = { new: Clock, processing: Package, shipped: Truck, delivered: CheckCircle };

  return (
    <div className="container-store py-8 max-w-2xl mx-auto">
      <h1 className="section-heading mb-8 text-center">Track Your Order</h1>

      <form onSubmit={handleTrack} className="space-y-4 mb-12">
        <input
          type="text" value={orderId} onChange={e => setOrderId(e.target.value)}
          placeholder="Order ID (e.g. ORD-001)"
          className="w-full border border-border px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-foreground"
        />
        <input
          type="tel" value={phone} onChange={e => setPhone(e.target.value)}
          placeholder="Phone number (optional)"
          className="w-full border border-border px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-foreground"
        />
        <button type="submit" className="btn-primary w-full">Track Order</button>
      </form>

      {result === 'not-found' && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No order found. Please check your order ID.</p>
        </div>
      )}

      {result && result !== 'not-found' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <p className="text-sm font-medium">{result.id}</p>
              <p className="text-xs text-muted-foreground">{result.customerName}</p>
            </div>
            <span className={`px-3 py-1 text-xs font-medium uppercase tracking-wider ${getStatusColor(result.status)}`}>
              {result.status}
            </span>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-between">
            {statusSteps.map((step, i) => {
              const Icon = statusIcons[step as keyof typeof statusIcons];
              const active = statusSteps.indexOf(result.status) >= i;
              return (
                <div key={step} className="flex flex-col items-center gap-1 flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${active ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] tracking-wider uppercase ${active ? 'font-medium' : 'text-muted-foreground'}`}>{step}</span>
                  {i < statusSteps.length - 1 && <div className="hidden" />}
                </div>
              );
            })}
          </div>

          <div className="border border-border p-4 space-y-2 text-sm">
            <p><span className="text-muted-foreground">Address:</span> {result.address}</p>
            <p><span className="text-muted-foreground">Date:</span> {result.createdAt}</p>
            <p><span className="text-muted-foreground">Items:</span> {result.items.map(i => `${i.product.name} (${i.size}) × ${i.quantity}`).join(', ')}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrderPage;
