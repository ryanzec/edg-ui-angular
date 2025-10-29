# Nebulock UI mono repository

# Local Development Setup

- `moon setup`
- `moon :deps`
- `moon sync hooks`
- `moon :setup-certs`

## Angualr dev tools

There are angular dev tools for chrome / firefox: https://angular.dev/tools/devtools

While at least in chrome, the extension might looks like it does not detect angular being used, if you open the inspector the angular tab does work and show angualr data

### Storybook

For storybook, the angular extension (at least for chrome) does not seem to work properly so if you want to debug storybook, you can use the `ng.getComponent($0)` (making sure you have the host element selected) to access similar information even if it is not as an easy experience to work with.

# Projects

## Customer portal

Customer facing application

Angular specific

## Internal portal

Internal only application

Angular specific

## Shared types

General types that should be consumable by frontend and backend applications

Generic typescript

## Shared UI

General and domain specific ui components / functionality that should be reusable in an Angular based application.

Angular specific

## Shared utils

General utilty functionality that should be consumable by frontend and backend applications

Generic typescript

# Setup

- `moon:setup`
- `moon :deps`
- `moon sync hooks`

# Tooling

- Moon
- PNPM
- Angular 20
- Vitest
- Storybook
- Eslint / Prettier
- Angular CDK 20
- Tailwind
- Luxon
- es-toolkit
- Chart.js
- Zod
