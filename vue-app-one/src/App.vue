<template>
  <v-app light>
    <v-navigation-drawer v-model="sideNav" temporary>
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title" router :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="userIsAuthenticated" @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="pink">
      <div class="hidden-sm-and-up">
        <v-toolbar-side-icon @click.stop="sideNav = !sideNav" ></v-toolbar-side-icon>
      </div>
      <v-toolbar-title><router-link to="/" tag="span" style="cursor: pointer">My Project</router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" :key="item.title" router :to="item.link">
          <v-icon dark left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
        <v-btn flat v-if="userIsAuthenticated" @click="onLogout">
          <v-icon dark left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
    <v-footer class="pa-3">
      <v-spacer></v-spacer>
      <div>© {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false,
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      menuItems () {
        let menuItems = [
          { icon: 'lock_open', title: 'Sign in', link:'/signin'}
        ]
        if (this.userIsAuthenticated) {
          menuItems = [
            { icon: 'supervisor_account', title: 'Admin', link:'/admin'},
            { icon: 'account_circle', title: 'Profile', link:'/profile'}
          ]
        }
        return menuItems
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    watch: {
      user (value) {
        if (value == null && value == undefined) {
          this.$router.push('/signin')
        }
      }
    },
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
