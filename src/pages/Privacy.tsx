import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Privacy = () => {
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
        <h1 className="font-heading text-4xl font-bold mb-8">Политика конфиденциальности</h1>
        
        <div className="prose prose-slate max-w-none space-y-6">
          <section>
            <h2 className="font-heading text-2xl font-semibold mb-4">1. Общие положения</h2>
            <p className="text-muted-foreground mb-4">
              Настоящая Политика конфиденциальности персональных данных (далее — Политика) действует в отношении всей информации, которую интернет-магазин RONDO GRANDE может получить о Пользователе во время использования сайта.
            </p>
            <p className="text-muted-foreground">
              Использование сайта означает безоговорочное согласие Пользователя с настоящей Политикой и указанными в ней условиями обработки персональной информации.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-4">2. Персональные данные пользователей</h2>
            <p className="text-muted-foreground mb-4">
              Под персональными данными понимается информация, относящаяся к определённому физическому лицу. Мы собираем следующие данные:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Фамилия, имя, отчество</li>
              <li>Контактный телефон</li>
              <li>Адрес электронной почты</li>
              <li>Адрес доставки</li>
              <li>История заказов</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-4">3. Цели сбора персональной информации</h2>
            <p className="text-muted-foreground mb-4">
              Персональные данные Пользователя используются исключительно для:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Оформления и доставки заказов</li>
              <li>Связи с Покупателем для уточнения деталей заказа</li>
              <li>Информирования о статусе заказа</li>
              <li>Предоставления информации об акциях и новинках (при согласии пользователя)</li>
              <li>Улучшения качества обслуживания</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-4">4. Защита персональных данных</h2>
            <p className="text-muted-foreground mb-4">
              Мы принимаем все необходимые меры для защиты персональных данных Пользователя от несанкционированного доступа, изменения, раскрытия или уничтожения.
            </p>
            <div className="border rounded-lg p-6 bg-muted/50">
              <h3 className="font-semibold mb-3">Меры безопасности:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Icon name="Shield" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>Шифрование передаваемых данных (SSL/TLS)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Shield" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>Ограниченный доступ к базе данных</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Shield" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>Регулярное резервное копирование</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Shield" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>Защита от вредоносного ПО</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-4">5. Передача данных третьим лицам</h2>
            <p className="text-muted-foreground mb-4">
              Персональные данные Пользователя могут быть переданы третьим лицам только в следующих случаях:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Службам доставки для выполнения заказа</li>
              <li>Платежным системам для обработки платежей</li>
              <li>По требованию государственных органов в случаях, предусмотренных законом</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Мы не продаем и не передаем персональные данные третьим лицам в маркетинговых целях.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-4">6. Права пользователя</h2>
            <p className="text-muted-foreground mb-4">
              Пользователь имеет право:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Получать информацию о хранящихся персональных данных</li>
              <li>Требовать уточнения или удаления своих данных</li>
              <li>Отозвать согласие на обработку персональных данных</li>
              <li>Получать копию своих персональных данных</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-4">7. Использование cookies</h2>
            <p className="text-muted-foreground mb-4">
              Сайт использует файлы cookies для обеспечения функциональности и улучшения пользовательского опыта. Вы можете отключить cookies в настройках браузера, однако это может повлиять на работу сайта.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-4">8. Контактная информация</h2>
            <p className="text-muted-foreground mb-4">
              По всем вопросам, касающимся обработки персональных данных, вы можете обращаться:
            </p>
            <div className="border rounded-lg p-6 bg-muted/50">
              <p className="text-muted-foreground">Email: info@rondogrande.ru</p>
              <p className="text-muted-foreground">Телефон: +7 (XXX) XXX-XX-XX</p>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-4">9. Изменение политики конфиденциальности</h2>
            <p className="text-muted-foreground">
              Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. При внесении изменений обновляется дата последнего обновления. Рекомендуем регулярно проверять данную страницу.
            </p>
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

export default Privacy;
