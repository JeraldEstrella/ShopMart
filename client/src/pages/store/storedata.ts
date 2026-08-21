import {
  LayoutDashboard,
  Package,
  ClipboardList,
  BarChart2,
  Truck,
  Ticket,
  Star,
  MessageCircle,
  Settings,
  Plus,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  DollarSign,
} from 'lucide-react';

export const metrics = [
  {
    label: 'Total Revenue',
    value: '₱ 84,230',
    trend: '+12% this week',
    up: true,
    icon: DollarSign,
  },
  {
    label: 'Total Orders',
    value: '1,482',
    trend: '+8% this week',
    up: true,
    icon: ShoppingCart,
  },
  {
    label: 'Products',
    value: '64',
    trend: '+3 this week',
    up: true,
    icon: Package,
  },
  {
    label: 'Avg. Rating',
    value: '4.8',
    trend: '-0.1 this week',
    up: false,
    icon: Star,
  },
];

export const salesData = [
  { day: 'Mon', percent: 55 },
  { day: 'Tue', percent: 72 },
  { day: 'Wed', percent: 48 },
  { day: 'Thu', percent: 88 },
  { day: 'Fri', percent: 65 },
  { day: 'Sat', percent: 96 },
  { day: 'Sun', percent: 60 },
];

export const topProducts = [
  {
    rank: 1,
    title: 'Long Pants',
    sold: 980,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80',
  },
  {
    rank: 2,
    title: 'Canvas Backpack',
    sold: 740,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=80',
  },
  {
    rank: 3,
    title: 'Shorts Cargo',
    sold: 615,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80',
  },
  {
    rank: 4,
    title: 'Classic Watch',
    sold: 540,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80',
  },
];

export const orders = [
  {
    id: '#10482',
    product: 'Long Pants',
    customer: 'Maria S.',
    status: 'Completed',
    amount: '₱ 225,000',
  },
  {
    id: '#10483',
    product: 'Canvas Backpack',
    customer: 'Jay P.',
    status: 'Shipped',
    amount: '₱ 399,000',
  },
  {
    id: '#10484',
    product: 'Shorts Cargo',
    customer: 'Liu W.',
    status: 'Pending',
    amount: '₱ 180,000',
  },
  {
    id: '#10485',
    product: 'Classic Watch',
    customer: 'Anna R.',
    status: 'Cancelled',
    amount: '₱ 178,000',
  },
  {
    id: '#10486',
    product: 'Long Pants',
    customer: 'Tom L.',
    status: 'Completed',
    amount: '₱ 225,000',
  },
];

export type ProductStatus = 'active' | 'low-stock' | 'unlisted';

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  image: string;
  price: number;
  stock: number;
  sales: number;
  status: 'active' | 'low-stock' | 'unlisted';
  createdAt: string;
}

export interface ProductStat {
  label: string;
  value: number;
  color: string;
}

export const productStats: ProductStat[] = [
  {
    label: 'All Products',
    value: 64,
    color: 'text-neutral-900 dark:text-neutral-100',
  },
  { label: 'Active', value: 58, color: 'text-success-500' },
  { label: 'Low Stock', value: 4, color: 'text-warning-500' },
  { label: 'Unlisted', value: 2, color: 'text-secondary-500' },
];

export const productTabs = [
  { label: 'All', count: 64 },
  { label: 'Active', count: 58 },
  { label: 'Low Stock', count: 4 },
  { label: 'Unlisted', count: 2 },
];

export const productCategories = [
  'All Categories',
  'Fashion',
  'Electronics',
  'Home',
];

export const productSortOptions = [
  'Sort: Newest',
  'Sort: Price ↑',
  'Sort: Price ↓',
  'Sort: Most Sold',
];

export const products: Product[] = [
  {
    id: 'WS-001',
    name: 'Wear Saka Long Pants',
    sku: 'WS-001',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80',
    price: 225,
    stock: 142,
    sales: 980,
    status: 'active',
    createdAt: '2026-07-20',
  },
  {
    id: 'WS-002',
    name: 'Canvas Backpack',
    sku: 'WS-002',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=80',
    price: 399,
    stock: 87,
    sales: 740,
    status: 'active',
    createdAt: '2026-07-18',
  },
  {
    id: 'WS-003',
    name: 'Sports Sunglasses',
    sku: 'WS-003',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=80',
    price: 90,
    stock: 3,
    sales: 615,
    status: 'low-stock',
    createdAt: '2026-07-15',
  },
  {
    id: 'WS-004',
    name: 'Wireless Headphones',
    sku: 'WS-004',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80',
    price: 620,
    stock: 0,
    sales: 540,
    status: 'unlisted',
    createdAt: '2026-07-10',
  },
  {
    id: 'WS-005',
    name: 'Steel Water Bottle',
    sku: 'WS-005',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=80',
    price: 180,
    stock: 210,
    sales: 980,
    status: 'active',
    createdAt: '2026-07-05',
  },
];
