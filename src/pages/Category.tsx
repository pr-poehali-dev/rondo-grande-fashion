import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  sizes: string[];
  color: string;
  material: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Платье миди с запахом',
    price: 8900,
    oldPrice: 12900,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/691f3ee5-ed1e-44b8-9454-b2e4654cc790.jpg',
    category: 'Повседневные',
    sizes: ['48', '50', '52', '54', '56'],
    color: 'Бежевый',
    material: 'Хлопок',
    isNew: true,
  },
  {
    id: 2,
    name: 'Платье вечернее макси',
    price: 14900,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/691f3ee5-ed1e-44b8-9454-b2e4654cc790.jpg',
    category: 'Вечерние',
    sizes: ['52', '54', '56', '58'],
    color: 'Черный',
    material: 'Шелк',
    isBestseller: true,
  },
  {
    id: 3,
    name: 'Платье деловое миди',
    price: 9900,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/a611f61e-75a0-498e-9633-c1044afb2b86.jpg',
    category: 'Деловые',
    sizes: ['52', '54', '56', '58'],
    color: 'Синий',
    material: 'Шерсть',
  },
  {
    id: 4,
    name: 'Платье макси летнее',
    price: 7900,
    oldPrice: 10900,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/b348a6c0-a753-4572-804f-7934afe40ca1.jpg',
    category: 'Макси',
    sizes: ['52', '54', '56', '58'],
    color: 'Бежевый',
    material: 'Лен',
    isNew: true,
  },
];

const Category = () => {
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popularity');

  const sizes = ['52', '54', '56', '58'];
  const colors = ['Бежевый', 'Черный', 'Синий', 'Белый', 'Серый'];
  const categories = ['Повседневные', 'Вечерние', 'Деловые', 'Макси', 'Миди'];

  const toggleFilter = (value: string, list: string[], setter: (val: string[]) => void) => {
    if (list.includes(value)) {
      setter(list.filter(item => item !== value));
    } else {
      setter([...list, value]);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesSize = selectedSizes.length === 0 || product.sizes.some(s => selectedSizes.includes(s));
    const matchesColor = selectedColors.length === 0 || selectedColors.includes(product.color);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    return matchesPrice && matchesSize && matchesColor && matchesCategory;
  });

  const FiltersContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading font-semibold mb-4">Цена</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={20000}
          step={100}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{priceRange[0].toLocaleString()}₽</span>
          <span>{priceRange[1].toLocaleString()}₽</span>
        </div>
      </div>

      <div>
        <h3 className="font-heading font-semibold mb-4">Размер</h3>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map(size => (
            <Button
              key={size}
              variant={selectedSizes.includes(size) ? 'default' : 'outline'}
              size="sm"
              onClick={() => toggleFilter(size, selectedSizes, setSelectedSizes)}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-heading font-semibold mb-4">Цвет</h3>
        <div className="space-y-2">
          {colors.map(color => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox
                id={`color-${color}`}
                checked={selectedColors.includes(color)}
                onCheckedChange={() => toggleFilter(color, selectedColors, setSelectedColors)}
              />
              <label htmlFor={`color-${color}`} className="text-sm cursor-pointer">
                {color}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-heading font-semibold mb-4">Категория</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`cat-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleFilter(category, selectedCategories, setSelectedCategories)}
              />
              <label htmlFor={`cat-${category}`} className="text-sm cursor-pointer">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 
              className="font-heading text-2xl font-bold tracking-tight cursor-pointer"
              onClick={() => navigate('/')}
            >
              RONDO GRANDE
            </h1>
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate('/')} className="cursor-pointer">Главная</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Платья</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-6">
          <h2 className="font-heading text-4xl font-bold mb-3">Платья</h2>
          <p className="text-muted-foreground">
            Элегантные платья для любого случая. Размеры от 48 до 64, премиальные ткани, идеальная посадка.
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <Icon name="SlidersHorizontal" size={16} className="mr-2" />
                  Фильтры
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Фильтры</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FiltersContent />
                </div>
              </SheetContent>
            </Sheet>
            
            {(selectedSizes.length > 0 || selectedColors.length > 0 || selectedCategories.length > 0) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedSizes([]);
                  setSelectedColors([]);
                  setSelectedCategories([]);
                  setPriceRange([0, 20000]);
                }}
              >
                Сбросить фильтры
              </Button>
            )}
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">По популярности</SelectItem>
              <SelectItem value="newest">По новизне</SelectItem>
              <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
              <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <aside className="hidden lg:block col-span-3">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <FiltersContent />
              </CardContent>
            </Card>
          </aside>

          <main className="col-span-12 lg:col-span-9">
            <div className="mb-4 text-sm text-muted-foreground">
              Найдено товаров: {filteredProducts.length}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <Card 
                  key={product.id} 
                  className="group cursor-pointer overflow-hidden border-border hover:shadow-lg transition-shadow animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
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
                      >
                        <Icon name="Heart" size={18} />
                      </Button>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
                      <h3 className="font-heading font-semibold mb-2">{product.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold">{product.price.toLocaleString()}₽</span>
                        {product.oldPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {product.oldPrice.toLocaleString()}₽
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Размеры: {product.sizes.join(', ')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button size="lg" variant="outline">
                Показать ещё 12 товаров
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Category;