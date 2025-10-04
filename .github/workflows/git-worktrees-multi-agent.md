# Git Worktrees for Multi-Agent Development

## Overview

Git worktrees enable parallel development by allowing multiple agents (GitHub Copilot CLI and Claude Code) to work on the same codebase simultaneously without conflicts. Each agent operates in an isolated working directory while sharing the same Git repository and branch.

## Setup Process

### 1. Create Feature Branch
```bash
# In main repo: C:\Users\tmorg\Projects\bridge-interface
git checkout main
git pull origin main
git checkout -b 003-ui-refinements
git push -u origin 003-ui-refinements
```

### 2. Create Worktrees for Each Agent
```bash
# From main repo directory
cd C:\Users\tmorg\Projects\bridge-interface

# Create worktree for Copilot
git worktree add ../bridge-copilot 003-ui-refinements

# Create worktree for Claude Code  
git worktree add ../bridge-claude 003-ui-refinements
```

**Result:**
```
C:\Users\tmorg\Projects\
├── bridge-interface\          # Main repo
├── bridge-copilot\           # Copilot's worktree
└── bridge-claude\            # Claude Code's worktree
```

## Agent Workflow

### Copilot CLI Workflow
```bash
cd C:\Users\tmorg\Projects\bridge-copilot

# Work on assigned tasks
git add blog/_sass/_layout.scss
git commit -m "T01.1: Fix value props mobile responsiveness"

# Continue development
git add .
git commit -m "T01.2: Optimize spacing for mobile"
git push origin 003-ui-refinements
```

### Claude Code Workflow
```bash
cd C:\Users\tmorg\Projects\bridge-claude

# Work on assigned tasks
git add blog/_sass/_tokens.scss
git commit -m "T02.1: Create unified color manifest"

# Continue development
git add .
git commit -m "T02.2: Eliminate pure white/black colors"
git push origin 003-ui-refinements
```

## Coordination Strategy

### Real-time Synchronization
```bash
# Pull latest changes when needed
git pull origin 003-ui-refinements
```

### Pre-push Conflict Check
```bash
git fetch origin
git log HEAD..origin/003-ui-refinements --oneline
```

### File Territory Assignment

**Copilot's Territory:**
- `blog/_sass/_layout.scss` (full ownership)
- `blog/_sass/_components.scss` (only layout-related sections)

**Claude Code's Territory:**
- `blog/_sass/_tokens.scss` (full ownership)  
- `blog/_sass/_components.scss` (only color/theme sections)

### Shared File Editing
```bash
# Before editing shared files
git log --oneline --follow blog/_sass/_components.scss

# Make targeted commits
git add -p blog/_sass/_components.scss  # Interactive staging
git commit -m "T01.2: Update .value-props mobile layout only"
```

## Testing in Parallel

Each agent can test independently:
```bash
# Copilot's worktree
cd C:\Users\tmorg\Projects\bridge-copilot/blog
bundle exec jekyll serve --port 4001

# Claude Code's worktree
cd C:\Users\tmorg\Projects\bridge-claude/blog
bundle exec jekyll serve --port 4002
```

**Access URLs:**
- Copilot's version: http://localhost:4001
- Claude Code's version: http://localhost:4002

## Merge Strategies

### Option A: Continuous Integration (Recommended)
```bash
# Before starting new work
git pull origin 003-ui-refinements

# After completing work
git commit -m "Specific change description"
git pull origin 003-ui-refinements  # Check for conflicts
git push origin 003-ui-refinements
```

### Option B: Sub-branches (For High Conflict Risk)
```bash
# Create agent-specific sub-branches
cd C:\Users\tmorg\Projects\bridge-copilot
git checkout -b 003-ui-refinements-mobile

cd C:\Users\tmorg\Projects\bridge-claude  
git checkout -b 003-ui-refinements-colors

# Merge both into main feature branch later
```

## Conflict Resolution

When conflicts occur:
```bash
# In the conflicted worktree
git pull origin 003-ui-refinements
# Resolve conflicts in editor
git add resolved-file.scss
git commit -m "Resolve merge conflict in _components.scss"
git push origin 003-ui-refinements
```

## Cleanup Process

```bash
# Remove worktrees (from main repo)
cd C:\Users\tmorg\Projects\bridge-interface
git worktree remove ../bridge-copilot
git worktree remove ../bridge-claude

# Merge feature branch to main
git checkout main
git merge 003-ui-refinements
git branch -d 003-ui-refinements
```

## Benefits

1. **True Parallel Development** - Both agents work simultaneously
2. **Independent Testing** - Each can run Jekyll locally on different ports
3. **Safe Experimentation** - Isolated working directories
4. **Easy Coordination** - Shared branch keeps agents synchronized
5. **Simple Cleanup** - Remove worktrees when feature is complete

## Best Practices

- **Commit Frequently** - Small, focused commits reduce conflict risk
- **Descriptive Messages** - Clear commit messages aid coordination
- **Pull Before Push** - Always sync before pushing changes
- **Territory Respect** - Stick to assigned file sections
- **Test Locally** - Verify changes work before pushing
- **Communicate Status** - Use collaboration docs to share progress

## Common Commands Reference

```bash
# List all worktrees
git worktree list

# Remove a worktree
git worktree remove path/to/worktree

# Prune deleted worktrees
git worktree prune

# Check worktree status
git status

# View commit history
git log --oneline --graph
```
