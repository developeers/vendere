<template>
  <form action="#" method="POST">
    <div class="email-input">
      <label for="email">Email</label>
      <input type="email" name="email" placeholder="Enter your email" />
    </div>
    <div class="password-input">
      <label for="password">Password</label>
      <input type="password" name="password" placeholder="Create a password" />
    </div>
    <button type="submit">Sign up</button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 30vw;
  max-width: 330px;
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
