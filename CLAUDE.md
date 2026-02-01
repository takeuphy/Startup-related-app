# CLAUDE.md - AI Assistant Guide

> This document provides context and guidelines for AI assistants working with this codebase.

## Project Overview

**Startup-related-app** is a startup-focused application repository. This project is in its initial setup phase.

## Repository Structure

```
/
├── CLAUDE.md           # AI assistant guidelines (this file)
└── .git/               # Git version control
```

*Note: This structure will be updated as the project evolves.*

## Technology Stack

*To be determined and documented as the project is built.*

Anticipated technologies may include:
- **Frontend**: React, Vue, or similar framework
- **Backend**: Node.js, Python, or similar
- **Database**: PostgreSQL, MongoDB, or similar
- **Infrastructure**: Docker, cloud services

## Development Workflows

### Branch Naming Convention

- Feature branches: `feature/<description>`
- Bug fixes: `fix/<description>`
- AI-assisted branches: `claude/<session-id>`

### Commit Message Guidelines

Follow conventional commits format:
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Development Commands

*Commands will be documented here as the project tooling is set up.*

```bash
# Placeholder commands - update when project is initialized
# npm install        # Install dependencies
# npm run dev        # Start development server
# npm run build      # Build for production
# npm run test       # Run tests
# npm run lint       # Run linter
```

## Code Conventions

### General Principles

1. **Keep it simple**: Prefer straightforward solutions over clever ones
2. **DRY (Don't Repeat Yourself)**: Extract common patterns, but avoid premature abstraction
3. **Single Responsibility**: Functions and modules should do one thing well
4. **Explicit over implicit**: Be clear about types, parameters, and return values

### File Organization

- Group related files by feature/module when appropriate
- Keep file sizes manageable (generally under 300 lines)
- Use clear, descriptive file names

### Naming Conventions

- **Variables/Functions**: camelCase
- **Classes/Components**: PascalCase
- **Constants**: UPPER_SNAKE_CASE
- **Files**: kebab-case or match export name

### Error Handling

- Handle errors at appropriate boundaries
- Provide meaningful error messages
- Log errors with sufficient context for debugging

## Testing Guidelines

*Testing framework and conventions will be documented once established.*

Principles:
- Write tests for critical business logic
- Test edge cases and error conditions
- Keep tests focused and readable
- Aim for meaningful coverage, not 100% coverage

## Security Considerations

- Never commit secrets, API keys, or credentials
- Use environment variables for configuration
- Validate and sanitize user inputs
- Follow OWASP security best practices

## AI Assistant Guidelines

### When Working on This Codebase

1. **Read before writing**: Always read existing code before making modifications
2. **Respect existing patterns**: Follow established conventions in the codebase
3. **Minimal changes**: Make only the changes necessary to complete the task
4. **No over-engineering**: Avoid adding features or abstractions not explicitly requested
5. **Test your changes**: Run relevant tests after making changes

### What to Avoid

- Don't add unnecessary comments or documentation
- Don't refactor code that isn't part of the current task
- Don't introduce new dependencies without clear justification
- Don't guess at implementation details - ask if unclear

### Communication

- Be direct and concise in explanations
- Reference specific files and line numbers when discussing code
- Provide reasoning for significant decisions
- Ask clarifying questions when requirements are ambiguous

## Environment Setup

*Setup instructions will be added as the project develops.*

### Prerequisites

*To be documented*

### Installation

*To be documented*

### Configuration

*Environment variables and configuration will be documented here*

## Deployment

*Deployment procedures will be documented once established.*

## Contributing

1. Create a feature branch from the main branch
2. Make your changes following the conventions above
3. Ensure all tests pass
4. Create a pull request with a clear description

## Useful Resources

*Links to relevant documentation, design docs, and references will be added here.*

---

*Last updated: 2026-02-01*
*This document should be updated as the project evolves.*
