<template>
  <div class="container">
    <Player
      ref="players"
      v-for="(player, index) in players"
      v-bind:key="index"
      v-bind:player="player"
    />
    <Deck ref="deck" v-bind:card="card" v-on:next-card="getCard" />
  </div>
</template>

<script>
import Deck from '../components/Deck.vue';
import Player from '../components/Player.vue';
import io from 'socket.io-client';

export default {
  name: 'GameRoom',
  components: {
    Player,
    Deck
  },
  data() {
    return {
      socket: {},
      // context: { name, number, logo, room }
      context: {},
      players: [],
      card: {}
    };
  },
  created() {
    this.socket = io('http://localhost:3000/');
    this.context = JSON.parse(sessionStorage.getItem('context'));
    this.socket.emit('subscribe', this.context.room);
    console.log('Player joined the room');
  },
  mounted() {
    this.socket.on('player-joined', data => {
      console.log('on player-joined called with:', data);
      this.players = data.players;
      this.card = data.card;
    });

    this.socket.on('update', data => {
      console.log('on update called with:', data);
      this.players = data.players;
      this.card = data.card;
    });
  },
  methods: {
    getCard() {
      this.socket.emit('new-card', this.context.room);
    }
  }
};
</script>

<style>
body {
  margin: 0;
}

.container {
  z-index: -1;
  display: grid;
  width: 100vw;
  height: 100vh;
  grid-template-columns: 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5%;
  grid-template-rows: 20% 20% 20% 20% 20%;
  background-color: #76b852;
}
</style>
