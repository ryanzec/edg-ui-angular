#

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

- Angular 20
- Vitest
- Storybook
- Eslint / Prettier
- Angular Material 20
- Tailwind
- Luxon
- es-toolkit

# Todo examples

## Components

- [x] autocomplete (local)
- [ ] autocomplete (remote)
- [ ] badge
- [ ] bottom sheet
- [ ] button
- [ ] button toggle
- [ ] card
- [x] checkbox
- [ ] chip
- [ ] date picker (single)
- [ ] date picker (single with time)
- [ ] date picker (range)
- [ ] date picker (range with time)
- [ ] dialog
- [ ] divider
- [ ] expanion panel
- [x] form field
- [ ] form validation
- [ ] grid list
- [ ] icon
- [x] input (simple)
- [x] input (textarea)
- [ ] list
- [ ] menu
- [x] paginator
- [ ] process bar
- [ ] progress spinner
- [x] radio
- [ ] select
- [ ] sidenav
- [ ] slide toggle
- [x] slider (single)
- [x] slider (range)
- [ ] snackbar
- [ ] sort header
- [ ] stepper
- [x] table
- [ ] tabs
- [ ] timepicker
- [ ] toolbar
- [ ] tooltip
- [ ] tree

## Patterns

- [x] component based store (a.k.a context provider)

# Notes

- Storybook can sometimes get struck with hot reload and if that happen, you have to restart storybook completely (usually happen when configurations are being updates, not stories).
