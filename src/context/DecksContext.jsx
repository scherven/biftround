import { createContext, useContext, useState, useEffect } from 'react';

const DecksContext = createContext(null);

export const DecksProvider = ({ children }) => {
  const [decks, setDecks] = useState(() => {
    // Initialize from localStorage
    const savedDecks = localStorage.getItem('decks');
    return savedDecks ? JSON.parse(savedDecks) : [];
  });

  useEffect(() => {
    // Save decks to localStorage whenever they change
    localStorage.setItem('decks', JSON.stringify(decks));
  }, [decks]);

  const createDeck = (name) => {
    const newDeck = {
      id: Date.now().toString(),
      name,
      cards: [],
      createdAt: new Date().toISOString()
    };
    setDecks([...decks, newDeck]);
    return newDeck;
  };

  const addCardToDeck = (deckId, cardData) => {
    setDecks(decks.map(deck => {
      if (deck.id === deckId) {
        return {
          ...deck,
          cards: [...deck.cards, {
            id: Date.now().toString(),
            ...cardData,
            createdAt: new Date().toISOString()
          }]
        };
      }
      return deck;
    }));
  };

  const deleteDeck = (deckId) => {
    setDecks(decks.filter(deck => deck.id !== deckId));
  };

  const deleteCard = (deckId, cardId) => {
    setDecks(decks.map(deck => {
      if (deck.id === deckId) {
        return {
          ...deck,
          cards: deck.cards.filter(card => card.id !== cardId)
        };
      }
      return deck;
    }));
  };

  const getDeckById = (deckId) => {
    return decks.find(deck => deck.id === deckId);
  };

  return (
    <DecksContext.Provider value={{ 
      decks, 
      createDeck, 
      addCardToDeck, 
      deleteDeck, 
      deleteCard,
      getDeckById 
    }}>
      {children}
    </DecksContext.Provider>
  );
};

export const useDecks = () => {
  const context = useContext(DecksContext);
  if (!context) {
    throw new Error('useDecks must be used within a DecksProvider');
  }
  return context;
};
