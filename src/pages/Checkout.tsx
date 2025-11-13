import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const { user, token, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('courier');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && token) {
      loadProfileData();
    }
  }, [isAuthenticated, token]);

  const loadProfileData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/ce78da1c-3a08-43fd-a3bf-dd0319dd105a', {
        headers: { 'X-Auth-Token': token! }
      });
      const data = await response.json();
      
      if (response.ok) {
        setName(data.name || '');
        setPhone(data.phone || '');
        setEmail(data.email || '');
        setAddress(data.address || '');
        
        if (data.delivery_type) {
          setDeliveryMethod(data.delivery_type);
        }
        if (data.payment_type) {
          setPaymentMethod(data.payment_type);
        }
        
        toast({ 
          title: 'Данные загружены из профиля',
          description: 'Проверьте и при необходимости измените данные'
        });
      }
    } catch (error) {
      console.error('Ошибка загрузки данных профиля:', error);
    } finally {
      setLoading(false);
    }
  };

  const orderItems = [
    {
      id: 1,
      name: 'Платье миди с запахом',
      price: 8900,
      size: '52',
      quantity: 1,
    },
    {
      id: 2,
      name: 'Блуза классическая',
      price: 4900,
      size: '54',
      quantity: 2,
    },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCost = deliveryMethod === 'courier' ? 500 : 0;
  const total = subtotal + deliveryCost;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border" style={{backgroundColor: '#878070'}}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 
              className="font-heading text-2xl font-bold tracking-tight text-white cursor-pointer"
              onClick={() => navigate('/')}
            >
              RONDO GRANDE
            </h1>
            <Button variant="ghost" size="icon" className="text-white hover:text-white/80" onClick={() => navigate('/cart')}>
              <Icon name="ArrowLeft" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading text-3xl font-bold">Оформление заказа</h2>
          {isAuthenticated && (
            <p className="text-sm text-muted-foreground">
              {loading ? 'Загрузка данных...' : 'Данные из профиля загружены'}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="User" size={20} />
                  Контактные данные
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Имя</Label>
                  <Input 
                    id="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Введите имя" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (999) 123-45-67" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="anna@example.com" 
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Truck" size={20} />
                  Способ доставки
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
                  <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4 cursor-pointer hover:bg-accent/50 transition-colors">
                    <RadioGroupItem value="courier" id="courier" />
                    <Label htmlFor="courier" className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">Курьером</p>
                          <p className="text-sm text-muted-foreground">Доставка 2-5 дней</p>
                        </div>
                        <p className="font-semibold">500₽</p>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4 cursor-pointer hover:bg-accent/50 transition-colors mt-3">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">Самовывоз</p>
                          <p className="text-sm text-muted-foreground">Пункт выдачи, 1-3 дня</p>
                        </div>
                        <p className="font-semibold text-green-600">Бесплатно</p>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4 cursor-pointer hover:bg-accent/50 transition-colors mt-3">
                    <RadioGroupItem value="post" id="post" />
                    <Label htmlFor="post" className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">Почта России</p>
                          <p className="text-sm text-muted-foreground">Доставка 5-14 дней</p>
                        </div>
                        <p className="font-semibold">300₽</p>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4 cursor-pointer hover:bg-accent/50 transition-colors mt-3">
                    <RadioGroupItem value="cdek" id="cdek" />
                    <Label htmlFor="cdek" className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">СДЭК</p>
                          <p className="text-sm text-muted-foreground">Доставка 3-7 дней</p>
                        </div>
                        <p className="font-semibold">400₽</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {(deliveryMethod === 'courier' || deliveryMethod === 'post' || deliveryMethod === 'cdek') && (
                  <div className="mt-6 space-y-4 animate-fade-in">
                    <div className="space-y-2">
                      <Label htmlFor="address">Адрес доставки</Label>
                      <Input 
                        id="address" 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Город, улица, дом, квартира" 
                      />
                    </div>
                  </div>
                )}

                {deliveryMethod === 'pickup' && (
                  <div className="mt-6 animate-fade-in">
                    <div className="space-y-2">
                      <Label htmlFor="pickupPoint">Выберите пункт выдачи</Label>
                      <Input id="pickupPoint" placeholder="Москва, ул. Тверская, 1" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="CreditCard" size={20} />
                  Способ оплаты
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4 cursor-pointer hover:bg-accent/50 transition-colors">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <p className="font-semibold">Картой онлайн</p>
                      <p className="text-sm text-muted-foreground">Visa, Mastercard, МИР</p>
                    </Label>
                  </div>
                  
                  <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4 cursor-pointer hover:bg-accent/50 transition-colors mt-3">
                    <RadioGroupItem value="sbp" id="sbp" />
                    <Label htmlFor="sbp" className="flex-1 cursor-pointer">
                      <p className="font-semibold">СБП</p>
                      <p className="text-sm text-muted-foreground">Система быстрых платежей</p>
                    </Label>
                  </div>
                  
                  <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4 cursor-pointer hover:bg-accent/50 transition-colors mt-3">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex-1 cursor-pointer">
                      <p className="font-semibold">При получении</p>
                      <p className="text-sm text-muted-foreground">Наличными или картой курьеру</p>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-5">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Ваш заказ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-muted-foreground">
                          Размер: {item.size} • {item.quantity} шт.
                        </p>
                      </div>
                      <p className="font-semibold">{(item.price * item.quantity).toLocaleString()}₽</p>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Товары ({orderItems.length})</span>
                    <span>{subtotal.toLocaleString()}₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Доставка</span>
                    <span>{deliveryCost === 0 ? 'Бесплатно' : `${deliveryCost}₽`}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Итого</span>
                  <span>{total.toLocaleString()}₽</span>
                </div>

                <Button className="w-full" size="lg">
                  Подтвердить заказ
                </Button>

                <div className="space-y-2 pt-4 border-t">
                  <div className="flex gap-2 text-sm text-muted-foreground">
                    <Icon name="ShieldCheck" size={16} className="flex-shrink-0 mt-0.5" />
                    <p>Безопасная оплата через защищённое соединение</p>
                  </div>
                  <div className="flex gap-2 text-sm text-muted-foreground">
                    <Icon name="RefreshCw" size={16} className="flex-shrink-0 mt-0.5" />
                    <p>Возврат в течение 30 дней</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;