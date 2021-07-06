<template>
  <base-app>
    <v-container>
      <v-form @submit.prevent="save" ref="form">
        <v-row>
          <v-col cols="12">
            <v-card-title>CREATE NEW STAFF</v-card-title>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
                v-model="form.name"
                required
                :rules="rule"
                label="Name" outlined prepend-inner-icon="mdi-account"></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
                required
                :rules="rule"
                v-model="form.email"
                label="Email" type="email" outlined prepend-inner-icon="mdi-email"></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
                required
                :rules="rule"
                v-model="form.password"
                label="Password" type="password" outlined prepend-inner-icon="mdi-lock"></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-btn x-large type="submit" color="success">Save</v-btn>
          </v-col>
        </v-row>
      </v-form>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>
              <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
                height="600px"
                :headers="headers"
                :items="accounts"
                :search="search"
            >
              <template v-slot:item.actions="{ item }">
                <v-chip color="success" @click="handleEdit(item)">
                  <v-icon>mdi-pen</v-icon>
                </v-chip>
                <v-chip v-if="item.status" color="error" class="ml-2" @click="disableUser(item,false)">
                  Disable
                </v-chip>
                <v-chip v-else color="success" class="ml-2" @click="disableUser(item,true)">
                  Enable
                </v-chip>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <template>
      <v-row justify="center">
        <v-dialog
            v-model="dialog"
            persistent
            max-width="700px"
        >
          <v-card>
            <v-card-title>
              <span class="text-h5">Staff Profile</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-form ref="editForm">
                  <v-row>
                    <v-col
                        cols="12"
                        class="pb-0"
                    >
                      <v-text-field
                          :rules="rule"
                          v-model="editForm.name"
                          filled
                          color="blue-grey lighten-2"
                          label="Name"
                          prepend-inner-icon="mdi-smart-card"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        class="pb-0"
                    >
                      <v-text-field
                          v-model="editForm.email"
                          filled
                          disabled
                          color="blue-grey lighten-2"
                          label="Email"
                          prepend-inner-icon="mdi-smart-card"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="dialog = false"
              >
                Close
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="saveEdit"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </base-app>
</template>

<script>
import BaseApp from "../components/BaseApp";
import Form from "../plugins/Form";
import {db} from "../database/db";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Accounts",
  components: {BaseApp},
  data: () => ({
    search: "",
    accounts: [],
    dialog: false,
    editForm: new Form({
      email: "",
      name: "",
    }),
    rule: [
      v => !!v || 'This field is required',
    ],
    headers: [
      {text: 'Name', value: 'name'},
      {text: 'Email', value: 'email'},
      {text: 'Actions', value: 'actions'},
    ],
    form: new Form({
      email: "",
      password: "",
      name: "",
    })
  }),
  created() {
    if(this.role === "Staff") {
      this.$router.replace({name: "Home"})
    }

    db.collection("accounts").onSnapshot(r => {
      this.accounts = r.docs.map(doc => {
        return {...doc.data(), id: doc.id}
      });
    })
  },
  methods: {
    handleEdit(user) {
      this.editForm.name = user.name
      this.editForm.email = user.email
      this.editForm.id = user.id
      this.dialog = true;
    },
    saveEdit() {
      if (!this.$refs.editForm.validate()) return;
      db.collection("accounts").doc(this.editForm.id)
          .update({name: this.editForm.name})
          .then(r => {
            this.$swal({
              position: 'top-end',
              icon: 'success',
              title: 'Data has been saved',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              this.dialog = false
            })
          })
    },
    async disableUser(user, status) {
      this.$swal({
        title: 'Are you sure?',
        text: `You want to ${status ? "enable" : "disable"} this user?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await db.collection("accounts").doc(user.id)
              .update({status: status})
          this.$swal(
              'Saved!',
              `Staff account has been ${status ? "enabled" : "disabled"}.`,
              'success'
          )
        }
      })
    },
    save() {
      if (!this.$refs.form.validate()) return;
      firebase.auth().createUserWithEmailAndPassword(this.form.email, this.form.password)
          .then((result) => {
            db.collection("accounts")
                .doc(result.user.uid)
                .set({
                  name: this.form.name,
                  email: this.form.email,
                  role: "Staff"
                })
                .then(() => {
                  this.form.reset();
                  this.$refs.form.reset()
                  firebase.auth().signInWithEmailAndPassword(localStorage.getItem("email"), localStorage.getItem("password"))
                  this.$swal({
                    icon: "success",
                    title: "New user has been created!"
                  })
                })
          })
          .catch(err => {
            this.$swal({
              icon: "error",
              title: err.message
            })
          })
    }
  }
}
</script>

<style scoped>

</style>