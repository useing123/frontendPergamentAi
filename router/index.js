import Vue from 'vue';
import Router from 'vue-router';
import Upload from '../pages/upload.vue';
import YouTubeSummary from '../pages/YouTubeSummary.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Upload',
      component: Upload
    },
    {
      path: '/youtubesummary',
      name: 'YouTubeSummary',
      component: YouTubeSummary
    }
  ]
});
