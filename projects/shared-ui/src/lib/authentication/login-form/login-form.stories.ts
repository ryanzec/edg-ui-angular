import { type Meta, type StoryObj } from '@storybook/angular';
import { LoginForm } from './login-form';
import { AuthenticationAuthenticateRequest } from '@organization/shared-types';
import { fireEvent } from 'storybook/test';

const loginSubmit = (requestData: AuthenticationAuthenticateRequest) => {
  console.log(requestData);
};

const meta: Meta<LoginForm> = {
  title: 'Shared UI/Authentication/Login Form',
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

export const Default: Story = {
  args: {
    loginSubmit: loginSubmit,
  },
};

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
  play: async ({ canvasElement }) => {
    const loginFormElement = canvasElement.querySelector('org-login-form');

    if (!loginFormElement) {
      return;
    }

    const loginFormComponent = (window as any).ng.getComponent(loginFormElement) as LoginForm;

    loginFormComponent.loginForm.markAllAsTouched();
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
    const emailInput = canvas.getByTestId('email-input') as HTMLInputElement;
    const passwordInput = canvas.getByTestId('password-input') as HTMLInputElement;
    const submitButton = canvas.getByTestId('submit-button') as HTMLButtonElement;

    await fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    await fireEvent.change(passwordInput, { target: { value: 'mypassword123' } });
    await fireEvent.click(submitButton);

    await new Promise((resolve) => setTimeout(resolve, 25));
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
  play: async ({ canvasElement }) => {
    const loginFormElement = canvasElement.querySelector('org-login-form');

    if (!loginFormElement) {
      return;
    }

    const loginFormComponent = (window as any).ng.getComponent(loginFormElement) as LoginForm;

    loginFormComponent.loginForm.patchValue({
      email: 'user@example.com',
      password: 'mypassword123',
    });
    loginFormComponent.showPassword = true;
  },
};
