<template>
  <div class="login-container">
    <div class="app-motto-container">
      <h3 class="app-name">Vendere</h3>
      <p class="app-motto">Create your own marketplace.</p>
    </div>
    <div class="login-form">
      <h3 class="login-title">Log in to Vendere</h3>
      <div class="email-input">
        <label for="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          @mousedown="resetInputFieldState"
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

export default defineComponent({
  setup() {
    return {
      resetInputFieldState,
    };
  },
  methods: {
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
            UserModule.setLoginUser(userInfo);
          });

          this.$router.push({ name: "home" });
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
  display: flex;
  height: calc(100vh - 150px);
  gap: 30px;
}
.app-motto-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: aliceblue;
  padding: 20px;
}
.app-name {
  color: mediumvioletred;
  font-size: 24px;
  position: absolute;
  top: 20px;
  left: 15px;
}
.app-motto {
  font-size: 25px;
  font-weight: bold;
}
.login-form {
  width: 40%;
}
.login-title {
  border-bottom: 1px solid #d6d5d5;
  padding-bottom: 10px;
}
</style>
