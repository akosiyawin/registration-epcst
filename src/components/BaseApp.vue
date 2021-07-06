<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        app
    >
      <v-card-subtitle>Hello {{ role }}</v-card-subtitle>
      <v-list shaped>
        <v-list-item-group
            color="primary"
        >
          <v-list-item
              :to="item.to"
              v-for="(item, i) in items"
              :key="i"
              exact
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <div class="mx-1">
        <v-btn color="error" large block @click="signout">Sign out</v-btn>
      </div>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ this.$route.name }}</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <slot>
        Unable to load content
      </slot>
    </v-main>
  </v-app>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import {db} from "../database/db";

export default {
  data: () => ({
    drawer: null,
    role: "",
    items: [
      {text: 'Home', icon: 'mdi-home', to: {name: "Home"}},
      {text: 'Registration', icon: 'mdi-school', to: {name: "Registration"}},
    ],
  }),
  watch: {
    role(){
      console.log(this.role)
      if(this.role === "Admin") {
        this.items.push({text: 'Accounts', icon: 'mdi-account-edit', to: {name: "Accounts"}})
      }
    }
  },
  methods: {
    signout(){
      localStorage.clear()
      firebase.auth().signOut()
    }
  },
  async created() {
    if(this.role === "Admin") {
      this.items.push({text: 'Accounts', icon: 'mdi-account-edit', to: {name: "Accounts"}})
    }
    this.role = localStorage.getItem("role")
    if(!this.role) {
      setTimeout(() => {
        location.reload();
      },1000)
    }
  }
}
</script>
