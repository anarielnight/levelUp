import type { Meta, StoryObj } from '@storybook/react';
import { MeetingNotes } from './MeetingNotes';
import meeting29Raw from '../meets/july 2026/29.07.2026.md?raw';
import meeting31Raw from '../meets/july 2026/31.07.2026.md?raw';

function parseRawMeeting(raw: string, filename: string) {
  const lines = raw.split('\n').filter(l => l.trim());
  const dateMatch = filename.match(/^(\d{2}\.\d{2}\.\d{4})/);
  const date = dateMatch ? dateMatch[1] : filename.replace(/\.(md|mdx)$/, '');
  
  const content: string[] = [];
  const todos: string[] = [];
  const completed: string[] = [];
  
  let section: 'content' | 'todos' | 'completed' = 'content';
  
  for (const line of lines) {
    if (line.toUpperCase().includes('TODO:')) {
      section = 'todos';
    } else if (line.startsWith('[*]')) {
      section = 'completed';
      completed.push(line);
    } else if (section === 'todos' && line.startsWith('*')) {
      todos.push(line);
    } else if (section === 'content') {
      content.push(line);
    }
  }
  
  return { date, content, completed: completed.length ? completed : undefined, todos: todos.length ? todos : undefined };
}

const meetingNotesData = [
  parseRawMeeting(meeting29Raw, '29.07.2026.md'),
  parseRawMeeting(meeting31Raw, '31.07.2026.md'),
];

const meta = {
  title: 'Meets',
  component: MeetingNotes,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof MeetingNotes>;

export default meta;
type Story = StoryObj<typeof meta>;

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