<template>
  <div class="container" id=login_form>
    <h1 class="title">Login</h1>

    <b-form @submit.prevent="onLogin">
      <!-- UserName -->
      <b-form-group
        id="input-group-Username"
        label-cols-sm="3"
        label="Username:"
        label-for="Username"
      >
        <b-form-input
          id="Username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Username is required
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Password -->
      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="Password"
      >
        <b-form-input
          id="Password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Password is required
        </b-form-invalid-feedback>
      </b-form-group>
      <br>
      <b-button
        type="submit"
        variant="primary"
        style="width: 100px; display: block"
        class="mx-auto w-100"
        >Login</b-button
      >
      <div class="mt-2">
        Do not have an account yet?
        <router-link to="register"> Register in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Login failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined,
      },
    };
  },
  validations: {
    form: {
      username: {
        required,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        const response = await this.axios.post("http://localhost:3000/login", {
          username: this.form.username,
          password: this.form.password,
        });
        console.log(response);
        this.$root.store.login(response.data);
        this.$router.push("/");
      } catch (err) {
        if (this.$root.store.apiOffMode) {
          const user = {
            userName: this.form.username,
            firstName: "sarit",
            lastName: "holl debug",
            country: "Israel",
            email: "saritholl@gmail.com",
            picture: null,
            favoriteMatches: [],
            isAdmin: true,
          };
          this.$root.store.login(user);
          this.$router.push("/");
        } else {
          if (err && err.response) {
            console.error(err.response);
            this.form.submitError = err.response.data;
          } else {
            const errorMessage = "Something went wrong when trying to login";
            console.error(errorMessage);
            this.form.submitError = errorMessage;
          }
        }
      }
    },
    onLogin() {
      console.log("login method called");
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Login();
    },
  },
};
</script>
<style lang="scss" scoped>
.container{
  max-width: 400px;
  background-color: #EFEFEF;
  border-radius: 40px;
  border-style: solid;
  border-color: rgb(44, 89, 116);
  padding: 20px;
  text-align: center;
}


.title{
  font-weight: bold;
  text-align: center;
}
</style>

