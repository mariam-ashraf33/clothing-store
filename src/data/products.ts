export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'men' | 'women' | 'kids';
  price: number;
  discount: number;
  sizes: string[];
  stock: number;
  images: string[];
  isNew?: boolean;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  items: CartItem[];
  totalPrice: number;
  couponCode?: string;
  status: 'new' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  comment: string;
  approved: boolean;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercentage: number;
  expirationDate: string;
  usageLimit: number;
  usedCount: number;
}

export const sampleProducts: Product[] = [
  {
    id: '1', name: 'Oversized Linen Blazer', description: 'Relaxed-fit linen blazer with peak lapels and front flap pockets. Perfect for layering in transitional weather.',
    category: 'women', price: 149.00, discount: 0, sizes: ['XS','S','M','L','XL'], stock: 24,
    images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80','https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80'],
    isNew: true, createdAt: '2026-04-01',
  },
  {
    id: '2', name: 'Slim Fit Cotton Shirt', description: 'Premium cotton poplin shirt with a slim silhouette. Spread collar and adjustable cuffs.',
    category: 'men', price: 59.90, discount: 20, sizes: ['S','M','L','XL'], stock: 56,
    images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80','https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80'],
    createdAt: '2026-03-15',
  },
  {
    id: '3', name: 'Wide Leg Trousers', description: 'High-waisted wide leg trousers in flowing fabric. Side pockets and invisible zip fastening.',
    category: 'women', price: 89.90, discount: 0, sizes: ['XS','S','M','L'], stock: 18,
    images: ['https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80'],
    isNew: true, createdAt: '2026-04-10',
  },
  {
    id: '4', name: 'Leather Biker Jacket', description: 'Classic biker jacket in genuine leather. Asymmetric zip closure and belt detail at the hem.',
    category: 'men', price: 299.00, discount: 15, sizes: ['S','M','L','XL'], stock: 8,
    images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80'],
    createdAt: '2026-02-20',
  },
  {
    id: '5', name: 'Knit Midi Dress', description: 'Ribbed knit dress with a flattering midi length. Round neck and long sleeves.',
    category: 'women', price: 79.90, discount: 30, sizes: ['XS','S','M','L','XL'], stock: 32,
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80'],
    createdAt: '2026-01-10',
  },
  {
    id: '6', name: 'Kids Graphic Tee', description: 'Soft cotton t-shirt with playful graphic print. Crew neck and short sleeves.',
    category: 'kids', price: 19.90, discount: 0, sizes: ['4-5Y','6-7Y','8-9Y','10-11Y'], stock: 80,
    images: ['https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80'],
    isNew: true, createdAt: '2026-04-05',
  },
  {
    id: '7', name: 'Tailored Wool Coat', description: 'Double-breasted wool-blend coat with notch lapels. Fully lined with interior pocket.',
    category: 'men', price: 249.00, discount: 0, sizes: ['S','M','L','XL'], stock: 12,
    images: ['https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80'],
    createdAt: '2026-03-01',
  },
  {
    id: '8', name: 'Kids Denim Jacket', description: 'Classic trucker-style denim jacket in medium wash. Button front with chest pockets.',
    category: 'kids', price: 39.90, discount: 10, sizes: ['4-5Y','6-7Y','8-9Y','10-11Y','12-13Y'], stock: 45,
    images: ['https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&q=80'],
    createdAt: '2026-02-15',
  },
];

export const sampleCoupons: Coupon[] = [
  { id: '1', code: 'WELCOME10', discountPercentage: 10, expirationDate: '2026-12-31', usageLimit: 100, usedCount: 23 },
  { id: '2', code: 'SUMMER20', discountPercentage: 20, expirationDate: '2026-08-31', usageLimit: 50, usedCount: 12 },
];

export const sampleReviews: Review[] = [
  { id: '1', productId: '1', customerName: 'Sarah M.', rating: 5, comment: 'Beautiful blazer, fits perfectly!', approved: true, createdAt: '2026-04-12' },
  { id: '2', productId: '2', customerName: 'James L.', rating: 4, comment: 'Great quality shirt.', approved: true, createdAt: '2026-04-08' },
  { id: '3', productId: '5', customerName: 'Emma R.', rating: 5, comment: 'Love this dress!', approved: false, createdAt: '2026-04-14' },
];

export const sampleOrders: Order[] = [
  {
    id: 'ORD-001', customerName: 'Alice Johnson', phone: '+1234567890', address: '123 Main St, New York, NY',
    items: [{ product: sampleProducts[0], quantity: 1, size: 'M' }],
    totalPrice: 149.00, status: 'delivered', createdAt: '2026-04-05',
  },
  {
    id: 'ORD-002', customerName: 'Bob Smith', phone: '+1987654321', address: '456 Oak Ave, LA, CA',
    items: [{ product: sampleProducts[1], quantity: 2, size: 'L' }],
    totalPrice: 95.84, couponCode: 'WELCOME10', status: 'shipped', createdAt: '2026-04-10',
  },
  {
    id: 'ORD-003', customerName: 'Clara Davis', phone: '+1122334455', address: '789 Pine Rd, Chicago, IL',
    items: [{ product: sampleProducts[4], quantity: 1, size: 'S' }, { product: sampleProducts[5], quantity: 2, size: '6-7Y' }],
    totalPrice: 95.73, status: 'processing', createdAt: '2026-04-13',
  },
  {
    id: 'ORD-004', customerName: 'David Lee', phone: '+1555666777', address: '321 Elm Blvd, Miami, FL',
    items: [{ product: sampleProducts[3], quantity: 1, size: 'M' }],
    totalPrice: 254.15, status: 'new', createdAt: '2026-04-15',
  },
];
