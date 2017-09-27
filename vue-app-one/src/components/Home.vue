<template>
  <v-container>
    <v-layout row wrap align-center class="mt-5">
      <v-flex xs12>
        <h1 class="text-xs-center">Home Page</h1>
      </v-flex>
      <cont-search class="mt-5"></cont-search>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  methods: {
    fetchExams: function () {
      this.$store.dispatch('loadExams')
    }
  },
  beforeMount(){
    this.fetchExams()
 }

}
</script>

<style>

</style>
