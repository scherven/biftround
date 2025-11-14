import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDecks } from '../context/DecksContext';
import '../styles/DeckViewer.css';

function DeckViewer() {
  const { deckId } = useParams();
  const { getDeckById, addCardToDeck, deleteCard } = useDecks();
  const [name, setName] = useState('');
  const [manaCost, setManaCost] = useState('');
  const [type, setType] = useState('');
  const [text, setText] = useState('');
  const [power, setPower] = useState('');
  const [toughness, setToughness] = useState('');
  const [rarity, setRarity] = useState('Common');
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
    if (name.trim() && type.trim()) {
      const cardData = {
        name: name.trim(),
        manaCost: manaCost.trim(),
        type: type.trim(),
        text: text.trim(),
        rarity: rarity
      };
      
      // Add power/toughness only if it's a creature
      if (type.toLowerCase().includes('creature') && (power || toughness)) {
        cardData.power = power.trim() || '0';
        cardData.toughness = toughness.trim() || '0';
      }
      
      addCardToDeck(deckId, cardData);
      setName('');
      setManaCost('');
      setType('');
      setText('');
      setPower('');
      setToughness('');
      setRarity('Common');
      setShowForm(false);
    }
  };

  const handleDeleteCard = (cardId) => {
    if (window.confirm('Are you sure you want to remove this card from the deck?')) {
      deleteCard(deckId, cardId);
    }
  };

  const isCreature = type.toLowerCase().includes('creature');

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
            View Card Gallery
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
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Card Name *</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Lightning Bolt"
                  autoFocus
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="manaCost">Mana Cost</label>
                <input
                  id="manaCost"
                  type="text"
                  value={manaCost}
                  onChange={(e) => setManaCost(e.target.value)}
                  placeholder="e.g., 2R, 1UU"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="type">Card Type *</label>
                <input
                  id="type"
                  type="text"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  placeholder="e.g., Instant, Creature - Dragon"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="rarity">Rarity</label>
                <select
                  id="rarity"
                  value={rarity}
                  onChange={(e) => setRarity(e.target.value)}
                >
                  <option value="Common">Common</option>
                  <option value="Uncommon">Uncommon</option>
                  <option value="Rare">Rare</option>
                  <option value="Mythic Rare">Mythic Rare</option>
                </select>
              </div>
            </div>

            {isCreature && (
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="power">Power</label>
                  <input
                    id="power"
                    type="text"
                    value={power}
                    onChange={(e) => setPower(e.target.value)}
                    placeholder="e.g., 3, *, X"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="toughness">Toughness</label>
                  <input
                    id="toughness"
                    type="text"
                    value={toughness}
                    onChange={(e) => setToughness(e.target.value)}
                    placeholder="e.g., 3, *, X"
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="text">Card Text / Abilities</label>
              <textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter card abilities, effects, or flavor text"
                rows="4"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Add Card to Deck
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
            {deck.cards.map((card) => (
              <div key={card.id} className={`mtg-card ${card.rarity?.toLowerCase().replace(' ', '-')}`}>
                <div className="card-item-header">
                  <div className="card-name-section">
                    <span className="card-name">{card.name}</span>
                    {card.manaCost && <span className="mana-cost">{card.manaCost}</span>}
                  </div>
                  <button
                    onClick={() => handleDeleteCard(card.id)}
                    className="btn-icon btn-delete"
                    aria-label="Remove card"
                  >
                    ×
                  </button>
                </div>
                
                <div className="card-type-line">
                  <span className="card-type">{card.type}</span>
                  {card.rarity && <span className="card-rarity">{card.rarity}</span>}
                </div>

                {card.text && (
                  <div className="card-text-box">
                    {card.text}
                  </div>
                )}

                {(card.power !== undefined || card.toughness !== undefined) && (
                  <div className="card-stats">
                    {card.power}/{card.toughness}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DeckViewer;
