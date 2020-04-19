import { Socket } from 'socket.io';
import { deleteEmptyRoomFrom, Room } from './room';

export const onSubscribe = (socket: Socket, data: any, rooms: Room[]): any => {
  const room = rooms.find((r) => r.name === data.roomName);

  const player = room?.players.find((p) => p.number === data.playerNumber);
  if (player) player.socketId = socket.id;

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

export const onDisconnect = (socket: Socket, listOfActiveRooms: Room[]) => {
  const socketRooms = Object.keys(socket.rooms);

  const leftRooms = listOfActiveRooms.filter((room) =>
    socketRooms.some((leftRoom) => leftRoom === room.name)
  );

  leftRooms.forEach((room) => {
    room.removePlayer(socket.id);

    // Also remove a room if it's empty
    deleteEmptyRoomFrom(room, listOfActiveRooms);
  });

  return leftRooms;
};
