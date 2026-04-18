import { Link } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import { sampleProducts } from '@/data/products';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { getDiscountedPrice, formatPrice } from '@/lib/helpers';
import { useToast } from '@/hooks/use-toast';

const WishlistPage = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addItem } = useCart();
  const { toast } = useToast();
  const products = sampleProducts.filter(p => wishlist.includes(p.id));

  if (products.length === 0) {
    return (
      <div className="container-store py-20 text-center">
        <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h1 className="section-heading mb-4">Your Wishlist is Empty</h1>
        <Link to="/shop" className="btn-primary inline-block">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="container-store py-8">
      <h1 className="section-heading mb-8">Wishlist ({products.length})</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map(p => (
          <div key={p.id} className="relative group">
            <Link to={`/product/${p.id}`}>
              <div className="overflow-hidden bg-muted aspect-[3/4]">
                <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            </Link>
            <button onClick={() => toggleWishlist(p.id)} className="absolute top-3 right-3 p-1.5 bg-background/80 rounded-full">
              <Trash2 className="w-4 h-4 text-muted-foreground hover:text-foreground" />
            </button>
            <div className="mt-3">
              <h3 className="text-sm font-medium">{p.name}</h3>
              <p className="text-sm mt-1">{formatPrice(getDiscountedPrice(p))}</p>
              <button
                onClick={() => { addItem(p, p.sizes[0]); toast({ title: 'Added to cart' }); }}
                className="mt-2 text-xs tracking-widest uppercase underline hover:no-underline"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
