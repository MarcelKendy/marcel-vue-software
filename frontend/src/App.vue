<template>
  <v-app id="inspire">
   <v-navigation-drawer v-model="drawer" app>
     <v-img src="./assets/images/akatsuki.jpg" gradient="to top right, rgba(265,56,76,.6), rgba(25,32,72,.7)" dark class="pt-5 text-center">
      <v-avatar
        size="100px">
                  <img
                    alt="Avatar"
                    src="./assets/images/itachijesus.jpg"
                  >
        </v-avatar>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            To-Do List
          </v-list-item-title>
          <v-list-item-subtitle>
            Software
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
     </v-img>
    <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>



    <v-app-bar
      
      app
      color="#d15c79"
      dark
      src="./assets/images/sakura.jpg"
      fade-img-on-scroll
      scroll-threshold="400"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(265,56,76,.6), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Welcome</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
  

    <v-main>
      <router-view></router-view>
    </v-main>
    <footer-component></footer-component>
  </v-app>
</template>

<script>
import FooterComponent from './components/FooterComponent.vue'
  export default {
  components: { FooterComponent },
    data: () => 
    ({ 
      drawer: false,
      items: [
          { title: 'Home', icon: 'mdi-view-dashboard', to: '/home'},
          { title: 'Tasks', icon: 'mdi-view-list', to: '/tasks'},
          { title: 'About', icon: 'mdi-help', to: '/about' }
      ],
    }),
    created () {
    }
  }
</script>