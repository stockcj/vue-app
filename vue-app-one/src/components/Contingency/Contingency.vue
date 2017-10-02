<template>
  <v-container>
    <v-layout row wrap align-center class="mt-5">
      <v-flex xs12>
        <h1 class="text-xs-center">Contingency Page</h1>
      </v-flex>
    </v-layout>
    <v-layout row wrap align-left class="mt-5">
      <v-flex xs1>
        <v-btn :to="'/contingency/issue'" class="primary">
          <v-icon dark left>add</v-icon>Issue Contingency</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>
