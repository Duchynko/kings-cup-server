// tslint:disable-next-line: import-name
import _ from 'lodash';

const colors = ['♥️', '♦️', '♠️', '♣️'];

const cards = [
  {
    symbol: 'A',
    name: 'Make a rule',
    description: 'Make a rule. If someone breaks it, they must drink',
  },
  {
    symbol: 'K',
    name: "King's Cup",
    description:
      'Pour your drink into the cup. The fourth person who draws this cards must drink the cup',
  },
  {
    symbol: 'Q',
    name: 'Questions master',
    description:
      "You're the question master. If someone answers your question, they must drink. Except if they answer 'Fuck you!'; then you must drink",
  },
  {
    symbol: 'J',
    name: 'Never have I ever',
    description:
      'Everyone has three lifes. Take turns in asking "Never have I ever..." and everytime you have, you loose one life. The first person to loose al lifes drinks',
  },
  {
    symbol: '10',
    name: 'Waterfall',
    description:
      'Start drinking. Everyone must drink as long as you drink. You can stop at any time',
  },
  {
    symbol: '9',
    name: 'Nine - Bust a rhyme',
    description:
      'Choose a word. Take turns finding a rhyme on a previous word. First to pause or repeat a word must drink',
  },
  {
    symbol: '8',
    name: 'Eight - Pick a mate',
    description:
      'Choose a drinking mate. Anytime you must drink, your mate also drinks',
  },
  {
    symbol: '7',
    name: 'Seven - Hands to heaven',
    description:
      'You can place your hand anytime above your head and all players must follow. The last one to do so, drinks.',
  },
  {
    symbol: '6',
    name: 'Six - Dicks',
    description: 'All guys must drink',
  },
  {
    symbol: '5',
    name: 'Thumbmaster',
    description:
      'You are thumbmaster. You can place your thumb anytime on the table and all players must follow. The last one to do so, drinks.',
  },
  {
    symbol: '4',
    name: 'Four - Whore',
    description: 'All girls must drink',
  },
  {
    symbol: '3',
    name: 'Three - Drink for me',
    description: 'Cheers! You must drink',
  },
  {
    symbol: '2',
    name: 'Two - Drink for you',
    description: 'Pick two people to drink. Or pick one person twice',
  },
];

const deck = _.concat(
  colors.map((color) => {
    return cards.map(card => ({
      color,
      symbol: card.symbol,
      name: card.name,
      description: card.description,
    }));
  }),
);

export function getDeck(): any[] {
  return _.cloneDeep(deck);
}

export function getNextCardFrom(deck: any) {
  if (deck.length < 1) return;

  const index = Math.floor(Math.random() * Math.floor(deck.length));
  const nextCard = _.cloneDeep(deck[index]);
  const deletedCard = deck.splice(index, 1);

  if (nextCard === deletedCard[0] && nextCard !== deletedCard[0]) {
    console.log('Seems like a wrong card was deleted'); // TODO: Remove later
  }

  return nextCard;
}
