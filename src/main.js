import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import {store} from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'
import EditMeetupDetailsDialog from './components/Meetup/Edit/EditMeetupDetailsDialog.vue'
Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.filter('date',DateFilter);
Vue.component('app-alert',AlertCmp);
Vue.component('app-edit-meetup-details-dialog',EditMeetupDetailsDialog);
/* eslint-disable no-new */

Vue.component('line-chart', {
  extends: VueChartJs.Line,
  mounted () {
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)

    this.gradient2.addColorStop(0, 'rgba(83,154,168, 0.9)')
    this.gradient2.addColorStop(0.5, 'rgba(83,154,168, 0.5)');
    this.gradient2.addColorStop(1, 'rgba(83,154,168, 0.2)');

    this.gradient.addColorStop(0, 'rgba(247,108,6, 0.9)')
    this.gradient.addColorStop(0.5, 'rgba(247,108,6, 0.25)');
    this.gradient.addColorStop(1, 'rgba(247,108,6, 0)');


    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Trinity',
          borderColor: '#FC2525',
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointBorderColor: 'white',
          backgroundColor: this.gradient,
          data: [40, 39, 10, 40, 45, 80, 40]
        },{
          label: 'Insight',
          borderColor: '#05CBE1',
          pointBackgroundColor: 'white',
          pointBorderColor: 'white',
          borderWidth: 1,
          backgroundColor: this.gradient2,
          data: [60, 55, 32, 10, 2, 12, 53]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})

  }

})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created(){
    firebase.initializeApp({
    apiKey: "AIzaSyABVt_UwjclWsjG6fxW893Z8VBKWv39LHk",
    authDomain: "vuefire-55817.firebaseapp.com",
    databaseURL: "https://vuefire-55817.firebaseio.com",
    projectId: "vuefire-55817",
    storageBucket: "vuefire-55817.appspot.com",
    // messagingSenderId: "684994938727"
    });
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
       return this.$store.dispatch('autoSignIn',user);
      }
    });
    this.$store.dispatch('loadMeetups');
  }
})
