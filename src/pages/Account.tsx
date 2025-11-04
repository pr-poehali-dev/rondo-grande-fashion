import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

const favoriteProducts: Product[] = [
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
  const [favorites, setFavorites] = useState<Product[]>(favoriteProducts);

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

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
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favorites.length}
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
        <h2 className="font-heading text-3xl font-bold mb-8">Личный кабинет</h2>

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
            {favorites.length === 0 ? (
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
                {favorites.map((product) => (
                  <Card key={product.id} className="group overflow-hidden border-border hover:shadow-lg transition-shadow">
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
                        <p className="text-xs text-muted-foreground mt-2">
                          Размеры: {product.sizes.join(', ')}
                        </p>
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
                <div>
                  <h3 className="font-heading text-lg font-semibold mb-4">Личные данные</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b">
                      <div>
                        <p className="font-medium">Имя</p>
                        <p className="text-sm text-muted-foreground">Анна Иванова</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Icon name="Edit" size={16} />
                      </Button>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b">
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">anna@example.com</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Icon name="Edit" size={16} />
                      </Button>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b">
                      <div>
                        <p className="font-medium">Телефон</p>
                        <p className="text-sm text-muted-foreground">+7 (999) 123-45-67</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Icon name="Edit" size={16} />
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-heading text-lg font-semibold mb-4">Адреса доставки</h3>
                  <Button variant="outline" className="w-full">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить адрес
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <Button variant="destructive" className="w-full">
                    Выйти из аккаунта
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Account;
