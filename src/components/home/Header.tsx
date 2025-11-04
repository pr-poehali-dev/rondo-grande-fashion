import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  wishlistCount: number;
  cartCount: number;
}

export const Header = ({ wishlistCount, cartCount }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-border" style={{backgroundColor: '#878070'}}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <h1 className="font-heading text-2xl font-bold tracking-tight text-white cursor-pointer" onClick={() => navigate('/')}>
              RONDO GRANDE
            </h1>
          </div>

          <nav className="hidden lg:flex items-center gap-6">
            <Button variant="ghost" className="font-medium text-white hover:text-white/80">Новинки</Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="font-medium text-white hover:text-white/80" onClick={() => navigate('/category/dresses')}>
                  Платья <Icon name="ChevronDown" size={16} className="ml-1" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="h-auto">
                <SheetHeader>
                  <SheetTitle>Платья</SheetTitle>
                </SheetHeader>
                <div className="grid grid-cols-4 gap-4 mt-6">
                  {['Повседневные', 'Вечерние', 'Деловые', 'Макси', 'Миди'].map(item => (
                    <Button key={item} variant="ghost" className="justify-start">
                      {item}
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
            <Button variant="ghost" className="font-medium text-white hover:text-white/80">Верхняя одежда</Button>
            <Button variant="ghost" className="font-medium text-white hover:text-white/80">Низ</Button>
            <Button variant="ghost" className="text-destructive font-semibold">Распродажа</Button>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-white hover:text-white/80" onClick={() => navigate('/account')}>
              <Icon name="User" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="relative text-white hover:text-white/80" onClick={() => navigate('/account')}>
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
  );
};
