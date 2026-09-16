import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

interface HomeworkTopic {
  number: number;
  folder: string;
  title: string;
  level: string;
  deadline: string;
  status: 'done' | 'in progress' | 'new';
  tasks: string[];
}

const homeworkTopics: HomeworkTopic[] = [
  {
    number: 1,
    folder: '01-long-running-computations',
    title: 'Long-running Computations',
    level: '3',
    deadline: '11.08.2026',
    status: 'done',
    tasks: ['Примеры реализации throttling и debounce'],
  },
  {
    number: 2,
    folder: '02-global-optimization',
    title: 'Global Optimization',
    level: '2-3',
    deadline: '26.08.2026',
    status: 'in progress',
    tasks: ['Конспекты теории'],
  },
  {
    number: 3,
    folder: '03-render-performance',
    title: 'Render Performance',
    level: '2',
    deadline: '16.09.2026',
    status: 'new',
    tasks: [
      'Попробовать прикрутить compiler',
      'На примере продуктовой карточки поискать bottleneck',
    ],
  },
  {
    number: 4,
    folder: '04-event-loop-optimization',
    title: 'Event Loop Optimization',
    level: '2-3',
    deadline: '30.09.2026',
    status: 'new',
    tasks: ['Конспекты теории'],
  },
  {
    number: 5,
    folder: '05-memory-optimization',
    title: 'Memory Optimization',
    level: '3',
    deadline: '14.10.2026',
    status: 'new',
    tasks: ['Анализ продуктовой карточки на предмет утечек памяти'],
  },
  {
    number: 6,
    folder: '06-react-router',
    title: 'React Router',
    level: '3',
    deadline: '11.11.2026',
    status: 'new',
    tasks: [
      'Пет-проект с разными видами роутинга',
      'Сравнение React Router и Next.js Routing',
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

const HomeworkPage: React.FC = () => (
  <div style={{ 
    padding: '48px', 
    fontFamily: 'sans-serif', 
    maxWidth: '1000px', 
    margin: '0 auto'
  }}>
    <h1 style={{ marginBottom: '16px' }}>📚 Домашние задания</h1>
    <p style={{ marginBottom: '32px', color: '#666' }}>
      Структура папок с материалами для изучения тем
    </p>

    <div style={{ 
      backgroundColor: '#f9fafb', 
      padding: '24px', 
      borderRadius: '8px',
      marginBottom: '32px'
    }}>
      <h2 style={{ marginTop: 0, marginBottom: '16px' }}>📁 Путь к файлам:</h2>
      <code style={{ 
        display: 'block', 
        padding: '12px', 
        backgroundColor: '#1f2937', 
        color: '#10b981',
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        /homeworks/{'{01-06-topic-name}'}/README.md
      </code>
    </div>

    <h2 style={{ marginBottom: '24px' }}>📋 Список тем</h2>
    
    <div style={{ display: 'grid', gap: '16px' }}>
      {homeworkTopics.map((topic) => (
        <div 
          key={topic.number}
          style={{
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '20px',
            backgroundColor: 'white',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#0066cc',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '14px'
            }}>
              {topic.number}
            </span>
            <h3 style={{ margin: 0, fontSize: '18px' }}>{topic.title}</h3>
            <span style={{
              marginLeft: 'auto',
              padding: '4px 12px',
              backgroundColor: getStatusColor(topic.status),
              color: 'white',
              borderRadius: '4px',
              fontSize: '12px',
              textTransform: 'capitalize'
            }}>
              {topic.status}
            </span>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: '12px',
            marginBottom: '16px',
            padding: '12px',
            backgroundColor: '#f9fafb',
            borderRadius: '6px'
          }}>
            <div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>Уровень</div>
              <div style={{ fontWeight: '500' }}>{topic.level}</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>Дедлайн</div>
              <div style={{ fontWeight: '500' }}>{topic.deadline}</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>Папка</div>
              <code style={{ fontSize: '13px' }}>{topic.folder}</code>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Задачи:</div>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              {topic.tasks.map((task, i) => (
                <li key={i} style={{ marginBottom: '4px', color: '#374151' }}>{task}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const meta = {
  title: 'Homeworks',
  component: HomeworkPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof HomeworkPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllTopics: Story = {};
