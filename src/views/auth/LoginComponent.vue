<template>
  <div class="login-container">
    <p class="redirect-signup">
      Don't have an account?
      <router-link
        :to="{ name: routeNames.SIGN_UP }"
        class="redirect-signup-link"
        >Sign up</router-link
      >
    </p>
    <app-motto></app-motto>
    <div class="login-form">
      <router-link :to="{ name: routeNames.HOME }" class="app-name-auth-form"
        >Vendere</router-link
      >
      <h3 class="login-title">Log in to Vendere</h3>
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
      <button type="text" class="signup-button" @click="loginFirebaseUser">
        Log in
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { defineComponent } from "vue";

import { resetInputFieldState } from "@/services/utils/componentUtils";
import UserModule from "@/store/modules/User";
import { getUserByUID } from "@/services/vendereApi/VendereApiUser";
import { routeNames } from "@/router/index";

import AppMotto from "./AppMotto.vue";

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
        this.loginFirebaseUser();
      }
    },
    loginFirebaseUser() {
      const auth = getAuth();
      const emailInput = document.querySelector(
        `.login-form input[type="email"]`
      ) as HTMLInputElement;
      const passwordInput = document.querySelector(
        `.login-form input[type="password"]`
      ) as HTMLInputElement;

      // Order matters as only the first empty element can be focused
      const inputFields = [passwordInput, emailInput];

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

      signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
        .then((userCredentials) => {
          const loginUser = userCredentials.user;
          UserModule.setRefreshToken(loginUser.refreshToken);
          loginUser.getIdToken().then((accessToken) => {
            UserModule.setAccessToken(accessToken);
          });

          getUserByUID(loginUser.uid).then((userInfo) => {
            if (userInfo) {
              UserModule.setLoginUser(userInfo);
            }
          });

          this.$router.push({ name: routeNames.HOME });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>

<style scoped>
@import "@/assets/css/auth.css";
.login-container {
  position: relative;
}
.redirect-signup {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 14px;
  color: black;
}
.redirect-signup-link {
  font-weight: bold;
  text-decoration: none;
  color: mediumvioletred;
  opacity: 0.9;
}
</style>
