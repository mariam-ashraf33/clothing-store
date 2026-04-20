import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

// تعريف شكل البيانات المتوقع من قاعدة البيانات
type OrderItem = {
  name: string;
  price: number;
  size: string;
  quantity: number;
};

type Order = {
  id: string;
  order_id: string;
  customer_name: string;
  phone: string;
  address: string;
  items: OrderItem[]; // مصفوفة المنتجات
  total: number;
  status: string;
  created_at: string;
};

const AdminDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("❌ Error fetching orders:", error);
        toast({
          title: "Error fetching data",
          description: error.message,
          variant: "destructive",
        });
      } else {
        console.log("✅ Orders received:", data);
        setOrders(data || []);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">📊 Admin Dashboard</h1>
        <button 
          onClick={fetchOrders}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Refresh Data
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500 italic">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-10 bg-gray-100 rounded-lg">
          <p className="text-gray-600">No orders found in the database.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex flex-col md:flex-row justify-between mb-4 border-b pb-4">
                <div>
                  <h3 className="text-lg font-bold text-blue-700">{order.order_id}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleString('en-GB')}
                  </p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {order.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-gray-600">Customer Info:</p>
                  <p className="text-gray-800 font-medium">{order.customer_name}</p>
                  <p className="text-gray-600 text-sm">📞 {order.phone}</p>
                  <p className="text-gray-600 text-sm">📍 {order.address}</p>
                </div>

                <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-gray-600">Products Ordered:</p>
                  {Array.isArray(order.items) ? (
                    order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm border-b border-gray-200 pb-1 last:border-0">
                        <span>{item.name} <span className="text-gray-400">({item.size})</span> x{item.quantity}</span>
                        <span className="font-medium">{(item.price * item.quantity).toFixed(2)} EGP</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-red-500 italic">No item details available</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-2 border-t">
                <p className="text-xl font-bold text-gray-900">
                  Total: <span className="text-green-600">{order.total} EGP</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;