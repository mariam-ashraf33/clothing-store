import { Link } from 'react-router-dom';
import ProductCard from '@/components/store/ProductCard';
import { sampleProducts } from '@/data/products';

const HomePage = () => {
  const newArrivals = sampleProducts.filter(p => p.isNew).slice(0, 4);
  const onSale = sampleProducts.filter(p => p.discount > 0).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden bg-foreground">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80"
          alt="Fashion hero"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-light text-primary-foreground tracking-tight animate-fade-in">
            Spring / Summer 2026
          </h1>
          <p className="mt-4 text-primary-foreground/70 text-sm md:text-base tracking-widest uppercase animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Explore the new collection
          </p>
          <Link to="/shop" className="mt-8 btn-outline border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground hover:text-foreground animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Shop Now
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="container-store py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Women', img: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=80', cat: 'women' },
            { label: 'Men', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', cat: 'men' },
            { label: 'Kids', img: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&q=80', cat: 'kids' },
          ].map(c => (
            <Link key={c.cat} to={`/shop?category=${c.cat}`} className="relative group overflow-hidden aspect-[4/5]">
              <img src={c.img} alt={c.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/30 transition-colors duration-300" />
              <div className="absolute bottom-6 left-6">
                <span className="text-primary-foreground text-lg font-heading tracking-wider uppercase">{c.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container-store py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-heading">New Arrivals</h2>
          <Link to="/shop" className="nav-link text-xs">View All</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Banner */}
      <section className="container-store py-12">
        <div className="relative h-[300px] md:h-[400px] overflow-hidden bg-secondary flex items-center justify-center">
          <div className="text-center px-4">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">Limited Time</p>
            <h2 className="section-heading mb-4">Up to 30% Off Selected Styles</h2>
            <Link to="/shop" className="btn-primary inline-block">Shop Sale</Link>
          </div>
        </div>
      </section>

      {/* On Sale */}
      {onSale.length > 0 && (
        <section className="container-store py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-heading">On Sale</h2>
            <Link to="/shop" className="nav-link text-xs">View All</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {onSale.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;
