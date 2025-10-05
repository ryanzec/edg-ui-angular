import type { Meta, StoryObj } from '@storybook/angular';
import { Component } from '@angular/core';
import { AvatarStack } from './avatar-stack';
import { Avatar } from '../avatar/avatar';

@Component({
  selector: 'org-test-wrapper',
  template: `
    <div class="p-4">
      <org-avatar-stack size="base" data-testid="avatar-stack-container">
        <org-avatar label="Test User 1" size="base" data-testid="avatar-1" [showLabel]="false" />
        <org-avatar label="Test User 2" size="base" data-testid="avatar-2" [showLabel]="false" />
        <org-avatar label="Test User 3" size="base" data-testid="avatar-3" [showLabel]="false" />
      </org-avatar-stack>
    </div>
  `,
  imports: [AvatarStack, Avatar],
})
class TestWrapperComponent {}

const meta: Meta = {
  title: 'Core/Components/Avatar Stack/Tests',
  component: TestWrapperComponent,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
