<template>
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-title>LOG IN USER</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">
      <v-text-field
            v-model="username"
            :rules="nameRules"
            :counter="10"
            label="Username"
            required
          ></v-text-field>
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <v-text-field
            v-model="password"
            :rules="nameRules"
            :counter="10"
            label="Password"
            required
          ></v-text-field>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="orange"
        text
      >
        Login
      </v-btn>

      <v-btn
        color="orange"
        text
      >
        Cancle
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      valid: false,
      username: '',
      password: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ],
    }),
  }
</script>