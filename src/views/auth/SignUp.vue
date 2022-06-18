<template>
  <div class="signup-form">
    <div class="email-input">
      <label for="email">Email</label>
      <input type="email" name="email" placeholder="Enter your email" />
    </div>
    <div class="password-input">
      <label for="password">Password</label>
      <input type="password" name="password" placeholder="Create a password" />
    </div>
    <button type="text" class="signup-button">Sign up</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "@firebase/auth";
import UserModule from "@/store/modules/User";

export default defineComponent({
  mounted() {
    const auth = getAuth();
    const submitButton = document.querySelector("button.signup-button");
    submitButton?.addEventListener("click", () => {
      const emailInput = document.querySelector(
        `input[type="email"]`
      ) as HTMLInputElement;
      const passwordInput = document.querySelector(
        `input[type="password"]`
      ) as HTMLInputElement;

      createUserWithEmailAndPassword(
        auth,
        emailInput.value,
        passwordInput.value
      )
        .then((userCredentials) => {
          const user = userCredentials.user;
          UserModule.setFirebaseUser(user);
        })
        .catch((error) => {
          console.log("Error signing up user: ", error);
        });
    });
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
  outline: none;
  height: 30px;
  font-size: 15px;
  color: #3d3d3d;
  padding-left: 8px;
  border: 1px solid #ffaee1;
  border-radius: 4px;
}
.email-input,
.password-input {
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
