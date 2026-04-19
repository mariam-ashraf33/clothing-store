import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Heart, Minus, Plus, Star, ChevronLeft } from 'lucide-react';
import { sampleProducts, sampleReviews } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { getDiscountedPrice, formatPrice } from '@/lib/helpers';
import { useToast } from '@/hooks/use-toast';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { toast } = useToast();

  const product = sampleProducts.find(p => p.id === id);

  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) return (
    <div className="container-store py-20 text-center">
      <p className="text-muted-foreground">Product not found.</p>
    </div>
  );

  const discounted = getDiscountedPrice(product);
  const reviews = sampleReviews.filter(r => r.productId === product.id && r.approved);
  const avgRating = reviews.length > 0
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : 0;

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({ title: 'Please select a size', variant: 'destructive' });
      return;
    }
    addItem(product, selectedSize, quantity);
    toast({
      title: 'Added to cart',
      description: `${product.name} (${selectedSize}) × ${quantity}`
    });
  };

  // 🟢 زرار واتساب
  const handleWhatsApp = (productName: string) => {
    const message = `
عايز أطلب:
المنتج: ${productName}
المقاس: ${selectedSize}
الكمية: ${quantity}
    `;

    window.open(
      `https://wa.me/201205558078?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="container-store py-8">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">

        {/* Images */}
        <div className="space-y-3">
          <div className="overflow-hidden bg-muted aspect-[3/4]">
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-20 overflow-hidden border-2 ${
                    i === activeImage
                      ? 'border-foreground'
                      : 'border-transparent'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">

          <h1 className="font-heading text-2xl md:text-3xl font-light">
            {product.name}
          </h1>

          {/* Rating */}
          {reviews.length > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[1,2,3,4,5].map(s => (
                  <Star
                    key={s}
                    className={`w-3.5 h-3.5 ${
                      s <= avgRating
                        ? 'fill-foreground text-foreground'
                        : 'text-border'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({reviews.length})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-3 mt-4">
            {product.discount > 0 ? (
              <>
                <span className="text-xl font-medium text-sale">
                  {formatPrice(discounted)}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-xl font-medium">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {/* Sizes */}
          <div className="mt-6">
            <p className="text-xs uppercase mb-3">Size</p>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-3 py-2 border ${
                    selectedSize === s
                      ? 'bg-foreground text-white'
                      : ''
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center border">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2"
              >
                <Minus className="w-4 h-4" />
              </button>

              <span className="px-4">{quantity}</span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex gap-3">

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="btn-primary flex-1"
            >
              Add to Cart
            </button>

            {/* 🟢 زر واتساب */}
            <button
              onClick={() => handleWhatsApp(product.name)}
              className="flex-1 bg-green-500 text-white px-4 py-2 hover:bg-green-600 transition-colors"
            >
              💬 اطلب على واتساب
            </button>

            <button
              onClick={() => toggleWishlist(product.id)}
              className="border px-4"
            >
              <Heart className={`w-5 h-5 ${
                wishlisted ? 'fill-sale text-sale' : ''
              }`} />
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductPage;