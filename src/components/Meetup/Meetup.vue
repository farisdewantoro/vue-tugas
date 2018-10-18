<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl >
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
      :size="70"
      color="primary"
      indeterminate
      :width="7"
       class="mt-5" ></v-progress-circular>
      </v-flex>
    </v-layout>

    <v-layout row wrap v-else>
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title>
          <h3 class="primary--text">{{meetup.title}}</h3>
          <template v-if="userIsCreator">
            <v-spacer></v-spacer>
            <app-edit-meetup-details-dialog :meetup="meetup"></app-edit-meetup-details-dialog>
          </template>
        </v-card-title>
        <v-img
        class="white--text"
        height="400px"
        :src="meetup.imageUrl"
        >

      </v-img>
      <v-card-text>
        <div class="info--text">
          {{meetup.date | date}}
        </div>
         <div class="info--text">{{meetup.location}}</div>
        <div >
        {{meetup.description}}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" >Register</v-btn>
      </v-card-actions>
      </v-card>
    </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props:['id'],
  computed:{
    meetup(){
      return this.$store.getters.loadedMeetup(this.id);
    },
    userIsAuthenticated(){
      return this.$store.getters.user;
    },
    userIsCreator(){
      if (!this.userIsAuthenticated) {
        return false;
      }
        return this.$store.getters.user.id === this.meetup.creatorId;
    },
    loading(){
      return this.$store.getters.loading;
    },

  }
}
</script>

<style lang="css">
</style>
