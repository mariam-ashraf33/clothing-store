import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. التأكد من أن البيانات مكتملة
    if (!form.name || !form.phone || !form.address) {
      toast({
        title: 'برجاء ملء جميع البيانات',
        variant: 'destructive'
      });
      return;
    }

    const orderId = `ORD-${Math.floor(Math.random() * 1000000)}`;

    const payload = {
      order_id: orderId,
      customer_name: form.name,
      phone: form.phone,
      address: form.address,
      items: items.map(item => ({
        name: item.product.name,
        price: item.product.price,
        size: item.size,
        quantity: item.quantity
      })),
      total: totalPrice,
      status: 'pending'
    };

    console.log("🚀 جاري محاولة إرسال الأوردر إلى Supabase...", payload);

    try {
      // 2. إرسال البيانات واستخدام .select() للتأكد من الرد
      const { data, error } = await supabase
        .from('orders')
        .insert([payload])
        .select();

      if (error) {
        // لو سوبابيس رد بخطأ، هيظهر هنا في الـ Console وفي رسالة Toast
        console.error("❌ Supabase Error Details:", error);
        toast({
          title: 'فشل حفظ الطلب في قاعدة البيانات',
          description: error.message,
          variant: 'destructive'
        });
        return; // توقف هنا ولا تذهب لصفحة النجاح
      }

      // 3. لو السطر اللي فوق نجح، الـ data هيكون فيها بيانات
      console.log("✅ الأوردر اتحفظ بنجاح في سوبابيس:", data);
      
      toast({
        title: 'تم تأكيد طلبك بنجاح',
        description: `رقم الطلب: ${orderId}`,
      });

      clearCart();
      navigate(`/order-confirmation/${orderId}`);

    } catch (err) {
      // للقبض على أي خطأ غير متوقع في الكود نفسه
      console.error("❌ Unexpected Error:", err);
      toast({
        title: 'حدث خطأ غير متوقع',
        description: 'تأكد من اتصال الإنترنت وحاول مرة أخرى',
        variant: 'destructive'
      });
    }
  };

  if (items.length === 0) {
    return <div className="p-10 text-center">السلة فارغة</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">إتمام الطلب</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <input
          placeholder="الاسم بالكامل"
          className="w-full border p-2 rounded"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="رقم الهاتف"
          className="w-full border p-2 rounded"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
          required
        />
        <textarea
          placeholder="العنوان بالتفصيل"
          className="w-full border p-2 rounded"
          value={form.address}
          onChange={e => setForm({ ...form, address: e.target.value })}
          required
        />
        <button type="submit" className="w-full bg-black text-white p-3 rounded font-bold hover:bg-gray-800 transition-colors">
          تأكيد الطلب ({totalPrice} EGP)
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;