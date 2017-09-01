<template>
  <v-container>
    <v-layout row wrap align-center class="mt-5">
      <v-flex xs12>
        <h1 class="text-xs-center">User Page</h1>
        <p>{{selectedUser.profile.displayName}}</p>
        <p>{{selectedUser.profile.email}}</p>
        <p>{{selectedUser.profile.username}}</p>
        <p>{{selectedUser.role.name}}</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  props : ['id'],
  validations: {
    selectedUser: {
      required,
      profile: {
        displayName: {required},
        email: {required, email},
        username: {required}
      },
      role: {
        name: {required}
      }
    }
  },
  computed: {
    selectedUser () {
      return this.$store.getters.loadedUser(this.id)
    },
    userNameErrors () {
      const errors = []
      if (!this.$v.selectedUser.profile.displayName.$dirty) return errors
      !this.$v.selectedUser.profile.displayName.minLength && errors.push('Name must be at least 3 characters long')
      !this.$v.selectedUser.profile.displayName.required && errors.push('Display Name is required.')
      return errors
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onSaveChanges: function () {
      const userData = this.selectedUser
      this.$store.dispatch('updateUser', userData)
      this.$router.push('/admin/users')
    }
  }
}
</script>

<style>

</style>
