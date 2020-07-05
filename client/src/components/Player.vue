<template>
  <div class="player" :id="'player'">
    <div class="player-circle">
      <img
        class="player-logo"
        v-bind:src="require('@/assets/images/avatar/' + player.logo + '.png')"
      />
    </div>
    <p id="player-name">{{ player.name }}</p>
  </div>
</template>

<script>
export default {
  name: 'Player',
  props: ['player']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.player {
  padding: 8px;
}

.player-circle {
  border-radius: 50%;
  width: 100px;
  margin: 0 auto;
}

.player-circle:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
}

.player-circle .player-logo {
  object-fit: cover;
  width: 100px;
  max-height: 100%;
  display: block;
}

.player p#player-name {
  text-align: center;
  margin: 8px 0;
}
</style>
