import type { Meta, StoryObj } from '@storybook/react';
import { MeetingNotes } from './MeetingNotes';

const meta = {
  title: 'Meets',
  component: MeetingNotes,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof MeetingNotes>;

export default meta;
type Story = StoryObj<typeof meta>;

const meetingNotesData = [
  {
    date: '29.07.2026',
    content: [
      'Заседание партии от 29.07.2026:',
      'на основании матрицы компетенций сформирован frontend-roadmap.md',
      'из сформирванного файла сформирован short-list',
    ],
    todos: [
      'Миша - найти сделанные демонстрашки для Deboyunce/Throttling',
      'Наташа - завести в github проект под обучение с имеющимися материалами',
    ],
  },
  {
    date: '31.07.2026',
    content: ['Заседание партии от 31.07.2026:'],
    todos: [
      'Наташа - разобраться с тем, как работает то, что пришлёт Миша, заполнить пункт "Разница между методами", когда что применять',
      'Миша - лекция на youtube о том, как работает React и какие есть методы оптимизации его Performance',
      'Наташа - подготовить рассказ о том, что такое ReactCompiler в разрезе render optimizations',
    ],
  },
];

export const Default: Story = {
  args: {
    title: 'Meeting Notes',
    notes: meetingNotesData,
  },
};

export const WithoutTitle: Story = {
  args: {
    notes: meetingNotesData,
  },
};