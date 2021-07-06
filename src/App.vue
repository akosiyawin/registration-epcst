<template>
  <v-app>
      <router-view />
  </v-app>
</template>

<script>
import "@/database/db";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "App",
  created() {
    if (!localStorage.getItem("password")) {
      firebase.auth().signOut()
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        if (this.$route.name !== "Login") {
          this.$router.replace({name: "Login"});
        }
      }else {
        if(this.$route.name === "Login") {
          this.$router.replace({name : "Home"});
        }
      }
    });
  },
};
</script>
