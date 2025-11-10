import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Returns = () => {
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
        <h1 className="font-heading text-4xl font-bold mb-8">Возврат и обмен</h1>
        
        <section className="mb-8">
          <h2 className="font-heading text-2xl font-semibold mb-4">Условия возврата</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Вы можете вернуть товар надлежащего качества в течение 14 дней с момента получения заказа.
            </p>
            <div className="border rounded-lg p-6 bg-muted/50">
              <h3 className="font-semibold mb-3">Товар должен:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>Быть в том же состоянии, что и при получении</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>Иметь сохраненные фабричные ярлыки</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>Быть в оригинальной упаковке</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>Не иметь следов использования и стирки</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-2xl font-semibold mb-4">Как оформить возврат</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Свяжитесь с нами</h3>
                  <p className="text-muted-foreground">Напишите на почту или в мессенджер о желании вернуть товар</p>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Подготовьте товар</h3>
                  <p className="text-muted-foreground">Упакуйте товар в оригинальную упаковку с бирками</p>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Отправьте товар</h3>
                  <p className="text-muted-foreground">Передайте курьеру или отправьте в пункт выдачи</p>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Получите деньги</h3>
                  <p className="text-muted-foreground">Деньги вернутся на карту в течение 5-10 рабочих дней</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-2xl font-semibold mb-4">Обмен товара</h2>
          <p className="text-muted-foreground mb-4">
            Мы с радостью обменяем товар на другой размер или цвет. Свяжитесь с нами для уточнения наличия нужного товара.
          </p>
          <div className="border rounded-lg p-6 bg-muted/50">
            <p className="font-semibold">Обмен осуществляется бесплатно в течение 14 дней с момента получения заказа.</p>
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

export default Returns;
