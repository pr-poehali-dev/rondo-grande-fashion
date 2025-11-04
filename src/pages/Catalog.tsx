import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  sizes: string[];
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
    isNew: true,
  },
  {
    id: 2,
    name: 'Блуза классическая',
    price: 4900,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/a611f61e-75a0-498e-9633-c1044afb2b86.jpg',
    category: 'Верхняя одежда',
    sizes: ['52', '54', '56', '58'],
    isBestseller: true,
  },
  {
    id: 3,
    name: 'Брюки с высокой посадкой',
    price: 6900,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/b348a6c0-a753-4572-804f-7934afe40ca1.jpg',
    category: 'Низ',
    sizes: ['52', '54', '56', '58'],
    isNew: true,
  },
  {
    id: 4,
    name: 'Платье вечернее макси',
    price: 14900,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/691f3ee5-ed1e-44b8-9454-b2e4654cc790.jpg',
    category: 'Платья',
    sizes: ['52', '54', '56', '58'],
    isBestseller: true,
  },
];

const Catalog = () => {
  const navigate = useNavigate();
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 20000]);
  const [showFilters, setShowFilters] = useState(true);

  const categories = ['Платья', 'Верхняя одежда', 'Низ'];
  const sizes = ['52', '54', '56', '58'];

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

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setPriceRange([0, 20000]);
  };

  const filteredProducts = allProducts.filter(product => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const sizeMatch = selectedSizes.length === 0 || product.sizes.some(size => selectedSizes.includes(size));
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && sizeMatch && priceMatch;
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
              <Button variant="ghost" className="font-medium text-white hover:text-white/80" onClick={() => navigate('/category/dresses')}>
                Платья
              </Button>
              <Button variant="ghost" className="font-medium text-white hover:text-white/80">Верхняя одежда</Button>
              <Button variant="ghost" className="font-medium text-white hover:text-white/80">Низ</Button>
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
    </div>
  );
};

export default Catalog;