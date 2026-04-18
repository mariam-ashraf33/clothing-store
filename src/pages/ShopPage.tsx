import { useSearchParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import ProductCard from '@/components/store/ProductCard';
import { sampleProducts } from '@/data/products';

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [page, setPage] = useState(1);
  const perPage = 8;

  const filtered = useMemo(() => {
    return sampleProducts.filter(p => {
      if (activeCategory !== 'all' && p.category !== activeCategory) return false;
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      const effectivePrice = p.discount > 0 ? p.price * (1 - p.discount / 100) : p.price;
      if (effectivePrice < priceRange[0] || effectivePrice > priceRange[1]) return false;
      return true;
    });
  }, [activeCategory, searchQuery, priceRange]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const setCategory = (cat: string) => {
    if (cat === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
    setPage(1);
  };

  return (
    <div className="container-store py-8">
      <h1 className="section-heading mb-8">
        {activeCategory === 'all' ? 'All Products' : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setPage(1); }}
            className="w-full pl-10 pr-4 py-2.5 border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'women', 'men', 'kids'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 text-xs tracking-widest uppercase border transition-colors ${
                activeCategory === cat
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-background text-foreground border-border hover:border-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Price:</span>
          <input
            type="range" min={0} max={500} step={10}
            value={priceRange[1]}
            onChange={e => { setPriceRange([0, Number(e.target.value)]); setPage(1); }}
            className="w-24"
          />
          <span className="text-xs text-muted-foreground">${priceRange[0]} - ${priceRange[1]}</span>
        </div>
      </div>

      {/* Products */}
      {paginated.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {paginated.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No products found.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-10 h-10 text-sm border transition-colors ${
                page === i + 1
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-background text-foreground border-border hover:border-foreground'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopPage;
