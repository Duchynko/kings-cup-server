import { Room } from '../room';
import { welcomeCard } from '../cards';
import { Player } from '../player';

describe('testing room functions', () => {
  it('creates a new room', () => {
    const room = new Room('myroom');

    expect(room.name).toBe('myroom');
    expect(room.deck.length).toBe(52);
    expect(room.players.length).toBe(0);
    expect(room.currentCard).toBe(welcomeCard);
  });

  it('adds a player and assigns a number', () => {
    const room = new Room('myroom');
    const player: Player = {
      socketId: '12345',
      name: 'John',
      number: 99, // random number
      logo: 'dog',
      room: 'myroom',
    };

    room.addPlayer(player);

    expect(room.players[0].number).toBe(1);
    expect(room.players[0].name).toBe(player.name);
    expect(room.players[0].logo).toBe(player.logo);
    expect(room.players[0].room).toBe(player.room);
    expect(room.players.length).toBe(1);
  });

  it('adds multiple players and assingns numbers', () => {
    const room = new Room('myroom');
    const player1: Player = {
      socketId: '12345',
      name: 'John',
      number: 99, // random number
      logo: 'dog',
      room: 'myroom',
    };
    const player2: Player = {
      socketId: '23456',
      name: 'Alice',
      number: 98, // random number
      logo: 'dog',
      room: 'myroom',
    };
    const player3: Player = {
      socketId: '34567',
      name: 'Bob',
      number: 97, // random number
      logo: 'dog',
      room: 'myroom',
    };

    room.addPlayer(player1);
    room.addPlayer(player2);
    room.addPlayer(player3);

    expect(room.players.length).toBe(3);
    expect(room.players[0].number).toBe(1);
    expect(room.players[1].number).toBe(2);
    expect(room.players[2].number).toBe(3);
  });

  it('removes a player', () => {
    const room = new Room('myroom');
    const player1: Player = {
      socketId: '12345',
      name: 'John',
      number: 99, // random number
      logo: 'dog',
      room: 'myroom',
    };
    const player2: Player = {
      socketId: '23456',
      name: 'Alice',
      number: 98, // random number
      logo: 'dog',
      room: 'myroom',
    };

    room.addPlayer(player1);
    room.addPlayer(player2);
    room.removePlayer('12345');

    expect(room.players.length).toBe(1);
    expect(room.players[0].name).toBe('Alice');
  });

  it('gets next card', () => {
    const room = new Room('myroom');

    const previousCard = room.currentCard;
    const nextCard = room.getNextCard();

    expect(previousCard !== nextCard).toBe(true);
    expect(nextCard === room.currentCard).toBe(true);
    expect(nextCard).toBeTruthy();
    expect(room.deck.length).toBe(51);
  });
});
