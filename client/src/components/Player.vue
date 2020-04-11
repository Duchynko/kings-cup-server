<template>
  <div class="player" :id="'player'+player.number">
    <div class="player-circle">
      <img class="player-logo" v-bind:src="require('@/assets/images/icons/'+player.logo+'.png')" />
    </div>
    <p id="player-name">{{player.name}}</p>
  </div>
</template>

<script>
export default {
  name: "Player",
  props: ["player"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.player-circle {
  margin: 8px auto;
  border-radius: 50%;
  width: 60%;
  height: 0;
  padding-bottom: 60%;
}

.player-circle:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
}

.player-circle .player-logo {
  width: 100%;
}

.player p#player-name {
  text-align: center;
  margin: 8px 0;
}

#player1 {
  margin: 0px auto 0px auto;
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: 3;
}

#player2 {
  margin: 0px auto 0px auto;
  padding-bottom: 60%;
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 4;
  grid-row-end: 5;
}

#player3 {
  margin: 0px auto 0px auto;
  padding-bottom: 60%;
  grid-column-start: 8;
  grid-column-end: 9;
  grid-row-start: 2;
  grid-row-end: 3;
}

#player4 {
  margin: 0px auto 0px auto;
  padding-bottom: 60%;
  grid-column-start: 8;
  grid-column-end: 9;
  grid-row-start: 4;
  grid-row-end: 5;
}

#player5 {
  margin: auto 0px auto 0px;
  padding-bottom: 60%;
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 2;
}

#player6 {
  margin: auto 0px auto 0px;
  padding-bottom: 60%;
  grid-column-start: 6;
  grid-column-end: 7;
  grid-row-start: 1;
  grid-row-end: 2;
}

#player7 {
  margin: auto 0px auto 0px;
  padding-bottom: 60%;
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 5;
  grid-row-end: 6;
}

#player8 {
  margin: auto 0px auto 0px;
  padding-bottom: 60%;
  grid-column-start: 6;
  grid-column-end: 7;
  grid-row-start: 5;
  grid-row-end: 6;
}
</style>
