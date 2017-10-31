<template>
  <v-container>
    <v-layout row wrap align-center class="mt-5">
      <v-flex xs12>
        <h1 class="text-xs-center display-2">Your Profile</h1>
      </v-flex>
      <v-flex xs12 md4 offset-md4 class="mt-3">
        <v-card>
          <v-card-title>
            <h5>Edit your profile</h5>
          </v-card-title>
          <v-card-text>
            <form @submit.prevent="onUpdateProfile">
              <v-layout>
                <v-flex>
                  <v-text-field
                  label="Display Name"
                  v-model="currentUser.profile.displayName"
                  required>
                  </v-text-field>
                  <v-text-field
                  label="Username"
                  v-model="currentUser.profile.username"
                  required>
                  </v-text-field>
                  <v-text-field
                  label="Email"
                  v-model="currentUser.profile.email"
                  required>
                  </v-text-field>
                  <!-- <v-select
                  v-bind:items="roles"
                  v-model="currentUser.role"
                  label="Select Role"
                  single-line
                  item-text="name"
                  item-value="id"
                  return-object
                  ></v-select> -->
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex>
                  <v-btn
                    class="primary mt-5"
                    type="submit"
                    >Update Profile</v-btn>
                </v-flex>
              </v-layout>
            </form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row v-if="error">
      <v-flex xs12 md4 offset-md4>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <snack-alert></snack-alert>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        currentUser: {}
      }
    },
    computed: {
      roles () {
        return this.$store.getters.loadedRoles
      },
      error () {
        return this.$store.getters.error
      }
    },
    methods: {
      fetchRoles: function () {
        this.$store.dispatch('loadRoles')
      },
      onUpdateProfile: function () {
        const userData = this.currentUser
        this.$store.dispatch('updateProfile', userData)
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      }
    },
    created (){
      this.fetchRoles()
      this.currentUser = Object.assign({}, this.$store.getters.user)
    }
  }
</script>

<style>

</style>