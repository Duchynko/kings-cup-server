import { Player } from './player';
import { getDeck, getNextCardFrom, Card, welcomeCard } from './cards';
import { Maybe, Deck } from './types';

export class Room {
  public players: Player[];
  public deck: Deck;
  public context: any;
  public currentCard: Maybe<Card>;
  private playerIncrement: number;

  constructor(public name: string) {
    this.players = [];
    this.context = {};
    this.deck = getDeck();
    this.currentCard = welcomeCard;
    this.playerIncrement = 0;
  }

  addPlayer = (player: Player) => {
    player.number = this.increment();
    this.players.push(player);
  };

  removePlayer = (id: string) => {
    this.players.forEach((player, index) => {
      if (player.socketId === id) {
        this.players.splice(index, 1);
      }
    });
  };

  getNextCard(): Maybe<Card> {
    this.currentCard = getNextCardFrom(this.deck);
    return this.currentCard;
  }

  private increment(): number {
    this.playerIncrement += 1;
    return this.playerIncrement;
  }
}

export const deleteEmptyRoomFrom = (room: Room, allRooms: Room[]) => {
  if (room.players.length === 0) {
    const index = allRooms.indexOf(room);
    allRooms.splice(index, 1);
  }
};
