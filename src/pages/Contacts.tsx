import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Contacts = () => {
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
        <h1 className="font-heading text-4xl font-bold mb-8">Контакты</h1>
        
        <div className="space-y-6">
          <div className="border rounded-lg p-6">
            <div className="flex items-start gap-4 mb-4">
              <Icon name="Phone" size={24} className="text-primary mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Телефон</h3>
                <a href="tel:88003029031" className="text-lg font-semibold text-primary hover:underline">
                  8 (800) 30-29-031
                </a>
                <p className="text-sm text-muted-foreground mt-1">По будням, с 8:00 до 17:00 (Владивосток / Москва +7 / UTC +10)</p>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <div className="flex items-start gap-4 mb-4">
              <Icon name="Mail" size={24} className="text-primary mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Email</h3>
                <a href="mailto:rondogrande@yandex.ru" className="text-lg font-semibold text-primary hover:underline">
                  rondogrande@yandex.ru
                </a>
                <p className="text-sm text-muted-foreground mt-1">Ответим в течение 24 часов</p>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <div className="flex items-start gap-4 mb-4">
              <Icon name="MapPin" size={24} className="text-primary mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Адрес</h3>
                <p className="text-muted-foreground">692768 Приморский край, м. р-н Надеждинский</p>
                <p className="text-muted-foreground">с.п. Надеждинское, с. Прохладное</p>
                <p className="text-muted-foreground">ул. Полярная, д. 14</p>
                <p className="text-sm text-muted-foreground mt-2">По будням: 8:00 - 17:00 (Владивосток)</p>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <div className="flex items-start gap-4 mb-4">
              <Icon name="MessageCircle" size={24} className="text-primary mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Мы в соцсетях</h3>
                <p className="text-sm text-muted-foreground mb-3">Следите за новинками и акциями</p>
                <div className="flex gap-4 mt-3">
                  <Button 
                    variant="outline" 
                    onClick={() => window.open('https://vk.com/rg22012024?from=groups', '_blank')}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                      <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.11 14.77h-1.39c-.55 0-.72-.45-1.71-1.44-.86-.83-1.24-.94-1.45-.94-.3 0-.38.08-.38.47v1.31c0 .36-.11.57-1.07.57-1.58 0-3.33-.96-4.55-2.74-1.85-2.57-2.36-4.51-2.36-4.91 0-.21.08-.41.47-.41h1.39c.35 0 .48.16.61.54.71 2.05 1.91 3.84 2.4 3.84.19 0 .27-.09.27-.57v-2.22c-.06-.99-.58-1.08-.58-1.43 0-.17.14-.34.36-.34h2.18c.3 0 .41.16.41.51v3c0 .3.13.41.21.41.19 0 .35-.11.7-.47 1.07-1.2 1.84-3.06 1.84-3.06.1-.21.27-.41.62-.41h1.39c.42 0 .51.21.42.51-.15.75-1.93 3.39-1.93 3.39-.16.26-.22.38 0 .67.16.22.69.68 1.05 1.09.65.75 1.14 1.38 1.27 1.81.12.43-.1.65-.52.65z"/>
                    </svg>
                    ВКонтакте
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => window.open('https://t.me/RONDO_GRANDE', '_blank')}
                  >
                    <Icon name="Send" size={20} className="mr-2" />
                    Telegram
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6 bg-muted/50">
            <h3 className="font-semibold text-lg mb-3">Реквизиты</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">Общество с ограниченной ответственностью «РОНДО ГРАНДЕ»</p>
              <p>ИНН/КПП: 2502075444/250201001</p>
              <p>ОГРН: 1242500001182</p>
              <p className="pt-2">Адрес: 692768 Приморский край, м. р-н Надеждинский, с.п. Надеждинское, с. Прохладное, ул. Полярная, д. 14</p>
              <p className="pt-2">Email: <a href="mailto:rondogrande@yandex.ru" className="hover:underline">rondogrande@yandex.ru</a></p>
              <p>Телефон: <a href="tel:88003029031" className="hover:underline">8 (800) 30-29-031</a></p>
            </div>
          </div>
        </div>

        <Button onClick={() => navigate('/')} className="mt-8">
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          На главную
        </Button>
      </main>
    </div>
  );
};

export default Contacts;