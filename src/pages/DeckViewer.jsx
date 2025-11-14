import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDecks } from '../context/DecksContext';
import '../styles/DeckViewer.css';

function DeckViewer() {
  const { deckId } = useParams();
  const { getDeckById, addCardToDeck, deleteCard } = useDecks();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [showForm, setShowForm] = useState(false);

  const deck = getDeckById(deckId);

  if (!deck) {
    return (
      <div className="deck-viewer-container">
        <div className="error-state">
          <h2>Deck not found</h2>
          <Link to="/decks" className="btn btn-primary">
            Back to Decks
          </Link>
        </div>
      </div>
    );
  }

  const handleAddCard = (e) => {
    e.preventDefault();
    if (question.trim() && answer.trim()) {
      addCardToDeck(deckId, question.trim(), answer.trim());
      setQuestion('');
      setAnswer('');
      setShowForm(false);
    }
  };

  const handleDeleteCard = (cardId) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      deleteCard(deckId, cardId);
    }
  };

  return (
    <div className="deck-viewer-container">
      <header className="deck-viewer-header">
        <div>
          <Link to="/decks" className="back-link">
            ← Back to Decks
          </Link>
          <h1>{deck.name}</h1>
          <p className="card-count">
            {deck.cards.length} {deck.cards.length === 1 ? 'card' : 'cards'}
          </p>
        </div>
        {deck.cards.length > 0 && (
          <Link to={`/test/${deck.id}`} className="btn btn-primary">
            Test This Deck
          </Link>
        )}
      </header>

      <div className="deck-viewer-content">
        <div className="deck-viewer-actions">
          <button 
            onClick={() => setShowForm(!showForm)} 
            className="btn btn-primary"
          >
            {showForm ? 'Cancel' : '+ Add Card'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleAddCard} className="new-card-form">
            <div className="form-group">
              <label htmlFor="question">Question</label>
              <textarea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter the question"
                rows="3"
                autoFocus
              />
            </div>
            <div className="form-group">
              <label htmlFor="answer">Answer</label>
              <textarea
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter the answer"
                rows="3"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Card
            </button>
          </form>
        )}

        {deck.cards.length === 0 ? (
          <div className="empty-state">
            <h2>No cards yet</h2>
            <p>Add your first card to this deck!</p>
          </div>
        ) : (
          <div className="cards-list">
            {deck.cards.map((card, index) => (
              <div key={card.id} className="card-item">
                <div className="card-item-header">
                  <span className="card-number">Card {index + 1}</span>
                  <button
                    onClick={() => handleDeleteCard(card.id)}
                    className="btn-icon btn-delete"
                    aria-label="Delete card"
                  >
                    ×
                  </button>
                </div>
                <div className="card-content">
                  <div className="card-side">
                    <strong>Q:</strong> {card.question}
                  </div>
                  <div className="card-side">
                    <strong>A:</strong> {card.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DeckViewer;
