import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const OfferAgreement = () => {
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
        <h1 className="font-heading text-4xl font-bold mb-8">Договор оферты</h1>
        
        <div className="prose prose-slate max-w-none space-y-6">
          <section>
            <h2 className="font-heading text-2xl font-semibold mb-4">1. Общие положения</h2>
            <p className="text-muted-foreground mb-4">
              Настоящий документ является официальным предложением (публичной офертой) интернет-магазина RONDO GRANDE и содержит все существенные условия по продаже товаров, представленных на сайте.
            </p>
            <p className="text-muted-foreground">
              В соответствии со статьей 437 Гражданского Кодекса Российской Федерации (ГК РФ) данный документ является публичной офертой, и в случае принятия изложенных ниже условий физическое лицо, производящее акцепт этой оферты, осуществляет оплату товара в соответствии с условиями настоящего Договора.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-4">2. Предмет договора</h2>
            <p className="text-muted-foreground mb-4">
              Продавец обязуется передать в собственность Покупателю товар, а Покупатель обязуется принять и оплатить товар на условиях настоящего Договора.
            </p>
            <p className="text-muted-foreground">
              Настоящий договор регулирует куплю-продажу товаров в интернет-магазине, в том числе:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Добровольный выбор Покупателем товаров в интернет-магазине</li>
              <li>Самостоятельное оформление Покупателем заказа в интернет-магазине</li>
              <li>Оплату Покупателем заказа, оформленного в интернет-магазине</li>
              <li>Обработку и доставку заказа Покупателю в собственность на условиях настоящего Договора</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-4">3. Оформление заказа</h2>
            <p className="text-muted-foreground mb-4">
              Покупатель имеет право оформить заказ на любой товар, представленный на сайте интернет-магазина и имеющийся в наличии.
            </p>
            <p className="text-muted-foreground">
              Заказ Покупателя может быть оформлен по телефону, через сайт или в мессенджерах. При оформлении заказа Покупатель указывает:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Фамилию, имя, отчество</li>
              <li>Адрес доставки</li>
              <li>Контактный телефон</li>
              <li>Адрес электронной почты (при наличии)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-4">4. Доставка и передача товара</h2>
            <p className="text-muted-foreground mb-4">
              Доставка товара осуществляется по адресу, указанному Покупателем при оформлении заказа. Сроки доставки зависят от выбранного способа доставки и региона.
            </p>
            <p className="text-muted-foreground">
              Право собственности на товар переходит к Покупателю с момента фактической передачи товара и оплаты полной стоимости товара.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-4">5. Возврат и обмен товара</h2>
            <p className="text-muted-foreground">
              Возврат и обмен товара осуществляется в соответствии с Законом РФ «О защите прав потребителей» от 07.02.1992 № 2300-1. Покупатель вправе отказаться от товара в течение 14 дней с момента получения.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-4">6. Ответственность сторон</h2>
            <p className="text-muted-foreground mb-4">
              Продавец не несет ответственности за ненадлежащее использование товаров Покупателем, приобретенных в интернет-магазине.
            </p>
            <p className="text-muted-foreground">
              Продавец не несет ответственности за содержание и функционирование внешних сайтов.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-4">7. Реквизиты продавца</h2>
            <div className="border rounded-lg p-6 bg-muted/50">
              <p className="text-muted-foreground">ИП Иванов Иван Иванович</p>
              <p className="text-muted-foreground">ИНН: XXXXXXXXXXXX</p>
              <p className="text-muted-foreground">ОГРНИП: XXXXXXXXXXXXXXX</p>
              <p className="text-muted-foreground">Адрес: г. Москва, ул. Примерная, д. 1</p>
              <p className="text-muted-foreground">Email: info@rondogrande.ru</p>
            </div>
          </section>

          <p className="text-sm text-muted-foreground mt-8">
            Дата последнего обновления: {new Date().toLocaleDateString('ru-RU')}
          </p>
        </div>

        <Button onClick={() => navigate('/')} className="mt-8">
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          На главную
        </Button>
      </main>
    </div>
  );
};

export default OfferAgreement;
