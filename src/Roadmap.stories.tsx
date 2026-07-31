import type { Meta, StoryObj } from '@storybook/react';
import { Roadmap, parseRoadmapMarkdown } from './Roadmap';
import roadmapRaw from '../roadmap.md?raw';

const roadmapData = parseRoadmapMarkdown(roadmapRaw);

const meta = {
  title: 'Roadmap',
  component: Roadmap,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Roadmap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Frontend Developer Roadmap',
    data: roadmapData,
  },
};

export const WithoutTitle: Story = {
  args: {
    data: roadmapData,
  },
};