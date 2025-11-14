# Biftround Flashcards

A modern, interactive flashcard application built with React and Vite for creating, managing, and testing flashcard decks.

## Features

- 🔐 **Authentication**: Login with username/password or Google OAuth
- 📚 **Deck Management**: Create, view, and delete flashcard decks
- 📝 **Card Creation**: Add question/answer pairs to your decks
- 🎯 **Interactive Testing**: Test your knowledge with flip-able flashcards
- 💾 **Data Persistence**: All data stored in browser localStorage

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

```bash
# Run linter
npm run lint

# Start dev server (with hot reload)
npm run dev
```

The application will be available at `http://localhost:5173/`

## Usage

### Login
1. Visit the application
2. Enter any username and password (demo mode)
3. Or use Google OAuth (requires configuration)

### Creating Decks
1. Click "**+ New Deck**" on the Decks page
2. Enter a deck name
3. Click "**Create Deck**"

### Adding Cards
1. Click "**View Deck**" on a deck
2. Click "**+ Add Card**"
3. Enter a question and answer
4. Click "**Add Card**"

### Testing Your Knowledge
1. Click "**Test**" on a deck card or "**Test This Deck**" in the deck viewer
2. View the question
3. Click "**Show Answer**" or click the card to flip it
4. Navigate through cards with Previous/Next buttons
5. Complete the test to see your progress

## Configuration

### Google OAuth Setup

To enable Google OAuth:

1. Get a Google OAuth Client ID from [Google Cloud Console](https://console.cloud.google.com/)
2. Update the `clientId` in `src/pages/Login.jsx`:

```jsx
<GoogleOAuthProvider clientId="YOUR_ACTUAL_CLIENT_ID">
```

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **@react-oauth/google** - Google authentication
- **ESLint** - Code quality

## Project Structure

```
src/
├── components/       # Reusable components
│   └── ProtectedRoute.jsx
├── context/          # React Context for state management
│   ├── AuthContext.jsx
│   └── DecksContext.jsx
├── pages/            # Page components
│   ├── Login.jsx
│   ├── Decks.jsx
│   ├── DeckViewer.jsx
│   └── Test.jsx
└── styles/           # CSS files
    ├── Login.css
    ├── Decks.css
    ├── DeckViewer.css
    └── Test.css
```

## License

MIT
