import { useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { sampleProducts } from '@/data/products';
import type { Product } from '@/data/products';
import { formatPrice, getDiscountedPrice } from '@/lib/helpers';

const AdminProductsPage = () => {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', category: 'women' as Product['category'], price: '', discount: '', stock: '', sizes: '', images: '' });

  const openNew = () => {
    setForm({ name: '', description: '', category: 'women', price: '', discount: '', stock: '', sizes: 'XS,S,M,L,XL', images: '' });
    setEditing(null);
    setShowForm(true);
  };

  const openEdit = (p: Product) => {
    setForm({
      name: p.name, description: p.description, category: p.category,
      price: String(p.price), discount: String(p.discount), stock: String(p.stock),
      sizes: p.sizes.join(','), images: p.images.join(','),
    });
    setEditing(p);
    setShowForm(true);
  };

  const handleSave = () => {
    const data: Product = {
      id: editing?.id || String(Date.now()),
      name: form.name, description: form.description, category: form.category,
      price: Number(form.price), discount: Number(form.discount), stock: Number(form.stock),
      sizes: form.sizes.split(',').map(s => s.trim()), images: form.images.split(',').map(s => s.trim()),
      createdAt: editing?.createdAt || new Date().toISOString().slice(0, 10),
    };
    if (editing) {
      setProducts(prev => prev.map(p => p.id === editing.id ? data : p));
    } else {
      setProducts(prev => [...prev, data]);
    }
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-medium">Products ({products.length})</h1>
        <button onClick={openNew} className="btn-primary flex items-center gap-2 text-xs">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {showForm && (
        <div className="bg-background border border-border p-5 mb-6 space-y-4">
          <h2 className="text-sm font-medium">{editing ? 'Edit Product' : 'New Product'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Product name" className="border border-border px-3 py-2 text-sm bg-background focus:outline-none" />
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value as Product['category'] })} className="border border-border px-3 py-2 text-sm bg-background">
              <option value="women">Women</option><option value="men">Men</option><option value="kids">Kids</option>
            </select>
            <input value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="Price" type="number" className="border border-border px-3 py-2 text-sm bg-background focus:outline-none" />
            <input value={form.discount} onChange={e => setForm({ ...form, discount: e.target.value })} placeholder="Discount %" type="number" className="border border-border px-3 py-2 text-sm bg-background focus:outline-none" />
            <input value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} placeholder="Stock" type="number" className="border border-border px-3 py-2 text-sm bg-background focus:outline-none" />
            <input value={form.sizes} onChange={e => setForm({ ...form, sizes: e.target.value })} placeholder="Sizes (comma sep)" className="border border-border px-3 py-2 text-sm bg-background focus:outline-none" />
          </div>
          <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description" rows={2} className="w-full border border-border px-3 py-2 text-sm bg-background focus:outline-none resize-none" />
          <input value={form.images} onChange={e => setForm({ ...form, images: e.target.value })} placeholder="Image URLs (comma sep)" className="w-full border border-border px-3 py-2 text-sm bg-background focus:outline-none" />
          <div className="flex gap-2">
            <button onClick={handleSave} className="btn-primary text-xs">Save</button>
            <button onClick={() => setShowForm(false)} className="btn-outline text-xs">Cancel</button>
          </div>
        </div>
      )}

      <div className="bg-background border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="p-3 text-xs tracking-wider uppercase text-muted-foreground font-medium">Product</th>
              <th className="p-3 text-xs tracking-wider uppercase text-muted-foreground font-medium">Category</th>
              <th className="p-3 text-xs tracking-wider uppercase text-muted-foreground font-medium">Price</th>
              <th className="p-3 text-xs tracking-wider uppercase text-muted-foreground font-medium">Stock</th>
              <th className="p-3 text-xs tracking-wider uppercase text-muted-foreground font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <img src={p.images[0]} alt={p.name} className="w-8 h-10 object-cover bg-muted" />
                    <span className="font-medium">{p.name}</span>
                  </div>
                </td>
                <td className="p-3 capitalize">{p.category}</td>
                <td className="p-3">
                  {p.discount > 0 ? (
                    <span><span className="text-sale">{formatPrice(getDiscountedPrice(p))}</span> <span className="text-muted-foreground line-through text-xs">{formatPrice(p.price)}</span></span>
                  ) : formatPrice(p.price)}
                </td>
                <td className="p-3">
                  <span className={p.stock < 15 ? 'text-warning font-medium' : ''}>{p.stock}</span>
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(p)} className="p-1 hover:bg-muted rounded"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(p.id)} className="p-1 hover:bg-muted rounded text-destructive"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductsPage;
