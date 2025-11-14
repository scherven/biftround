import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDecks } from '../context/DecksContext';
import '../styles/Test.css';

function Test() {
  const { deckId } = useParams();
  const { getDeckById } = useDecks();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const deck = getDeckById(deckId);

  if (!deck) {
    return (
      <div className="test-container">
        <div className="error-state">
          <h2>Deck not found</h2>
          <Link to="/decks" className="btn btn-primary">
            Back to Decks
          </Link>
        </div>
      </div>
    );
  }

  if (deck.cards.length === 0) {
    return (
      <div className="test-container">
        <div className="error-state">
          <h2>No cards in deck</h2>
          <p>Add some cards to this deck first!</p>
          <Link to={`/deck/${deckId}`} className="btn btn-primary">
            Add Cards
          </Link>
        </div>
      </div>
    );
  }

  const currentCard = deck.cards[currentCardIndex];

  const handleNextCard = () => {
    if (currentCardIndex < deck.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentCardIndex(0); // Loop back to first card
    }
  };

  const handlePreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    } else {
      setCurrentCardIndex(deck.cards.length - 1); // Loop to last card
    }
  };

  return (
    <div className="test-container">
      <header className="test-header">
        <Link to={`/deck/${deckId}`} className="back-link">
          ← Back to Deck
        </Link>
        <h1>{deck.name}</h1>
        <p className="progress">
          Card {currentCardIndex + 1} of {deck.cards.length}
        </p>
      </header>

      <div className="test-content">
        <div className={`mtg-card-display ${currentCard.rarity?.toLowerCase().replace(' ', '-')}`}>
          <div className="mtg-card-frame">
            <div className="card-header">
              <h2 className="card-name">{currentCard.name}</h2>
              {currentCard.manaCost && (
                <div className="mana-cost-display">{currentCard.manaCost}</div>
              )}
            </div>
            
            <div className="card-image-placeholder">
              {/* Placeholder for card artwork */}
              <div className="image-text">Card Artwork</div>
            </div>

            <div className="card-type-bar">
              {currentCard.type}
            </div>

            {currentCard.text && (
              <div className="card-text-area">
                {currentCard.text}
              </div>
            )}

            <div className="card-footer">
              {(currentCard.power !== undefined || currentCard.toughness !== undefined) && (
                <div className="card-pt-box">
                  {currentCard.power}/{currentCard.toughness}
                </div>
              )}
              {currentCard.rarity && (
                <div className="card-rarity-symbol" title={currentCard.rarity}>
                  {currentCard.rarity.charAt(0)}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="test-navigation">
          <button
            onClick={handlePreviousCard}
            className="btn btn-secondary"
          >
            ← Previous Card
          </button>

          <div className="card-counter">
            {currentCardIndex + 1} / {deck.cards.length}
          </div>

          <button
            onClick={handleNextCard}
            className="btn btn-secondary"
          >
            Next Card →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Test;
