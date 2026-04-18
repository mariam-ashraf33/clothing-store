import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { sampleCoupons } from '@/data/products';
import { getDiscountedPrice, formatPrice } from '@/lib/helpers';
import { useToast } from '@/hooks/use-toast';

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<typeof sampleCoupons[0] | null>(null);

  const discount = appliedCoupon ? totalPrice * (appliedCoupon.discountPercentage / 100) : 0;
  const finalTotal = totalPrice - discount;

  const applyCoupon = () => {
    const found = sampleCoupons.find(c => c.code.toLowerCase() === couponInput.toLowerCase());
    if (found && new Date(found.expirationDate) > new Date() && found.usedCount < found.usageLimit) {
      setAppliedCoupon(found);
      toast({ title: 'Coupon applied!', description: `${found.discountPercentage}% off` });
    } else {
      toast({ title: 'Invalid coupon', variant: 'destructive' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) {
      toast({ title: 'Please fill all fields', variant: 'destructive' });
      return;
    }
    const orderId = `ORD-${String(Date.now()).slice(-6)}`;
    clearCart();
    navigate(`/order-confirmation/${orderId}`);
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container-store py-8">
      <h1 className="section-heading mb-8">Checkout</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="text-xs tracking-widest uppercase block mb-2">Full Name</label>
            <input
              type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full border border-border px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-foreground"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="text-xs tracking-widest uppercase block mb-2">Phone Number</label>
            <input
              type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
              className="w-full border border-border px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-foreground"
              placeholder="+1 234 567 8900"
            />
          </div>
          <div>
            <label className="text-xs tracking-widest uppercase block mb-2">Shipping Address</label>
            <textarea
              value={form.address} onChange={e => setForm({ ...form, address: e.target.value })}
              rows={3}
              className="w-full border border-border px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-foreground resize-none"
              placeholder="123 Main St, City, State, ZIP"
            />
          </div>
        </div>

        <div className="border border-border p-6 h-fit">
          <h2 className="text-xs tracking-widest uppercase mb-4">Order Summary</h2>
          <div className="space-y-3 mb-4">
            {items.map(item => (
              <div key={`${item.product.id}-${item.size}`} className="flex justify-between text-sm">
                <span>{item.product.name} ({item.size}) × {item.quantity}</span>
                <span>{formatPrice(getDiscountedPrice(item.product) * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mb-4">
            <input
              type="text" value={couponInput} onChange={e => setCouponInput(e.target.value)}
              placeholder="Coupon code"
              className="flex-1 border border-border px-3 py-2 text-sm bg-background focus:outline-none"
            />
            <button type="button" onClick={applyCoupon} className="px-4 py-2 text-xs tracking-widest uppercase border border-foreground hover:bg-foreground hover:text-background transition-colors">
              Apply
            </button>
          </div>

          <div className="space-y-2 text-sm border-t border-border pt-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            {appliedCoupon && (
              <div className="flex justify-between text-success">
                <span>Discount ({appliedCoupon.discountPercentage}%)</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-success">Free</span>
            </div>
          </div>
          <div className="border-t border-border mt-4 pt-4 flex justify-between font-medium text-lg">
            <span>Total</span>
            <span>{formatPrice(finalTotal)}</span>
          </div>
          <button type="submit" className="btn-primary w-full mt-6">Place Order</button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
