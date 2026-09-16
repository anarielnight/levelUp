import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

interface PlanItem {
  number: number;
  topic: string;
  level: string;
  topics: string[];
  deadline: string;
  status: 'done' | 'in progress' | 'new';
  tasks: string[];
}

const planData: PlanItem[] = [
  {
    number: 1,
    topic: 'Long-running Computations',
    level: '3',
    topics: [
      '✅ Throttling',
      '✅ Debounce',
      '✅ Разница между методами',
    ],
    deadline: '11.08.2026',
    status: 'done',
    tasks: ['Примеры реализации throttling и debounce'],
  },
  {
    number: 2,
    topic: 'Global optimization',
    level: '2-3',
    topics: [
      '❌ Оптимизация и структуры данных',
      '❌ Оптимизация и алгоритмы (что такое O(), memoization)',
      '❌ Оптимизация загрузки ресурсов (картинок, svg)',
      '❌ Оптимизация загрузки head заголовки: preload, defer/async/module',
      '❌ Оптимизация загрузки скриптов: бандлеры, bundler analyzer, chunk, treeshaking, native module',
      '❌ Все ли нужно оптимизировать? Когда оптимизация вредна',
      '❌ Когда проводить оптимизацию premature optimization',
    ],
    deadline: '26.08.2026',
    status: 'in progress',
    tasks: ['Конспекты теории'],
  },
  {
    number: 3,
    topic: 'Render Performance',
    level: '2',
    topics: [
      '❌ Почему обновление DOM медленное',
      '❌ React vDOM, что оптимизирует и почему',
      '❌ React fiber пример unitOfWork',
      '❌ Оптимизация и CSS (?)',
      '❌ Оптимизация анимаций (?)',
      '❌ Как проводить оптимизацию: методы, подходы, инструменты',
      '❌ React Compiler',
      '❌ Отладка рендеринга',
      '❌ Написание оптимизированного рендеринга',
      '❌ Профайлинг производительности рендеринга',
      '❌ Нахождение бутылочных горлышек (bottlenecks)',
      '❌ Flamechart, что показывает как с ним работать',
      '❌ Chrome DevTools Performance tab',
      '❌ React DevTools Profiler',
    ],
    deadline: '16.09.2026',
    status: 'new',
    tasks: [
      'Попробовать прикрутить compiler',
      'На примере продуктовой карточки поискать bottleneck, проанализировать и попробовать оптимизировать',
    ],
  },
  {
    number: 4,
    topic: 'Event Loop Optimization',
    level: '2-3',
    topics: [
      '❌ Основные фазы event loop',
      '❌ Микротаски (microtasks) vs Макротаски (macrotasks)',
      '❌ Работа очереди событий',
    ],
    deadline: '30.09.2026',
    status: 'new',
    tasks: ['Конспекты теории'],
  },
  {
    number: 5,
    topic: 'Memory Optimization',
    level: '3',
    topics: [
      '❌ Опыт нахождения утечек памяти',
      '❌ Common leak patterns in JavaScript/React',
      '❌ Использование Heap Profiler',
      '❌ Memory snapshot analysis',
      '❌ Retained size analysis',
    ],
    deadline: '14.10.2026',
    status: 'new',
    tasks: ['Анализ продуктовой карточки на предмет утечек памяти'],
  },
  {
    number: 6,
    topic: 'React Router',
    level: '3',
    topics: [
      '❌ Понимание принципов работы нескольких роутеров',
      '',
      '**React Router:**',
      '❌ Ключевые особенности',
      '❌ Сферы применимости',
      '❌ Browser Router vs Hash Router',
      '',
      '**Next.js Routing:**',
      '❌ File-based routing',
      '❌ Dynamic routes',
      '❌ Nested routes',
      '❌ Ключевые особенности',
      '❌ Сферы применимости',
      '',
      '❌ Выводы. Сравнение React Router и Next.js Routing',
    ],
    deadline: '11.11.2026',
    status: 'new',
    tasks: [
      'Пет-проект, который использует все виды роутингов и делает это на react и next.js',
      'Сравнение, что и где удобнее на основании использования в пет-проекте',
    ],
  },
];

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'done':
      return '#22c55e';
    case 'in progress':
      return '#f59e0b';
    case 'new':
      return '#6b7280';
    default:
      return '#6b7280';
  }
};

const OutlineLinkPage: React.FC = () => (
  <div style={{ 
    padding: '48px', 
    fontFamily: 'sans-serif', 
    maxWidth: '1200px', 
    margin: '0 auto'
  }}>
    <h1 style={{ marginBottom: '24px' }}>План развития</h1>
    <p style={{ marginBottom: '32px', color: '#666' }}>
      Актуальная документация доступна в Outline
    </p>
    <a 
      href="https://wiki-techgate.lmru.tech/doc/plan-razvitiya-4EtiRoY81Y"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-block',
        padding: '12px 24px',
        backgroundColor: '#0066cc',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '6px',
        fontSize: '16px',
        fontWeight: '500',
        marginBottom: '32px'
      }}
    >
      Открыть в Outline →
    </a>
    <p style={{ marginBottom: '32px', color: '#666' }}>
      Ниже приведена копия, которая может устаревать
    </p>
    <div style={{ overflowX: 'auto' }}>
      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        fontSize: '14px'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#f3f4f6' }}>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>№</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>Тема</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>Уровень сложности</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>Темы к изучению</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>Ожидаемая дата завершения</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>Статус</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>Задачи на развитие компетенции</th>
          </tr>
        </thead>
        <tbody>
          {planData.map((item) => (
            <tr key={item.number} style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '12px' }}>{item.number}</td>
              <td style={{ padding: '12px', fontWeight: '500' }}>{item.topic}</td>
              <td style={{ padding: '12px' }}>{item.level}</td>
              <td style={{ padding: '12px', whiteSpace: 'pre-line' }}>
                {item.topics.map((t, i) => (
                  <div key={i} style={{ marginBottom: '4px' }} dangerouslySetInnerHTML={{ __html: t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
                ))}
              </td>
              <td style={{ padding: '12px' }}>{item.deadline}</td>
              <td style={{ padding: '12px' }}>
                <span style={{
                  display: 'inline-block',
                  padding: '4px 8px',
                  backgroundColor: getStatusColor(item.status),
                  color: 'white',
                  borderRadius: '4px',
                  fontSize: '12px',
                  textTransform: 'capitalize'
                }}>
                  {item.status}
                </span>
              </td>
              <td style={{ padding: '12px', whiteSpace: 'pre-line' }}>
                {item.tasks.map((t, i) => (
                  <div key={i} style={{ marginBottom: '4px' }}>{t}</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const meta = {
  title: 'Design System/Outline Docs',
  component: OutlineLinkPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof OutlineLinkPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PlanRazvitiya: Story = {};
