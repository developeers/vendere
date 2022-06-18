<template>
  <div class="signup-form">
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
    <div class="username-input">
      <label for="username">Username</label>
      <input
        type="text"
        name="username"
        placeholder="Create a username"
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
    <button type="text" class="signup-button" @click="signUpFirebaseUser">
      Sign up
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "@firebase/auth";

export default defineComponent({
  methods: {
    signUpFirebaseUser() {
      const auth = getAuth();
      const emailInput = document.querySelector(
        `input[type="email"]`
      ) as HTMLInputElement;
      const passwordInput = document.querySelector(
        `input[type="password"]`
      ) as HTMLInputElement;
      const usernameInput = document.querySelector(
        `input[name="username"]`
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

      createUserWithEmailAndPassword(
        auth,
        emailInput.value,
        passwordInput.value
      )
        .then(() => {
          updateProfile(auth.currentUser!, {
            displayName: usernameInput.value,
          });
        })
        .catch((error) => {
          console.log("Error signing up user: ", error);
        });
    },
    resetInputFieldState(event: Event) {
      const inputField = event.target as HTMLInputElement;
      inputField.classList.remove("warning");
    },
  },
});
</script>

<style scoped>
.signup-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 30vw;
  max-width: 330px;
  min-width: 250px;
  margin: 0 auto;
}
label {
  text-align: left;
  font-weight: bold;
  margin-bottom: 5px;
}
input {
  outline-color: cadetblue;
  height: 30px;
  font-size: 15px;
  color: #3d3d3d;
  padding-left: 8px;
  border: 1px solid #ffaee1;
  border-radius: 4px;
}
span.warning-message {
  display: none;
}
input.warning {
  box-shadow: 0 0 5px orange;
  border-color: orange;
  outline: none;
}
input.warning + span.warning-message {
  display: initial;
  font-size: 14px;
  color: orange;
  text-align: left;
  margin-top: 5px;
}
.email-input,
.password-input,
.username-input {
  display: flex;
  flex-direction: column;
}
button {
  margin-top: 10px;
  height: 37px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: mediumvioletred;
  color: whitesmoke;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
}
button:hover {
  opacity: 0.8;
}
</style>
