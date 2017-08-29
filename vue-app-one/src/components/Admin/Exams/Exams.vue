<template>
  <v-container>
    <v-layout row wrap align-center class="mt-5">
      <v-flex xs12>
        <h1 class="text-xs-center">Exams Page</h1>
      </v-flex>
    </v-layout>
    <v-layout row wrap align-left class="mt-5">
      <v-flex xs1>
        <v-btn :to="'/admin/exam/new'" class="primary"><v-icon dark left>add</v-icon>Add Exam</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-5">
      <v-flex xs4 v-for="exam in exams" :key="exam.$key" class="mt-3">
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{exam.name}}</h3>
              <div v-for="component in exam.components" :key="component.$key">{{component.name}}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat :to="'/admin/exams/' + exam.$key" class="blue--text">Edit</v-btn>
            <v-btn flat class="red--text">Delete</v-btn>
          </v-card-actions>
        </v-card>
    </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    exams () {
      return this.$store.getters.loadedExams
    }
  }
}
</script>

<style>

</style>
