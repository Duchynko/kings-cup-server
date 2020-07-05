<template>
  <div class="form-wrapper">
    <form @submit="submit">
      <img :src="require('@/assets/images/cards.svg')" />
      <h2 class="title">King's Cup Online</h2>
      <div class="input-div one">
        <div class="i">
          <font-awesome-icon class="icon" :icon="['fas', 'user']" />
        </div>
        <div>
          <h5 class="div">Username</h5>
          <input
            type="text"
            class="input"
            v-model="name"
            @focus="addFocus"
            @blur="removeFocus"
          />
        </div>
      </div>
      <div class="input-div">
        <div class="i">
          <font-awesome-icon class="icon" :icon="['fas', 'chess-rook']" />
        </div>
        <div>
          <h5 class="div">Room</h5>
          <input
            type="text"
            class="input"
            v-model="room"
            @focus="addFocus"
            @blur="removeFocus"
          />
        </div>
      </div>
      <div class="input-div">
        <div class="i">
          <font-awesome-icon class="icon" :icon="['fas', 'user-astronaut']" />
        </div>
        <div>
          <h5 class="div">Avatar</h5>
          <input
            type="text"
            class="input"
            style="text-transform: capitalize"
            :value="logo"
            @focus=";[addFocus($event), toggleModal($event)]"
          />
        </div>
      </div>
      <a>Read the rules</a>
      <input type="submit" class="btn" value="Play" />
    </form>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue'
import { submitLogin } from '../services/services'
export default Vue.extend({
  name: 'LoginForm',
  data() {
    return {
      name: '',
      room: '',
      errors: [] as any[]
    }
  },
  computed: {
    logo() {
      return this.$store.state.logo
    }
  },
  methods: {
    addFocus(event: any) {
      event.target.parentNode.parentNode.classList.add('focus')
    },
    removeFocus(event: any) {
      if (event.target.value === '') {
        event.target.parentNode.parentNode.classList.remove('focus')
      }
    },
    toggleModal() {
      this.$emit('toggleModal')
    },
    validateInput() {
      if (this.name === '' || this.room === '' || this.logo === '') {
        if (this.name === '') {
          this.errors.push('Choose an username')
        }

        if (this.room === '') {
          this.errors.push('Choose a room')
        }

        if (this.logo === '') {
          this.errors.push('Choose an avatar')
        }
      } else {
        this.errors = []
      }
    },
    async submit(event: any) {
      event.preventDefault()

      this.validateInput()

      if (this.errors.length > 0) {
        return
      }

      const res = await submitLogin(this.name, this.logo, this.room)

      if (res.status === 200 && res.data.number) {
        this.$store.dispatch('saveContext', {
          user: this.name,
          number: res.data.number,
          logo: this.logo,
          room: this.room
        })
      }

      this.$router.push('Game')
    }
  }
})
</script>

<style scoped>
.form-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  width: 360px;
}

.form-wrapper img {
  height: 150px;
}

.form-wrapper h2 {
  margin: 15px 0;
  color: #333;
  text-transform: uppercase;
  font-size: 2.9rem;
  line-height: 1.1;
}

.input-div {
  position: relative;
  display: grid;
  grid-template-columns: 7% 93%;
  margin: 15px 0;
  padding: 5px 0;
  border-bottom: 2px solid #d9d9d9;
}

.input-div.one {
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
  top: -20%;
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
  top: -20px;
  font-size: 15px;
}

.input-div.focus > .i > i {
  color: #38d39f;
}

.input-div > div > input {
  position: absolute;
  left: 0;
  top: 12%;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: none;
  padding: 0.5rem 0.7rem;
  font-size: 1.2rem;
  color: #555;
  font-family: 'Poppins', sans-serif;
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

@media screen and (max-width: 1000px) {
  form {
    width: 290px;
  }

  .form-wrapper h2 {
    font-size: 2.4rem;
    margin: 8px 0;
  }

  .img img {
    width: 400px;
  }
}
</style>
