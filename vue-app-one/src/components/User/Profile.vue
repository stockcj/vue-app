<template>
  <v-container>
    <v-layout row wrap align-center class="mt-5">
      <v-flex xs12>
        <h1 class="text-xs-center">Profile Page</h1>
        <v-card>
          <v-card-title>
            <div>
              <span class="grey--text">Display Name: {{user.profile.displayName}}</span><br>
              <span>Username: {{user.profile.username}}</span><br>
              <span>Email: {{user.profile.email}}</span><br>
              <span>Role: {{user.role.name}}</span>
            </div>
          </v-card-title>
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