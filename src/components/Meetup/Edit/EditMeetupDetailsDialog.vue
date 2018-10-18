<template lang="html">
  <v-dialog
    scrollable
    persistent
    :overlay="true"
    max-width="500px"
    transition="dialog-transition"
    v-model="editDialog"
  >
    <v-btn fab accent slot="activator">
      <v-icon>edit</v-icon></v-btn>
      <v-card>
        <v-container grid-list-xs,sm,md,lg,xl>
          <v-layout row wrap>
            <v-flex xs12>
                <v-card-title primary-title>
                Edit Meetup
                </v-card-title>
            </v-flex>
          </v-layout>

              <v-divider></v-divider>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-card-text>
                    <v-text-field
                      name="title"
                      label="Title"
                      id="title"
                      v-model="editedTitle"
                       :rules="[rules.required]"
                    ></v-text-field>
                    <v-textarea
                      name="description"
                      label="Description"
                      id="description"
                      multi-line
                        v-model="editedDescription"
                         :rules="[rules.required]"
                    ></v-textarea>
                  </v-card-text>
                </v-flex>
              </v-layout>
              <v-divider></v-divider>
              <v-layout row wrap class="mt-2">
                <v-flex xs12>
                  <v-card-actions>
                    <v-btn flat color="primary" @click="editDialog =false" >Close</v-btn>
                    <v-btn flat color="primary"  @click="onSaveChanges">Save</v-btn>
                  </v-card-actions>
                </v-flex>
              </v-layout>

        </v-container>
      </v-card>
  </v-dialog>
</template>

<script>
export default {
  props:['meetup'],
  data(){
    return {
      rules: {
     required: value => !!value || 'Required.',
     counter: value => value.length <= 20 || 'Max 20 characters',
     email: value => {
       const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
       return pattern.test(value) || 'Invalid e-mail.'
         }
       },
       editDialog:false,
       editedTitle:this.meetup.title,
       editedDescription:this.meetup.description

    }
  },
  methods:{
    onSaveChanges(){
      if (this.editedTitle.trim()===''|| this.editedDescription.trim()==='') {
        return;
      }
      this.editDialog=false;
      this.$store.dispatch('updateMeetupData',{
        id:this.meetup.id,
        title:this.editedTitle,
        description:this.editedDescription
      });
    }
  }
}
</script>

<style lang="css">
</style>
