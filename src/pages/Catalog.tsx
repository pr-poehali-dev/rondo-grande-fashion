import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  const { token, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [showAddToCartDialog, setShowAddToCartDialog] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 20000]);
  const [showFilters, setShowFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSizeTable, setShowSizeTable] = useState(false);
  const itemsPerPage = 6;

  const categories = ['Платья', 'Юбки и брюки', 'Кардиганы и жилеты', 'Жакеты', 'Блузы и рубашки', 'Свитшоты, худи и лонгсливы'];
  const sizes = ['52', '54', '56', '58'];
  const colors = ['белый', 'бирюзовый', 'бордовый', 'голубой', 'графит', 'какао', 'капучино', 'кремовый', 'медовый', 'молочный', 'пудровый', 'сливочный', 'хаки', 'черный'];

  const loadFavorites = useCallback(async () => {
    if (!token) return;
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
    }
  }, [token]);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategories([category]);
    }
  }, [searchParams]);

  useEffect(() => {
    if (isAuthenticated && token) {
      loadFavorites();
    }
  }, [isAuthenticated, token, loadFavorites]);

  const addToCart = async (product: Product) => {
    if (!isAuthenticated) {
      toast({ title: 'Войдите в аккаунт', description: 'Для добавления в корзину необходимо войти' });
      navigate('/account');
      return;
    }
    setSelectedProduct(product);
    setSelectedSize(product.sizes[0]);
    setShowAddToCartDialog(true);
  };

  const confirmAddToCart = async () => {
    if (!token || !selectedProduct) return;
    
    try {
      const response = await fetch('https://functions.poehali.dev/ee3bd9b6-73fd-44fb-9410-029d073db932', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token
        },
        body: JSON.stringify({
          product_id: selectedProduct.id,
          size: selectedSize,
          quantity: 1
        })
      });
      
      if (response.ok) {
        toast({ title: 'Товар добавлен в корзину' });
        setCartCount(prev => prev + 1);
        setShowAddToCartDialog(false);
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось добавить в корзину', variant: 'destructive' });
    }
  };

  const toggleFavorite = async (productId: number) => {
    if (!isAuthenticated) {
      toast({ title: 'Войдите в аккаунт', description: 'Для добавления в избранное необходимо войти' });
      navigate('/account');
      return;
    }

    if (!token) return;
    
    const isFavorite = favoriteIds.includes(productId);
    
    try {
      if (isFavorite) {
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
      } else {
        const response = await fetch('https://functions.poehali.dev/1acb2ff3-32cc-4c22-bc8e-ae0c0ed2725e', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': token
          },
          body: JSON.stringify({ product_id: productId })
        });
        
        if (response.ok) {
          setFavoriteIds([...favoriteIds, productId]);
          toast({ title: 'Добавлено в избранное' });
        }
      }
    } catch (error) {
      toast({ title: 'Ошибка', variant: 'destructive' });
    }
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

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, selectedSizes, selectedColors, priceRange]);

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
              {currentProducts.map((product, index) => (
            <Card 
              key={product.id} 
              className="group overflow-hidden border-border hover:shadow-lg transition-shadow animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                <div className="relative aspect-[3/4] overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
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
                    className={`absolute top-2 right-2 bg-white/80 hover:bg-white ${favoriteIds.includes(product.id) ? 'text-red-500' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                  >
                    <Icon name={favoriteIds.includes(product.id) ? "Heart" : "Heart"} size={18} fill={favoriteIds.includes(product.id) ? "currentColor" : "none"} />
                  </Button>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
                  <h3 className="font-heading font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-bold">{product.price.toLocaleString()}₽</span>
                    {product.oldPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {product.oldPrice.toLocaleString()}₽
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    Размеры: {product.sizes.join(', ')}
                  </p>
                  <Button 
                    className="w-full" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    <Icon name="ShoppingBag" size={16} className="mr-2" />
                    В корзину
                  </Button>
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

            {filteredProducts.length > 0 && totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <Icon name="ChevronLeft" size={16} />
                </Button>
                
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="min-w-[2.5rem]"
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  <Icon name="ChevronRight" size={16} />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog open={!!selectedProduct && !showAddToCartDialog} onOpenChange={() => setSelectedProduct(null)}>
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
                    <p className="font-medium mb-3">Доступные размеры:</p>
                    <p className="text-sm text-muted-foreground">{selectedProduct.sizes.join(', ')}</p>
                    <Button variant="link" className="mt-2 p-0 h-auto text-sm" onClick={(e) => { e.stopPropagation(); setShowSizeTable(true); }}>
                      Таблица размеров
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <Button size="lg" className="w-full" onClick={() => addToCart(selectedProduct)}>
                      <Icon name="ShoppingBag" size={20} className="mr-2" />
                      Добавить в корзину
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => toggleFavorite(selectedProduct.id)}
                    >
                      <Icon name="Heart" size={20} className="mr-2" fill={favoriteIds.includes(selectedProduct.id) ? "currentColor" : "none"} />
                      {favoriteIds.includes(selectedProduct.id) ? 'В избранном' : 'В избранное'}
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

      <Dialog open={showAddToCartDialog} onOpenChange={setShowAddToCartDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Выберите размер</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4">
              <div className="flex gap-4">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-20 h-28 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-semibold">{selectedProduct.name}</p>
                  <p className="text-lg font-bold mt-1">{selectedProduct.price.toLocaleString()}₽</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Размер</Label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите размер" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedProduct.sizes.map(size => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setShowAddToCartDialog(false)}>
                  Отмена
                </Button>
                <Button className="flex-1" onClick={confirmAddToCart}>
                  Добавить
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showSizeTable} onOpenChange={setShowSizeTable}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl text-center">Таблица размеров</DialogTitle>
          </DialogHeader>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-4 px-6 text-left font-semibold">Российский размер</th>
                  <th className="py-4 px-6 text-left font-semibold">Обхват груди (см)</th>
                  <th className="py-4 px-6 text-left font-semibold">Обхват талии (см)</th>
                  <th className="py-4 px-6 text-left font-semibold">Обхват бедер (см)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-4 px-6 text-center text-lg">50</td>
                  <td className="py-4 px-6 text-center text-muted-foreground">98-102</td>
                  <td className="py-4 px-6 text-center text-muted-foreground">78-83</td>
                  <td className="py-4 px-6 text-center text-muted-foreground">106-110</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-4 px-6 text-center text-lg">52</td>
                  <td className="py-4 px-6 text-center text-muted-foreground">102-106</td>
                  <td className="py-4 px-6 text-center text-muted-foreground">84-90</td>
                  <td className="py-4 px-6 text-center text-muted-foreground">110-114</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-4 px-6 text-center text-lg">54</td>
                  <td className="py-4 px-6 text-center text-muted-foreground">106-110</td>
                  <td className="py-4 px-6 text-center text-muted-foreground">90-95</td>
                  <td className="py-4 px-6 text-center text-muted-foreground">114-118</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-4 px-6 text-center text-lg">56</td>
                  <td className="py-4 px-6 text-center text-muted-foreground">110-114</td>
                  <td className="py-4 px-6 text-center text-muted-foreground">95-100</td>
                  <td className="py-4 px-6 text-center text-muted-foreground">118-122</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-4 px-6 text-center text-lg">58</td>
                  <td className="py-4 px-6 text-center text-muted-foreground">114-118</td>
                  <td className="py-4 px-6 text-center text-muted-foreground">100-105</td>
                  <td className="py-4 px-6 text-center text-muted-foreground">122-126</td>
                </tr>
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Catalog;