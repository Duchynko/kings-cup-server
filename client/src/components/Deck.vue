<template>
  <div @click="$emit('next-card')" id="card" class="card">
    <div class="card-inner">
      <h1 id="symbol1">{{ card.symbol }} {{ card.color }}</h1>
      <h1 id="symbol2">{{ card.symbol }} {{ card.color }}</h1>
      <div class="description">
        <h1 id="card-title">{{ card.name }}</h1>
        <p id="card-description">
          {{ card.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Deck',
  props: ['card']
})
</script>

<style scoped>
.card {
  background-color: white;
  border-radius: 50px;
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row-start: 1;
  grid-row-end: 4;
  position: relative;
  margin: 32px 32px;
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
  transition: 0.3s;
}

.card img {
  border-radius: 50px;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.card-inner h1#symbol1 {
  text-align: center;
  position: absolute;
  color: black;
  top: 20px;
  left: 30px;
}

.card-inner h1#symbol2 {
  transform: rotateX(180deg);
  text-align: center;
  position: absolute;
  color: black;
  bottom: 20px;
  right: 30px;
}

.description {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.description h1 {
  font-weight: bold;
  text-align: center;
}

.description p {
  text-align: center;
}
</style>
