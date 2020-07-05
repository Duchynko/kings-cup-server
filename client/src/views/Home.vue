<template>
  <div class="login-page">
    <img class="wave" v-bind:src="require('@/assets/images/wave.png')" />
    <div class="container">
      <div class="img">
        <img v-bind:src="require('@/assets/images/drinking.svg')" />
      </div>
      <LoginForm @toggleModal="toggleModal" />
    </div>
    <LogoModal ref="modal" />
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm'
import LogoModal from '../components/LogoModal'
export default {
  name: 'Login',
  components: {
    LogoModal,
    LoginForm
  },
  data() {
    return {}
  },
  methods: {
    toggleModal() {
      this.$refs.modal.toggle()
    }
  }
}
</script>

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
  grid-template-columns: repeat(2, 2fr);
  grid-gap: 7rem;
}

.img {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.img img {
  width: 500px;
}

@media screen and (max-width: 1050px) {
  .container {
    grid-gap: 5rem;
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

  /** LoginForm */
  .form-wrapper {
    justify-content: center;
  }
}
</style>
