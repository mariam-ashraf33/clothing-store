import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Heart, Minus, Plus, ChevronLeft } from 'lucide-react';

import { sampleProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { getDiscountedPrice, formatPrice } from '@/lib/helpers';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toggleWishlist } = useWishlist();
  const { toast } = useToast();

  const product = sampleProducts.find(p => p.id === id);

  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="container-store py-20 text-center">
        <p>Product not found</p>
      </div>
    );
  }

  const discounted = getDiscountedPrice(product);

  // 🟢 Create Order
  const createOrder = async () => {
    if (!selectedSize) {
      toast({ title: 'Please select a size', variant: 'destructive' });
      return;
    }

    const orderId = "ORD-" + Math.floor(Math.random() * 1000000);

    console.log("Creating order...");

    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
         
          product_name: product.name,
          size: selectedSize,
          quantity,
          total_price: discounted * quantity,
          status: "pending"
        }
      ])
      .select();

    if (error) {
      console.log("SUPABASE ERROR:", error);
      toast({ title: "Error creating order", variant: "destructive" });
      return;
    }

    console.log("ORDER SAVED:", data);

    navigate(`/order-confirmation/${orderId}`);
  };

  // 🟢 WhatsApp
  const handleWhatsApp = () => {
    if (!selectedSize) {
      toast({ title: 'Please select a size', variant: 'destructive' });
      return;
    }

    const message = `
عايز أطلب:
المنتج: ${product.name}
المقاس: ${selectedSize}
الكمية: ${quantity}
السعر: ${discounted * quantity}
    `;

    window.open(
      `https://wa.me/201205558078?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="container-store py-8">

      <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-1">
        <ChevronLeft className="w-4 h-4" />
        Back
      </button>

      <div className="grid md:grid-cols-2 gap-10">

        {/* Images */}
        <div>
          <img
            src={product.images[activeImage]}
            className="w-full h-[500px] object-cover"
          />

          <div className="flex gap-2 mt-3">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImage(i)}
                className={`w-16 h-20 cursor-pointer border ${
                  i === activeImage ? 'border-black' : ''
                }`}
              />
            ))}
          </div>
        </div>

        {/* Details */}
        <div>

          <h1 className="text-2xl font-light">{product.name}</h1>

          <p className="text-xl mt-3 font-medium">
            {formatPrice(discounted)}
          </p>

          {/* Size */}
          <div className="mt-6">
            <p className="text-xs uppercase mb-2">Size</p>
            <div className="flex gap-2">
              {product.sizes.map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-3 py-2 border ${
                    selectedSize === s ? 'bg-black text-white' : ''
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mt-6">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>
              <Minus />
            </button>

            <span>{quantity}</span>

            <button onClick={() => setQuantity(q => q + 1)}>
              <Plus />
            </button>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-8">

            <button
              onClick={() => addItem(product, selectedSize, quantity)}
              className="flex-1 bg-black text-white py-2"
            >
              Add to Cart
            </button>

            <button
              onClick={createOrder}
              className="flex-1 bg-blue-600 text-white py-2"
            >
              Confirm Order
            </button>

            <button
              onClick={handleWhatsApp}
              className="flex-1 bg-green-500 text-white py-2"
            >
              WhatsApp
            </button>

            <button onClick={() => toggleWishlist(product.id)}>
              <Heart />
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductPage;