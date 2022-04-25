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
          <v-list-item-title style="font-family: 'Quicksand', sans-serif;font-size:20px;">
            <strong>
              marcel-vue-software
            </strong>
            
          </v-list-item-title>
          <v-list-item-subtitle style="font-family: 'Patrick Hand', cursive; font-size:18px; color:white">
            Menu
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
      shrink-on-scroll
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

      
        <strong style="padding-left: 20px;font-family: 'Quicksand', sans-serif;">Welcome</strong>
      
      

      <v-spacer></v-spacer>
      
      
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
<style>
@import url('https://fonts.googleapis.com/css2?family=Asap+Condensed:ital@1&family=Bebas+Neue&family=Concert+One&family=Courgette&family=Dancing+Script:wght@500&family=Fredoka+One&family=Pacifico&family=Parisienne&family=Patrick+Hand&family=Permanent+Marker&family=Press+Start+2P&family=Quicksand&family=Satisfy&family=Shadows+Into+Light&family=Yanone+Kaffeesatz:wght@600&display=swap');
/*
font-family: 'Asap Condensed', sans-serif;
font-family: 'Bebas Neue', cursive;
font-family: 'Concert One', cursive;
font-family: 'Courgette', cursive;
font-family: 'Dancing Script', cursive;
font-family: 'Fredoka One', cursive;
font-family: 'Pacifico', cursive;
font-family: 'Parisienne', cursive;
font-family: 'Patrick Hand', cursive;
font-family: 'Permanent Marker', cursive;
font-family: 'Press Start 2P', cursive;
font-family: 'Quicksand', sans-serif;
font-family: 'Satisfy', cursive;
font-family: 'Shadows Into Light', cursive;
font-family: 'Yanone Kaffeesatz', sans-serif;
*/
</style>