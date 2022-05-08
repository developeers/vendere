<template>
    <nav class="nav-bar">
        <router-link :to="{name: 'home'}" class="app-name">Vendere</router-link>
        <SearchBar/>
        <div class="profile">
            <img alt="Profile image" id="profile-icon" src="../../assets/user.png">
            <div class="profile-menu-dropdown" id="profile-menu-dropdown">
                <div class="dropdown-items">
                    <router-link to="#">Orders</router-link>
                    <router-link to="#">Settings</router-link>
                    <router-link :to="{name: 'ProductCreate'}">Create Products</router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import SearchBar from './SearchBar.vue'

export default defineComponent({
    components: {
        SearchBar
    },
    mounted() {
        const dropdownMenu = document.getElementById("profile-menu-dropdown")

        document.getElementById("profile-icon")!.addEventListener("click", () => {
            if (dropdownMenu!.style.display === "block") {
                dropdownMenu!.style.display = "none"
            } else {
                dropdownMenu!.style.display = "block"
            }
        })
        document.addEventListener("click", (event) => {
            if (event.target instanceof Element) {
                if (event.target.id != "profile-icon") {
                    dropdownMenu!.style.display = "none"
                }
            }
        })
    },
})
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
}
.app-name {
    font-size: 20px;
    font-weight: bold;
    font-style: italic;
    text-decoration: none;
    color: mediumvioletred;
    cursor: pointer;
}
.profile {
    display: flex;
    margin-left: auto;
}
.profile > img {
    width: 28px;
    border-radius: 50%;
    cursor: pointer;
}
.profile-menu-dropdown {
    display: none;
    background: whitesmoke;
    position: fixed;
    width: 136px;
    top: 55px;
    right: 3px;
    border-radius: 3px;
}
.dropdown-items {
    display: flex;
    flex-direction: column;
}
.dropdown-items a {
    text-decoration: none;
    font-style: italic;
    font-size: 14px;
    text-align: left;
    color: black;
    padding: 5px 15px;
}
.dropdown-items a:first-child {
    padding-top: 10px;
}
.dropdown-items a:last-child {
    padding-bottom: 10px;
}
.dropdown-items a:hover {
    color: mediumvioletred;
    font-weight: bold;
}
</style>