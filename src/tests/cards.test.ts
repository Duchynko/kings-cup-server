import { getDeck, getNextCardFrom } from '../cards';
import _ from 'lodash';

describe('testing deck functions', () => {
  it('creates a deck with 52 cards', () => {
    const deck = getDeck();
    expect(deck.length).toBe(52);
  });

  it('returns a new card and discard it from the deck', () => {
    const deck = getDeck();
    const card = getNextCardFrom(deck)!;

    expect(card.name).toBeTruthy();
    expect(card.symbol).toBeTruthy();
    expect(card.description).toBeTruthy();
    expect(deck.length).toBe(51);
  });

  it('creates 2 (shallow) copies of the deck', () => {
    const deck1 = getDeck();
    const deck2 = getDeck();

    getNextCardFrom(deck1);
    getNextCardFrom(deck1);
    getNextCardFrom(deck2);

    expect(deck1 !== deck2).toBe(true);
    expect(deck1.length).toBe(50);
    expect(deck2.length).toBe(51);
  });

  it('returns undefined when deck is empty', () => {
    const deck = getDeck();

    for (let i = 0; i < 52; i += 1) {
      getNextCardFrom(deck);
    }

    const nextCard = getNextCardFrom(deck);

    expect(nextCard).toBeUndefined();
  });
});
