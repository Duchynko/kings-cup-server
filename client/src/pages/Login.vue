<template>
  <div class="login-page">
    <img class="wave" v-bind:src="require('@/assets/images/wave.png')" />
    <div class="container">
      <div class="img">
        <img v-bind:src="require('@/assets/images/drinking.svg')" />
      </div>
      <div class="login-content">
        <form action="index.html">
          <img v-bind:src="require('@/assets/images/cards.svg')" />
          <h2 class="title">King's Cup Online</h2>
          <div class="input-div one">
            <div class="i">
              <font-awesome-icon class="icon" :icon="['fas', 'user']" />
            </div>
            <div class="div">
              <h5>Username</h5>
              <input type="text" class="input" :model="name" />
            </div>
          </div>
          <div class="input-div one">
            <div class="i">
              <font-awesome-icon class="icon" :icon="['fas', 'chess-rook']" />
            </div>
            <div class="div">
              <h5>Room</h5>
              <input type="text" class="input" :model="room" />
            </div>
          </div>
          <div class="input-div one">
            <div class="i">
              <font-awesome-icon
                class="icon"
                :icon="['fas', 'user-astronaut']"
              />
            </div>
            <div class="div">
              <h5>Avatar</h5>
              <input type="text" class="input" :model="logo" />
            </div>
          </div>
          <a href="#">Read the rules</a>
          <input type="submit" class="btn" value="Play" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import routes from '../routes';
export default {
  name: 'Login',
  data() {
    return {
      name: '',
      logo: '',
      room: ''
    };
  },
  methods: {
    async submit(e) {
      e.preventDefault();
      const res = await axios.post('http://localhost:3000/join', {
        user: {
          name: this.name,
          logo: this.logo
        },
        roomName: this.room
      });

      if (res.status === 200) {
        sessionStorage.setItem(
          'context',
          JSON.stringify({
            name: this.name,
            number: res.data.number,
            logo: this.logo,
            room: this.room
          })
        );

        this.$root.currentRoute = '/game';
        window.history.pushState(null, routes['/game'], '/game');
      }
    }
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
}
</style>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Poppins:600&display=swap&.css);

.wave {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 100%;
  z-index: -1;
}

.container {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 7rem;
  padding: 0 2rem;
}

.img {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.login-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
}

.img img {
  width: 500px;
}

form {
  width: 360px;
}

.login-content img {
  height: 100px;
}

.login-content h2 {
  margin: 15px 0;
  color: #333;
  text-transform: uppercase;
  font-size: 2.9rem;
  line-height: 1.1;
}

.login-content .input-div {
  position: relative;
  display: grid;
  grid-template-columns: 7% 93%;
  margin: 25px 0;
  padding: 5px 0;
  border-bottom: 2px solid #d9d9d9;
}

.login-content .input-div.one {
  margin-top: 0;
}

.i {
  color: #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
}

.i .icon {
  transition: 0.3s;
  margin-top: 20px;
}

.input-div > div {
  position: relative;
  height: 45px;
}

.input-div > div > h5 {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-10%);
  color: #999;
  font-size: 18px;
  transition: 0.3s;
}

.input-div:before,
.input-div:after {
  content: '';
  position: absolute;
  bottom: -2px;
  width: 0%;
  height: 2px;
  background-color: #38d39f;
  transition: 0.4s;
}

.input-div:before {
  right: 50%;
}

.input-div:after {
  left: 50%;
}

.input-div.focus:before,
.input-div.focus:after {
  width: 50%;
}

.input-div.focus > div > h5 {
  top: -5px;
  font-size: 15px;
}

.input-div.focus > .i > i {
  color: #38d39f;
}

.input-div > div > input {
  position: absolute;
  left: 0;
  top: 12px;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: none;
  padding: 0.5rem 0.7rem;
  font-size: 1.2rem;
  color: #555;
  font-family: 'poppins', sans-serif;
}

.input-div.pass {
  margin-bottom: 4px;
}

a {
  display: block;
  text-align: right;
  text-decoration: none;
  color: #999;
  font-size: 0.9rem;
  transition: 0.3s;
}

a:hover {
  color: #38d39f;
}

.btn {
  display: block;
  width: 100%;
  height: 50px;
  border-radius: 25px;
  outline: none;
  border: none;
  background-image: linear-gradient(to right, #74b9ff, #77b4ef, #74b9ff);
  background-size: 200%;
  font-size: 1.2rem;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  text-transform: uppercase;
  margin: 1rem 0;
  cursor: pointer;
  transition: 0.5s;
}
.btn:hover {
  background-position: right;
}

@media screen and (max-width: 1050px) {
  .container {
    grid-gap: 5rem;
  }
}

@media screen and (max-width: 1000px) {
  form {
    width: 290px;
  }

  .login-content h2 {
    font-size: 2.4rem;
    margin: 8px 0;
  }

  .img img {
    width: 400px;
  }
}

@media screen and (max-width: 900px) {
  .container {
    grid-template-columns: 1fr;
  }

  .img {
    display: none;
  }

  .wave {
    display: none;
  }

  .login-content {
    justify-content: center;
  }
}
</style>
