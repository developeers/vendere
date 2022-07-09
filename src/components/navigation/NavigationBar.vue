<template>
  <nav class="nav-bar">
    <router-link :to="{ name: 'home' }" class="app-name">Vendere</router-link>
    <SearchBar />
    <div class="profile">
      <div v-if="!isUserLoggedIn" class="not-loggin-options">
        <router-link :to="{ name: 'SignUp' }">Sign up</router-link>
        <router-link :to="{ name: 'Login' }">Login</router-link>
      </div>
      <router-link v-if="isUserLoggedIn" to="#">Notifications</router-link>
      <router-link to="#"
        >Orders <i class="fa fa-shopping-cart"></i
      ></router-link>
      <div
        v-if="isUserLoggedIn"
        @click="toggleDropDownMenu"
        id="navbar-account"
      >
        Account
      </div>
      <div class="profile-menu-dropdown" ref="dropdownMenu">
        <div class="dropdown-items">
          <router-link to="#" class="profile-menu">
            <img
              alt="Profile image"
              id="profile-icon"
              :src="loginUser?.imageUrl"
            />
            <div id="login-username">{{ loginUser?.name }}</div>
          </router-link>
          <router-link to="#">Products you bought</router-link>
          <router-link to="#">Sold products</router-link>
          <router-link to="/" @click="logout">Logout</router-link>
        </div>
      </div>
      <router-link :to="{ name: 'ProductCreate' }" class="sell-button"
        >Sale</router-link
      >
    </div>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import UserModule from "@/store/modules/User";
import SearchBar from "./SearchBar.vue";
import { getAuth, signOut } from "@firebase/auth";

export default defineComponent({
  components: {
    SearchBar,
  },
  setup() {
    const isUserLoggedIn = computed(() => UserModule.isLogin);
    const loginUser = computed(() => UserModule.loginUser);
    const auth = getAuth();

    return {
      isUserLoggedIn,
      loginUser,
      auth,
      signOut,
    };
  },
  mounted() {
    document.addEventListener("click", (event) => {
      if (event.target instanceof Element) {
        if (event.target.id != "navbar-account") {
          if (!this.$refs.dropdownMenu) {
            return;
          }
          (this.$refs.dropdownMenu as HTMLElement).style.display = "none";
        }
      }
    });
  },
  methods: {
    toggleDropDownMenu() {
      if ((this.$refs.dropdownMenu as HTMLElement).style.display === "block") {
        (this.$refs.dropdownMenu as HTMLElement).style.display = "none";
      } else {
        (this.$refs.dropdownMenu as HTMLElement).style.display = "block";
      }
    },
    logout(event: Event) {
      event.preventDefault();
      signOut(this.auth).then(() => {
        console.log("Sign out sucessfully.");
        UserModule.setAccessToken();
        UserModule.setRefreshToken();
        UserModule.setLoginUser();
        this.$router.push({ name: "home" });
      });
    },
  },
});
</script>


<style scoped>
.nav-bar {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: left;
  background: whitesmoke;
  padding: 10px 16px;
  border-bottom: 2px solid mediumvioletred;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100vw;
  box-sizing: border-box;
}
.not-loggin-options {
  display: flex;
  gap: 20px;
}
.profile {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-left: auto;
}
.app-name,
.profile a,
.profile div#navbar-account {
  font-size: 20px;
  font-weight: bold;
  font-style: italic;
  text-decoration: none;
  color: mediumvioletred;
  cursor: pointer;
}
.profile a,
.profile div#navbar-account {
  font-size: 17px;
  font-style: initial;
}
.profile img {
  width: 45px;
  height: 43px;
  border-radius: 50%;
}
.profile .fa-shopping-cart {
  color: mediumvioletred;
}
.profile-menu-dropdown {
  display: none;
  background: white;
  position: fixed;
  width: 230px;
  top: 55px;
  right: 3px;
  border-radius: 3px;
}
.profile-menu {
  display: flex;
  align-items: center;
  gap: 7px;
}
.dropdown-items {
  display: flex;
  flex-direction: column;
  border: 1px solid #d6d5d5;
  border-radius: 4px;
}
.dropdown-items a {
  text-decoration: none;
  font-size: 14px;
  text-align: left;
  color: black;
  padding: 10px 15px;
  font-weight: initial;
}
.dropdown-items a:not(:last-child) {
  border-bottom: 1px solid #d6d5d5;
}
.dropdown-items a:first-child {
  padding-top: 8px;
  padding-bottom: 8px;
}
.dropdown-items a:last-child {
  padding-bottom: 10px;
}
.dropdown-items a:hover {
  color: mediumvioletred;
  font-weight: bold;
}
#login-username {
  font-weight: bold;
  color: #b52e83;
  font-size: 16px;
}
.profile a.sell-button {
  background: mediumvioletred;
  color: whitesmoke;
  border-radius: 4px;
  padding: 4px 13px;
  margin-left: -4px;
}
.profile a.sell-button:hover {
  opacity: 0.8;
}
</style>
