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
            <form action="">
              <pre>{{updatedUser}}</pre>
              <v-text-field
               label="Display Name"
               v-model="updatedUser.profile.displayName"
               required>
              </v-text-field>
              <v-text-field
               label="Username"
               v-model="updatedUser.profile.username"
               required>
              </v-text-field>
              <v-text-field
               label="Email"
               v-model="updatedUser.profile.email"
               required>
              </v-text-field>
              <v-select
               name="role"
               v-bind:items="roles"
               item-text="name"
               v-model="updatedUser.role"
               label="Select Role"
               return-object
               single-line
               bottom>
              </v-select>
            </form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        updatedUser: ''
      }
    },
    computed: {
      user () {
        this.updatedUser = this.$store.getters.user
      },
      roles () {
        return this.$store.getters.loadedRoles
      }
    },
    methods: {
      fetchRoles: function () {
        this.$store.dispatch('loadRoles')
      }
    },
    beforeMount(){
      this.fetchRoles()
    }
  }
</script>

<style>

</style>