<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="cyan darken-1">
        <v-toolbar-title>Employees</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Add Employee</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.firstname" label="Firstname"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.lastname" label="Lastname"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.birthday" label="Birthday"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-btn
        class="ma-2"
        text
        icon
        @click="editItem(item)"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        class="ma-2"
        text
        icon
        @click="deleteItem(item)"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import api from '@/api/index'
  export default {
    data: () => ({
      dialog: false,
      employee : [],  
      headers: [
        {
          text: 'Firstname',
          align: 'left',
          sortable: false,
          value: 'firstname',
        },
        { text: 'Lastname', value: 'lastname' },
        { text: 'Biethday', value: 'birthday' },
        { text: 'Email', value: 'email' },
        { text: 'Operation', value: 'action', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        firstname: '',
        lastname: '',
        birthday: '',
        email: '',
      },
      defaultItem: {
        firstname: '',
        lastname: '',
        birthday: '',
        email: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Add Employee' : 'Update Employee'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
      //this.getEmployee()
    },

    methods: {
      initialize () {
        this.desserts = [
          {
            firstname: 'Hattie',
            lastname: 'Schamberger',
            birthday: '1987-11-22',
            email: 'Carol41@yahoo.com',
          },
          {
            firstname: 'Nicolette',
            lastname: 'Thompson',
            birthday: '1988-05-27',
            email: 'Margaret_Padberg@yahoo,com',
          },
          {
            firstname: 'Jaylin',
            lastname: 'Zemlak',
            birthday: '1984-10-06',
            email: 'Evans63@gmail.com',
          },
          {
            firstname: 'Dillan',
            lastname: 'Pollich',
            birthday: '1971-01-20',
            email: 'Alf_Hermann@yahoo.com',
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      async deleteItem (item) {
        const index = this.employee.indexOf(item)
        if (confirm('Are you sure you want to delete this Employee?')) {
          this.employee.splice(index, 1)
          let res = await api.employee.deleteEmployee(this.employee[index].id)
        }
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      async save () {
        if (this.editedIndex > -1) {
          Object.assign(this.employee[this.editedIndex], this.editedItem)
        } else {
          this.employee.push(this.editedItem)
          let param = {
            firstname: this.editedItem.firstname,
            lirstname: this.editedItem.lastname,
            birthday: this.editedItem.birthday,
            email: this.editedItem.email
          }
          let res = await api.employee.createEmployee(param)
          console.log('res ::', res)
        }
        this.close()
      },
      // save () {
      //   if (this.editedIndex > -1) {
      //     Object.assign(this.desserts[this.editedIndex], this.editedItem)
      //   } else {
      //     this.desserts.push(this.editedItem)
      //   }
      //   this.close()
      // },
      // showEmployee
      async getEmployee () {
        const res = await api.employee.fetchEmployee()
        this.employee = res.data
        console.log(this.employee)
      },
    },
  }
</script>

