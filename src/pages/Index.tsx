import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
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

const heroSlides = [
  {
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/63d33282-3ae8-4598-832b-4fb76c5a8ea9.jpg',
    title: 'Стиль без компромиссов',
    subtitle: 'Элегантность для активной жизни'
  },
  {
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/51cbc8b0-2b20-45cd-8aa6-f863323793ce.jpg',
    title: 'Вечерняя коллекция',
    subtitle: 'Роскошь в каждой детали'
  },
  {
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/33d7474f-276b-4729-9b3f-4ada10105be7.jpg',
    title: 'Базовый гардероб',
    subtitle: 'Классика, которая всегда в моде'
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  const addToWishlist = () => {
    setWishlistCount(prev => prev + 1);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border" style={{backgroundColor: '#878070'}}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-8">
              <h1 className="font-heading text-2xl font-bold tracking-tight text-white">RONDO GRANDE</h1>
            </div>

            <nav className="hidden lg:flex items-center gap-6">
              <Button variant="ghost" className="font-medium text-white hover:text-white/80">Новинки</Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="font-medium text-white hover:text-white/80" onClick={() => navigate('/category/dresses')}>
                    Платья <Icon name="ChevronDown" size={16} className="ml-1" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="top" className="h-auto">
                  <SheetHeader>
                    <SheetTitle>Платья</SheetTitle>
                  </SheetHeader>
                  <div className="grid grid-cols-4 gap-4 mt-6">
                    {['Повседневные', 'Вечерние', 'Деловые', 'Макси', 'Миди'].map(item => (
                      <Button key={item} variant="ghost" className="justify-start">
                        {item}
                      </Button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
              <Button variant="ghost" className="font-medium text-white hover:text-white/80">Верхняя одежда</Button>
              <Button variant="ghost" className="font-medium text-white hover:text-white/80">Низ</Button>
              <Button variant="ghost" className="text-destructive font-semibold">Распродажа</Button>
            </nav>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-white hover:text-white/80" onClick={() => navigate('/account')}>
                <Icon name="User" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="relative text-white hover:text-white/80" onClick={() => navigate('/account')}>
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

      <main>
        <section className="relative h-[600px] overflow-hidden">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="text-center text-white animate-fade-in">
                  <h2 className="font-heading text-5xl md:text-6xl font-bold mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-xl mb-8">{slide.subtitle}</p>
                  <Button size="lg" className="bg-white text-foreground hover:bg-white/90" onClick={() => navigate('/catalog')}>
                    Смотреть коллекцию
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
            onClick={prevSlide}
          >
            <Icon name="ChevronLeft" size={32} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
            onClick={nextSlide}
          >
            <Icon name="ChevronRight" size={32} />
          </Button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </section>

        <section className="py-16 bg-accent/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center animate-fade-in">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="Ruler" size={28} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">Идеальная посадка</h3>
                <p className="text-muted-foreground">Размеры от 48 до 64, точные таблицы</p>
              </div>
              <div className="text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="Sparkles" size={28} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">Премиальное качество</h3>
                <p className="text-muted-foreground">Натуральные ткани, продуманный крой</p>
              </div>
              <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="Truck" size={28} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">Быстрая доставка</h3>
                <p className="text-muted-foreground">По России от 2-х дней</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-3xl font-bold text-center mb-12">Популярные категории</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['Платья', 'Верхняя одежда', 'Низ'].map((category, index) => (
                <Card 
                  key={category} 
                  className="group cursor-pointer overflow-hidden border-border hover:shadow-lg transition-shadow animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src="https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/a611f61e-75a0-498e-9633-c1044afb2b86.jpg"
                        alt={category}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-heading font-semibold">{category}</h3>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-accent/50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-heading text-3xl font-bold">Новинки</h2>
              <Button variant="link" className="font-medium" onClick={() => navigate('/catalog')}>
                Смотреть все <Icon name="ArrowRight" size={16} className="ml-2" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
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
          </div>
        </section>


      </main>

      <footer className="bg-muted py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
            <div>
              <h4 className="font-heading font-semibold mb-4">О бренде</h4>
              <ul className="space-y-2 text-sm">
                <li><Button variant="link" className="p-0 h-auto">О нас</Button></li>
                <li><Button variant="link" className="p-0 h-auto">Карьера</Button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-4">Помощь</h4>
              <ul className="space-y-2 text-sm">
                <li><Button variant="link" className="p-0 h-auto">FAQ</Button></li>
                <li><Button variant="link" className="p-0 h-auto">Доставка и оплата</Button></li>
                <li><Button variant="link" className="p-0 h-auto">Возврат и обмен</Button></li>
                <li><Button variant="link" className="p-0 h-auto">Таблица размеров</Button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-4">Покупателям</h4>
              <ul className="space-y-2 text-sm">
                <li><Button variant="link" className="p-0 h-auto">Личный кабинет</Button></li>
                <li><Button variant="link" className="p-0 h-auto">Отследить заказ</Button></li>
                <li><Button variant="link" className="p-0 h-auto">Программа лояльности</Button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-4">Категории</h4>
              <ul className="space-y-2 text-sm">
                <li><Button variant="link" className="p-0 h-auto">Платья</Button></li>
                <li><Button variant="link" className="p-0 h-auto">Верхняя одежда</Button></li>
                <li><Button variant="link" className="p-0 h-auto">Низ</Button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-4">Мы в соцсетях</h4>
              <div className="flex gap-3">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Icon name="Facebook" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Icon name="MessageCircle" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2024 RONDO GRANDE. Все права защищены.</p>
          </div>
        </div>
      </footer>

      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading text-2xl">{selectedProduct.name}</DialogTitle>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <img 
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full rounded-lg"
                  />
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">{selectedProduct.category}</p>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl font-bold">{selectedProduct.price.toLocaleString()}₽</span>
                      {selectedProduct.oldPrice && (
                        <span className="text-xl text-muted-foreground line-through">
                          {selectedProduct.oldPrice.toLocaleString()}₽
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2 mb-6">
                      {selectedProduct.isNew && <Badge className="bg-primary">Новинка</Badge>}
                      {selectedProduct.isBestseller && <Badge variant="secondary">Хит продаж</Badge>}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Выберите размер</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map(size => (
                        <Button 
                          key={size} 
                          variant="outline" 
                          className="w-16 h-12 font-semibold hover:bg-primary hover:text-primary-foreground"
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                    <Button variant="link" className="mt-2 p-0 h-auto text-sm">
                      Таблица размеров
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90" 
                      size="lg"
                      onClick={() => {
                        addToCart();
                        setSelectedProduct(null);
                      }}
                    >
                      Добавить в корзину
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      Купить в 1 клик
                    </Button>
                  </div>

                  <div className="border-t pt-6 space-y-4">
                    <div className="flex gap-3 text-sm">
                      <Icon name="Truck" size={20} className="text-primary flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Доставка 2-5 дней</p>
                        <p className="text-muted-foreground">Бесплатно от 5000₽</p>
                      </div>
                    </div>
                    <div className="flex gap-3 text-sm">
                      <Icon name="RefreshCw" size={20} className="text-primary flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Возврат 30 дней</p>
                        <p className="text-muted-foreground">Без вопросов</p>
                      </div>
                    </div>
                    <div className="flex gap-3 text-sm">
                      <Icon name="ShieldCheck" size={20} className="text-primary flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Гарантия качества</p>
                        <p className="text-muted-foreground">Премиальные материалы</p>
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

export default Index;