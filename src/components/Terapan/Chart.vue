<template>
  <div class="small">
    <line-chart :chart-data="datacollection"></line-chart>
    <button @click="fillData()">Randomize</button>
  </div>
</template>

<script>

</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>
