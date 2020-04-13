import { Room } from './room';
import { Socket } from 'socket.io';

export const onSubscribe = (roomName: string, rooms: Room[]): any => {
  const room = rooms.find((r) => r.name === roomName);

  return {
    players: room?.players,
    card: room?.currentCard,
  };
};

export const onNewCard = (roomName: string, rooms: Room[]) => {
  const room = rooms.find((r) => r.name === roomName);

  return {
    players: room?.players,
    card: room?.getNextCard(),
  };
};

export const onDisconnect = (socket: Socket, rooms: Room[]) => {
  const leftRooms = Object.keys(socket.rooms);

  const matchedRooms = rooms.filter((room) =>
    leftRooms.some((leftRoom) => leftRoom === room.name)
  );

  matchedRooms.forEach((room) => {
    room.removePlayer(socket.id);
  });

  return matchedRooms;
};
