import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Homeworks from './Homeworks';

const meta = {
  title: 'Homeworks',
  component: Homeworks,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Homeworks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllTopics: Story = {};
