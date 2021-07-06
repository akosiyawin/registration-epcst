<template>
  <div class="mainPanel">
    <div class="card elevation-3 white rounded-lg pa-5">
      <v-form @submit.prevent="signin">
        <h3>EPCST REGISTRATION SYSTEM</h3>
        <p>Enter your credentials to access your account.</p>
        <v-text-field
          v-model="email"
          prepend-inner-icon="mdi-email"
          outlined
          required
          type="email"
          class="myInput"
          placeholder="EMAIL"
        ></v-text-field>
        <v-text-field
          v-model="password"
          type="password"
          prepend-inner-icon="mdi-lock"
          outlined
          required
          class="myInput"
          placeholder="PASSWORD"
        ></v-text-field>
        <v-btn type="submit" color="info" block large>SIGN IN</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import {db} from "../database/db";

export default {
  data: () => ({ email: "", password: "" }),
  methods: {
    signin() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .catch(err => this.$swal({
        icon: "error",
        title: err.message
      })).then((r) => {
        localStorage.setItem("email",this.email)
        localStorage.setItem("password",this.password)
        db.collection("accounts").doc(r.user.uid)
        .get().then(r=>{
          if(!r.get("status") && r.get("role") === "Staff") {
            firebase.auth().signOut().then(() => {
              this.$swal({
                icon: "warning",
                title: "Your account has been suspended."
              })
            })
          }
          localStorage.setItem("role",r.get("role"))
        })
      })
    },
  },
};
</script>

<style scoped>
.mainPanel {
  background: #f2f5ff;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
form {
  min-width: 200px;
  width: 100vw;
  max-width: 420px;
}
h3 {
  font-family: Roboto;
  text-align: center;
  font-weight: 500;
}

p {
  font-family: Roboto;
  font-size: 12px;
  text-align: center;
  opacity: 0.7;
}
</style>
