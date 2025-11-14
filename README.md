# Biftround Card Decks

A trading card deck builder inspired by Magic: The Gathering, built with React and Vite. Create and manage collectible card decks with custom cards featuring mana costs, types, abilities, and power/toughness.

## Features

- 🔐 **Authentication**: Login with username/password or Google OAuth
- 📚 **Deck Management**: Create, view, and delete card decks
- 🃏 **Card Creation**: Design custom cards with MTG-style attributes
  - Card name and mana cost
  - Card type (Creature, Instant, Sorcery, etc.)
  - Card text and abilities
  - Power/Toughness for creatures
  - Rarity levels (Common, Uncommon, Rare, Mythic Rare)
- 🎨 **Card Gallery**: Browse through your cards in a visual gallery
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
2. Enter a deck name (e.g., "Blue Control", "Red Aggro")
3. Click "**Create Deck**"

### Adding Cards
1. Click "**View Deck**" on a deck
2. Click "**+ Add Card**"
3. Fill in card details:
   - **Card Name**: The name of your card
   - **Mana Cost**: e.g., "2R", "1UU", "3GG"
   - **Card Type**: e.g., "Creature - Dragon", "Instant", "Sorcery"
   - **Rarity**: Common, Uncommon, Rare, or Mythic Rare
   - **Power/Toughness**: (for creatures only)
   - **Card Text**: Abilities, effects, or flavor text
4. Click "**Add Card to Deck**"

### Viewing Your Collection
1. Click "**Card Gallery**" on a deck card or "**View Card Gallery**" in the deck viewer
2. Browse through your cards one at a time
3. Use Previous/Next buttons to navigate
4. Cards display with MTG-style formatting including:
   - Card name and mana cost
   - Card artwork placeholder
   - Type line
   - Abilities text box
   - Power/Toughness (for creatures)
   - Rarity indicator

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
│   └── Test.jsx (Card Gallery)
└── styles/           # CSS files
    ├── Login.css
    ├── Decks.css
    ├── DeckViewer.css
    └── Test.css
```

## Card Attributes

Cards support the following MTG-inspired attributes:

- **Name**: The card's name
- **Mana Cost**: Mana required to cast (e.g., "3RR", "2UU")
- **Type**: Card type line (e.g., "Creature - Dragon", "Instant", "Enchantment - Aura")
- **Text**: Card abilities, effects, and flavor text
- **Power/Toughness**: For creature cards (e.g., "3/3", "*/4")
- **Rarity**: Common, Uncommon, Rare, or Mythic Rare

## License

MIT
