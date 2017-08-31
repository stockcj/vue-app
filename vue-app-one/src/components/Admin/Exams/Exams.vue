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
    <v-layout>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate class="primary--text" :width="7" :size="70" v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-5" v-if="!loading">
      <v-flex xs4 v-for="exam in exams" :key="exam.$key" class="mt-3">
        <v-card>
          <v-container fill-height fluid>
            <v-layout fill-height row wrap>
              <v-list>
                <h3 class="headline mb-0">{{exam.name}}</h3>
                <v-list-tile v-for="component in exam.components" :key="component.$key">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ component.name }}</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action v-for="version in component.versions" :key="version.$key">
                    <v-chip small v-if="version.active" class="pink white--text">{{version.name}}</v-chip>
                    <v-chip small v-if="!version.active">{{version.name}}</v-chip>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </v-layout>
          </v-container>
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
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style>
  .card {
    min-height: 240px;
  }
  .card__actions {
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>
