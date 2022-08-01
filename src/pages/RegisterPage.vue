<template>
  <div class="container" id="register_form">
    <h1 class="title">Register</h1>
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
      <!-- Username -->
      <b-form-group
        id="input-group-username"
        label-cols-sm="3"
        label="Username:"
        label-for="username"
      >
        <b-form-input
          id="username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.username.length">
          Username length should be between 3-8 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.alpha">
          Username alphabetic
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- FirstName -->
      <b-form-group
        id="input-group-firstname"
        label-cols-sm="3"
        label="First Name:"
        label-for="first_name"
      >
        <b-form-input
          id="first_name"
          v-model="$v.form.first_name.$model"
          type="text"
          :state="validateState('first_name')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.first_name.required">
          First Name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.first_name.alpha">
          First Name must be alphabetic
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- LastName -->
      <b-form-group
        id="input-group-lastname"
        label-cols-sm="3"
        label="Last Name:"
        label-for="last_name"
      >
        <b-form-input
          id="last_name"
          v-model="$v.form.last_name.$model"
          type="text"
          :state="validateState('last_name')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.last_name.required">
          Last Name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.last_name.alpha">
          Last Name must be alphabetic
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Email -->
      <b-form-group
        id="input-group-email"
        label-cols-sm="3"
        type="email"
        label="Email:"
        label-for="email"
      >
        <b-form-input
          id="email"
          v-model="$v.form.email.$model"
          type="text"
          :state="validateState('email')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.email.required">
          Email is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.email.email">
          Email is not valid
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Picture -->
      <b-form-group
        id="input-group-profile_picture"
        label-cols-sm="3"
        label="Picture Link:"
        type="url"
        label-for="profile_picture"
      >
        <b-form-input
          id="profile_picture"
          v-model="$v.form.profile_picture.$model"
          type="text"
          :state="validateState('profile_picture')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.profile_picture.required">
          Picture is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.profile_picture.url">
          Picture's url is not valid
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Country -->
      <b-form-group
        id="input-group-country"
        label-cols-sm="3"
        label="Country:"
        label-for="country"
      >
        <b-form-select
          id="country"
          v-model="$v.form.country.$model"
          :options="countries"
          :state="validateState('country')"
        ></b-form-select>
        <b-form-invalid-feedback> Country is required </b-form-invalid-feedback>
      </b-form-group>

      <!-- Password -->
      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="password"
      >
        <b-form-input
          id="password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">
          Password is required
        </b-form-invalid-feedback>
        <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
          Your password should be <strong>strong</strong>. <br />
          For that, your password should be also contain special char and a number
        </b-form-text>
        <b-form-invalid-feedback
          v-if="$v.form.password.required && !$v.form.password.length"
        >
          Have length between 5-10 characters long
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Confirmed password -->
      <b-form-group
        id="input-group-confirmedPassword"
        label-cols-sm="3"
        label="Confirm Password:"
        label-for="confirmedPassword"
      >
        <b-form-input
          id="confirmedPassword"
          type="password"
          v-model="$v.form.confirmedPassword.$model"
          :state="validateState('confirmedPassword')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
          Password confirmation is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.confirmedPassword.sameAsPassword"
        >
          The confirmed password is not equal to the original password
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button
        type="submit"
        variant="primary"
        style="width: 250px"
        class="ml-5 w-75"
        >Register</b-button
      >
      <div class="mt-2">
        You have an account already?
        <router-link to="login"> Log in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Register failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
const mustContainSpecialChar = (value) => {
  var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  return format.test(value);
};
const mustContainNumber = (value) => {
  return /\d/.test(value);
};
import countries from "../assets/countries";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email,
  url,
} from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        first_name: "",
        last_name: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        profile_picture: "",
        submitError: undefined,
      },
      countries: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false,
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha,
      },
      first_name: {
        required,
        alpha,
      },
      last_name: {
        required,
        alpha,
      },
      email: {
        required,
        email,
      },
      profile_picture: {
        required,
        url,
      },
      country: {
        required,
      },
      password: {
        required,
        mustContainSpecialChar,
        mustContainNumber,
        length: (p) => minLength(5)(p) && maxLength(10)(p),
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password"),
      },
    },
  },
  mounted() {
    // console.log("mounted");
    this.countries.push(...countries);
    // console.log($v);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      try {
        const response = await this.axios.post(
          "http://localhost:3000/register",
          {
            username: this.form.username,
            password: this.form.password,
            first_name: this.form.first_name,
            last_name: this.form.last_name,
            country: this.form.country,
            email: this.form.email,
            profile_picture: this.form.profile_picture,
          }
        );
        this.$router.push("/login");
        // console.log(response);
      } catch (err) {
        console.log(err.response);
        let error_message = err.response.data
        if (err.response.data.message) {
          error_message = err.response.data.message
        }
        this.form.submitError = error_message;
      }
    },
    onRegister() {
      // console.log("register method called");
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("register method go");
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        first_name: "",
        last_name: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        profile_picture: "",
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 900px;
  min-width:700px;
  background-color: #EFEFEF;
  border-radius: 40px;
  border-style: solid;
  border-color: rgb(44, 89, 116);
  padding: 40px;
}

.title{
  font-weight: bold;
  text-align: center;
}
</style>
