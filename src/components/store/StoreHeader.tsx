import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useState } from 'react';

const StoreHeader = () => {
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container-store">
        <div className="flex items-center justify-between h-16">
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/shop?category=women" className="nav-link">Women</Link>
            <Link to="/shop?category=men" className="nav-link">Men</Link>
            <Link to="/shop?category=kids" className="nav-link">Kids</Link>
          </nav>

          <Link to="/" className="absolute left-1/2 -translate-x-1/2 font-heading text-xl md:text-2xl font-semibold tracking-wider uppercase">
            Brand Store
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/shop" aria-label="Search">
              <Search className="w-5 h-5 text-foreground/70 hover:text-foreground transition-colors" />
            </Link>
            <Link to="/wishlist" className="relative" aria-label="Wishlist">
              <Heart className="w-5 h-5 text-foreground/70 hover:text-foreground transition-colors" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-foreground text-background text-[10px] font-medium rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative" aria-label="Cart">
              <ShoppingBag className="w-5 h-5 text-foreground/70 hover:text-foreground transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-foreground text-background text-[10px] font-medium rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {menuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-3 border-t border-border pt-4">
            <Link to="/shop?category=women" className="nav-link" onClick={() => setMenuOpen(false)}>Women</Link>
            <Link to="/shop?category=men" className="nav-link" onClick={() => setMenuOpen(false)}>Men</Link>
            <Link to="/shop?category=kids" className="nav-link" onClick={() => setMenuOpen(false)}>Kids</Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default StoreHeader;
