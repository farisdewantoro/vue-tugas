import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state:{
    loadedMeetups:[
      {
      imageUrl:'',
      title:' ',
      date:null,
      location:'',
      description:'',
      creatorId:'',
      },

    ],
    user:{
      id:null,
      registeredMeetups:[]

    },
    loading:false,
    error:null,
  },
  mutations:{
    createMeetup(state,payload){
      state.loadedMeetups.push(payload);
    },
    updateMeetupData(state,payload){
      const meetup = state.loadedMeetups.find(meetup=>{
        return meetup.id === payload.id;
      });
      if (payload.title) {
        meetup.title=payload.title;
      }
      if (payload.description) {
        meetup.description = payload.description;
      }
      if (payload.date) {
        meetup.date = payload.date;
      }
    },
    setUser(state,payload){
      state.user = payload;
    },
    setLoading(state,payload){
      state.loading = payload;
    },
    setError(state,payload){
      state.error = payload;
    },
    clearError(state,payload){
      state.error =null;
    },
    setLoadedMeetups(state,payload){
      state.loadedMeetups = payload;
    }
  },
  actions:{
    loadMeetups({commit}){
      commit('setLoading',true);
      firebase.database().ref('meetups').once('value')
      .then(ress=>{
        const meetups = [];
        const obj = ress.val();
        for (let key in obj) {
          meetups.push({
            id:key,
            title:obj[key].title,
            description:obj[key].description,
            imageUrl:obj[key].imageUrl,
            date:obj[key].date,
            location:obj[key].location,
            creatorId:obj[key].creatorId
          })
        }
        commit('setLoadedMeetups',meetups);
        commit('setLoading',false);
      }).catch(error=>{
        if (error) {
        console.log(error);
        commit('setLoading',true);
        }
      });
    },
    createMeetup({commit,getters},payload){
      const meetup ={
        title:payload.title,
        location:payload.location,
        description:payload.description,
        date:payload.date.toISOString(),
        creatorId:getters.user.id
      }
      let imageUrl;
      let key;
      firebase.database().ref('meetups').push(meetup)
      .then(ress=>{
         key = ress.key;
        return key;
      }).then(key=>{
        const filename = payload.image.name;
        const ext = filename.slice(filename.lastIndexOf('.'));
        return firebase.storage().ref('meetups/'+key+'.'+ext).put(payload.image);
      }).then(fileData =>{
        firebase.storage().ref('meetups').child(fileData.metadata.name).getDownloadURL()
        .then(url=>{
        imageUrl = url;
        firebase.database().ref('meetups').child(key).update({imageUrl:imageUrl});
       return commit('createMeetup',{
          ...meetup,
          imageUrl:imageUrl,
          id:key
        });
        });
      }).catch(error=>{
        if (error) {
          console.log(error);
        }
      });

    },
    updateMeetupData({commit},payload){
      commit('setLoading',true);
      const updateObj = {};
        if (payload.title) {
          updateObj.title = payload.title;
        }
        if (payload.description) {
          updateObj.description = payload.description;
        }
        if (payload.date) {
          updateObj.date = payload.date;;
        }

      firebase.database().ref('meetups').child(payload.id).update(updateObj)
      .then(()=>{
        commit('setLoading',false);
        commit('updateMeetupData',payload);
      }).catch(error=>{
        if (error) {
          console.log(error);
          commit('setLoading',false);
        }

      });
    },
    signUserUp({commit},payload){
      commit('setLoading',true);
      commit('clearError');
      firebase.auth().createUserWithEmailAndPassword(payload.email,payload.password)
      .then(ress=>{
        commit('setLoading',false);
        const newUser = {
          id:ress.user.uid,
          registeredMeetups:[]
        }
        commit('setUser',newUser);
      }).catch(error=>{
        if (error) {
          commit('setLoading',false);
          commit('setError',error);

        }

      });
    },
    signUserIn({commit},payload){
      commit('setLoading',true);
      commit('clearError');
      firebase.auth().signInWithEmailAndPassword(payload.email,payload.password)
      .then(ress=>{
        commit('setLoading',false);
        const newUser = {
          id:ress.user.uid,
          registeredMeetups:[]
        }
        commit('setUser',newUser);
      }).catch(error=>{
        if (error) {
          commit('setLoading',false);
          commit('setError',error);
        }
      })
    },
    autoSignIn({commit},payload){
      commit('setUser',{id:payload.uid,registeredMeetups:[]});
    },
    clearError({commit}){
      commit('clearError');
    },
    logout({commit}){
      firebase.auth().signOut();
      commit('setUser',null);
    }
  },
  getters:{
    loadedMeetups(state){
      return state.loadedMeetups.sort((meetupA,meetupB)=>{
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups(state,getters){
      return getters.loadedMeetups.slice(0,5);
    },
    loadedMeetup(state){
      return (meetupId)=>{
        return state.loadedMeetups.find((meetup)=>{
          return meetup.id == meetupId
        })
      }
    },
    user(state){
      return state.user;
    },
    loading(state){
      return state.loading;
    },
    error(state){
      return state.error;
    }
  }
})
