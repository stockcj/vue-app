<template>
  <v-container>
    <v-layout row wrap align-center class="mt-5">
      <v-flex xs12>
        <h1 class="text-xs-center">{{exam.name}}</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    exam () {
      return this.$store.getters.loadedExam(this.id)
    }
  }
}
</script>

<style>

</style>