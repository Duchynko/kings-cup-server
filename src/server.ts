import { json } from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import Server from 'socket.io';
import { onNewCard, onSubscribe, onDisconnect } from './events';
import { nOfPlayersInRoom, Player } from './player';
import { Room } from './room';

const app = express();
const httpServer = new http.Server(app);
const io = Server(httpServer);

app.use(cors());
app.use(json());

// Game state
const rooms: Room[] = [];

// Routes
app.post('/join', async (req, res) => {
  const { user, roomName } = req.body;
  const player: Player = user;
  let room = rooms.find((r) => r.name === roomName);

  // If room doesn't exist and is empty, create a new room
  if (room === undefined) {
    room = new Room(roomName);
    rooms.push(room);
  }

  const playersInRoom = await nOfPlayersInRoom(roomName, io);

  // Check if the room is full
  if (playersInRoom > 7) {
    return res.status(400).send('Room is full');
  }

  // Add user to the room
  player.number = room.players.length + 1;
  room.addPlayer(player);

  res.status(200).send(player);
});

// Socket
io.on('connect', (socket) => {
  // On subscribe
  socket.on('subscribe', (data) => {
    socket.join(data.roomName);

    const response = onSubscribe(socket, data, rooms);

    io.to(data.roomName).emit('player-joined', response);
  });

  // On new-card
  socket.on('new-card', (roomName) => {
    const response = onNewCard(roomName, rooms);

    io.to(roomName).emit('update', response);
  });

  // On disconnect
  socket.on('disconnecting', () => {
    const leftRooms = onDisconnect(socket, rooms);

    leftRooms.forEach((room) => {
      io.to(room.name).emit('player-left', room.players);
    });
  });
});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`Server is running on a port ${PORT}`);
});
