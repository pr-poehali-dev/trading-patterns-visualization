import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Pattern {
  id: string;
  name: string;
  type: 'bullish' | 'bearish';
  reliability: number;
  description: string;
  signals: string[];
  bestTimeframe: string;
}

const patterns: Pattern[] = [
  {
    id: 'double-bottom',
    name: 'Двойное дно',
    type: 'bullish',
    reliability: 88,
    description: 'Паттерн разворота тренда, формирующийся на дне нисходящего движения. Два последовательных минимума на одном уровне.',
    signals: ['Пробой линии шеи', 'Рост объёма при пробое', 'Ретест уровня поддержки'],
    bestTimeframe: '1D, 4H'
  },
  {
    id: 'head-shoulders',
    name: 'Голова и плечи',
    type: 'bearish',
    reliability: 85,
    description: 'Классический паттерн разворота восходящего тренда. Три пика, где средний выше боковых.',
    signals: ['Пробой линии шеи вниз', 'Увеличение объёма при пробое', 'Ретест линии шеи'],
    bestTimeframe: '1D, 4H'
  },
  {
    id: 'inverse-head-shoulders',
    name: 'Перевёрнутые голова и плечи',
    type: 'bullish',
    reliability: 84,
    description: 'Зеркальная версия паттерна "Голова и плечи". Формируется в основании нисходящего тренда.',
    signals: ['Пробой линии шеи вверх', 'Рост объёма', 'Закрепление выше линии шеи'],
    bestTimeframe: '1D, 4H'
  },
  {
    id: 'double-top',
    name: 'Двойная вершина',
    type: 'bearish',
    reliability: 82,
    description: 'Паттерн разворота на вершине восходящего движения. Два последовательных максимума на одном уровне.',
    signals: ['Пробой линии шеи вниз', 'Увеличение объёма', 'Ретест сопротивления'],
    bestTimeframe: '1D, 4H'
  },
  {
    id: 'triple-bottom',
    name: 'Тройное дно',
    type: 'bullish',
    reliability: 81,
    description: 'Усиленная версия двойного дна. Три касания уровня поддержки перед разворотом вверх.',
    signals: ['Пробой сопротивления', 'Высокий объём при третьем касании', 'Закрепление выше уровня'],
    bestTimeframe: '1D'
  },
  {
    id: 'triple-top',
    name: 'Тройная вершина',
    type: 'bearish',
    reliability: 79,
    description: 'Три последовательных пика на одном уровне сопротивления перед разворотом вниз.',
    signals: ['Пробой поддержки', 'Снижение объёма на вершинах', 'Ретест уровня'],
    bestTimeframe: '1D'
  },
  {
    id: 'falling-wedge',
    name: 'Падающий клин',
    type: 'bullish',
    reliability: 77,
    description: 'Сужающийся канал с наклоном вниз. Формируется при снижении волатильности перед разворотом.',
    signals: ['Пробой верхней границы', 'Сжатие волатильности', 'Дивергенция с индикаторами'],
    bestTimeframe: '4H, 1D'
  },
  {
    id: 'rising-wedge',
    name: 'Восходящий клин',
    type: 'bearish',
    reliability: 75,
    description: 'Сужающийся канал с наклоном вверх. Часто предшествует резкому падению.',
    signals: ['Пробой нижней границы', 'Снижение объёма', 'Медвежья дивергенция'],
    bestTimeframe: '4H, 1D'
  },
  {
    id: 'rounding-bottom',
    name: 'Блюдце',
    type: 'bullish',
    reliability: 73,
    description: 'Плавная U-образная формация. Постепенный переход от нисходящего тренда к восходящему.',
    signals: ['Формирование ручки', 'Рост объёма справа', 'Пробой сопротивления'],
    bestTimeframe: '1D, 1W'
  },
  {
    id: 'rounding-top',
    name: 'Перевёрнутое блюдце',
    type: 'bearish',
    reliability: 71,
    description: 'Плавная перевёрнутая U-образная формация на вершине тренда.',
    signals: ['Снижение объёма на вершине', 'Пробой поддержки', 'Ускорение падения'],
    bestTimeframe: '1D, 1W'
  }
];

const PatternChart = ({ pattern }: { pattern: Pattern }) => {
  const isBullish = pattern.type === 'bullish';
  
  return (
    <div className="w-full h-48 relative bg-muted/30 rounded-lg overflow-hidden">
      <svg viewBox="0 0 400 200" className="w-full h-full">
        <defs>
          <linearGradient id={`gradient-${pattern.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isBullish ? '#10B981' : '#EF4444'} stopOpacity="0.2"/>
            <stop offset="100%" stopColor={isBullish ? '#10B981' : '#EF4444'} stopOpacity="0"/>
          </linearGradient>
        </defs>
        
        {pattern.id === 'double-bottom' && (
          <>
            <polyline
              points="50,150 100,120 150,150 200,120 250,100 300,60 350,40"
              fill="none"
              stroke="#10B981"
              strokeWidth="2.5"
              className="animate-fade-in"
            />
            <circle cx="100" cy="120" r="4" fill="#10B981" className="animate-scale-in"/>
            <circle cx="200" cy="120" r="4" fill="#10B981" className="animate-scale-in"/>
            <line x1="80" y1="120" x2="220" y2="120" stroke="#0EA5E9" strokeWidth="1.5" strokeDasharray="4 4"/>
          </>
        )}
        
        {pattern.id === 'head-shoulders' && (
          <>
            <polyline
              points="50,140 100,80 150,100 200,50 250,100 300,80 350,140"
              fill="none"
              stroke="#EF4444"
              strokeWidth="2.5"
              className="animate-fade-in"
            />
            <line x1="100" y1="110" x2="300" y2="110" stroke="#0EA5E9" strokeWidth="1.5" strokeDasharray="4 4"/>
            <circle cx="100" cy="80" r="4" fill="#EF4444"/>
            <circle cx="200" cy="50" r="4" fill="#EF4444"/>
            <circle cx="300" cy="80" r="4" fill="#EF4444"/>
          </>
        )}
        
        {pattern.id === 'inverse-head-shoulders' && (
          <>
            <polyline
              points="50,60 100,120 150,100 200,150 250,100 300,120 350,60"
              fill="none"
              stroke="#10B981"
              strokeWidth="2.5"
              className="animate-fade-in"
            />
            <line x1="100" y1="90" x2="300" y2="90" stroke="#0EA5E9" strokeWidth="1.5" strokeDasharray="4 4"/>
            <circle cx="100" cy="120" r="4" fill="#10B981"/>
            <circle cx="200" cy="150" r="4" fill="#10B981"/>
            <circle cx="300" cy="120" r="4" fill="#10B981"/>
          </>
        )}
        
        {pattern.id === 'double-top' && (
          <>
            <polyline
              points="50,150 100,100 150,80 200,100 250,80 300,120 350,160"
              fill="none"
              stroke="#EF4444"
              strokeWidth="2.5"
              className="animate-fade-in"
            />
            <circle cx="150" cy="80" r="4" fill="#EF4444"/>
            <circle cx="250" cy="80" r="4" fill="#EF4444"/>
            <line x1="130" y1="80" x2="270" y2="80" stroke="#0EA5E9" strokeWidth="1.5" strokeDasharray="4 4"/>
          </>
        )}
        
        {pattern.id === 'triple-bottom' && (
          <>
            <polyline
              points="50,150 80,120 120,140 150,120 190,140 220,120 260,100 300,70 340,40"
              fill="none"
              stroke="#10B981"
              strokeWidth="2.5"
              className="animate-fade-in"
            />
            <circle cx="80" cy="120" r="3" fill="#10B981"/>
            <circle cx="150" cy="120" r="3" fill="#10B981"/>
            <circle cx="220" cy="120" r="3" fill="#10B981"/>
          </>
        )}
        
        {pattern.id === 'triple-top' && (
          <>
            <polyline
              points="50,150 80,100 120,120 150,100 190,120 220,100 260,130 300,160"
              fill="none"
              stroke="#EF4444"
              strokeWidth="2.5"
              className="animate-fade-in"
            />
            <circle cx="80" cy="100" r="3" fill="#EF4444"/>
            <circle cx="150" cy="100" r="3" fill="#EF4444"/>
            <circle cx="220" cy="100" r="3" fill="#EF4444"/>
          </>
        )}
        
        {pattern.id === 'falling-wedge' && (
          <>
            <line x1="50" y1="100" x2="320" y2="130" stroke="#0EA5E9" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5"/>
            <line x1="50" y1="140" x2="320" y2="130" stroke="#0EA5E9" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5"/>
            <polyline
              points="60,120 100,130 140,125 180,132 220,128 260,130 300,100 340,70"
              fill="none"
              stroke="#10B981"
              strokeWidth="2.5"
              className="animate-fade-in"
            />
          </>
        )}
        
        {pattern.id === 'rising-wedge' && (
          <>
            <line x1="50" y1="150" x2="320" y2="80" stroke="#0EA5E9" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5"/>
            <line x1="50" y1="170" x2="320" y2="120" stroke="#0EA5E9" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5"/>
            <polyline
              points="60,160 100,140 140,145 180,130 220,133 260,120 300,140 340,170"
              fill="none"
              stroke="#EF4444"
              strokeWidth="2.5"
              className="animate-fade-in"
            />
          </>
        )}
        
        {pattern.id === 'rounding-bottom' && (
          <>
            <path
              d="M 50,80 Q 120,140 200,140 T 350,60"
              fill="none"
              stroke="#10B981"
              strokeWidth="2.5"
              className="animate-fade-in"
            />
            <path
              d="M 50,80 Q 120,140 200,140"
              fill={`url(#gradient-${pattern.id})`}
            />
          </>
        )}
        
        {pattern.id === 'rounding-top' && (
          <>
            <path
              d="M 50,140 Q 120,60 200,60 T 350,150"
              fill="none"
              stroke="#EF4444"
              strokeWidth="2.5"
              className="animate-fade-in"
            />
            <path
              d="M 50,140 Q 120,60 200,60 T 350,150"
              fill={`url(#gradient-${pattern.id})`}
            />
          </>
        )}
        
        <line x1="0" y1="195" x2="400" y2="195" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
        <line x1="5" y1="0" x2="5" y2="200" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
      </svg>
      
      <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-border">
        <span className="text-xs font-mono">{pattern.bestTimeframe}</span>
      </div>
    </div>
  );
};

const Index = () => {
  const [filter, setFilter] = useState<'all' | 'bullish' | 'bearish'>('all');
  
  const filteredPatterns = patterns.filter(p => 
    filter === 'all' ? true : p.type === filter
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <Icon name="TrendingUp" size={20} className="text-accent" />
            <span className="text-sm font-medium text-accent">Trading Patterns Academy</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Разворотные паттерны
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Самые точные графические паттерны для определения разворота тренда с высокой надёжностью
          </p>
        </header>

        <Tabs value={filter} onValueChange={(v) => setFilter(v as any)} className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 h-12">
            <TabsTrigger value="all" className="text-base">
              Все паттерны
            </TabsTrigger>
            <TabsTrigger value="bullish" className="text-base">
              <Icon name="TrendingUp" size={16} className="mr-2" />
              Бычьи
            </TabsTrigger>
            <TabsTrigger value="bearish" className="text-base">
              <Icon name="TrendingDown" size={16} className="mr-2" />
              Медвежьи
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPatterns.map((pattern, index) => (
            <Card 
              key={pattern.id}
              className="group hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden border-border/50"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <h3 className="text-2xl font-bold group-hover:text-accent transition-colors">
                      {pattern.name}
                    </h3>
                    
                    <div className="flex items-center gap-3 flex-wrap">
                      <Badge 
                        variant={pattern.type === 'bullish' ? 'default' : 'destructive'}
                        className="px-3 py-1"
                      >
                        {pattern.type === 'bullish' ? (
                          <>
                            <Icon name="TrendingUp" size={14} className="mr-1" />
                            Бычий
                          </>
                        ) : (
                          <>
                            <Icon name="TrendingDown" size={14} className="mr-1" />
                            Медвежий
                          </>
                        )}
                      </Badge>
                      
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted">
                        <Icon name="Target" size={14} className="text-accent" />
                        <span className="text-sm font-mono font-semibold">
                          {pattern.reliability}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <PatternChart pattern={pattern} />

                <p className="text-muted-foreground leading-relaxed">
                  {pattern.description}
                </p>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Icon name="CheckCircle2" size={16} className="text-accent" />
                    <span>Сигналы для входа:</span>
                  </div>
                  
                  <ul className="space-y-2 pl-6">
                    {pattern.signals.map((signal, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-accent mt-0.5">•</span>
                        <span>{signal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <footer className="mt-16 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>Надёжность паттернов основана на статистических данных бэктестинга</p>
          <p className="mt-2 flex items-center justify-center gap-2">
            <Icon name="Info" size={14} />
            Используйте дополнительное подтверждение: объёмы, индикаторы, структуру рынка
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
