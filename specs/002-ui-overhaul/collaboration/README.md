# Bridge Interface Collaboration Documentation

This directory contains all documentation related to multi-agent collaboration on the Bridge Interface project.

## Directory Structure

```
.collaboration/
├── proposals/          # Initial proposals and agent responses
├── status/            # Status updates and confirmations  
├── results/           # Test results, reports, and deliverables
├── workflows/         # Development processes and methodologies
├── 002-ui-overhaul/   # Legacy: Original UI overhaul feature docs
└── README.md          # This file
```

## Workflows

### Multi-Agent Development

- **[Git Worktrees for Multi-Agent Development](workflows/git-worktrees-multi-agent.md)** - Complete guide for setting up parallel development environments for GitHub Copilot CLI and Claude Code

### Feature Development Process

1. **Proposal Phase** - Agent proposes approach (stored in `proposals/`)
2. **Status Updates** - Ongoing status reports (stored in `status/`)
3. **Results Documentation** - Test results and deliverables (stored in `results/`)

## Project History

### 002-ui-overhaul (Completed)
Major UI overhaul implementing light/dark theme system with Atrium aesthetic integration.

**Key Documents:**
- [Claude's Proposal](proposals/claude-proposal-002-ui-overhaul.md)
- [Copilot's Response](proposals/copilot-response-002-ui-overhaul.md)
- [Status Updates](status/)
- [Test Results](results/)

### Current: 003-ui-refinements
Targeted refinements for mobile responsiveness and color system unification.

## File Naming Convention

All files follow the pattern: `{agent}-{type}-{feature-number}.md`

**Examples:**
- `claude-proposal-002-ui-overhaul.md`
- `copilot-status-003-ui-refinements.md`
- `T01-completion-report-002.md`

## Agent Coordination

### GitHub Copilot CLI
- **Territory**: Layout, responsive design, spacing optimization
- **Files**: `_layout.scss`, layout sections of `_components.scss`
- **Port**: 4001 for local testing

### Claude Code  
- **Territory**: Color systems, theme tokens, component styling
- **Files**: `_tokens.scss`, theme sections of `_components.scss`
- **Port**: 4002 for local testing

## Best Practices

### Documentation
- Document all proposals before implementation
- Provide regular status updates during development
- Record test results and validation steps
- Archive completed features in appropriate subdirectories

### Development
- Use Git worktrees for parallel development
- Maintain file territory boundaries
- Commit frequently with descriptive messages
- Test independently before merging

### Communication
- Clear, technical communication
- Specific task assignments
- Conflict resolution procedures
- Regular synchronization points

## Current Status

**Active Feature**: 003-ui-refinements
**Agents**: GitHub Copilot CLI, Claude Code
**Methodology**: Git worktrees with parallel development
**Target**: Mobile responsiveness and color system improvements

## Quick Reference

### Git Worktrees Commands
```bash
# Create worktrees
git worktree add ../bridge-copilot 003-ui-refinements
git worktree add ../bridge-claude 003-ui-refinements

# List worktrees
git worktree list

# Remove worktrees
git worktree remove ../bridge-copilot
git worktree remove ../bridge-claude
```

### Testing Commands
```bash
# Copilot's environment
cd C:\Users\tmorg\Projects\bridge-copilot/blog
bundle exec jekyll serve --port 4001

# Claude Code's environment  
cd C:\Users\tmorg\Projects\bridge-claude/blog
bundle exec jekyll serve --port 4002
```

## Archive

Completed features are maintained in numbered subdirectories (e.g., `002-ui-overhaul/`) for historical reference and learning.

---

*Last Updated: October 2025*
*Contributors: Claude Code, GitHub Copilot CLI*
