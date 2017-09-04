<template>
  <v-container>
    <v-layout row wrap align-center class="mt-5">
      <v-flex xs12>
        <h1 class="text-xs-center">Profile Page</h1>
        <v-card>
          {{user.profile.displayName}}
          {{user.profile.username}}
          {{user.profile.email}}
          {{user.role.name}}
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      user () {
        return this.$store.getters.user
      }
    }
  }
</script>

<style>

</style>