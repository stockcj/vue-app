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
    <v-layout>
      <v-flex xs12>
        <v-data-table
          v-bind:headers="headers"
          v-bind:pagination.sync="pagination"
          :items="recent"
          :loading="loading"
          hide-actions
          item-key="id"
          class="elevation-1 mt-5">
          <template slot="items" scope="props">
            <tr @click="props.expanded = !props.expanded; selected = props.item">
              <td>{{ props.item.centre }}</td>
              <td class="text-xs-right">{{ props.item.exam.name }}</td>
              <td class="text-xs-right">{{ props.item.sitting }}</td>
              <td class="text-xs-right">{{ props.item.testDate }}</td>
              <td class="text-xs-right">{{ props.item.issueDate }}</td>
            </tr>
          </template>
          <template slot="expand" scope="props">
            <v-card class="elevation-0">
              <v-card-text>Issued by: {{selected.issuedBy}}</v-card-text>
              <v-card-text v-for="(value, key) in selected.components" :key="key" class="pt-0">{{key}} : {{value}}</v-card-text>
            </v-card>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <snack-alert></snack-alert>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      selected: {},
      headers: [
        {
          text: 'Centre',
          align: 'left',
          sortable: false,
          value: 'centre'
        },
        {
          text: 'Exam',
          value: 'exam'
        },
        {
          text: 'Sitting',
          value: 'sitting',
          sortable: false
        },
        {
          text: 'Test Date',
          value: 'testDate'
        },
        {
          text: 'Issue Date',
          value: 'issueDate'
        }
      ],
      pagination: {
          sortBy: 'issueDate',
          descending: true,
          rowsPerPage: 10, 
      },
    }
  },
  computed: {
    recent () {
      return this.$store.getters.recentContHistory
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    fetchRecentContHistory: function () {
      this.$store.dispatch('loadRecentContHistory')
    }
  },
  beforeMount(){
    this.fetchRecentContHistory()
 }

}
</script>

<style>

</style>
