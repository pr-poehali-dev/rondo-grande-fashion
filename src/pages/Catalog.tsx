import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  sizes: string[];
  colors: string[];
  isNew?: boolean;
  isBestseller?: boolean;
}

const allProducts: Product[] = [
  {
    id: 1,
    name: 'Платье миди с запахом',
    price: 8900,
    oldPrice: 12900,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/691f3ee5-ed1e-44b8-9454-b2e4654cc790.jpg',
    category: 'Платья',
    sizes: ['52', '54', '56', '58'],
    colors: ['бордовый'],
    isNew: true,
  },
  {
    id: 2,
    name: 'Платье вечернее макси',
    price: 14900,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/691f3ee5-ed1e-44b8-9454-b2e4654cc790.jpg',
    category: 'Платья',
    sizes: ['52', '54', '56', '58'],
    colors: ['голубой', 'бирюзовый'],
    isBestseller: true,
  },
  {
    id: 3,
    name: 'Платье повседневное',
    price: 7900,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/691f3ee5-ed1e-44b8-9454-b2e4654cc790.jpg',
    category: 'Платья',
    sizes: ['52', '54', '56', '58'],
    colors: ['черный'],
  },
  {
    id: 4,
    name: 'Платье летнее',
    price: 6500,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/691f3ee5-ed1e-44b8-9454-b2e4654cc790.jpg',
    category: 'Платья',
    sizes: ['52', '54', '56', '58'],
    colors: ['молочный'],
  },
  {
    id: 5,
    name: 'Платье деловое',
    price: 9900,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/691f3ee5-ed1e-44b8-9454-b2e4654cc790.jpg',
    category: 'Платья',
    sizes: ['52', '54', '56', '58'],
    colors: ['графит'],
  },
  {
    id: 6,
    name: 'Платье коктейльное',
    price: 11900,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/691f3ee5-ed1e-44b8-9454-b2e4654cc790.jpg',
    category: 'Платья',
    sizes: ['52', '54', '56', '58'],
    colors: ['пудровый'],
  },
  {
    id: 7,
    name: 'Платье трикотажное',
    price: 5900,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/691f3ee5-ed1e-44b8-9454-b2e4654cc790.jpg',
    category: 'Платья',
    sizes: ['52', '54', '56', '58'],
    colors: ['какао'],
  },
  {
    id: 8,
    name: 'Платье с принтом',
    price: 8500,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/691f3ee5-ed1e-44b8-9454-b2e4654cc790.jpg',
    category: 'Платья',
    sizes: ['52', '54', '56', '58'],
    colors: ['медовый'],
  },
  {
    id: 9,
    name: 'Брюки с высокой посадкой',
    price: 6900,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/b348a6c0-a753-4572-804f-7934afe40ca1.jpg',
    category: 'Юбки и брюки',
    sizes: ['52', '54', '56', '58'],
    colors: ['графит'],
    isNew: true,
  },
  {
    id: 10,
    name: 'Юбка-карандаш',
    price: 5500,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/b348a6c0-a753-4572-804f-7934afe40ca1.jpg',
    category: 'Юбки и брюки',
    sizes: ['52', '54', '56', '58'],
    colors: ['черный'],
  },
  {
    id: 11,
    name: 'Брюки классические',
    price: 7200,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/b348a6c0-a753-4572-804f-7934afe40ca1.jpg',
    category: 'Юбки и брюки',
    sizes: ['52', '54', '56', '58'],
    colors: ['графит', 'черный'],
  },
  {
    id: 12,
    name: 'Юбка миди',
    price: 4900,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/b348a6c0-a753-4572-804f-7934afe40ca1.jpg',
    category: 'Юбки и брюки',
    sizes: ['52', '54', '56', '58'],
    colors: ['бордовый'],
  },
  {
    id: 13,
    name: 'Брюки широкие',
    price: 6500,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/b348a6c0-a753-4572-804f-7934afe40ca1.jpg',
    category: 'Юбки и брюки',
    sizes: ['52', '54', '56', '58'],
    colors: ['хаки'],
  },
  {
    id: 14,
    name: 'Юбка макси',
    price: 5900,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/b348a6c0-a753-4572-804f-7934afe40ca1.jpg',
    category: 'Юбки и брюки',
    sizes: ['52', '54', '56', '58'],
    colors: ['молочный'],
  },
  {
    id: 15,
    name: 'Брюки зауженные',
    price: 6800,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/b348a6c0-a753-4572-804f-7934afe40ca1.jpg',
    category: 'Юбки и брюки',
    sizes: ['52', '54', '56', '58'],
    colors: ['черный'],
  },
  {
    id: 16,
    name: 'Юбка плиссе',
    price: 5200,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/b348a6c0-a753-4572-804f-7934afe40ca1.jpg',
    category: 'Юбки и брюки',
    sizes: ['52', '54', '56', '58'],
    colors: ['голубой'],
  },
  {
    id: 17,
    name: 'Брюки с лампасами',
    price: 7500,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/b348a6c0-a753-4572-804f-7934afe40ca1.jpg',
    category: 'Юбки и брюки',
    sizes: ['52', '54', '56', '58'],
    colors: ['графит'],
  },
  {
    id: 18,
    name: 'Юбка трапеция',
    price: 4700,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/b348a6c0-a753-4572-804f-7934afe40ca1.jpg',
    category: 'Юбки и брюки',
    sizes: ['52', '54', '56', '58'],
    colors: ['какао'],
  },
  {
    id: 19,
    name: 'Брюки палаццо',
    price: 7900,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/b348a6c0-a753-4572-804f-7934afe40ca1.jpg',
    category: 'Юбки и брюки',
    sizes: ['52', '54', '56', '58'],
    colors: ['белый'],
  },
  {
    id: 20,
    name: 'Юбка с запахом',
    price: 5400,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/b348a6c0-a753-4572-804f-7934afe40ca1.jpg',
    category: 'Юбки и брюки',
    sizes: ['52', '54', '56', '58'],
    colors: ['бордовый'],
  },
  {
    id: 21,
    name: 'Брюки джоггеры',
    price: 5900,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/b348a6c0-a753-4572-804f-7934afe40ca1.jpg',
    category: 'Юбки и брюки',
    sizes: ['52', '54', '56', '58'],
    colors: ['графит'],
  },
  {
    id: 22,
    name: 'Блуза классическая',
    price: 4900,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/a611f61e-75a0-498e-9633-c1044afb2b86.jpg',
    category: 'Блузы и рубашки',
    sizes: ['52', '54', '56', '58'],
    colors: ['белый'],
    isBestseller: true,
  },
  {
    id: 23,
    name: 'Рубашка оверсайз',
    price: 5500,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/a611f61e-75a0-498e-9633-c1044afb2b86.jpg',
    category: 'Блузы и рубашки',
    sizes: ['52', '54', '56', '58'],
    colors: ['голубой'],
  },
  {
    id: 24,
    name: 'Блуза с бантом',
    price: 5200,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/a611f61e-75a0-498e-9633-c1044afb2b86.jpg',
    category: 'Блузы и рубашки',
    sizes: ['52', '54', '56', '58'],
    colors: ['пудровый'],
  },
  {
    id: 25,
    name: 'Рубашка льняная',
    price: 4700,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/a611f61e-75a0-498e-9633-c1044afb2b86.jpg',
    category: 'Блузы и рубашки',
    sizes: ['52', '54', '56', '58'],
    colors: ['молочный'],
  },
  {
    id: 26,
    name: 'Блуза с рюшами',
    price: 5900,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/a611f61e-75a0-498e-9633-c1044afb2b86.jpg',
    category: 'Блузы и рубашки',
    sizes: ['52', '54', '56', '58'],
    colors: ['бордовый'],
  },
  {
    id: 27,
    name: 'Рубашка в полоску',
    price: 4900,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/a611f61e-75a0-498e-9633-c1044afb2b86.jpg',
    category: 'Блузы и рубашки',
    sizes: ['52', '54', '56', '58'],
    colors: ['голубой', 'белый'],
  },
  {
    id: 28,
    name: 'Блуза шелковая',
    price: 7900,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/a611f61e-75a0-498e-9633-c1044afb2b86.jpg',
    category: 'Блузы и рубашки',
    sizes: ['52', '54', '56', '58'],
    colors: ['бирюзовый'],
  },
  {
    id: 29,
    name: 'Рубашка джинсовая',
    price: 5500,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/a611f61e-75a0-498e-9633-c1044afb2b86.jpg',
    category: 'Блузы и рубашки',
    sizes: ['52', '54', '56', '58'],
    colors: ['голубой'],
  },
  {
    id: 30,
    name: 'Кардиган длинный',
    price: 8900,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/a611f61e-75a0-498e-9633-c1044afb2b86.jpg',
    category: 'Кардиганы и жилеты',
    sizes: ['52', '54', '56', '58'],
    colors: ['графит'],
  },
  {
    id: 31,
    name: 'Жилет вязаный',
    price: 4900,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/a611f61e-75a0-498e-9633-c1044afb2b86.jpg',
    category: 'Кардиганы и жилеты',
    sizes: ['52', '54', '56', '58'],
    colors: ['какао'],
  },
  {
    id: 32,
    name: 'Кардиган короткий',
    price: 6500,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/a611f61e-75a0-498e-9633-c1044afb2b86.jpg',
    category: 'Кардиганы и жилеты',
    sizes: ['52', '54', '56', '58'],
    colors: ['молочный'],
  },
  {
    id: 33,
    name: 'Жилет удлиненный',
    price: 5500,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/a611f61e-75a0-498e-9633-c1044afb2b86.jpg',
    category: 'Кардиганы и жилеты',
    sizes: ['52', '54', '56', '58'],
    colors: ['черный'],
  },
  {
    id: 34,
    name: 'Кардиган оверсайз',
    price: 9500,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/a611f61e-75a0-498e-9633-c1044afb2b86.jpg',
    category: 'Кардиганы и жилеты',
    sizes: ['52', '54', '56', '58'],
    colors: ['капучино'],
  },
  {
    id: 35,
    name: 'Жакет классический',
    price: 11900,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/a611f61e-75a0-498e-9633-c1044afb2b86.jpg',
    category: 'Жакеты',
    sizes: ['52', '54', '56', '58'],
    colors: ['черный'],
  },
  {
    id: 36,
    name: 'Жакет твидовый',
    price: 13500,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/a611f61e-75a0-498e-9633-c1044afb2b86.jpg',
    category: 'Жакеты',
    sizes: ['52', '54', '56', '58'],
    colors: ['графит'],
  },
  {
    id: 37,
    name: 'Жакет удлиненный',
    price: 12500,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/a611f61e-75a0-498e-9633-c1044afb2b86.jpg',
    category: 'Жакеты',
    sizes: ['52', '54', '56', '58'],
    colors: ['бордовый'],
  },
  {
    id: 38,
    name: 'Свитшот базовый',
    price: 3900,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/a611f61e-75a0-498e-9633-c1044afb2b86.jpg',
    category: 'Свитшоты, худи и лонгсливы',
    sizes: ['52', '54', '56', '58'],
    colors: ['графит'],
  },
  {
    id: 39,
    name: 'Худи оверсайз',
    price: 4500,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/a611f61e-75a0-498e-9633-c1044afb2b86.jpg',
    category: 'Свитшоты, худи и лонгсливы',
    sizes: ['52', '54', '56', '58'],
    colors: ['черный'],
  },
  {
    id: 40,
    name: 'Лонгслив хлопковый',
    price: 2900,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/a611f61e-75a0-498e-9633-c1044afb2b86.jpg',
    category: 'Свитшоты, худи и лонгсливы',
    sizes: ['52', '54', '56', '58'],
    colors: ['белый'],
  },
  {
    id: 41,
    name: 'Свитшот с принтом',
    price: 4200,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/a611f61e-75a0-498e-9633-c1044afb2b86.jpg',
    category: 'Свитшоты, худи и лонгсливы',
    sizes: ['52', '54', '56', '58'],
    colors: ['какао'],
  },
  {
    id: 42,
    name: 'Худи укороченное',
    price: 4700,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/a611f61e-75a0-498e-9633-c1044afb2b86.jpg',
    category: 'Свитшоты, худи и лонгсливы',
    sizes: ['52', '54', '56', '58'],
    colors: ['пудровый'],
  },
];

const Catalog = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 20000]);
  const [showFilters, setShowFilters] = useState(true);

  const categories = ['Платья', 'Юбки и брюки', 'Кардиганы и жилеты', 'Жакеты', 'Блузы и рубашки', 'Свитшоты, худи и лонгсливы'];
  const sizes = ['52', '54', '56', '58'];
  const colors = ['белый', 'бирюзовый', 'бордовый', 'голубой', 'графит', 'какао', 'капучино', 'кремовый', 'медовый', 'молочный', 'пудровый', 'сливочный', 'хаки', 'черный'];

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategories([category]);
    }
  }, [searchParams]);

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  const addToWishlist = () => {
    setWishlistCount(prev => prev + 1);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 20000]);
  };

  const filteredProducts = allProducts.filter(product => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const sizeMatch = selectedSizes.length === 0 || product.sizes.some(size => selectedSizes.includes(size));
    const colorMatch = selectedColors.length === 0 || product.colors.some(color => selectedColors.includes(color));
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && sizeMatch && colorMatch && priceMatch;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border" style={{backgroundColor: '#878070'}}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-8">
              <h1 
                className="font-heading text-2xl font-bold tracking-tight text-white cursor-pointer"
                onClick={() => navigate('/')}
              >
                RONDO GRANDE
              </h1>
            </div>

            <nav className="hidden lg:flex items-center gap-6">
              <Button variant="ghost" className="font-medium text-white hover:text-white/80">Новинки</Button>
              <Button variant="ghost" className="font-medium text-white hover:text-white/80" onClick={() => navigate('/catalog?category=Платья')}>Платья</Button>
              <Button variant="ghost" className="font-medium text-white hover:text-white/80" onClick={() => navigate('/catalog?category=Юбки и брюки')}>Юбки и брюки</Button>
              <Button variant="ghost" className="font-medium text-white hover:text-white/80" onClick={() => navigate('/catalog?category=Кардиганы и жилеты')}>Кардиганы и жилеты</Button>
              <Button variant="ghost" className="font-medium text-white hover:text-white/80" onClick={() => navigate('/catalog?category=Жакеты')}>Жакеты</Button>
              <Button variant="ghost" className="font-medium text-white hover:text-white/80" onClick={() => navigate('/catalog?category=Блузы и рубашки')}>Блузы и рубашки</Button>
              <Button variant="ghost" className="font-medium text-white hover:text-white/80" onClick={() => navigate('/catalog?category=Свитшоты, худи и лонгсливы')}>Свитшоты и худи</Button>
              <Button variant="ghost" className="text-destructive font-semibold">Распродажа</Button>
            </nav>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-white hover:text-white/80" onClick={() => navigate('/account')}>
                <Icon name="User" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="relative text-white hover:text-white/80">
                <Icon name="Heart" size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Button>
              <Button variant="ghost" size="icon" className="relative text-white hover:text-white/80" onClick={() => navigate('/cart')}>
                <Icon name="ShoppingBag" size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="font-heading text-3xl font-bold mb-2">Вся коллекция</h2>
          <p className="text-muted-foreground">Премиальная одежда больших размеров</p>
        </div>

        <div className="flex gap-8">
          <aside className={`${showFilters ? 'w-64' : 'w-0'} transition-all duration-300 overflow-hidden flex-shrink-0`}>
            <div className="sticky top-24 space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-lg font-semibold">Фильтры</h3>
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  Сбросить
                </Button>
              </div>

              <div>
                <h4 className="font-medium mb-3">Категория</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <Label htmlFor={category} className="cursor-pointer text-sm">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Размер</h4>
                <div className="space-y-2">
                  {sizes.map(size => (
                    <div key={size} className="flex items-center space-x-2">
                      <Checkbox
                        id={size}
                        checked={selectedSizes.includes(size)}
                        onCheckedChange={() => toggleSize(size)}
                      />
                      <Label htmlFor={size} className="cursor-pointer text-sm">
                        {size}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Цвет</h4>
                <div className="space-y-2">
                  {colors.map(color => (
                    <div key={color} className="flex items-center space-x-2">
                      <Checkbox
                        id={color}
                        checked={selectedColors.includes(color)}
                        onCheckedChange={() => toggleColor(color)}
                      />
                      <Label htmlFor={color} className="cursor-pointer text-sm capitalize">
                        {color}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Цена</h4>
                <Slider
                  min={0}
                  max={20000}
                  step={500}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{priceRange[0].toLocaleString()}₽</span>
                  <span>{priceRange[1].toLocaleString()}₽</span>
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Icon name={showFilters ? "ChevronLeft" : "ChevronRight"} size={16} className="mr-2" />
                {showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
              </Button>
              <p className="text-sm text-muted-foreground">
                Найдено товаров: {filteredProducts.length}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
            <Card 
              key={product.id} 
              className="group cursor-pointer overflow-hidden border-border hover:shadow-lg transition-shadow animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedProduct(product)}
            >
              <CardContent className="p-0">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 flex flex-col gap-2">
                    {product.isNew && (
                      <Badge className="bg-primary text-primary-foreground">Новинка</Badge>
                    )}
                    {product.isBestseller && (
                      <Badge variant="secondary">Хит продаж</Badge>
                    )}
                    {product.oldPrice && (
                      <Badge variant="destructive">
                        -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                      </Badge>
                    )}
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToWishlist();
                    }}
                  >
                    <Icon name="Heart" size={18} />
                  </Button>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
                  <h3 className="font-heading font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{product.price.toLocaleString()}₽</span>
                    {product.oldPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {product.oldPrice.toLocaleString()}₽
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Размеры: {product.sizes.join(', ')}
                  </p>
                </div>
              </CardContent>
              </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">Товары не найдены</p>
                <p className="text-muted-foreground mb-4">Попробуйте изменить параметры фильтров</p>
                <Button onClick={resetFilters}>Сбросить фильтры</Button>
              </div>
            )}

            {filteredProducts.length > 0 && (
              <div className="mt-12 text-center">
                <p className="text-muted-foreground mb-4">Показано {filteredProducts.length} из {allProducts.length} товаров</p>
                <p className="text-sm text-muted-foreground">Скоро появятся новые коллекции</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading text-2xl">{selectedProduct.name}</DialogTitle>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedProduct.isNew && (
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">Новинка</Badge>
                  )}
                  {selectedProduct.isBestseller && (
                    <Badge variant="secondary" className="absolute top-4 left-4 mt-10">Хит продаж</Badge>
                  )}
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-muted-foreground mb-2">{selectedProduct.category}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold">{selectedProduct.price.toLocaleString()}₽</span>
                      {selectedProduct.oldPrice && (
                        <span className="text-xl text-muted-foreground line-through">
                          {selectedProduct.oldPrice.toLocaleString()}₽
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="font-medium mb-3">Выберите размер:</p>
                    <div className="flex gap-2">
                      {selectedProduct.sizes.map(size => (
                        <Button key={size} variant="outline" className="w-16">
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button size="lg" className="w-full" onClick={addToCart}>
                      <Icon name="ShoppingBag" size={20} className="mr-2" />
                      Добавить в корзину
                    </Button>
                    <Button size="lg" variant="outline" className="w-full" onClick={addToWishlist}>
                      <Icon name="Heart" size={20} className="mr-2" />
                      В избранное
                    </Button>
                  </div>

                  <div className="border-t pt-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <Icon name="Truck" size={20} className="text-primary mt-1" />
                      <div>
                        <p className="font-medium">Бесплатная доставка</p>
                        <p className="text-sm text-muted-foreground">При заказе от 5000₽</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="RotateCcw" size={20} className="text-primary mt-1" />
                      <div>
                        <p className="font-medium">Возврат 14 дней</p>
                        <p className="text-sm text-muted-foreground">Без объяснения причин</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Catalog;