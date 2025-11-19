# Contributing to LinkedIn Tycoon

First off, thank you for considering contributing to LinkedIn Tycoon! 🎉

## 📋 Table of Contents
- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Guidelines](#coding-guidelines)
- [Submitting Changes](#submitting-changes)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

### Our Standards
- ✅ Be respectful and inclusive
- ✅ Welcome newcomers warmly
- ✅ Give constructive feedback
- ✅ Focus on what's best for the community
- ❌ No harassment, trolling, or derogatory comments

## 🤝 How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates.

**Great bug reports include:**
- Clear, descriptive title
- Detailed steps to reproduce
- Expected vs actual behavior
- Screenshots/GIFs if applicable
- Browser and OS information
- Console errors (if any)

**Template:**
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
 - OS: [e.g. macOS, Windows]
 - Browser: [e.g. Chrome 120]
 - Version: [e.g. 2.0]
```

### 💡 Suggesting Features

Feature suggestions are welcome! Please provide:
- Clear description of the feature
- Use cases and benefits
- Possible implementation approach
- Mockups/examples (if applicable)

### 🎨 Contributing Code

We love pull requests! Here's how:

1. **Fork the repo**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Make your changes**
4. **Test thoroughly**
5. **Commit with clear messages** (`git commit -m 'Add AmazingFeature'`)
6. **Push to your fork** (`git push origin feature/AmazingFeature`)
7. **Open a Pull Request**

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ and npm
- Git
- Modern web browser

### Local Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/Linkedin-Tycoon.git

# Navigate to directory
cd Linkedin-Tycoon

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure
```
linkedin-tycoon/
├── index.html              # Main entry point
├── src/
│   ├── pixel-game.js      # Core game logic (11,000+ lines)
│   └── styles.css         # Styling
├── Sounds for LinkedIn Tycoon/  # Audio assets
├── vite.config.js         # Build configuration
└── package.json           # Dependencies
```

## 📝 Coding Guidelines

### JavaScript Style
- Use ES6+ features (const/let, arrow functions, etc.)
- Meaningful variable/function names
- Add comments for complex logic
- Keep functions focused and small
- Use semicolons consistently

**Good:**
```javascript
const calculateXP = (level) => {
    // XP required increases exponentially
    return Math.floor(100 * Math.pow(1.5, level - 1));
};
```

**Bad:**
```javascript
function calc(l) {
    return 100 * Math.pow(1.5, l - 1)
}
```

### Phaser Scene Structure
```javascript
class MyScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MyScene' });
    }

    create() {
        // Scene setup
        this.setupUI();
        this.createPlayer();
        this.setupControls();
    }

    update(time, delta) {
        // Game loop
    }

    // Helper methods
    setupUI() { /* ... */ }
    createPlayer() { /* ... */ }
}
```

### CSS Conventions
- Use semantic class names
- Group related styles
- Add comments for sections
- Use CSS variables for colors

### Git Commit Messages
Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Adding tests
- `chore:` Maintenance tasks

**Examples:**
```bash
feat: add pet ownership system
fix: resolve name input positioning in fullscreen
docs: update README with new features
refactor: simplify dialogue system logic
```

## 🔍 Testing Your Changes

Before submitting a PR:

### Functional Testing
- [ ] Test on Chrome, Firefox, and Safari
- [ ] Test on different screen sizes
- [ ] Test in fullscreen mode
- [ ] Verify no console errors
- [ ] Test save/load functionality

### Performance Testing
- [ ] No frame drops during gameplay
- [ ] Smooth animations
- [ ] Fast scene transitions
- [ ] Efficient memory usage

### Code Quality
- [ ] No linting errors
- [ ] Code is well-commented
- [ ] Follows project conventions
- [ ] No hardcoded values

## 📤 Submitting Changes

### Pull Request Process

1. **Update documentation** if needed
2. **Update README.md** with new features
3. **Test thoroughly** on multiple browsers
4. **Provide clear PR description**

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How was this tested?

## Screenshots
If applicable

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Tested on multiple browsers
```

### Review Process
1. Maintainer reviews your PR
2. May request changes/clarifications
3. Make requested changes
4. Once approved, PR will be merged
5. Your contribution goes live! 🎉

## 🎯 Good First Issues

Looking for where to start? Check issues labeled:
- `good first issue` - Easy tasks for beginners
- `help wanted` - Features needing implementation
- `bug` - Known bugs to fix

## 🏆 Recognition

Contributors are recognized in:
- GitHub contributors page
- Release notes for major features
- Shoutouts in community channels

## 💬 Questions?

- Open a [Discussion](https://github.com/SammyTourani/Linkedin-Tycoon/discussions)
- Comment on relevant issues
- Reach out to maintainers

## 📚 Resources

### Learn Phaser
- [Official Phaser Docs](https://photonstorm.github.io/phaser3-docs/)
- [Phaser Examples](https://phaser.io/examples)
- [Phaser Tutorials](https://phaser.io/tutorials)

### Learn Vite
- [Vite Documentation](https://vitejs.dev/)
- [Vite Configuration](https://vitejs.dev/config/)

---

**Thank you for contributing to LinkedIn Tycoon! Your efforts help make this game better for everyone.** 🚀
