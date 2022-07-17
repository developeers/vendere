<template>
  <div class="signup-container">
    <app-motto></app-motto>
    <div class="signup-form">
      <router-link :to="{ name: routeNames.HOME }" class="app-name-auth-form"
        >Vendere</router-link
      >
      <h3 class="signup-title">Sing up to Vendere</h3>
      <div class="email-input">
        <label for="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          @mousedown="resetInputFieldState"
          @keyup="handleKeyupEvent"
        />
        <span class="warning-message">* This field is required.</span>
      </div>
      <div class="username-input">
        <label for="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Create a username"
          @mousedown="resetInputFieldState"
          @keyup="handleKeyupEvent"
        />
        <span class="warning-message">* This field is required.</span>
      </div>
      <div class="password-input">
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Create a password"
          @mousedown="resetInputFieldState"
          @keyup="handleKeyupEvent"
        />
        <span class="warning-message">* This field is required.</span>
      </div>
      <button type="text" class="signup-button" @click="signUpFirebaseUser">
        Sign up
      </button>
      <p class="redirect-login">
        Already have an account?
        <router-link
          :to="{ name: routeNames.LOGIN }"
          class="redirect-login-link"
          >Login
        </router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "@firebase/auth";
import UserModule from "@/store/modules/User";
import { createUser } from "@/services/vendereApi/VendereApiUser";
import { resetInputFieldState } from "@/services/utils/componentUtils";
import AppMotto from "./AppMotto.vue";
import { routeNames } from "@/router/index";

export default defineComponent({
  setup() {
    return {
      resetInputFieldState,
      routeNames,
    };
  },
  components: {
    AppMotto,
  },
  methods: {
    handleKeyupEvent(event: KeyboardEvent) {
      if (event.key == "Enter") {
        this.signUpFirebaseUser();
      }
    },
    signUpFirebaseUser() {
      const auth = getAuth();
      const emailInput = document.querySelector(
        `.signup-form input[type="email"]`
      ) as HTMLInputElement;
      const passwordInput = document.querySelector(
        `.signup-form input[type="password"]`
      ) as HTMLInputElement;
      const usernameInput = document.querySelector(
        `.signup-form input[name="username"]`
      ) as HTMLInputElement;

      // Order matters as only the first empty element can be focused
      const inputFields = [passwordInput, usernameInput, emailInput];

      const outlineInputElement = (element: HTMLInputElement): void => {
        element.classList.add("warning");
        element.focus();
      };

      let isEmpty = false;
      inputFields.forEach((inputField) => {
        if (!inputField.value) {
          isEmpty = true;
          outlineInputElement(inputField);
        }
      });

      if (isEmpty) {
        return;
      }

      // Workaround: Inform Firebase Auth's onAuthStateChanged that a user is being created
      // and an associated user account has not been created at Firestore yet.
      // Therefore, getUserByUID should not be called.
      UserModule.setIsUserBeingCreated(true);

      createUserWithEmailAndPassword(
        auth,
        emailInput.value,
        passwordInput.value
      )
        .then((userCredentials) => {
          const newUser = userCredentials.user;
          UserModule.setRefreshToken(newUser.refreshToken);
          newUser.getIdToken().then((accessToken) => {
            UserModule.setAccessToken(accessToken);
          });

          createUser({
            uid: auth.currentUser!.uid,
            name: usernameInput.value,
            // For development purpose, these fields are randomly generated
            numOfReviews: +Math.floor(Math.random() * 50),
            averageReview: +(Math.random() + 3.7).toFixed(1),
            imageUrl:
              "https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331257_1280.png",
          }).then((res) => {
            UserModule.setLoginUser(res);
            this.$router.push({ name: routeNames.HOME });
            // Workaround: Finished creating user account at Firestore,
            // inform Firebase Auth's onAuthStateChanged that getUserByUID can be called
            UserModule.setIsUserBeingCreated(false);
          });
        })
        .catch((error) => {
          console.log("Error signing up user: ", error);
        });
    },
  },
});
</script>

<style scoped>
@import "@/assets/css/auth.css";
.redirect-login {
  text-align: right;
  font-size: 14px;
}
.redirect-login-link {
  font-weight: bold;
  text-decoration: none;
  color: mediumvioletred;
  opacity: 0.9;
}
</style>
