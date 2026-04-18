import { useState } from 'react';
import { Check, Trash2, Star } from 'lucide-react';
import { sampleReviews, sampleProducts } from '@/data/products';
import type { Review } from '@/data/products';

const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState(sampleReviews);

  const approveReview = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, approved: true } : r));
  };

  const deleteReview = (id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  const getProductName = (productId: string) => sampleProducts.find(p => p.id === productId)?.name || 'Unknown';

  return (
    <div>
      <h1 className="text-xl font-medium mb-6">Reviews ({reviews.length})</h1>
      <div className="space-y-3">
        {reviews.map(r => (
          <div key={r.id} className={`bg-background border p-4 ${r.approved ? 'border-border' : 'border-warning/50'}`}>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">{r.customerName}</span>
                  <div className="flex">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className={`w-3 h-3 ${s <= r.rating ? 'fill-foreground text-foreground' : 'text-border'}`} />
                    ))}
                  </div>
                  {!r.approved && <span className="text-[10px] bg-warning/10 text-warning px-2 py-0.5 tracking-wider uppercase">Pending</span>}
                </div>
                <p className="text-xs text-muted-foreground mb-1">Product: {getProductName(r.productId)}</p>
                <p className="text-sm text-muted-foreground">{r.comment}</p>
              </div>
              <div className="flex gap-1">
                {!r.approved && (
                  <button onClick={() => approveReview(r.id)} className="p-1.5 hover:bg-muted rounded text-success">
                    <Check className="w-4 h-4" />
                  </button>
                )}
                <button onClick={() => deleteReview(r.id)} className="p-1.5 hover:bg-muted rounded text-destructive">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminReviewsPage;
