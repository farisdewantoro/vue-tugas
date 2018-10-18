<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router :to="{name:'Meetups'}" class="primary">Explore Meetups</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn  large router :to="{name:'CreateMeetup'}" class="primary">Organize Meetup </v-btn>
      </v-flex>
    </v-layout>

    <v-layout row wrap >
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
      :size="70"
      color="primary"
      indeterminate
      :width="7"

      v-if="loading" class="mt-5" ></v-progress-circular>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-3" v-if="!loading">
      <v-flex xs12 >
        <v-carousel style="cursor:pointer" >
   <v-carousel-item
     v-for="meetup in meetups"
     :key="meetup.id"
     :src="meetup.imageUrl"
     @click="onLoadMeetup(meetup.id)"
   > <div class="title">
     {{meetup.title}}
   </div> </v-carousel-item>
 </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-3">
      <v-flex xs12  class="text-xs-center">
        <p>Join our meetups</p>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed:{
    meetups(){
      return this.$store.getters.featuredMeetups
    },
    loading(){
      return this.$store.getters.loading;
    }
  },
  data(){
    return{

    }
  },
  methods:{
    onLoadMeetup(id){
      this.$router.push('/meetups/'+id);
    }
  }
}
</script>

<style scoped>
.title{
  position: absolute;
  bottom:50px;
  background:rgba(0,0,0,0.5);
  color:white;


  font-size: 2em;
  padding: 20px;

}
/* .v-progress-circular{
  margin: 1rem
} */

</style>
