<template>
  <div class="container">
    <Player
      ref="players"
      v-for="(player, index) in players"
      v-bind:key="index"
      v-bind:player="player"
    />
    <Deck ref="deck" v-bind:card="context.card" v-on:next-card="getCard" />
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
    Deck,
  },
  data() {
    return {
      socket: {},
      context: {
        card: {},
      },
      players: [],
    };
  },
  created() {
    this.socket = io('http://localhost:3000/');
  },
  mounted() {
    this.socket.on('update', (data) => {
      console.log('UPDATING');
      this.update(data);
    });
  },
  methods: {
    update(data) {
      this.players = data.players;
      this.context.card = data.card;
      this.$forceUpdate();
    },
    getCard() {
      this.socket.emit('new-card');
    },
  },
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
  background-color: aquamarine;
}
</style>
