<template>
  <v-app  id="inspire">
    <v-navigation-drawer
     v-model="drawer"
     :clipped="$vuetify.breakpoint.lgAndUp"
     fixed
          app
   >
     <v-list dense>
       <v-list-tile @click="" v-for="item in menuItems" :key="item.title"  :to="item.link">
         <v-list-tile-action>
           <v-icon>{{item.icon}}</v-icon>
         </v-list-tile-action>
         <v-list-tile-content>
           <v-list-tile-title>{{item.title}}</v-list-tile-title>
         </v-list-tile-content>
       </v-list-tile>

       <v-list-tile v-if="userIsAuthenticated" @click="onLogout">
         <v-list-tile-action>
           <v-icon>exit_to_app</v-icon>
         </v-list-tile-action>
         <v-list-tile-content>
           <v-list-tile-title>Logout</v-list-tile-title>
         </v-list-tile-content>
       </v-list-tile>

     </v-list>
   </v-navigation-drawer>

    <v-toolbar app dark class="light-blue darken-4"  :clipped-left="$vuetify.breakpoint.lgAndUp">
            <v-toolbar-side-icon @click.stop="drawer = !drawer" ></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link :to="{ name:'Home' }" tag="span" style="cursor:pointer">Aplikasi Bimbingan Konseling</router-link> </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-toolbar-items>
        <v-btn flat v-for="item in menuItems"  :to="{name:item.link}" :key="item.title" class="hidden-sm-and-down">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}</v-btn>

          <v-btn v-if="userIsAuthenticated" flat @click="onLogout" class="hidden-sm-and-down">
            <v-icon left>exit_to_app</v-icon>
            Logout</v-btn>
      </v-toolbar-items> -->
    </v-toolbar>
    <main >
      <v-content>
   <v-container fluid>
     <router-view></router-view>
   </v-container>
 </v-content>

    </main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      drawer:true,
    }
  },
  computed:{
    menuItems(){
      let menuItems =[

        {icon:'face',title:'Sign up',link:'SignUp'},
        {icon:'lock_open',title:'Sign in',link:'SignIn'}
      ];
      if (this.userIsAuthenticated) {
        menuItems=[
        {icon:'dashboard',title:'Dashboard',link:'/'},
        {icon:'assignment',title:'Penjurusan',link:'Penjurusan'},
        {icon:'account_circle',title:'Data Penjurusan Siswa',link:'DataPenjurusan'},
        {icon:'supervisor_account',title:'Rapot Siswa',link:'RapotSiswa'},

        ];
      }
      return menuItems;
    },
    userIsAuthenticated(){
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined;
    }
  },
  methods:{
    onLogout(){
      this.$store.dispatch('logout');
    }
  }

}
</script>
