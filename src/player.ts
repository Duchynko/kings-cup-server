import Server from 'socket.io';

export interface Player {
  socketId: string;
  name: string;
  number: number;
  logo: string;
  room: string;
}

export const nOfPlayersInRoom = (
  room: string,
  io: Server.Server
): Promise<number> => {
  return new Promise((resolve, reject) => {
    io.in(room).clients((err: Error, clients: any[]) => {
      if (err) throw err;
      resolve(clients.length);
    });
  });
};
