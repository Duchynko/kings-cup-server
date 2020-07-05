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

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import Deck from '../components/Deck.vue'
import Player from '../components/Player.vue'
import { connectSocket } from '../services/services'
export default Vue.extend({
  name: 'Game',
  components: {
    Player,
    Deck
  },
  data() {
    return {
      socket: {} as SocketIOClient.Socket,
      players: [],
      card: {}
    }
  },
  computed: mapState(['user', 'room', 'logo', 'number']),
  created() {
    this.socket = connectSocket()
    this.onConnect()
  },
  mounted() {
    this.onJoin()
    this.onUpdate()
    this.onLeft()
  },
  methods: {
    getCard() {
      this.socket.emit('new-card', this.room)
    },
    onConnect() {
      if (
        this.user !== '' &&
        this.room !== '' &&
        this.logo !== '' &&
        this.number !== null
      ) {
        this.socket.emit('subscribe', {
          roomName: this.room,
          playerNumber: this.number
        })
        console.log('Player joined the room')
      } else {
        this.$router.push({ name: 'Home' })
      }
    },
    onUpdate() {
      this.socket.on('update', (data: { players: []; card: {} }) => {
        console.log('on update called with:', data)
        this.players = data.players
        this.card = data.card
      })
    },
    onJoin() {
      this.socket.on('player-joined', (data: { players: []; card: {} }) => {
        console.log('on player-joined called with:', data)
        this.players = data.players
        this.card = data.card
      })
    },
    onLeft() {
      this.socket.on('player-left', (players: []) => {
        console.log('on player-left called with:', players)
        this.players = players
      })
    }
  }
})
</script>

<style scoped>
body {
  margin: 0;
}

.container {
  z-index: -1;
  display: grid;
  width: 100vw;
  height: 100vh;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  background: rgb(36, 171, 125);
  background: linear-gradient(
    90deg,
    rgba(36, 171, 125, 1) 0%,
    rgba(41, 194, 141, 1) 35%,
    rgba(46, 211, 152, 1) 100%
  );
}
</style>
