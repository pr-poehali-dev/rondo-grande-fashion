import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

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
];

const Account = () => {
  const navigate = useNavigate();
  const { user, token, login, register, logout, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: '',
    phone: '',
    address: '',
    delivery_type: '',
    payment_type: ''
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);

  const loadFavorites = useCallback(async () => {
    if (!token) return;
    setLoadingFavorites(true);
    try {
      const response = await fetch('https://functions.poehali.dev/1acb2ff3-32cc-4c22-bc8e-ae0c0ed2725e', {
        headers: { 'X-Auth-Token': token }
      });
      const data = await response.json();
      if (response.ok) {
        setFavoriteIds(data.favorites || []);
      }
    } catch (error) {
      console.error('Ошибка загрузки избранного:', error);
    } finally {
      setLoadingFavorites(false);
    }
  }, [token]);

  const loadProfile = useCallback(async () => {
    if (!token) return;
    setLoadingProfile(true);
    try {
      const response = await fetch('https://functions.poehali.dev/ce78da1c-3a08-43fd-a3bf-dd0319dd105a', {
        headers: { 'X-Auth-Token': token }
      });
      const data = await response.json();
      if (response.ok) {
        setProfileData({
          name: data.name || '',
          phone: data.phone || '',
          address: data.address || '',
          delivery_type: data.delivery_type || '',
          payment_type: data.payment_type || ''
        });
      }
    } catch (error) {
      console.error('Ошибка загрузки профиля:', error);
    } finally {
      setLoadingProfile(false);
    }
  }, [token]);

  const updateProfile = async () => {
    if (!token) return;
    
    setLoadingProfile(true);
    try {
      const response = await fetch('https://functions.poehali.dev/ce78da1c-3a08-43fd-a3bf-dd0319dd105a', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token
        },
        body: JSON.stringify(profileData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast({ title: 'Профиль обновлён' });
        setIsEditingProfile(false);
      } else {
        toast({ 
          title: 'Ошибка', 
          description: data.error,
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({ 
        title: 'Ошибка', 
        description: 'Не удалось обновить профиль',
        variant: 'destructive'
      });
    } finally {
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && token) {
      loadFavorites();
      loadProfile();
    }
  }, [isAuthenticated, token, loadFavorites, loadProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        toast({ title: 'Вход выполнен успешно' });
      } else {
        await register(email, password, name);
        toast({ title: 'Регистрация выполнена успешно' });
      }
      setEmail('');
      setPassword('');
      setName('');
    } catch (error: any) {
      toast({ 
        title: 'Ошибка', 
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (productId: number) => {
    if (!token) return;
    
    try {
      const response = await fetch(
        `https://functions.poehali.dev/1acb2ff3-32cc-4c22-bc8e-ae0c0ed2725e?product_id=${productId}`,
        {
          method: 'DELETE',
          headers: { 'X-Auth-Token': token }
        }
      );
      
      if (response.ok) {
        setFavoriteIds(favoriteIds.filter(id => id !== productId));
        toast({ title: 'Удалено из избранного' });
      }
    } catch (error) {
      toast({ 
        title: 'Ошибка', 
        description: 'Не удалось удалить из избранного',
        variant: 'destructive'
      });
    }
  };

  const favoriteProducts = allProducts.filter(p => favoriteIds.includes(p.id));

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 border-b border-border" style={{backgroundColor: '#878070'}}>
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-4">
              <h1 
                className="font-heading text-2xl font-bold tracking-tight text-white cursor-pointer"
                onClick={() => navigate('/')}
              >
                RONDO GRANDE
              </h1>
              <Button variant="ghost" size="icon" className="text-white hover:text-white/80" onClick={() => navigate('/cart')}>
                <Icon name="ShoppingBag" size={20} />
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8">
              <h2 className="font-heading text-2xl font-bold mb-6 text-center">
                {isLogin ? 'Вход' : 'Регистрация'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Введите имя"
                      required={!isLogin}
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Пароль</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Загрузка...' : isLogin ? 'Войти' : 'Зарегистрироваться'}
                </Button>
              </form>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'}
                </button>
              </div>

              <Button 
                variant="outline" 
                className="w-full mt-4" 
                onClick={() => navigate('/')}
              >
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                На главную
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-white hover:text-white/80">
                <Icon name="User" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="relative text-white hover:text-white/80">
                <Icon name="Heart" size={20} />
                {favoriteIds.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favoriteIds.length}
                  </span>
                )}
              </Button>
              <Button variant="ghost" size="icon" className="relative text-white hover:text-white/80" onClick={() => navigate('/cart')}>
                <Icon name="ShoppingBag" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading text-3xl font-bold">Личный кабинет</h2>
          <Button variant="outline" onClick={logout}>
            <Icon name="LogOut" size={16} className="mr-2" />
            Выйти
          </Button>
        </div>

        <Tabs defaultValue="favorites" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Icon name="Heart" size={16} />
              Избранное
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Icon name="Package" size={16} />
              Заказы
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <Icon name="User" size={16} />
              Профиль
            </TabsTrigger>
          </TabsList>

          <TabsContent value="favorites" className="space-y-6">
            {loadingFavorites ? (
              <Card>
                <CardContent className="flex items-center justify-center py-16">
                  <p className="text-muted-foreground">Загрузка...</p>
                </CardContent>
              </Card>
            ) : favoriteProducts.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Icon name="Heart" size={32} className="text-muted-foreground" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-2">Список избранного пуст</h3>
                  <p className="text-muted-foreground mb-6 text-center">
                    Добавляйте товары в избранное, чтобы не потерять их
                  </p>
                  <Button onClick={() => navigate('/catalog')}>
                    Перейти в каталог
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {favoriteProducts.map((product) => (
                  <Card key={product.id} className="group overflow-hidden border-border hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <img 
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Button
                          size="icon"
                          variant="ghost"
                          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                          onClick={() => removeFavorite(product.id)}
                        >
                          <Icon name="X" size={18} />
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
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Icon name="Package" size={32} className="text-muted-foreground" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">У вас пока нет заказов</h3>
                <p className="text-muted-foreground mb-6 text-center">
                  Оформите первый заказ и отслеживайте его здесь
                </p>
                <Button onClick={() => navigate('/catalog')}>
                  Перейти в каталог
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardContent className="p-6 space-y-6">
                {loadingProfile ? (
                  <p className="text-muted-foreground">Загрузка...</p>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-lg font-semibold">Личные данные</h3>
                      {!isEditingProfile ? (
                        <Button variant="outline" onClick={() => setIsEditingProfile(true)}>
                          <Icon name="Edit" size={16} className="mr-2" />
                          Редактировать
                        </Button>
                      ) : (
                        <div className="flex gap-2">
                          <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
                            Отмена
                          </Button>
                          <Button onClick={updateProfile}>
                            Сохранить
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label>Email</Label>
                        <p className="mt-1 text-lg">{user?.email}</p>
                      </div>

                      {isEditingProfile ? (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="edit-name">Имя</Label>
                            <Input
                              id="edit-name"
                              value={profileData.name}
                              onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                              placeholder="Введите имя"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="edit-phone">Телефон</Label>
                            <Input
                              id="edit-phone"
                              value={profileData.phone}
                              onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                              placeholder="+7 (999) 123-45-67"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="edit-address">Адрес доставки</Label>
                            <Textarea
                              id="edit-address"
                              value={profileData.address}
                              onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                              placeholder="Город, улица, дом, квартира"
                              rows={3}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="delivery-type">Тип доставки</Label>
                            <Select
                              value={profileData.delivery_type}
                              onValueChange={(value) => setProfileData({...profileData, delivery_type: value})}
                            >
                              <SelectTrigger id="delivery-type">
                                <SelectValue placeholder="Выберите тип доставки" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="courier">Курьер</SelectItem>
                                <SelectItem value="pickup">Самовывоз</SelectItem>
                                <SelectItem value="post">Почта России</SelectItem>
                                <SelectItem value="cdek">СДЭК</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="payment-type">Тип оплаты</Label>
                            <Select
                              value={profileData.payment_type}
                              onValueChange={(value) => setProfileData({...profileData, payment_type: value})}
                            >
                              <SelectTrigger id="payment-type">
                                <SelectValue placeholder="Выберите тип оплаты" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="card">Банковская карта</SelectItem>
                                <SelectItem value="cash">Наличные при получении</SelectItem>
                                <SelectItem value="sbp">СБП (Система быстрых платежей)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <Label>Имя</Label>
                            <p className="mt-1 text-lg">{profileData.name || 'Не указано'}</p>
                          </div>

                          <div>
                            <Label>Телефон</Label>
                            <p className="mt-1 text-lg">{profileData.phone || 'Не указан'}</p>
                          </div>

                          <div>
                            <Label>Адрес доставки</Label>
                            <p className="mt-1 text-lg whitespace-pre-wrap">{profileData.address || 'Не указан'}</p>
                          </div>

                          <div>
                            <Label>Тип доставки</Label>
                            <p className="mt-1 text-lg">
                              {profileData.delivery_type === 'courier' && 'Курьер'}
                              {profileData.delivery_type === 'pickup' && 'Самовывоз'}
                              {profileData.delivery_type === 'post' && 'Почта России'}
                              {profileData.delivery_type === 'cdek' && 'СДЭК'}
                              {!profileData.delivery_type && 'Не выбран'}
                            </p>
                          </div>

                          <div>
                            <Label>Тип оплаты</Label>
                            <p className="mt-1 text-lg">
                              {profileData.payment_type === 'card' && 'Банковская карта'}
                              {profileData.payment_type === 'cash' && 'Наличные при получении'}
                              {profileData.payment_type === 'sbp' && 'СБП (Система быстрых платежей)'}
                              {!profileData.payment_type && 'Не выбран'}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Account;