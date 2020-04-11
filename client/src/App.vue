<template>
  <div id="app">
    <GameRoom v-bind:players="players" />
  </div>
</template>

<script>
import GameRoom from './pages/GameRoom';

export default {
  name: 'App',
  components: {
    GameRoom,
  },
};
</script>

<style>
body {
  margin: 0;
}
</style>
