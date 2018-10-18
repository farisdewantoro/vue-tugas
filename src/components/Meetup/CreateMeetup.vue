<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h2>Create a new Meetup</h2>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <form @submit.prevent="onCreateMeetup">
          <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="title"
                 :rules="[rules.required]"
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="location"
                label="Location"
                id="location"
                v-model="location"
                 :rules="[rules.required]"
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn raised class="primary" @click="onPickFile">
                Upload Image</v-btn>
              <input type="file"
                     style="display:none"
                     ref="fileInput"
                     accept="image/*"
                     @change="onFilePicked">
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
              <v-img :src="imageUrl" contain max-height="300" max-width="100%"></v-img>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
              <v-textarea
                name="description"
                label="Description"
                id="description"
                multi-line
                  v-model="description"
                 :rules="[rules.required]"
              ></v-textarea>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
              <h4>Choose a Date & Time</h4>
            </v-flex>
          </v-layout>
          <v-layout row wrap mb-2>
            <v-flex xs12 sm6 offset-sm3>
              <v-dialog
               ref="modalDate"
               v-model="modalDate"
               :return-value.sync="date"
               persistent
               lazy

               full-width
               width="290px"
             >
               <v-text-field
                 slot="activator"
                 v-model="date"
                 label="Picker in dialog"
                 prepend-icon="event"
                 readonly
               ></v-text-field>
               <v-date-picker v-model="date" scrollable>
                 <v-spacer></v-spacer>
                 <v-btn flat color="primary" @click="modalDate = false">Cancel</v-btn>
                 <v-btn flat color="primary" @click="$refs.modalDate.save(date)">OK</v-btn>
               </v-date-picker>
             </v-dialog>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
              <v-dialog
         ref="dialog"
         v-model="modalTime"
         :return-value.sync="time"
         persistent
         lazy
         full-width
         width="290px"
       >
         <v-text-field
           slot="activator"
           v-model="time"
           label="Picker in dialog"
           prepend-icon="access_time"
           readonly
         ></v-text-field>
         <v-time-picker
           v-if="modalTime"
           v-model="time"
           full-width
           format="24hr"
           value

         >
           <v-spacer></v-spacer>
           <v-btn flat color="primary" @click="modalTime = false">Cancel</v-btn>
           <v-btn flat color="primary" @click="$refs.dialog.save(time)">OK</v-btn>
         </v-time-picker>
       </v-dialog>

            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn block color="primary" dark type="submit" :disabled="!formIsValid">Create Meetups</v-btn>
            </v-flex>
          </v-layout>

        </form>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
export default {
  name:"CreateMeetup",
  data(){
    return{
      title:'',
      location:'',
      imageUrl:'',
      description:'',
      date:null,
      time:null,
      image:null,
      modalDate: false,
      modalTime:false,
      timestamp:null,
      rules: {
     required: value => !!value || 'Required.',
     counter: value => value.length <= 20 || 'Max 20 characters',
     email: value => {
       const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
       return pattern.test(value) || 'Invalid e-mail.'
         }
       }


    }
  },
  computed:{
    formIsValid(){
      return this.title !== '' &&
      this.location !== '' &&
      this.imageUrl !== '' &&
      this.description !== '' &&
      this.dateTime !==''
    },
    submittableDateTime(){
      if (this.time != null && this.date != null ) {

        const date = new Date(this.date);
        if (typeof this.time === 'string') {
          const hours = this.time.match(/^(\d+)/)[1];
          const minutes = this.time.match(/:(\d+)/)[1];
          date.setHours(hours);
          date.setMinutes(minutes);
        }else{
          date.setHours(this.time.getHours());
          date.setMinutes(this.time.getMinutes());
        }
        let dateTime = date.getTime();
        this.timestamp = date;
        return date;
      }

    }
  },
  methods:{
    onCreateMeetup(){
      if (!this.formIsValid) {
        return false;
      }
      if (!this.image) {
        return
      }
      const meetupData = {
        title:this.title,
        location:this.location,
        image:this.image,
        description:this.description,
        date:this.submittableDateTime

      }
      this.$store.dispatch('createMeetup',meetupData);
      this.$router.push('/meetups');
    },
    onPickFile(){
      this.$refs.fileInput.click();
    },
    onFilePicked(event){
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf('.') <= 0) {
        return alert('PLEASE ADD A VALIDE FILE !');
      }
      let reader = new FileReader();

      reader.addEventListener('load',(e)=>{
        this.imageUrl = e.target.result;
      });
      reader.readAsDataURL(files[0]);
      this.image = files[0];

    }
  }
}
</script>

<style lang="css">
</style>
