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

<script>
export default {
  name: 'Deck',
  props: ['card'],
};
</script>

<style scoped>
.card {
  background-color: white;
  border-radius: 50px 50px 50px 50px;
  grid-column-start: 2;
  grid-column-end: 8;
  grid-row-start: 2;
  grid-row-end: 5;
  position: relative;
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
  transition: 0.3s;
}

.card img {
  border-radius: 50px 50px 50px 50px;
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
  font-weight: bold;
  text-align: center;
}
</style>
