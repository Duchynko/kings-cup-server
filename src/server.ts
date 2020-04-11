import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import cors from 'cors';
import { json } from 'body-parser';
import { getDeck, getNextCardFrom } from './cards';

const app = express();
const httpServer = new http.Server(app);
const io = socketIo(httpServer);

app.use(cors());
app.use(json());

app.get('/', (req, res) => {
  // socket.emit('update', 'Update');
  res.send('hello');
});

// Routes

app.post('/user', (req, res) => {
  if (players.length > 7) {
    return res.status(400).send('Room is full');
  }
  const player = req.body.user;
  player.number = players.length + 1;
  players.push(player);

  console.log(players);

  res.redirect(201, '/game');
});

// Game state

const rooms = [];
const players: any[] = [];
const currentDeck = getDeck();
let nextCard = getNextCardFrom(currentDeck);

// Socket

io.on('connection', (socket) => {
  // On connection
  console.log('Socket connected - sending update');
  io.emit('update', {
    players: players,
    card: nextCard,
  });

  // On new-card
  socket.on('new-card', () => {
    nextCard = getNextCardFrom(currentDeck);

    console.log('New card requested - sending update');
    io.emit('update', {
      players: players,
      card: nextCard,
    });
  });

  // On disconnect
});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});