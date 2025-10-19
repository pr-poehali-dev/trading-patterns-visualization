import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface CandlePattern {
  id: string;
  name: string;
  type: 'bullish' | 'bearish';
  reliability: number;
  description: string;
  confirmation: string[];
  bestTimeframe: string;
  candleCount: number;
}

const candlePatterns: CandlePattern[] = [
  {
    id: 'hammer',
    name: 'Молот',
    type: 'bullish',
    reliability: 92,
    description: 'Свеча с маленьким телом в верхней части и длинной нижней тенью (минимум в 2 раза длиннее тела). Формируется на дне тренда.',
    confirmation: ['Следующая свеча закрывается выше', 'Объём выше среднего', 'Формируется на поддержке'],
    bestTimeframe: '1H, 4H, 1D',
    candleCount: 1
  },
  {
    id: 'shooting-star',
    name: 'Падающая звезда',
    type: 'bearish',
    reliability: 90,
    description: 'Свеча с маленьким телом в нижней части и длинной верхней тенью. Формируется на вершине восходящего тренда.',
    confirmation: ['Следующая свеча закрывается ниже', 'Увеличенный объём', 'Отбой от сопротивления'],
    bestTimeframe: '1H, 4H, 1D',
    candleCount: 1
  },
  {
    id: 'engulfing-bullish',
    name: 'Бычье поглощение',
    type: 'bullish',
    reliability: 89,
    description: 'Двухсвечной паттерн: большая зелёная свеча полностью поглощает предыдущую красную свечу. Сильный сигнал разворота вверх.',
    confirmation: ['Вторая свеча закрывается значительно выше', 'Высокий объём на поглощающей свече', 'Формируется после нисходящего тренда'],
    bestTimeframe: '4H, 1D',
    candleCount: 2
  },
  {
    id: 'engulfing-bearish',
    name: 'Медвежье поглощение',
    type: 'bearish',
    reliability: 88,
    description: 'Большая красная свеча полностью поглощает предыдущую зелёную. Мощный сигнал разворота вниз.',
    confirmation: ['Вторая свеча закрывается значительно ниже', 'Рост объёма', 'Формируется на вершине тренда'],
    bestTimeframe: '4H, 1D',
    candleCount: 2
  },
  {
    id: 'morning-star',
    name: 'Утренняя звезда',
    type: 'bullish',
    reliability: 87,
    description: 'Трёхсвечной паттерн: длинная красная, маленькая свеча с гэпом вниз, затем длинная зелёная свеча. Классический разворотный сигнал.',
    confirmation: ['Третья свеча закрывается выше середины первой', 'Гэп между свечами', 'Рост объёма на третьей свече'],
    bestTimeframe: '1D, 4H',
    candleCount: 3
  },
  {
    id: 'evening-star',
    name: 'Вечерняя звезда',
    type: 'bearish',
    reliability: 86,
    description: 'Длинная зелёная свеча, маленькая свеча с гэпом вверх, затем длинная красная свеча, закрывающаяся в теле первой.',
    confirmation: ['Третья свеча пробивает середину первой', 'Наличие гэпа', 'Увеличение объёма'],
    bestTimeframe: '1D, 4H',
    candleCount: 3
  },
  {
    id: 'inverted-hammer',
    name: 'Перевёрнутый молот',
    type: 'bullish',
    reliability: 85,
    description: 'Свеча с маленьким телом внизу и длинной верхней тенью на дне тренда. Показывает попытку покупателей перехватить контроль.',
    confirmation: ['Следующая свеча закрывается выше', 'Подтверждение объёмом', 'Формируется в зоне поддержки'],
    bestTimeframe: '1H, 4H',
    candleCount: 1
  },
  {
    id: 'hanging-man',
    name: 'Повешенный',
    type: 'bearish',
    reliability: 84,
    description: 'Визуально похож на молот, но появляется на вершине восходящего тренда. Длинная нижняя тень указывает на давление продавцов.',
    confirmation: ['Следующая свеча красная', 'Закрытие ниже тела "повешенного"', 'Объём выше среднего'],
    bestTimeframe: '1H, 4H, 1D',
    candleCount: 1
  },
  {
    id: 'piercing-line',
    name: 'Просвет в облаках',
    type: 'bullish',
    reliability: 82,
    description: 'Двухсвечной паттерн: после длинной красной свечи следует зелёная, которая открывается с гэпом вниз и закрывается выше середины красной.',
    confirmation: ['Закрытие выше 50% красной свечи', 'Рост объёма', 'После нисходящего движения'],
    bestTimeframe: '4H, 1D',
    candleCount: 2
  },
  {
    id: 'dark-cloud',
    name: 'Завеса из тёмных облаков',
    type: 'bearish',
    reliability: 81,
    description: 'После длинной зелёной свечи красная открывается с гэпом вверх и закрывается ниже середины зелёной свечи.',
    confirmation: ['Закрытие ниже 50% зелёной свечи', 'Увеличение объёма', 'На вершине тренда'],
    bestTimeframe: '4H, 1D',
    candleCount: 2
  },
  {
    id: 'three-white-soldiers',
    name: 'Три белых солдата',
    type: 'bullish',
    reliability: 80,
    description: 'Три последовательные длинные зелёные свечи с небольшими тенями. Каждая открывается в теле предыдущей и закрывается выше.',
    confirmation: ['Равномерный рост без откатов', 'Постоянный объём', 'После консолидации или падения'],
    bestTimeframe: '1D',
    candleCount: 3
  },
  {
    id: 'three-black-crows',
    name: 'Три чёрные вороны',
    type: 'bearish',
    reliability: 79,
    description: 'Три последовательные длинные красные свечи, каждая открывается в теле предыдущей и закрывается на новых минимумах.',
    confirmation: ['Последовательное снижение', 'Постоянное давление продаж', 'На вершине или после роста'],
    bestTimeframe: '1D',
    candleCount: 3
  }
];

const CandleVisualization = ({ pattern }: { pattern: CandlePattern }) => {
  const isBullish = pattern.type === 'bullish';
  const baseY = 100;
  
  const renderCandle = (x: number, bodyTop: number, bodyBottom: number, wickTop: number, wickBottom: number, isBullishCandle: boolean) => {
    const bodyHeight = Math.abs(bodyBottom - bodyTop);
    const color = isBullishCandle ? '#10B981' : '#EF4444';
    
    return (
      <g>
        <line 
          x1={x} 
          y1={wickTop} 
          x2={x} 
          y2={wickBottom} 
          stroke={color} 
          strokeWidth="2"
          className="animate-fade-in"
        />
        <rect
          x={x - 15}
          y={Math.min(bodyTop, bodyBottom)}
          width={30}
          height={bodyHeight}
          fill={color}
          rx={3}
          className="animate-scale-in"
        />
      </g>
    );
  };

  return (
    <div className="w-full h-56 relative bg-muted/30 rounded-lg overflow-hidden">
      <svg viewBox="0 0 400 200" className="w-full h-full">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {pattern.id === 'hammer' && renderCandle(200, 60, 70, 50, 150, true)}
        
        {pattern.id === 'shooting-star' && renderCandle(200, 130, 140, 50, 150, false)}
        
        {pattern.id === 'engulfing-bullish' && (
          <>
            {renderCandle(150, 90, 110, 85, 115, false)}
            {renderCandle(250, 70, 130, 65, 135, true)}
          </>
        )}
        
        {pattern.id === 'engulfing-bearish' && (
          <>
            {renderCandle(150, 90, 110, 85, 115, true)}
            {renderCandle(250, 70, 130, 65, 135, false)}
          </>
        )}
        
        {pattern.id === 'morning-star' && (
          <>
            {renderCandle(100, 70, 130, 65, 135, false)}
            {renderCandle(200, 135, 145, 130, 150, false)}
            {renderCandle(300, 70, 130, 65, 135, true)}
          </>
        )}
        
        {pattern.id === 'evening-star' && (
          <>
            {renderCandle(100, 70, 130, 65, 135, true)}
            {renderCandle(200, 55, 65, 50, 70, true)}
            {renderCandle(300, 70, 130, 65, 135, false)}
          </>
        )}
        
        {pattern.id === 'inverted-hammer' && renderCandle(200, 130, 140, 50, 150, true)}
        
        {pattern.id === 'hanging-man' && renderCandle(200, 60, 70, 50, 150, false)}
        
        {pattern.id === 'piercing-line' && (
          <>
            {renderCandle(150, 70, 130, 65, 135, false)}
            {renderCandle(250, 90, 140, 85, 145, true)}
          </>
        )}
        
        {pattern.id === 'dark-cloud' && (
          <>
            {renderCandle(150, 70, 130, 65, 135, true)}
            {renderCandle(250, 60, 110, 55, 115, false)}
          </>
        )}
        
        {pattern.id === 'three-white-soldiers' && (
          <>
            {renderCandle(100, 100, 140, 95, 145, true)}
            {renderCandle(200, 80, 120, 75, 125, true)}
            {renderCandle(300, 60, 100, 55, 105, true)}
          </>
        )}
        
        {pattern.id === 'three-black-crows' && (
          <>
            {renderCandle(100, 60, 100, 55, 105, false)}
            {renderCandle(200, 80, 120, 75, 125, false)}
            {renderCandle(300, 100, 140, 95, 145, false)}
          </>
        )}

        <line x1="0" y1="160" x2="400" y2="160" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
      </svg>
      
      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-border">
        <span className="text-xs font-mono">
          {pattern.candleCount} {pattern.candleCount === 1 ? 'свеча' : pattern.candleCount === 2 ? 'свечи' : 'свечи'}
        </span>
      </div>
      
      <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-border">
        <span className="text-xs font-mono">{pattern.bestTimeframe}</span>
      </div>
    </div>
  );
};

const Candles = () => {
  const [filter, setFilter] = useState<'all' | 'bullish' | 'bearish'>('all');
  
  const filteredPatterns = candlePatterns.filter(p => 
    filter === 'all' ? true : p.type === filter
  );

  const sortedPatterns = [...filteredPatterns].sort((a, b) => b.reliability - a.reliability);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <Icon name="Flame" size={20} className="text-accent" />
            <span className="text-sm font-medium text-accent">Candlestick Patterns Academy</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Разворотные свечи
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Самые работающие японские свечные паттерны с максимальной точностью прогноза разворота
          </p>
          
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link to="/">
                <Icon name="BarChart3" size={18} />
                Паттерны
              </Link>
            </Button>
            <Button asChild size="lg" className="gap-2">
              <Link to="/candles">
                <Icon name="Flame" size={18} />
                Свечи
              </Link>
            </Button>
          </div>
        </header>

        <Tabs value={filter} onValueChange={(v) => setFilter(v as any)} className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 h-12">
            <TabsTrigger value="all" className="text-base">
              Все свечи
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
          {sortedPatterns.map((pattern, index) => (
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

                <CandleVisualization pattern={pattern} />

                <p className="text-muted-foreground leading-relaxed">
                  {pattern.description}
                </p>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Icon name="CheckCircle2" size={16} className="text-accent" />
                    <span>Подтверждение паттерна:</span>
                  </div>
                  
                  <ul className="space-y-2 pl-6">
                    {pattern.confirmation.map((conf, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-accent mt-0.5">•</span>
                        <span>{conf}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <footer className="mt-16 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>Надёжность свечных паттернов основана на тысячах исторических формаций</p>
          <p className="mt-2 flex items-center justify-center gap-2">
            <Icon name="Info" size={14} />
            Всегда дожидайтесь подтверждения — не входите только по одной свече
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Candles;