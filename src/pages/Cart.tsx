import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem {
  id: number;
  product_id: number;
  size: string;
  quantity: number;
}

const allProducts: Product[] = [
  {
    id: 1,
    name: 'Платье миди с запахом',
    price: 8900,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/691f3ee5-ed1e-44b8-9454-b2e4654cc790.jpg',
  },
  {
    id: 2,
    name: 'Блуза классическая',
    price: 4900,
    image: 'https://cdn.poehali.dev/projects/7e807b46-3f0a-41ac-8536-649c73b68a4b/files/a611f61e-75a0-498e-9633-c1044afb2b86.jpg',
  },
];

const Cart = () => {
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState('');

  const loadCart = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/ee3bd9b6-73fd-44fb-9410-029d073db932', {
        headers: { 'X-Auth-Token': token }
      });
      const data = await response.json();
      if (response.ok) {
        setCartItems(data.cart || []);
      }
    } catch (error) {
      console.error('Ошибка загрузки корзины:', error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (isAuthenticated && token) {
      loadCart();
    }
  }, [isAuthenticated, token, loadCart]);

  const updateQuantity = async (cartId: number, newQuantity: number) => {
    if (!token) return;
    
    try {
      const response = await fetch('https://functions.poehali.dev/ee3bd9b6-73fd-44fb-9410-029d073db932', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token
        },
        body: JSON.stringify({ cart_id: cartId, quantity: newQuantity })
      });
      
      if (response.ok) {
        await loadCart();
      }
    } catch (error) {
      toast({ 
        title: 'Ошибка', 
        description: 'Не удалось обновить количество',
        variant: 'destructive'
      });
    }
  };

  const removeItem = async (cartId: number) => {
    if (!token) return;
    
    try {
      const response = await fetch(
        `https://functions.poehali.dev/ee3bd9b6-73fd-44fb-9410-029d073db932?cart_id=${cartId}`,
        {
          method: 'DELETE',
          headers: { 'X-Auth-Token': token }
        }
      );
      
      if (response.ok) {
        setCartItems(cartItems.filter(item => item.id !== cartId));
        toast({ title: 'Удалено из корзины' });
      }
    } catch (error) {
      toast({ 
        title: 'Ошибка', 
        description: 'Не удалось удалить товар',
        variant: 'destructive'
      });
    }
  };

  const getProductDetails = (productId: number): Product | undefined => {
    return allProducts.find(p => p.id === productId);
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const product = getProductDetails(item.product_id);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const freeShippingThreshold = 5000;
  const shipping = subtotal >= freeShippingThreshold ? 0 : 500;
  const total = subtotal + shipping;
  const freeShippingProgress = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  if (!isAuthenticated) {
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

        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Icon name="ShoppingBag" size={32} className="text-muted-foreground" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">Войдите, чтобы увидеть корзину</h3>
              <p className="text-muted-foreground mb-6">
                Для использования корзины необходимо войти в аккаунт
              </p>
              <Button onClick={() => navigate('/account')} className="w-full">
                Войти
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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

        {loading ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Загрузка...</p>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Icon name="ShoppingBag" size={32} className="text-muted-foreground" />
            </div>
            <h3 className="font-heading text-2xl font-semibold mb-2">Корзина пуста</h3>
            <p className="text-muted-foreground mb-6">Добавьте товары, чтобы продолжить покупки</p>
            <Button onClick={() => navigate('/catalog')}>
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

              {cartItems.map((item, index) => {
                const product = getProductDetails(item.product_id);
                if (!product) return null;

                return (
                  <Card key={item.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-24 h-32 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between mb-2">
                            <div>
                              <h3 className="font-heading font-semibold">{product.name}</h3>
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
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              >
                                <Icon name="Minus" size={14} />
                              </Button>
                              <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Icon name="Plus" size={14} />
                              </Button>
                            </div>

                            <div className="text-right">
                              <p className="font-bold">{(product.price * item.quantity).toLocaleString()}₽</p>
                              <p className="text-xs text-muted-foreground">
                                {product.price.toLocaleString()}₽ за шт.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
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

                  <Button className="w-full" size="lg" onClick={() => navigate('/checkout')}>
                    Оформить заказ
                  </Button>

                  <Button variant="outline" className="w-full" onClick={() => navigate('/catalog')}>
                    Продолжить покупки
                  </Button>
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
