import { type Meta, type StoryObj } from '@storybook/angular';
import { LoginForm } from './login-form';
import { AuthenticationAuthenticateRequest } from '@organization/shared-types';

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

export const WithPrefilledEmail: Story = {
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
    });
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
    const loginForm = canvasElement.querySelector('org-login-form') as any;

    if (loginForm?.loginForm) {
      // Set invalid email and trigger validation
      loginForm.loginForm.patchValue({
        email: 'invalid-email',
        password: '',
      });
      loginForm.loginForm.markAllAsTouched();
    }
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
    const loginForm = canvasElement.querySelector('org-login-form') as any;

    if (loginForm) {
      loginForm.loginForm.patchValue({
        email: 'user@example.com',
        password: 'mypassword123',
      });
      loginForm.hidePassword = false;
    }
  },
};

export const ReadyToSubmit: Story = {
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
    const loginForm = canvasElement.querySelector('org-login-form') as any;

    if (loginForm?.loginForm) {
      loginForm.loginForm.patchValue({
        email: 'user@example.com',
        password: 'validpassword123',
      });
    }
  },
};
