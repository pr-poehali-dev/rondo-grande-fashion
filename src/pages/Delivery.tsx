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
        
        <p className="text-muted-foreground mb-8">
          Доставка по России осуществляется транспортной компанией СДЭК или Почтой России от 2-х до 10 рабочих дней (не считая дня оформления заказа). На данный момент доступны следующие способы доставки:
        </p>

        <section className="mb-8">
          <h2 className="font-heading text-2xl font-semibold mb-4">Способы доставки</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Icon name="Package" size={24} className="text-primary" />
                Почта России
              </h3>
              <p className="text-muted-foreground mb-3">
                В случае доставки почтой посылка отправляется в Ваше ближайшее почтовое отделение. После отправки заказа с нашего склада Вы получите электронное письмо с почтовым идентификатором для отслеживания отправления. После поступления посылки в почтовое отделение Вы получите извещение и сможете забрать свой заказ. При получении Вам понадобится документ, удостоверяющий Вашу личность.
              </p>
              <p className="text-muted-foreground mb-2">
                Стоимость зависит от региона и рассчитывается индивидуально при оформлении заказа на нашем сайте.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mt-3">
                <p className="font-semibold text-primary mb-2">Бесплатная доставка!</p>
                <p className="text-sm text-muted-foreground">
                  Мы предлагаем бесплатную доставку Почтой России любого заказа при оплате покупки на сумму от 10 000 рублей онлайн.
                </p>
              </div>
              <Button 
                variant="link" 
                className="mt-3 p-0 h-auto"
                onClick={() => window.open('https://www.pochta.ru/parcels', '_blank')}
              >
                Подробнее о тарифах и сроках доставки →
              </Button>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Icon name="MapPin" size={24} className="text-primary" />
                Пункты выдачи СДЭК
              </h3>
              <p className="text-muted-foreground mb-3">
                Пункты выдачи – это места, куда вы можете прийти в удобное для Вас время и получить свой заказ. Вы можете посмотреть список доступных пунктов выдачи, часы работы, адреса — при оформлении заказа, выбрав свой город.
              </p>
              <p className="text-muted-foreground mb-3">
                В ПВЗ есть примерочная зона и возможна оплата банковской картой. В ПВЗ вы можете самостоятельно получить заказ в удобное для вас время, без очередей и ожидания курьера.
              </p>
              <Button 
                variant="link" 
                className="mt-3 p-0 h-auto"
                onClick={() => window.open('https://www.cdek.ru/ru/offices/', '_blank')}
              >
                Посмотреть пункты выдачи СДЭК →
              </Button>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-2xl font-semibold mb-4">Сроки доставки</h2>
          <div className="border rounded-lg p-6 bg-muted/50">
            <p className="text-muted-foreground mb-2">
              Срок доставки рассчитывается индивидуально при вводе адреса и зависит от выбранной вами доставочной компании (дополнительно 1-2 дня на обработку заказа).
            </p>
            <p className="text-muted-foreground mb-2">
              <span className="font-semibold">В среднем, время доставки занимает 2-10 дней.</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Обращаем ваше внимание, что срок доставки в удаленные регионы может быть увеличен.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-2xl font-semibold mb-4">Оплата заказа</h2>
          <p className="text-muted-foreground mb-4">Оплатить заказ вы можете следующими способами:</p>
          <div className="space-y-4">
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <Icon name="Banknote" size={24} className="text-primary" />
                Наличными курьеру при получении товара
              </h3>
              <p className="text-muted-foreground">
                Оплата заказа производится наличными в рублях в момент получения заказа, при выборе доставки курьерской службой или ПВЗ.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <Icon name="CreditCard" size={24} className="text-primary" />
                Банковской картой при получении товара
              </h3>
              <p className="text-muted-foreground">
                Оплата заказа производится с помощью банковской карты в момент получения заказа, при выборе доставки курьерской службой или ПВЗ.
              </p>
            </div>
          </div>

          <div className="border rounded-lg p-6 bg-muted/50 mt-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Icon name="Info" size={20} className="text-primary" />
              Преимущества ПВЗ СДЭК
            </h3>
            <p className="text-muted-foreground mb-3">
              При использовании курьерской службы СДЭК возможна доставка до пункта выдачи заказов (ПВЗ). Это удобный способ получения заказов, который популярен среди наших клиентов. Именно поэтому их перечень постоянно растет, а комфортабельность и функционал совершенствуются. В ПВЗ есть примерочная зона и возможна оплата банковской картой.{' '}
              <Button 
                variant="link" 
                className="p-0 h-auto inline"
                onClick={() => window.open('https://www.cdek.ru/ru/offices/', '_blank')}
              >
                Посмотреть пункты выдачи заказов СДЭК в вашем населенном пункте можно здесь.
              </Button>
            </p>
            <p className="text-muted-foreground">
              В ПВЗ вы можете самостоятельно получить заказ в удобное для вас время, без очередей и ожидания курьера.
            </p>
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