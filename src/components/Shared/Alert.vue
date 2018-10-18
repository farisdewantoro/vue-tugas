<template lang="html">
  <v-alert
  @input="onClose"
  :value="true"
    type="error"
    dismissible
  >
  {{text}}
  </v-alert>
</template>

<script>
export default {
  props:['text'],
  methods:{
    onClose(){
      this.$emit('dissmissed');
    }
  }
}
</script>

<style lang="css">
</style>
