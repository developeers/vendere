<template>
    <nav class="nav-bar">
        <router-link :to="{name: 'home'}" class="app-name">Vendere</router-link>
        <input type="text" class="search-bar" placeholder="Search here">
        <div class="profile">
            <img alt="Profile image" src="../../assets/user.png">
        </div>
    </nav>
</template>

<style scoped>
.nav-bar {
    display: flex;
    align-items: center;
    justify-content: left;
    background: #296495;
    padding: 10px 16px;
    margin-bottom: 15px;
    gap: 20px;
}
.app-name {
    font-size: 20px;
    font-weight: bold;
    font-style: italic;
    text-decoration: none;
    color: whitesmoke;
    cursor: pointer;
}
.search-bar {
    outline: none;
    height: 20px;
    width: 25vw;
    max-width: 280px;
    min-width: 190px;
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
</style>