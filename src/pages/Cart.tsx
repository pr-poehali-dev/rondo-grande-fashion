import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Платье миди с запахом',
      price: 8900,
      image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/691f3ee5-ed1e-44b8-9454-b2e4654cc790.jpg',
      size: '52',
      quantity: 1,
    },
    {
      id: 2,
      name: 'Блуза классическая',
      price: 4900,
      image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/a611f61e-75a0-498e-9633-c1044afb2b86.jpg',
      size: '50',
      quantity: 2,
    },
  ]);

  const [promoCode, setPromoCode] = useState('');

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 5000;
  const shipping = subtotal >= freeShippingThreshold ? 0 : 500;
  const total = subtotal + shipping;

  const freeShippingProgress = Math.min((subtotal / freeShippingThreshold) * 100, 100);

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

      <div className="container mx-auto px-4 py-8">
        <h2 className="font-heading text-3xl font-bold mb-8">Корзина</h2>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Icon name="ShoppingBag" size={32} className="text-muted-foreground" />
            </div>
            <h3 className="font-heading text-2xl font-semibold mb-2">Корзина пуста</h3>
            <p className="text-muted-foreground mb-6">Добавьте товары, чтобы продолжить покупки</p>
            <Button onClick={() => navigate('/')}>
              Перейти в каталог
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-4">
              {subtotal < freeShippingThreshold && (
                <Card className="bg-accent/50 border-primary/20 animate-fade-in">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon name="Truck" size={20} className="text-primary" />
                      <p className="text-sm font-medium">
                        До бесплатной доставки осталось: {(freeShippingThreshold - subtotal).toLocaleString()}₽
                      </p>
                    </div>
                    <Progress value={freeShippingProgress} className="h-2" />
                  </CardContent>
                </Card>
              )}

              {cartItems.map((item, index) => (
                <Card key={item.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-32 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <div>
                            <h3 className="font-heading font-semibold">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">Размер: {item.size}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                          >
                            <Icon name="Trash2" size={18} />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2 border border-border rounded">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Icon name="Minus" size={14} />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Icon name="Plus" size={14} />
                            </Button>
                          </div>

                          <div className="text-right">
                            <p className="font-bold">{(item.price * item.quantity).toLocaleString()}₽</p>
                            <p className="text-xs text-muted-foreground">
                              {item.price.toLocaleString()}₽ за шт.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-4">
              <Card className="sticky top-24">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="font-heading font-semibold mb-4">Итого</h3>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Товары ({cartItems.length})</span>
                        <span>{subtotal.toLocaleString()}₽</span>
                      </div>
                      

                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Доставка</span>
                        <span>{shipping === 0 ? 'Бесплатно' : `${shipping}₽`}</span>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex justify-between text-lg font-bold">
                      <span>К оплате</span>
                      <span>{total.toLocaleString()}₽</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Input
                      placeholder="У вас есть промокод?"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                  </div>

                  <Button className="w-full" size="lg">
                    Оформить заказ
                  </Button>

                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex gap-3 text-sm">
                      <Icon name="Truck" size={18} className="text-primary flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Доставка 2-5 дней</p>
                        <p className="text-muted-foreground text-xs">По России</p>
                      </div>
                    </div>
                    <div className="flex gap-3 text-sm">
                      <Icon name="RefreshCw" size={18} className="text-primary flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Возврат 30 дней</p>
                        <p className="text-muted-foreground text-xs">Без вопросов</p>
                      </div>
                    </div>
                    <div className="flex gap-3 text-sm">
                      <Icon name="CreditCard" size={18} className="text-primary flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Безопасная оплата</p>
                        <p className="text-muted-foreground text-xs">SSL-шифрование</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;