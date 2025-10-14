import { type Meta, type StoryObj } from '@storybook/angular';
import { LoginForm } from './login-form';
import { AuthenticationAuthenticateRequest } from '@organization/shared-types';
import { expect, userEvent } from 'storybook/test';

const loginSubmit = (requestData: AuthenticationAuthenticateRequest) => {
  console.log(requestData);
};

const meta: Meta<LoginForm> = {
  title: 'Authentication/Components/Login Form/Tests',
  component: LoginForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A comprehensive login form component with email/password validation, password visibility toggle, and Zod schema validation.',
      },
    },
  },
  argTypes: {
    loginSubmit: {
      action: 'loginSubmitted',
      description: 'Emits when the form is successfully submitted with valid credentials',
    },
  },
};

export default meta;
type Story = StoryObj<LoginForm>;

export const WithValidationErrors: Story = {
  args: {
    loginSubmit: loginSubmit,
  },
  render: (args) => ({
    props: args,
    template: `<org-login-form (loginSubmit)="loginSubmit($event)"></org-login-form>`,
    moduleMetadata: {
      imports: [LoginForm],
    },
  }),
  play: async ({ canvas }) => {
    const user = userEvent.setup();
    const submitButton = canvas.getByTestId('submit-button') as HTMLButtonElement;

    await user.click(submitButton);

    await new Promise((resolve) => setTimeout(resolve, 25));

    const emailError = canvas.getByText(/email is required/i);
    const passwordError = canvas.getByText(/password is required/i);

    await expect(emailError).toBeTruthy();
    await expect(passwordError).toBeTruthy();
  },
};

export const PasswordNotVisible: Story = {
  args: {
    loginSubmit: loginSubmit,
  },
  render: (args) => ({
    props: args,
    template: `<org-login-form (loginSubmit)="loginSubmit($event)"></org-login-form>`,
    moduleMetadata: {
      imports: [LoginForm],
    },
  }),
  play: async ({ canvas }) => {
    const user = userEvent.setup();
    const emailInput = canvas.getByTestId('email-input') as HTMLInputElement;
    const passwordInput = canvas.getByTestId('password-input') as HTMLInputElement;

    await user.type(emailInput, 'user@example.com');
    await user.type(passwordInput, 'mypassword123');

    await new Promise((resolve) => setTimeout(resolve, 25));

    await expect(passwordInput.type).toBe('password');
  },
};

export const PasswordVisible: Story = {
  args: {
    loginSubmit: loginSubmit,
  },
  render: (args) => ({
    props: args,
    template: `<org-login-form (loginSubmit)="loginSubmit($event)"></org-login-form>`,
    moduleMetadata: {
      imports: [LoginForm],
    },
  }),
  play: async ({ canvas }) => {
    const user = userEvent.setup();
    const emailInput = canvas.getByTestId('email-input') as HTMLInputElement;
    const passwordToggleButton = canvas.getByTestId('password-toggle-button') as HTMLButtonElement;
    const passwordInput = canvas.getByTestId('password-input') as HTMLInputElement;

    await user.type(emailInput, 'user@example.com');
    await user.type(passwordInput, 'mypassword123');
    await user.click(passwordToggleButton);

    await new Promise((resolve) => setTimeout(resolve, 25));

    await expect(passwordInput.type).toBe('text');
  },
};
