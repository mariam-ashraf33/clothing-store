import { Link } from 'react-router-dom';

const StoreFooter = () => (
  <footer className="bg-foreground text-primary-foreground mt-20">
    <div className="container-store py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-heading text-lg font-semibold tracking-wider uppercase mb-4">Brand Store</h3>
          <p className="text-sm text-primary-foreground/60 leading-relaxed">
            Contemporary fashion for the modern individual. Quality, style, and sustainability.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-medium tracking-widest uppercase mb-4 text-primary-foreground/80">Shop</h4>
          <div className="flex flex-col gap-2">
            <Link to="/shop?category=women" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">Women</Link>
            <Link to="/shop?category=men" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">Men</Link>
            <Link to="/shop?category=kids" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">Kids</Link>
          </div>
        </div>
        <div>
          <h4 className="text-xs font-medium tracking-widest uppercase mb-4 text-primary-foreground/80">Help</h4>
          <div className="flex flex-col gap-2">
            <Link to="/track-order" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">Track Order</Link>
            <span className="text-sm text-primary-foreground/60">Shipping & Returns</span>
            <span className="text-sm text-primary-foreground/60">Contact Us</span>
          </div>
        </div>
        <div>
          <h4 className="text-xs font-medium tracking-widest uppercase mb-4 text-primary-foreground/80">Company</h4>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-primary-foreground/60">About</span>
            <span className="text-sm text-primary-foreground/60">Careers</span>
            <Link to="/admin" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">Admin</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center">
        <p className="text-xs text-primary-foreground/40 tracking-wider">© 2026 Brand Store. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default StoreFooter;
