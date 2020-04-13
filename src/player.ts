import Server from 'socket.io';

export interface Player {
  socketId: string;
  name: string;
  number: number;
  logo: string;
  room: string;
}

export const nOfPlayersInRoom = (room: string, io: Server.Server): number => {
  let players = 0;

  io.in(room).clients((err: Error, clients: any[]) => {
    if (err) throw err;
    console.log('CL', clients.length);
    players = clients.length;
  });

  return players;
};
