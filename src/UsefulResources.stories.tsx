import type { Meta, StoryObj } from '@storybook/react';
import { UsefulResources, parseUsefulResourcesMarkdown } from './UsefulResources';
import usefulResourcesRaw from '../useful-resources.md?raw';

const usefulResourcesData = parseUsefulResourcesMarkdown(usefulResourcesRaw);

const meta = {
  title: 'Useful Resources',
  component: UsefulResources,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof UsefulResources>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Useful Resources',
    data: usefulResourcesData,
  },
};

export const WithoutTitle: Story = {
  args: {
    data: usefulResourcesData,
  },
};