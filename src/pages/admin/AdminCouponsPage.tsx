import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { sampleCoupons } from '@/data/products';
import type { Coupon } from '@/data/products';

const AdminCouponsPage = () => {
  const [coupons, setCoupons] = useState(sampleCoupons);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ code: '', discountPercentage: '', expirationDate: '', usageLimit: '' });

  const handleAdd = () => {
    const newCoupon: Coupon = {
      id: String(Date.now()),
      code: form.code.toUpperCase(),
      discountPercentage: Number(form.discountPercentage),
      expirationDate: form.expirationDate,
      usageLimit: Number(form.usageLimit),
      usedCount: 0,
    };
    setCoupons(prev => [...prev, newCoupon]);
    setShowForm(false);
    setForm({ code: '', discountPercentage: '', expirationDate: '', usageLimit: '' });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-medium">Coupons ({coupons.length})</h1>
        <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2 text-xs">
          <Plus className="w-4 h-4" /> Add Coupon
        </button>
      </div>

      {showForm && (
        <div className="bg-background border border-border p-5 mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} placeholder="Coupon code" className="border border-border px-3 py-2 text-sm bg-background focus:outline-none" />
            <input value={form.discountPercentage} onChange={e => setForm({ ...form, discountPercentage: e.target.value })} placeholder="Discount %" type="number" className="border border-border px-3 py-2 text-sm bg-background focus:outline-none" />
            <input value={form.expirationDate} onChange={e => setForm({ ...form, expirationDate: e.target.value })} type="date" className="border border-border px-3 py-2 text-sm bg-background focus:outline-none" />
            <input value={form.usageLimit} onChange={e => setForm({ ...form, usageLimit: e.target.value })} placeholder="Usage limit" type="number" className="border border-border px-3 py-2 text-sm bg-background focus:outline-none" />
          </div>
          <div className="flex gap-2">
            <button onClick={handleAdd} className="btn-primary text-xs">Save</button>
            <button onClick={() => setShowForm(false)} className="btn-outline text-xs">Cancel</button>
          </div>
        </div>
      )}

      <div className="bg-background border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="p-3 text-xs tracking-wider uppercase text-muted-foreground font-medium">Code</th>
              <th className="p-3 text-xs tracking-wider uppercase text-muted-foreground font-medium">Discount</th>
              <th className="p-3 text-xs tracking-wider uppercase text-muted-foreground font-medium">Expires</th>
              <th className="p-3 text-xs tracking-wider uppercase text-muted-foreground font-medium">Usage</th>
              <th className="p-3 text-xs tracking-wider uppercase text-muted-foreground font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map(c => (
              <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                <td className="p-3 font-mono font-medium">{c.code}</td>
                <td className="p-3">{c.discountPercentage}%</td>
                <td className="p-3 text-muted-foreground">{c.expirationDate}</td>
                <td className="p-3">{c.usedCount} / {c.usageLimit}</td>
                <td className="p-3">
                  <button onClick={() => setCoupons(prev => prev.filter(x => x.id !== c.id))} className="p-1 hover:bg-muted rounded text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCouponsPage;
