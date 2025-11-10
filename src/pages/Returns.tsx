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
        <h1 className="font-heading text-4xl font-bold mb-8">Обмен и возврат товара</h1>
        
        <section className="mb-8">
          <p className="text-muted-foreground mb-6">
            Если Вам не подошел размер заказанного товара, Вы можете вернуть его в течение 14 календарных дней с дня получения. Мы сможем принять обратно и вернуть Вам деньги только за товар, который не был в употреблении:
          </p>
          <div className="border rounded-lg p-6 bg-muted/50">
            <h3 className="font-semibold mb-3">Товар должен:</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                <span>иметь все бирки</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                <span>оригинальную фабричную упаковку</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                <span>товарный вид</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                <span>полностью комплектен</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                <span>не имеет следов носки</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <p className="text-muted-foreground mb-6">
            Возврат товара производится из любого отделения Почты России. Принимаем возвраты по адресу, указанному в сопроводительных документах. Быстро и профессионально помогут решить вопрос по возврату – наши специалисты интернет-магазина.
          </p>
          <div className="border rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Icon name="Phone" size={20} className="text-primary" />
              Контактная информация
            </h3>
            <p className="text-muted-foreground mb-2">
              Телефон: <a href="tel:88003029031" className="font-semibold hover:underline">8 (800) 30-29-031</a>
            </p>
            <p className="text-sm text-muted-foreground mb-2">(по будням, с 8:00 до 17:00 Владивосток/ Москва +7/ UTC +10)</p>
            <p className="text-muted-foreground">
              E-mail: <a href="mailto:rondogrande@yandex.ru" className="font-semibold hover:underline">rondogrande@yandex.ru</a>
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-2xl font-semibold mb-4">Для оформления возврата через отделения Почты России необходимо:</h2>
          
          <div className="space-y-4">
            <div className="border rounded-lg p-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Заполнить заявление на возврат</h3>
                  <p className="text-muted-foreground">(идет вложением в заказе)</p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Собрать посылку, состоящую из:</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>товара (в надлежащем виде с сохранением фирменных ярлыков и бирок)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>заполненного и подписанного заявления на возврат, заполненное от Вашего имени</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>приложить чек</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-3">При сдаче отправления на отправку в отделениях Почты России необходимо:</h3>
                  <ul className="space-y-3 text-muted-foreground text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <div>
                        <span className="font-semibold">Назвать адрес получателя:</span>
                        <p className="mt-1">692768 Приморский край, м. р-н Надеждинский, с.п. Надеждинское, с. Прохладное, ул. Полярная, д. 14</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <div>
                        <span className="font-semibold">Назвать получателя:</span>
                        <p className="mt-1">Общество с ограниченной ответственностью «РОНДО ГРАНДЕ»</p>
                        <p className="text-xs mt-1">ИНН/КПП 2502075444/250201001 ОГРН 1242500001182</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Оплатить отправление</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Указать номер телефона получателя возвратного отправления: <span className="font-semibold">8 (800) 30-29-031</span></span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Сообщить трек-номер</h3>
                  <p className="text-muted-foreground">
                    После оформления, сформируется трек-номер (номер РПО) отправления. Уточните данный трек-номер у оператора (это одно из обязательных условий отправки возврата) и пришлите его нам на почту{' '}
                    <a href="mailto:rondogrande@yandex.ru" className="font-semibold hover:underline">rondogrande@yandex.ru</a>
                    {' '}(ФИО, номер заказа и трек-номер отправления).
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
            <p className="text-sm text-amber-900">
              <Icon name="AlertCircle" size={16} className="inline mr-2" />
              Обращаем Ваше внимание на то, что покупатель оплачивает почтовые услуги самостоятельно.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-2xl font-semibold mb-4">Интернет-магазин RONDO GRANDE НЕ принимает возвраты, отправленные:</h2>
          <div className="border rounded-lg p-6 bg-red-50/50">
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <Icon name="X" size={20} className="text-destructive mt-0.5 flex-shrink-0" />
                <span>с нарушением сроков отправки</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="X" size={20} className="text-destructive mt-0.5 flex-shrink-0" />
                <span>с наложенным платежом</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="X" size={20} className="text-destructive mt-0.5 flex-shrink-0" />
                <span>с загрязнениями (в шерсти животных, со следами косметики, с пятнами от напитков, пищи, запахом парфюмерии и средств для стирки одежды и т.п.)</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="X" size={20} className="text-destructive mt-0.5 flex-shrink-0" />
                <span>с повреждениями и различными деформациями (с затяжками на ткани, камни с трещинами, сколами и т.п.)</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="X" size={20} className="text-destructive mt-0.5 flex-shrink-0" />
                <span>без заявления на возврат (бланк Вы получаете вместе со своим заказом)</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="X" size={20} className="text-destructive mt-0.5 flex-shrink-0" />
                <span>от лица, не совершавшего покупку</span>
              </li>
            </ul>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
            <p className="text-sm text-amber-900 font-semibold">
              <Icon name="AlertTriangle" size={16} className="inline mr-2" />
              Внимание! Дата фактической отправки товара в отделении Почты России должна быть не позднее 14-го дня с даты получения заказа (Согласно пункту 1 статьи 25 Закона РФ «О защите прав потребителей» от 07.02.1992 № 2300-1).
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-2xl font-semibold mb-4">Возврат денежных средств</h2>
          <div className="border rounded-lg p-6">
            <p className="text-muted-foreground mb-4">
              После одобрения возврата и/или отправки нам товара с заявлением, денежные средства будут возвращены Вам на ту же карту или банковский счет в срок до 10 рабочих дней с момента получения посылки с товаром на нашем складе.
            </p>
            <p className="text-sm text-muted-foreground">
              Срок зачисления денежных средств на расчетный счет зависит от внутреннего регламента банка-получателя.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <div className="border-l-4 border-primary bg-muted/50 p-6">
            <h3 className="font-semibold mb-3">ОБРАТИТЕ ВНИМАНИЕ!</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Мы осуществляем возврат стоимости товара. Расходы по доставке возвращаемого товара несет Покупатель.</li>
              <li>• К возврату принимаются только товары, приобретенные в интернет-магазине https://rondo-grande.com/</li>
              <li>• Товары, приобретенные в других онлайн и оффлайн магазинах, не принимаются.</li>
              <li>• Обмен товара, купленного в интернет-магазине, происходит только через возврат и покупку нового товара.</li>
            </ul>
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