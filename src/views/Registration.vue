<template>
  <base-app>
    <template>
      <v-row class="pa-2">
        <v-col cols="12" class="d-flex justify-center">
          <v-form @submit.prevent="register" ref="form" enctype="multipart/form-data">
            <v-card
                min-width="300px"
                max-width="860px"
                color="blue-grey darken-1"
                dark
                :loading="isUpdating"
            >
              <template v-slot:progress>
                <v-progress-linear
                    absolute
                    color="green lighten-3"
                    height="4"
                    indeterminate
                ></v-progress-linear>
              </template>
              <v-img
                  height="200"
                  src="https://static.imoney.ph/articles/wp-content/uploads/2019/06/registration.png"
              >
                <v-row
                    class="pa-4"
                    align="center"
                    justify="center"
                >
                  <!--                <v-col class="text-center">-->
                  <!--                  <h3 class="text-h5">-->
                  <!--                    Static text-->
                  <!--                  </h3>-->
                  <!--                  <span class="grey&#45;&#45;text text&#45;&#45;lighten-1">Static text</span>-->
                  <!--                </v-col>-->
                </v-row>
              </v-img>
              <div>
                <v-container>
                  <v-row>
                    <v-col
                        cols="12"
                        md="4"
                        class="pb-0"
                    >
                      <v-text-field
                          :rules="rule"
                          v-model="form.idNumber"
                          :disabled="isUpdating"
                          filled
                          color="blue-grey lighten-2"
                          label="ID Number"
                          prepend-inner-icon="mdi-smart-card"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        class="pb-0"
                        cols="12"
                        md="8"
                    >
                      <v-text-field
                          :rules="rule"
                          v-model="form.fullName"
                          :disabled="isUpdating"
                          filled
                          color="blue-grey lighten-2"
                          label="Full Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                          :rules="rule"
                          v-model="form.contactNumber"
                          :disabled="isUpdating"
                          filled
                          type="number"
                          color="blue-grey lighten-2"
                          label="Contact Number"
                          prepend-inner-icon="mdi-card-account-phone"
                      ></v-text-field>
                      <v-select
                          v-model="form.gender"
                          :rules="rule"
                          :disabled="isUpdating"
                          filled
                          color="blue-grey lighten-2"
                          label="Gender"
                          :items="['Male', 'Female']"
                          prepend-inner-icon="mdi-gender-male-female"
                      >
                      </v-select>
                      <v-row>
                        <v-col cols="12" md="6">
                          <v-text-field
                              :rules="rule"
                              type="date"
                              v-model="form.birthdate"
                              :disabled="isUpdating"
                              filled
                              color="blue-grey lighten-2"
                              label="Birthdate"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                              :rules="rule"
                              v-model="form.birthplace"
                              :disabled="isUpdating"
                              filled
                              color="blue-grey lighten-2"
                              label="Birthplace"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-text-field
                          v-model="form.address"
                          :rules="rule"
                          :disabled="isUpdating"
                          prepend-inner-icon="mdi-home-map-marker"
                          filled
                          color="blue-grey lighten-2"
                          label="Address (block/bldg., house #, street, barangay, municipality, province)"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="8" class="py-0">
                      <v-text-field
                          :rules="rule"
                          v-model="form.guardianName"
                          :disabled="isUpdating"
                          filled
                          color="blue-grey lighten-2"
                          label="Guardian"
                          prepend-inner-icon="mdi-account-child"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" class="py-0">
                      <v-text-field
                          :rules="rule"

                          v-model="form.relationshipToGuardian"
                          :disabled="isUpdating"
                          filled
                          color="blue-grey lighten-2"
                          label="Relationship to Guardian"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="py-0">
                      <v-text-field
                          :rules="rule"
                          v-model="form.guardianContactNumber"
                          type="number"
                          :disabled="isUpdating"
                          filled
                          color="blue-grey lighten-2"
                          label="Guardian's Contact Number"
                          prepend-inner-icon="mdi-contacts"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-divider></v-divider>
                      <v-card-subtitle class="text-center">IMPORT STUDENTS USING CSV FILE</v-card-subtitle>
                      <v-file-input v-model="fileInput" label="Choose File..."></v-file-input>
                    </v-col>
                  </v-row>
                </v-container>
              </div>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    :loading="isUpdating"
                    color="success"
                    depressed
                    type="submit"
                >
                  <v-icon left>
                    mdi-database-check-outline
                  </v-icon>
                  Register
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-col>
        <v-col cols="12" md="12">
          <v-card>
            <v-card-title>
              <v-text-field
                  v-model="searchStudent"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
                height="600px"
                :headers="headers"
                :items="students"
                :search="searchStudent"
            >
              <template v-slot:item.actions="{ item }">
               <v-chip color="success" @click="handleEdit(item)">
                 <v-icon >mdi-pen</v-icon>
               </v-chip>
                <v-chip :disabled="role === 'Staff'" color="error" class="ml-2" @click="deleteUser(item)">
                  <v-icon>mdi-delete</v-icon>
                </v-chip>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </template>
    <template>
      <div class="text-center">
        <v-bottom-sheet
            v-model="sheet"
            inset
        >
          <v-sheet
              class="text-center"
              height="600px"
          >
            <v-card-title><span>DATA FROM CSV</span>
            <v-spacer></v-spacer>
              <v-btn @click="saveImport" color="success">
                <v-icon left >mdi-database</v-icon>
                SAVE</v-btn>
            </v-card-title>
            <div class="my-3">
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
                    height="380px"
                    :headers="headers"
                    :items="table"
                    :search="search"
                ></v-data-table>
            </div>
          </v-sheet>
        </v-bottom-sheet>
      </div>
    </template>

    <template>
      <v-row justify="center">
        <v-dialog
            v-model="dialog"
            persistent
            max-width="700px"
        >
          <v-card >
            <v-card-title>
              <span class="text-h5">Student Profile</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-form ref="editForm">
                  <v-row>
                    <v-col
                        cols="12"
                        md="4"
                        class="pb-0"
                    >
                      <v-text-field
                          :rules="rule"
                          v-model="editForm.idNumber"
                          :disabled="isUpdating"
                          filled
                          disabled
                          color="blue-grey lighten-2"
                          label="ID Number"
                          prepend-inner-icon="mdi-smart-card"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        class="pb-0"
                        cols="12"
                        md="8"
                    >
                      <v-text-field
                          :rules="rule"
                          v-model="editForm.fullName"
                          :disabled="isUpdating"
                          filled
                          color="blue-grey lighten-2"
                          label="Full Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                          :rules="rule"
                          v-model="editForm.contactNumber"
                          :disabled="isUpdating"
                          filled
                          type="number"
                          color="blue-grey lighten-2"
                          label="Contact Number"
                          prepend-inner-icon="mdi-card-account-phone"
                      ></v-text-field>
                      <v-select
                          v-model="editForm.gender"
                          :rules="rule"
                          :disabled="isUpdating"
                          filled
                          color="blue-grey lighten-2"
                          label="Gender"
                          :items="['Male', 'Female']"
                          prepend-inner-icon="mdi-gender-male-female"
                      >
                      </v-select>
                      <v-row>
                        <v-col cols="12" md="6">
                          <v-text-field
                              :rules="rule"
                              type="date"
                              v-model="editForm.birthdate"
                              :disabled="isUpdating"
                              filled
                              color="blue-grey lighten-2"
                              label="Birthdate"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                              :rules="rule"
                              v-model="editForm.birthplace"
                              :disabled="isUpdating"
                              filled
                              color="blue-grey lighten-2"
                              label="Birthplace"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-text-field
                          v-model="editForm.address"
                          :rules="rule"
                          :disabled="isUpdating"
                          prepend-inner-icon="mdi-home-map-marker"
                          filled
                          color="blue-grey lighten-2"
                          label="Address (block/bldg., house #, street, barangay, municipality, province)"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="8" class="py-0">
                      <v-text-field
                          :rules="rule"
                          v-model="editForm.guardianName"
                          :disabled="isUpdating"
                          filled
                          color="blue-grey lighten-2"
                          label="Guardian"
                          prepend-inner-icon="mdi-account-child"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" class="py-0">
                      <v-text-field
                          :rules="rule"
                          v-model="editForm.relationshipToGuardian"
                          :disabled="isUpdating"
                          filled
                          color="blue-grey lighten-2"
                          label="Relationship to Guardian"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="py-0">
                      <v-text-field
                          :rules="rule"
                          v-model="editForm.guardianContactNumber"
                          type="number"
                          :disabled="isUpdating"
                          filled
                          color="blue-grey lighten-2"
                          label="Guardian's Contact Number"
                          prepend-inner-icon="mdi-contacts"
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
import moment from "moment";

export default {
  name: "Registration",
  components: {BaseApp},
  data: () => ({
    isUpdating: false,
    dialog: false,
    search: "",
    searchStudent: "",
    role: null,
    students:[],
    headers: [
      { text: 'ID Number', value: 'idNumber' },
      { text: 'Name', value: 'fullName' },
      { text: 'Contact No.', value: 'contactNumber' },
      { text: 'Gender', value: 'gender' },
      { text: 'Birthdate', value: 'birthdate' },
      { text: 'Birthplace', value: 'birthplace' },
      { text: 'Address', value: 'address' },
      { text: 'Guardian Name', value: 'guardianName' },
      { text: 'Relationship', value: 'relationshipToGuardian' },
      { text: 'Guardian No.', value: 'guardianContactNumber' },
      { text: 'Actions', value: 'actions', width: 180 },
    ],
    sheet: false,
    rule: [
      v => !!v || 'This field is required',
    ],
    form: new Form({
      idNumber: "",
      fullName: "",
      contactNumber: "",
      gender: "Male",
      birthdate: "",
      birthplace: "",
      address: "",
      guardianName: "",
      relationshipToGuardian: "",
      guardianContactNumber: ""
    }),
    editForm: new Form({
      id: "",
      idNumber: "",
      fullName: "",
      contactNumber: "",
      gender: "Male",
      birthdate: "",
      birthplace: "",
      address: "",
      guardianName: "",
      relationshipToGuardian: "",
      guardianContactNumber: ""
    }),
    fileInput: null,
    table: []
  }),
  watch: {
    table(){
      if(this.table.length > 0) {
        this.sheet = true;
      }
    }
  },
  created() {
    this.role = localStorage.getItem('role')
    db.collection("students").onSnapshot(r=> {
      this.students = r.docs.map(e => {return {id: e.id, ...e.data()}})
    })
  },
  methods: {
    async deleteUser(user){
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) =>  {
        if (result.isConfirmed) {
          await db.collection("students").doc(user.id).delete()
          this.$swal(
              'Deleted!',
              'Student has been deleted.',
              'success'
          )
        }
      })
    },
    saveEdit(){
      if(!this.$refs.editForm.validate()) return;
      const student = this.editForm.data();
      this.dialog = false
      db.collection("students").doc(student.id)
      .update(student)
      .then(() => {
        this.$swal({
          position: 'top-end',
          icon: 'success',
          title: 'Your data has been saved',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.dialog = false
        })
      })
    },
    handleEdit(item){
      this.editForm = Object.assign(this.editForm,item)
      this.dialog = true;
    },
    register() {
      if(this.$refs.form.validate() && !this.fileInput) {
        const student = this.form.data();
        db.collection("students").where("idNumber","==",student.idNumber)
            .get().then(r => {
          if(r.docs.length === 0 ) {
            db.collection("students").add(student).then(r=>{
              this.$swal({
                position: 'top-end',
                icon: 'success',
                title: 'Your data has been saved',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                this.form.reset()
                this.$refs.form.reset()
                this.form.gender = "Male"
              })
            })
          }else{
            this.$swal({
              icon: "error",
              title: "Student Number already exists"
            })
          }
        })

      }
      this.handleImport()
    },
    saveImport(){
      this.table.forEach(student => {
        db.collection("students").where("idNumber","==",student.idNumber)
        .get().then(r => {
          if(r.docs.length === 0 ) {
            db.collection("students").add(student)
          }
        })
      })
      this.$swal({
        position: 'top-end',
        icon: 'success',
        title: 'Your data has been saved',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.sheet = false;
        this.fileInput = null;
        this.table = [];
      })
    },
    handleImport() {
      this.table = [];
      if(!this.fileInput) return;
      const reader = new FileReader();
      reader.onload = e => this.registerEach(e.target.result);
      reader.readAsText(this.fileInput);
    },
    registerEach(result) {
      const students = result.trim().split("\r\n")
      const table = [];
      students.shift(); //Remove header
      students.forEach(student => {
        const credentials = student.split(",")
        table.push({
          idNumber: credentials[0],
          fullName: credentials[1],
          contactNumber: credentials[2],
          gender: credentials[3],
          birthdate: moment(credentials[4],"DD/MM/YYYY").format("YYYY-MM-DD"),
          birthplace: credentials[5],
          address: credentials[6],
          guardianName: credentials[7],
          relationshipToGuardian: credentials[8],
          guardianContactNumber: credentials[9]
        })
      })
      this.table = table;
    }
  }
}
</script>

<style scoped>

</style>