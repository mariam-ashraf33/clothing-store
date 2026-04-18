import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { getDiscountedPrice, formatPrice } from '@/lib/helpers';

const CartPage = () => {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-store py-20 text-center">
        <h1 className="section-heading mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/shop" className="btn-primary inline-block">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container-store py-8">
      <h1 className="section-heading mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => {
            const price = getDiscountedPrice(item.product);
            return (
              <div key={`${item.product.id}-${item.size}`} className="flex gap-4 border-b border-border pb-4">
                <Link to={`/product/${item.product.id}`} className="w-20 h-28 flex-shrink-0 bg-muted overflow-hidden">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link to={`/product/${item.product.id}`} className="text-sm font-medium hover:underline">{item.product.name}</Link>
                    <p className="text-xs text-muted-foreground mt-0.5">Size: {item.size}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-border">
                      <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)} className="px-2 py-1 hover:bg-muted">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 py-1 text-xs">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)} className="px-2 py-1 hover:bg-muted">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="text-sm font-medium">{formatPrice(price * item.quantity)}</span>
                  </div>
                </div>
                <button onClick={() => removeItem(item.product.id, item.size)} className="self-start p-1 text-muted-foreground hover:text-foreground">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="border border-border p-6 h-fit">
          <h2 className="text-xs tracking-widest uppercase mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-success">Free</span>
            </div>
          </div>
          <div className="border-t border-border mt-4 pt-4 flex justify-between font-medium">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <Link to="/checkout" className="btn-primary w-full text-center mt-6 block">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
