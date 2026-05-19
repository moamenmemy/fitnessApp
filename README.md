# Fitness App - Angular Monorepo

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ A production-ready Angular monorepo for a fitness application with SSR ✨

## 📦 Project Overview

This repository contains:

- **1 Application**
  - `fitness-app` - Angular application with Server-Side Rendering (SSR)

- **1 Library**
  - `auth` - Authentication library with signup/login endpoints

- **E2E Testing**
  - `fitness-app-e2e` - Playwright end-to-end tests

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Serve the Angular application with SSR
npx nx serve fitness-app

# Build the application
npx nx build fitness-app

# Run tests
npx nx run-many -t test

# Lint all projects
npx nx run-many -t lint

# Run e2e tests
npx nx e2e fitness-app-e2e

# Visualize the project graph
npx nx graph
```

## ⭐ Featured Nx Capabilities

### 1. 🔒 Module Boundaries

Enforces architectural constraints using tags. The auth library is tagged for authentication scope.

**Try it out:**
```bash
# See the current project graph and boundaries
npx nx graph
```

[Learn more about module boundaries →](https://nx.dev/features/enforce-module-boundaries)

### 2. 🎭 Playwright E2E Testing

End-to-end testing with Playwright is pre-configured:

```bash
# Run e2e tests
npx nx e2e fitness-app-e2e
```

[Learn more about E2E testing →](https://nx.dev/technologies/test-tools/playwright/introduction#e2e-testing)

### 3. ⚡ Vitest for Unit Testing

Fast unit testing with Vite for Angular libraries:

```bash
# Test the auth library
npx nx test auth

# Test all projects
npx nx run-many -t test
```

[Learn more about Vite testing →](https://nx.dev/recipes/vite)

### 4. 🔧 Self-Healing CI

The CI pipeline includes `nx fix-ci` which automatically identifies and suggests fixes for common issues.

[Learn more about self-healing CI →](https://nx.dev/ci/features/self-healing-ci)

## 📁 Project Structure

```
├── apps/
│   ├── fitness-app/      [default] - Angular SSR application
│   └── fitness-app-e2e/           - E2E tests
├── libs/
│   └── auth/                         - Authentication library
├── nx.json              - Nx configuration
├── tsconfig.base.json   - TypeScript base configuration
└── eslint.config.mjs    - ESLint configuration
```

## 🏷️ Understanding Tags

| Project            | Tags          | Can Import From           |
| ------------------ | ------------- | ------------------------- |
| `fitness-app`      | `[]`          | Any library               |
| `auth`             | `[auth]`      | Tagged as auth scope      |

## 📚 Useful Commands

```bash
# Project exploration
npx nx graph                                    # Interactive dependency graph
npx nx list                                     # List installed plugins
npx nx show project fitness-app --web          # View project details

# Development
npx nx serve fitness-app                       # Serve Angular app with SSR
npx nx build fitness-app                       # Build for production
npx nx test auth                               # Test auth library
npx nx lint fitness-app                        # Lint the application

# Running multiple tasks
npx nx run-many -t build                       # Build all projects
npx nx run-many -t test --parallel=3          # Test in parallel
npx nx run-many -t lint test build            # Run multiple targets

# Affected commands (great for CI)
npx nx affected -t build                       # Build only affected projects
npx nx affected -t test                        # Test only affected projects
```

## 🎯 Adding New Features

### Generate a new Angular application:

```bash
npx nx g @nx/angular:app my-app
```

### Generate a new Angular library:

```bash
npx nx g @nx/angular:lib my-lib
```

### Generate a new Angular component:

```bash
npx nx g @nx/angular:component my-component --project=my-lib
```

## Nx Cloud

Nx Cloud ensures a fast and scalable CI pipeline. It includes features such as:

- [Remote caching](https://nx.dev/ci/features/remote-cache)
- [Task distribution across multiple machines](https://nx.dev/ci/features/distribute-task-execution)
- [Automated e2e test splitting](https://nx.dev/technologies/test-tools/playwright/introduction#e2e-test-splitting)
- [Task flakiness detection and rerunning](https://nx.dev/ci/features/flaky-tasks)

## 🔗 Learn More

- [Nx Documentation](https://nx.dev)
- [Angular Monorepo Tutorial](https://nx.dev/getting-started/tutorials/angular-monorepo-tutorial)
- [Module Boundaries](https://nx.dev/features/enforce-module-boundaries)
- [Playwright Testing](https://nx.dev/technologies/test-tools/playwright/introduction#e2e-testing)
- [Vite with Angular](https://nx.dev/recipes/vite)
- [Nx Cloud](https://nx.dev/ci/intro/why-nx-cloud)
- [Releasing Packages](https://nx.dev/features/manage-releases)

## 💬 Community

Join the Nx community:

- [Discord](https://go.nx.dev/community)
- [X (Twitter)](https://twitter.com/nxdevtools)
- [LinkedIn](https://www.linkedin.com/company/nrwl)
- [YouTube](https://www.youtube.com/@nxdevtools)
- [Blog](https://nx.dev/blog)
