<template>
  <div class="container">
    <h1>Register to My Project</h1>
    <br />
    <br />
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <form @submit.prevent="register()">
          <div class="row">
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="First name"
                aria-label="First name"
                required
                v-model="user.firstName"
              />
            </div>
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="Last name"
                aria-label="Last name"
                required
                v-model="user.lastName"
              />
            </div>
          </div>
          <br />
          <div class="mb-3">
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
              required
              v-model="user.email"
            />
          </div>
          <div class="mb-3">
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              required
              v-model="user.password"
            />
          </div>
          <div class="mb-3">
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              required
              placeholder="Confirm Password"
              v-model="confirmPassword"
            />
          </div>
          <br />
          <button class="btn-lg btn-primary btn-block">Register</button>
        </form>
        <div class="or-container">
          <div class="line-separator"></div>
          <div class="or-label">or</div>
          <div class="line-separator"></div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <button
              class="btn btn-lg btn-google btn-block btn-outline"
              @click="firebaseLogin"
            >
              <img
                src="https://img.icons8.com/color/16/000000/google-logo.png"
              />
              Signup Using Google
            </button>
          </div>
        </div>
        <br />
        <p class="text-inverse text-center">
          Already have an account?
          <a href="<?= base_url() ?>auth/login" data-abc="true">Login</a>
        </p>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
  var firebaseConfig = {
    apiKey: "AIzaSyCU0vVShMAyQ9lW93mgx5FGfj-_myu9tzg",
    authDomain: "auth-3cebc.firebaseapp.com",
    projectId: "auth-3cebc",
    storageBucket: "auth-3cebc.appspot.com",
    messagingSenderId: "499265597059",
    appId: "1:499265597059:web:3e96d084106f85a51e75b6"
  };
  // Initialize Firebase
import { mapActions } from "vuex";
import Firebase from 'firebase';
export default {
  name: "register",
  data() {
    return {
      confirmPassword: "",
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
    };
  },
  created() {
    if (!Firebase.apps.length)
      this.app = Firebase.initializeApp(firebaseConfig);
  },
  methods: {
    ...mapActions(["registerAction"]),
    async register() {
      if (this.confirmPassword != this.user.password) {
        alert("Password do not much");
      } else if (this.user.password.length < 6) {
        alert("Password length should be greater than 6");
      } else {
        await this.registerAction(this.user);
      }
    },
    firebaseLogin() {
      const provider = new Firebase.auth.GoogleAuthProvider();
Firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user)
    console.log("---->"+token)
    // ...
  })
    },
  },
};
</script>

<style scoped>
.btn-google {
  color: #545454;
  background-color: #fffffb;
  box-shadow: 0 1px 1px 1px #ddd;
}

.or-container {
  align-items: center;
  color: #ccc;
  display: flex;
  margin: 25px 0;
}

.line-separator {
  background-color: #ccc;
  flex-grow: 5;
  height: 1px;
}

.or-label {
  flex-grow: 1;
  margin: 0 15px;
  text-align: center;
}
</style>