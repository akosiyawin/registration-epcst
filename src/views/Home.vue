<template>
     <base-app>
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-card class="d-flex align-center justify-center" height="200" color="info" dark>
                <div class="d-flex">
                  <v-icon x-large>mdi-face-woman</v-icon>
                  <div>
                    <v-card-title>{{female}}</v-card-title>
                    <v-card-subtitle>
                      Female
                    </v-card-subtitle>
                  </div>
                </div>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card class="d-flex align-center justify-center" height="200"  color="info" dark>
                <div class="d-flex">
                  <v-icon x-large>mdi-face</v-icon>
                  <div>
                    <v-card-title>{{male}}</v-card-title>
                    <v-card-subtitle>
                      Male
                    </v-card-subtitle>
                  </div>
                </div>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card class="d-flex align-center justify-center" height="200" color="success" dark>
                <div class="d-flex">
                  <v-icon x-large>mdi-school</v-icon>
                  <div>
                    <v-card-title>{{ students }}</v-card-title>
                    <v-card-subtitle>
                      Students
                    </v-card-subtitle>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
     </base-app>
</template>

<script>
import BaseApp from '../components/BaseApp'
import {db} from "../database/db";

export default {
  name: 'Home',
  components: {
    BaseApp
  },
  data: () => ({
    male: 0,
    female: 0,
    students: 0,
  }),
  created() {

    db.collection("students")
    .where("gender","==","Male")
    .get()
    .then(r=>{
      this.male = r.docs.length
    })

    db.collection("students")
        .where("gender","==","Female")
        .get()
        .then(r=>{
          this.female = r.docs.length
        })

    db.collection("students")
        .get()
        .then(r=>{
          this.students = r.docs.length
        })
  }
}
</script>
