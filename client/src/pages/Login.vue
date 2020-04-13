<template>
  <div class="login-page-container">
    <div class="form-container">
      <div class="form">
        <form class="login-form" @submit.prevent="submit">
          <input type="text" placeholder="Name" v-model="name" />
          <input type="text" placeholder="Room" v-model="room" />
          <input type="text" placeholder="Avatar" v-model="logo" />
          <button>join</button>
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
body {
  margin: 0;
}
</style>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300&.css);

.form-container {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #ffffff;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
  font-family: 'Roboto', sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  font-family: 'Roboto', sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4caf50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #ffffff;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,
.form button:active,
.form button:focus {
  background: #43a047;
}

.login-page-container {
  width: 100%;
  height: 100vh;
  background: #76b852; /* fallback for old browsers */
  background: -webkit-linear-gradient(right, #76b852, #8dc26f);
  background: -moz-linear-gradient(right, #76b852, #8dc26f);
  background: -o-linear-gradient(right, #76b852, #8dc26f);
  background: linear-gradient(to left, #76b852, #8dc26f);
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
