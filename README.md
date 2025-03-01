Created a new NX workspace with the help of following medium article:
https://medium.com/@sargashte118/setup-next-js-and-react-project-in-nx-monorepo-21391b42a8f6

# The Globetrottor Challenge

A fun geography quiz game built with modern web technologies. Test your knowledge of world geography through an engaging and interactive quiz experience.

## 🎮 Features

- Interactive geography quiz game
- Real-time score tracking
- Global leaderboard
- Dynamic image-based challenges
- Celebration animations on completion
- Responsive design for all devices

## 🛠 Tech Stack

- **Frontend Framework**: Next.js 15
- **Styling**: Tailwind CSS 3.4
- **State Management**: React Query 5
- **Testing**:
  - Jest
  - React Testing Library
  - Vitest
- **Development Tools**:
  - TypeScript
  - ESLint
  - Prettier
- **Monorepo Management**: NX 20
- **Animation Libraries**:
  - React Confetti
  - React Use

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Yarn package manager
- Git

### Installation

1. Clone the repository: git clone https://github.com/your-username/my-project.git
2. Install dependencies:yarn install

### Running the Application

#### Development Mode

Start the development server:

```bash
yarn serve:platform
```

#### Build and Deploy

Build the application:

```bash
yarn build:platform
```

### Available Scripts

- `yarn serve:platform` - Start development server
- `yarn build:platform` - Create production build
- `yarn lint:platform` - Run ESLint
- `yarn test` - Run tests

## Project Structure

├── apps/
│ └── the-globetrettor-challenge/ # Main application
│ ├── app/ # Next.js app directory
│ ├── components/ # React components
│ ├── public/ # Static assets
│ └── styles/ # CSS styles
├── libs/ # Shared libraries
├── tools/ # Build and config tools
└── nx.json # Nx configuration

## 🎯 Game Features

### Quiz Gameplay

- Multiple choice geography questions
- Image-based location identification
- Timer-based challenges
- Score tracking system

### Leaderboard

- Global ranking system
- Personal best scores
- Real-time updates

### User Experience

- Responsive design
- Smooth animations
- Interactive feedback
- Celebration effects on completion

## 🔧 Configuration

The project uses several configuration files:

- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `project.json` - Nx project settings
- `tsconfig.json` - TypeScript configuration
- `vercel.json` - Vercel deployment settings

## 📦 Deployment

The application is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure the build settings:
   - Framework Preset: Next.js
   - Root Directory: apps/the-globetrettor-challenge
   - Build Command: (Using vercel.json)
   - Output Directory: .next

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add appropriate tests for new features
- Update documentation as needed

## 🐛 Bug Reports

If you find a bug, please open an issue with:

- Detailed description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Nx Documentation](https://nx.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Medium Article on Nx Setup](https://medium.com/@sargashte118/setup-next-js-and-react-project-in-nx-monorepo-21391b42a8f6)
