<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl>
    <v-layout row wrap v-for="meetup in meetups" :key="meetup.id" class="mb-2">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info" >
          <v-layout row wrap >
            <v-flex xs5 sm4 md3>
              <v-img
              height="200px"
              :src="meetup.imageUrl"
              >

            </v-img>
            </v-flex>
            <v-flex xs7 sm8 md9>
              <v-card-title primary-title>
         <div>
           <h3 class="headline mb-0 white--text">{{meetup.title}}</h3>
           <div class="white--text">
             {{meetup.date | date}}
             <span>{{meetup.location}}</span>
           </div>
           <div class="white--text">{{meetup.description}}</div>
         </div>
       </v-card-title>
       <v-card-actions>
  <v-btn flat :to="'/meetups/'+meetup.id"><v-icon left >arrow_forward</v-icon>View Meetups</v-btn>
  <v-btn flat color="orange">Explore</v-btn>
</v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed:{
    meetups(){
      return this.$store.getters.loadedMeetups
    }
  }
}
</script>

<style lang="css">
</style>
