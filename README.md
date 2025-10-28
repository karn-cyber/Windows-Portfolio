# Portfolio Windows XP

A nostalgic Windows XP inspired portfolio website built with Next.js and Tailwind CSS.

## Features

- 🖥️ Authentic Windows XP boot sequence
- 👤 Classic login screen with user selection
- 🗃️ Interactive desktop with draggable windows
- 📁 Functional start menu and taskbar
- 💼 Portfolio content displayed in XP-style applications
- 🎨 Pixel-perfect XP design recreation

## Screenshots

The website recreates the classic Windows XP experience including the boot loader, login screen, and desktop environment.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **React** - Component-based UI library

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd Portfolio-Windows
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── BootScreen.js       # Windows XP boot animation
│   │   ├── LoginScreen.js      # User selection screen
│   │   ├── Desktop.js          # Main desktop environment
│   │   ├── Taskbar.js          # Bottom taskbar with start menu
│   │   ├── StartMenu.js        # Start menu component
│   │   ├── WindowManager.js    # Window management system
│   │   ├── Window.js           # Individual window component
│   │   └── WindowContent.js    # Window content renderer
│   ├── globals.css             # Global styles and XP theme
│   ├── layout.js               # Root layout
│   └── page.js                 # Main application entry
```

## Customization

### Personal Information

Update the user information in `LoginScreen.js` and `StartMenu.js`:

```javascript
const users = [
  {
    id: 'your-id',
    name: 'Your Name',
    title: 'Your Title',
    // ...
  }
]
```

### Portfolio Content

Modify the portfolio content in `WindowContent.js` to showcase your projects, skills, and experience.

### Desktop Icons

Add or modify desktop icons in `Desktop.js`:

```javascript
const desktopIcons = [
  {
    id: 'custom-app',
    name: 'My App',
    icon: '🚀',
    type: 'application'
  },
  // ...
]
```

## Deployment

The project can be deployed to any platform that supports Next.js:

- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- **AWS Amplify**

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Inspired by the classic Windows XP operating system
- Windows XP design elements and color schemes
- Microsoft for the original Windows XP experience
# Windows-Portfolio
