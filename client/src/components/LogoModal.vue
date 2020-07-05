<template>
  <div class="modal-wrapper">
    <div class="modal closed" ref="modal">
      <span class="close" @click="toggle">&times;</span>
      <p>Choose your avatar</p>
      <div class="modal-content">
        <div class="avatar-grid">
          <div
            class="avatar-wrapper"
            v-for="(avatar, index) in avatars"
            v-bind:key="index"
          >
            <img
              class="avatar"
              :id="avatar"
              :src="require('@/assets/images/avatar/' + avatar + '.png')"
              @click="getAvatar"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal-overlay closed"
      id="modal-overlay"
      ref="modalOverlay"
    ></div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue'
export default Vue.extend({
  name: 'LogoModal',
  data: () => {
    return {
      avatars: [] as (string | undefined)[]
    }
  },
  created() {
    this.getImages()
  },
  methods: {
    toggle() {
      ;(this.$refs.modal as Element).classList.toggle('closed')
      ;(this.$refs.modalOverlay as Element).classList.toggle('closed')
    },
    getAvatar(e: any) {
      this.$store.dispatch('setAvatar', e.target.id)
      this.toggle()
    },
    getImages() {
      this.avatars = require
        .context('@/assets/images/avatar', false, /^.*\.png$/)
        .keys()
        .map(path => {
          const substring = path.match(/\.\/(.*)\.png/)
          if (substring !== null) {
            return substring[1]
          }
        })
    }
  }
})
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 600px; /* Full width */
  max-width: 100%;
  height: 400px;
  max-height: 100%;

  z-index: 10;
  padding: 20px;

  border: none;
  border-radius: 5px;
  background-color: #fefefe;

  -webkit-box-shadow: 0 40px 77px rgba(0, 0, 0, 0.22),
    0 27px 24px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0 40px 77px rgba(0, 0, 0, 0.22),
    0 27px 24px rgba(0, 0, 0, 0.2);
  box-shadow: 0 40px 77px rgba(0, 0, 0, 0.22), 0 27px 24px rgba(0, 0, 0, 0.2);
}

/* Modal Content/Box */
.modal-content {
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
  height: 100%;

  overflow: auto; /* Enable scroll if needed */
  border: none;
  border-radius: 2px;
  background-color: #ffffff;
}

.modal.closed {
  display: none;
}

.modal-overlay {
  z-index: 5;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-overlay.closed {
  display: none;
}

.avatar-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
}

.avatar {
  padding: 10px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.avatar:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
}

.modal p {
  margin-top: 6px;
  font-size: 1.5rem;
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
