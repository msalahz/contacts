# 🚀 Copilot Git Commit Message Instructions

## 📝 Introduction

Be extremely detailed with the file changes and the reason for the changes.

## 💌 Commit Messages

### 🏗️ Message Structure

A commit message consists of three distinct parts separated by a blank line: the title, an optional body and an optional footer. The layout looks like this:

```text
type(scope): subject

body

footer
```

The title consists of the type, an optional scope and the subject.

### 🏷️ The Type

The type is contained within the title and can be one of these types:

- **feat**: a new feature
- **fix**: a bug fix
- **docs**: changes to documentation
- **style**: formatting, missing semicolons, etc.; no code change
- **refactor**: refactoring production code
- **test**: adding tests, refactoring tests; no production code change
- **chore**: updating build tasks, package manager configs, etc.; no production code change
- **perf**: performance improvements
- **ci**: CI/CD configuration changes
- **build**: build system or external dependency changes
- **revert**: reverting a previous commit
- **lint**: fixing linting or formatting issues
- **init**: initial commit for a new project or module

> ⚠️ **Note**: Always use `feat` instead of `feature` for consistency.

### 🎯 The Scope (Optional)

The scope provides additional context about what part of the codebase is affected:

- use lowercase
- keep it short (one word if possible)
- examples: `feat(auth):`, `fix(api):`, `docs(readme):`

### 📋 The Subject

- should be no greater than 50 characters
- use lowercase throughout
- do not end with a period
- use imperative tone (e.g., "add" not "added" or "adds")

### 📝 The Body

The body is optional and only used when a commit requires explanation and context:

- use separate bullet points to list out fixes and changes
- use a hyphen preceded by a single space for bullets
- leave a blank line between the title and body
- limit each line to no more than 72 characters
- explain the **what** and **why**, not the how
- describe any side effects or unintuitive consequences
- use lowercase for consistency

### 👣 The Footer

The footer is optional and is used to reference issue tracker IDs:

- `Fixes #123` - closes an issue when merged
- `Closes #456` - alternative syntax for closing issues
- `Refs #789` - references an issue without closing it
- `BREAKING CHANGE: description` - indicates breaking changes

### 💡 Example Commit Messages

```text
feat(auth): add user authentication

- implement user authentication using JWT tokens
- add login and registration endpoints
- update user model to include password hashing
- add middleware for token verification

Fixes #42
```

```text
fix(api): resolve null pointer in user service

- add null check before accessing user properties
- update tests to cover edge case

Refs #128
```

## 🚀 Commit Message Guidelines

- use lowercase throughout (except for BREAKING CHANGE)
- avoid serial comma
- keep subject line under 50 characters
- keep body lines under 72 characters
- separate subject from body with a blank line
- use imperative mood in subject line
- do not end subject with a period
- use bullet points for multiple changes in body
- always use lowercase for commit type (e.g., `feat:` not `Feat:`)
- use `feat` instead of `feature` for consistency
- use `init: initial commit` for new projects (not `init commit` or `Initial commit`)
