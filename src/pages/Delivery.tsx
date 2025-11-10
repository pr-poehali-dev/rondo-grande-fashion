import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Delivery = () => {
  const navigate = useNavigate();

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
              <Button variant="ghost" className="font-medium text-white hover:text-white/80" onClick={() => navigate('/catalog')}>
                Каталог
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-white hover:text-white/80" onClick={() => navigate('/account')}>
                <Icon name="User" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-white/80" onClick={() => navigate('/account')}>
                <Icon name="Heart" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-white/80" onClick={() => navigate('/cart')}>
                <Icon name="ShoppingBag" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="font-heading text-4xl font-bold mb-8">Доставка и оплата</h1>
        
        <section className="mb-8">
          <h2 className="font-heading text-2xl font-semibold mb-4">Способы доставки</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">Курьерская доставка</h3>
              <p className="text-muted-foreground mb-2">Доставка по Москве и МО - 350₽</p>
              <p className="text-muted-foreground">Бесплатно при заказе от 5000₽</p>
              <p className="text-muted-foreground">Срок доставки: 1-3 рабочих дня</p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">Доставка по России</h3>
              <p className="text-muted-foreground mb-2">СДЭК, Почта России</p>
              <p className="text-muted-foreground">Стоимость рассчитывается при оформлении заказа</p>
              <p className="text-muted-foreground">Срок доставки: 3-10 рабочих дней</p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">Пункты выдачи</h3>
              <p className="text-muted-foreground mb-2">Более 3000 пунктов выдачи по всей России</p>
              <p className="text-muted-foreground">Срок доставки: 3-7 рабочих дней</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-2xl font-semibold mb-4">Способы оплаты</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">Онлайн оплата картой</h3>
              <p className="text-muted-foreground">Visa, MasterCard, МИР</p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">Оплата при получении</h3>
              <p className="text-muted-foreground">Наличными или картой курьеру</p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">Оплата по QR-коду</h3>
              <p className="text-muted-foreground">СБП (Система Быстрых Платежей)</p>
            </div>
          </div>
        </section>

        <Button onClick={() => navigate('/')} className="mt-8">
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          На главную
        </Button>
      </main>
    </div>
  );
};

export default Delivery;
