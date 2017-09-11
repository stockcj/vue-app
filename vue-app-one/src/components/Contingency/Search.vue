<template>
  <v-flex xs6 offset-xs3>
    <v-card>
      <v-card-title primary-title>
        <h3>Search</h3>
      </v-card-title>
      <v-card-text>
        <form>
          <v-layout row>
            <v-flex xs8 offset-xs2>
              <v-text-field
                name="centre number"
                label="Centre Number"
              ></v-text-field>
              <v-select
                v-bind:items="exams"
                item-text="name"
                label="Exam"
                single-line
                bottom
              ></v-select>
              <div>
              </div>
            </v-flex>
          </v-layout>
        </form>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  computed: {
    // https://codepen.io/anon/pen/bobrpX
    exams () {
      return this.$store.getters.loadedExams
    },
  }
}
</script>

<style>

</style>
