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
      <button type="text" class="signup-button" @click="signUpFirebaseUser">
        Log in
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { resetInputFieldState } from "@/services/utils/componentUtils";

export default defineComponent({
  setup() {
    return {
      resetInputFieldState,
    };
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
