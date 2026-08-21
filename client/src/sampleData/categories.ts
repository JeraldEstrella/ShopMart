import {
  Smartphone,
  Shirt,
  Sofa,
  Sparkles,
  Dumbbell,
  Puzzle,
  ShoppingBasket,
  LayoutGrid,
} from 'lucide-react';

export const categories = [
  {
    id: 1,
    label: 'Electronics',
    icon: Smartphone,
    href: '/categories/electronics',
  },
  {
    id: 2,
    label: 'Fashion',
    icon: Shirt,
    href: '/categories/fashion',
  },
  {
    id: 3,
    label: 'Home',
    icon: Sofa,
    href: '/categories/home',
  },
  {
    id: 4,
    label: 'Beauty',
    icon: Sparkles,
    href: '/categories/beauty',
  },
  {
    id: 5,
    label: 'Sports',
    icon: Dumbbell,
    href: '/categories/sports',
  },
  {
    id: 6,
    label: 'Toys',
    icon: Puzzle,
    href: '/categories/toys',
  },
  {
    id: 7,
    label: 'Grocery',
    icon: ShoppingBasket,
    href: '/categories/grocery',
  },
  {
    id: 8,
    label: 'More',
    icon: LayoutGrid,
    href: '/categories',
  },
];
