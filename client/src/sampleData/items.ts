export interface CardItem {
  id: number;
  title: string;
  price: number;
  image: string;
  discount?: number;
  rating?: number;
  sold?: number;
  isChoice?: boolean;
  bundleDeal?: string;
  payLater?: boolean;
}

export const items: CardItem[] = [
  {
    id: 1,
    title: 'Classic Small Frame Colorful Sports Sunglasses UV400',
    price: 90,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800',
    discount: 41,
    rating: 4.8,
    sold: 3200,
    isChoice: true,
    bundleDeal: 'BUY 2 GET 5% OFF',
    payLater: true,
  },
  {
    id: 2,
    title: 'Premium Wireless Noise-Cancelling Headphones Bluetooth 5.3',
    price: 620,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    discount: 30,
    rating: 4.9,
    sold: 5100,
    isChoice: true,
    payLater: true,
  },
  {
    id: 3,
    title: 'Men Running Shoes Lightweight Breathable Sports Sneakers',
    price: 450,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
    discount: 25,
    rating: 4.7,
    sold: 1800,
    bundleDeal: 'BUY 2 GET 5% OFF',
  },
  {
    id: 4,
    title: 'Smart Watch Fitness Tracker Heart Rate Monitor Waterproof',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
    discount: 40,
    rating: 4.6,
    sold: 2400,
    isChoice: true,
    payLater: true,
  },
  {
    id: 5,
    title: 'Stainless Steel Insulated Water Bottle 1L BPA Free',
    price: 180,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800',
    discount: 15,
    rating: 4.5,
    sold: 980,
    bundleDeal: 'BUY 3 GET 10% OFF',
  },
  {
    id: 6,
    title: 'Minimalist Leather Bifold Wallet RFID Blocking Slim Design',
    price: 250,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800',
    rating: 4.8,
    sold: 670,
    isChoice: true,
  },
  {
    id: 7,
    title: 'Portable Bluetooth Speaker Waterproof Outdoor Bass Boost',
    price: 799,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800',
    discount: 20,
    rating: 4.7,
    sold: 3300,
    payLater: true,
  },
  {
    id: 8,
    title: 'Canvas Backpack Large Capacity Laptop Bag Travel School',
    price: 399,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
    discount: 10,
    rating: 4.9,
    sold: 1500,
    isChoice: true,
    bundleDeal: 'BUY 2 GET 5% OFF',
    payLater: true,
  },
];
