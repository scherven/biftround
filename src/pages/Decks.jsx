import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDecks } from '../context/DecksContext';
import { useAuth } from '../context/AuthContext';
import '../styles/Decks.css';

function Decks() {
  const [newDeckName, setNewDeckName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const { decks, createDeck, deleteDeck } = useDecks();
  const { user, logout } = useAuth();

  const handleCreateDeck = (e) => {
    e.preventDefault();
    if (newDeckName.trim()) {
      createDeck(newDeckName.trim());
      setNewDeckName('');
      setShowForm(false);
    }
  };

  const handleDeleteDeck = (deckId) => {
    if (window.confirm('Are you sure you want to delete this deck?')) {
      deleteDeck(deckId);
    }
  };

  return (
    <div className="decks-container">
      <header className="decks-header">
        <h1>My Decks</h1>
        <div className="header-actions">
          <span className="user-info">Welcome, {user?.username}!</span>
          <button onClick={logout} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </header>

      <div className="decks-content">
        <div className="decks-actions">
          <button 
            onClick={() => setShowForm(!showForm)} 
            className="btn btn-primary"
          >
            {showForm ? 'Cancel' : '+ New Deck'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleCreateDeck} className="new-deck-form">
            <input
              type="text"
              value={newDeckName}
              onChange={(e) => setNewDeckName(e.target.value)}
              placeholder="Enter deck name"
              autoFocus
            />
            <button type="submit" className="btn btn-primary">
              Create Deck
            </button>
          </form>
        )}

        {decks.length === 0 ? (
          <div className="empty-state">
            <h2>No decks yet</h2>
            <p>Create your first deck to get started!</p>
          </div>
        ) : (
          <div className="decks-grid">
            {decks.map((deck) => (
              <div key={deck.id} className="deck-card">
                <div className="deck-card-header">
                  <h3>{deck.name}</h3>
                  <button
                    onClick={() => handleDeleteDeck(deck.id)}
                    className="btn-icon btn-delete"
                    aria-label="Delete deck"
                  >
                    ×
                  </button>
                </div>
                <p className="deck-card-count">
                  {deck.cards.length} {deck.cards.length === 1 ? 'card' : 'cards'}
                </p>
                <div className="deck-card-actions">
                  <Link to={`/deck/${deck.id}`} className="btn btn-secondary">
                    View Deck
                  </Link>
                  {deck.cards.length > 0 && (
                    <Link to={`/test/${deck.id}`} className="btn btn-primary">
                      Test
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Decks;
