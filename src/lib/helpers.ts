import type { Product } from '@/data/products';

export const getDiscountedPrice = (product: Product): number =>
  product.discount > 0 ? product.price * (1 - product.discount / 100) : product.price;

export const formatPrice = (price: number): string => `$${price.toFixed(2)}`;

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'new': return 'bg-blue-100 text-blue-800';
    case 'processing': return 'bg-yellow-100 text-yellow-800';
    case 'shipped': return 'bg-purple-100 text-purple-800';
    case 'delivered': return 'bg-green-100 text-green-800';
    default: return 'bg-muted text-muted-foreground';
  }
};
