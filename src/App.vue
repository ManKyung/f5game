<template>
  <v-app>
    <v-navigation-drawer persistent :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" enable-resize-watcher fixed app>
      <v-list>
        <v-list-tile value="true" exact active-class="green--text" v-for="(item, i) in items" :key="i" :to="`/${item.category}`">
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app :clipped-left="clipped" dark color="green lighten-2">
    <!-- <v-toolbar app color="pink lighten-2" v-if="isHome"> -->
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <a href="/" style='margin-top: 5px;'><img class="ml-2" src="/static/img/logo.png" height='32'></a>
      <!-- <v-spacer></v-spacer> -->
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
  import datas from './assets/json/categories.json'
  export default {
    name: 'App',
    props:['c'],
    data() {
      return {
        isHome: true,
        clipped: false,
        drawer: false,
        items: [],
        miniVariant: false,
        title: 'F5 Game'
      }
    },
    created() {
            this.items = datas.categories;
      this.isHome = this.$router.history.current.fullPath === '/home' ? true : false;
    }
  }
</script>
