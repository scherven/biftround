import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDecks } from '../context/DecksContext';
import '../styles/Test.css';

function Test() {
  const { deckId } = useParams();
  const { getDeckById } = useDecks();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [testComplete, setTestComplete] = useState(false);

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
          <h2>No cards to test</h2>
          <p>Add some cards to this deck first!</p>
          <Link to={`/deck/${deckId}`} className="btn btn-primary">
            Add Cards
          </Link>
        </div>
      </div>
    );
  }

  const currentCard = deck.cards[currentCardIndex];

  const handleFlipCard = () => {
    setShowAnswer(!showAnswer);
  };

  const handleNextCard = () => {
    if (currentCardIndex < deck.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
    } else {
      setTestComplete(true);
    }
  };

  const handlePreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setShowAnswer(false);
    }
  };

  const handleRestart = () => {
    setCurrentCardIndex(0);
    setShowAnswer(false);
    setTestComplete(false);
  };

  if (testComplete) {
    return (
      <div className="test-container">
        <div className="test-complete">
          <h1>🎉 Test Complete!</h1>
          <p>You've reviewed all {deck.cards.length} cards in this deck.</p>
          <div className="test-complete-actions">
            <button onClick={handleRestart} className="btn btn-primary">
              Test Again
            </button>
            <Link to={`/deck/${deckId}`} className="btn btn-secondary">
              View Deck
            </Link>
            <Link to="/decks" className="btn btn-secondary">
              All Decks
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
        <div className={`flashcard ${showAnswer ? 'flipped' : ''}`} onClick={handleFlipCard}>
          <div className="flashcard-inner">
            <div className="flashcard-front">
              <div className="card-label">Question</div>
              <div className="card-text">{currentCard.question}</div>
              <div className="flip-hint">Click to flip</div>
            </div>
            <div className="flashcard-back">
              <div className="card-label">Answer</div>
              <div className="card-text">{currentCard.answer}</div>
              <div className="flip-hint">Click to flip back</div>
            </div>
          </div>
        </div>

        <div className="test-navigation">
          <button
            onClick={handlePreviousCard}
            disabled={currentCardIndex === 0}
            className="btn btn-secondary"
          >
            ← Previous
          </button>
          
          <button
            onClick={handleFlipCard}
            className="btn btn-primary"
          >
            {showAnswer ? 'Show Question' : 'Show Answer'}
          </button>

          <button
            onClick={handleNextCard}
            className="btn btn-secondary"
          >
            {currentCardIndex === deck.cards.length - 1 ? 'Finish' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Test;
