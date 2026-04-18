import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import type { Product } from '@/data/products';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const discountedPrice = product.discount > 0 ? product.price * (1 - product.discount / 100) : null;
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="product-card relative">
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden bg-muted">
          <img src={product.images[0]} alt={product.name} className="product-card-image" loading="lazy" />
          {product.discount > 0 && <span className="badge-sale">-{product.discount}%</span>}
          {product.isNew && !product.discount && <span className="badge-new">New</span>}
        </div>
      </Link>
      <button
        onClick={() => toggleWishlist(product.id)}
        className="absolute top-3 right-3 z-10 p-1.5 bg-background/80 backdrop-blur-sm rounded-full transition-colors"
        aria-label="Toggle wishlist"
      >
        <Heart className={`w-4 h-4 ${wishlisted ? 'fill-sale text-sale' : 'text-foreground/50'}`} />
      </button>
      <Link to={`/product/${product.id}`} className="block mt-3">
        <h3 className="text-sm font-medium tracking-wide">{product.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          {discountedPrice ? (
            <>
              <span className="text-sm font-medium text-sale">${discountedPrice.toFixed(2)}</span>
              <span className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-sm font-medium">${product.price.toFixed(2)}</span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
