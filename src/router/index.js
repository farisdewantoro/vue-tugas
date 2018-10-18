import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Meetups from '@/components/Meetup/Meetups'
import CreateMeetup from '@/components/Meetup/CreateMeetup'
import Profile from '@/components/User/Profile'
import SignIn from '@/components/User/SignIn'
import SignUp from '@/components/User/SignUp'
import Meetup from '@/components/Meetup/Meetup'
import Dashboard from '@/components/Terapan/Dashboard'
import DataPenjurusan from '@/components/Terapan/DataPenjurusan'
import Penjurusan from '@/components/Terapan/Penjurusan'
import RapotSiswa from '@/components/Terapan/RapotSiswa'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Home',
    //   component: Home
    // },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/penjurusan',
      name: 'Penjurusan',
      component: Penjurusan
    },
    {
      path: '/datapenjurusan',
      name: 'DataPenjurusan',
      component: DataPenjurusan
    },
    {
      path: '/rapotsiswa',
      name: 'RapotSiswa',
      component: RapotSiswa
    },





    {
      path:'/meetups',
      name:'Meetups',
      component:Meetups
    },
    {
      path:'/meetups/:id',
      name:'Meetup',
      props:true,
      component:Meetup
    },
    {
      path:'/meetup/new',
      name:'CreateMeetup',
      component:CreateMeetup,
      beforeEnter:AuthGuard
    },
    {
      path:'/profile',
      name:'Profile',
      component:Profile,
      beforeEnter:AuthGuard
    },
    {
      path:'/signin',
      name:'SignIn',
      component:SignIn
    },
    {
      path:'/signup',
      name:'SignUp',
      component:SignUp
    },

  ],
  mode:'history'
})
