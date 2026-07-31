import type { Meta, StoryObj } from '@storybook/react';
import { ShortList } from './ShortList';

const meta = {
  title: 'ShortList',
  component: ShortList,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ShortList>;

export default meta;
type Story = StoryObj<typeof meta>;

const shortListData = [
  {
    category: 'JavaScript Performance',
    items: [
      {
        title: 'Long-running Computations',
        completed: true,
        subitems: ['Throttling', 'Debounce', 'Разница между методами'],
      },
      {
        title: 'Long-running Computations',
        completed: false,
        subitems: ['Chunking (разбиение на части)'],
      },
    ],
  },
  {
    category: 'Render Optimization',
    items: [
      {
        title: 'Render Performance',
        completed: false,
        subitems: [
          'React Compiler',
          'Отладка рендеринга',
          'Написание оптимизированного рендеринга',
          'Профайлинг производительности рендеринга',
          'Нахождение бутылочных горлышек (bottlenecks)',
          'Chrome DevTools Performance tab',
          'React DevTools Profiler',
        ],
      },
      {
        title: 'Event Loop Optimization',
        completed: false,
        subitems: [
          'Основные фазы event loop',
          'Микротаски (microtasks) vs Макротаски (macrotasks)',
          'Работа очереди событий',
        ],
      },
    ],
  },
  {
    category: 'Memory Management',
    items: [
      {
        title: 'Memory Optimization',
        completed: false,
        subitems: [
          'Опыт нахождения утечек памяти',
          'Common leak patterns in JavaScript/React',
          'Использование Heap Profiler',
          'Memory snapshot analysis',
          'Retained size analysis',
        ],
      },
    ],
  },
  {
    category: 'Routing Solutions',
    items: [
      {
        title: 'Router Principles',
        completed: false,
        subitems: ['Понимание принципов работы нескольких роутеров'],
      },
      {
        title: 'React Router',
        completed: false,
        subitems: [
          'Ключевые особенности',
          'Сферы применимости',
          'Browser Router vs Hash Router',
        ],
      },
      {
        title: 'Next.js Routing',
        completed: false,
        subitems: [
          'File-based routing',
          'Dynamic routes',
          'Nested routes',
          'Ключевые особенности',
          'Сферы применимости',
        ],
      },
    ],
  },
];

export const Default: Story = {
  args: {
    title: 'Frontend Roadmap - Short List',
    items: shortListData,
  },
};

export const WithoutTitle: Story = {
  args: {
    items: shortListData,
  },
};