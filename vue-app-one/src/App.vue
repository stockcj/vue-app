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
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false,
      }
    },
    computed: {
      menuItems () {
        let menuItems = [
          { icon: 'lock_open', title: 'Sign in', link:'/signin'}
        ]
        if (this.userIsAuthenticated) {
          menuItems = [
            { icon: 'supervisor_account', title: 'Admin', link:'/admin'},
            { icon: 'account_circle', title: 'Profile', link:'/profile'},
          ]
        }
        return menuItems
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
