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
                <p className="text-muted-foreground">+7 (XXX) XXX-XX-XX</p>
                <p className="text-sm text-muted-foreground">Ежедневно с 10:00 до 21:00</p>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <div className="flex items-start gap-4 mb-4">
              <Icon name="Mail" size={24} className="text-primary mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Email</h3>
                <p className="text-muted-foreground">info@rondogrande.ru</p>
                <p className="text-sm text-muted-foreground">Ответим в течение 24 часов</p>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <div className="flex items-start gap-4 mb-4">
              <Icon name="MapPin" size={24} className="text-primary mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Адрес</h3>
                <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 1</p>
                <p className="text-sm text-muted-foreground">Пн-Вс: 10:00 - 21:00</p>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <div className="flex items-start gap-4 mb-4">
              <Icon name="MessageCircle" size={24} className="text-primary mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Мессенджеры</h3>
                <div className="flex gap-4 mt-3">
                  <Button 
                    variant="outline" 
                    onClick={() => window.open('https://vk.com/rg22012024?from=groups', '_blank')}
                  >
                    ВКонтакте
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => window.open('https://t.me/RONDO_GRANDE', '_blank')}
                  >
                    Telegram
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6 bg-muted/50">
            <h3 className="font-semibold text-lg mb-2">Реквизиты</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>ИП Иванов Иван Иванович</p>
              <p>ИНН: XXXXXXXXXXXX</p>
              <p>ОГРНИП: XXXXXXXXXXXXXXX</p>
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
