import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUser,
  faChessRook,
  faUserAstronaut
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Vue from 'vue';
import routes from './routes';

library.add(faUser, faChessRook, faUserAstronaut);

Vue.component('font-awesome-icon', FontAwesomeIcon);

const app = new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent() {
      const matchingView = routes[this.currentRoute];
      return matchingView
        ? require('./pages/' + matchingView + '.vue').default
        : require('./pages/404.vue').default;
    }
  },
  render(h) {
    console.log(this.ViewComponent);
    return h(this.ViewComponent);
  }
});

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname;
});
