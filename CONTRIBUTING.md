# Contributing

Thanks for your interest in contributing to this design system!

Please take a moment to review this document before submitting your first pull request. We also strongly recommend that you check for open issues and pull requests to see if someone else is working on something similar.

## About this repository

This repository is a monorepo.

- We use [pnpm](https://pnpm.io) and [`workspaces`](https://pnpm.io/workspaces) for development.
- We use [Turborepo](https://turbo.build/repo) as our build system.

## Structure

This repository is structured as follows:

```
apps
└── design-system
    ├── app
    ├── src/design-system
    │   ├── components
    │   └── themes
    ├── config
    ├── hooks
    └── lib
```

## Development

### Install dependencies

```bash
pnpm install
```

### Run development server

```bash
pnpm dev
```

Or for a specific app:

```bash
pnpm --filter=design-system dev
```

## Documentation

All documentation is co-located with the code in `apps/design-system/`. See the main [README](./README.md) for links to all documentation.

## Commit Convention

When you create a commit we kindly ask you to follow the convention `category(scope or module): message` in your commit message while using one of the following categories:

- `feat / feature`: all changes that introduce completely new code or new features
- `fix`: changes that fix a bug (ideally you will additionally reference an issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation
- `build`: all changes regarding the build of the software, changes to dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing ones)
- `ci`: all changes regarding the configuration of continuous integration
- `chore`: all changes to the repository that do not fit into any of the above categories

  e.g. `feat(components): add new prop to the avatar component`

If you are interested in the detailed specification you can visit https://www.conventionalcommits.org/
