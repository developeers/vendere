<template>
    <div class="seller-info-container">
        <div class="seller-profile-image">
            <img src="https://cdn.pixabay.com/photo/2018/01/29/17/01/woman-3116587_960_720.jpg" alt="Profile image">
        </div>
        <div class="seller-info">
            <h3> Michael Scott </h3>
            <p> 4.3 points (45 reviews) </p>
            <div class="view-profile-button center-element" @click="navToSellerProfile">View Profile</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    methods: {
        navToSellerProfile() {
            this.$router.push({name: 'home'})
        }
    }
})
</script>


<style scoped>
.seller-info-container {
    display: flex;
    gap: 10px;
    margin-top: 50px;
}
.seller-profile-image {
    display: flex;
}
.seller-profile-image > img {
    width: 50px;
    height: 46px;
    border-radius: 50%;
}
.view-profile-button {
    background: cadetblue;
    color: whitesmoke;
    font-size: 14px;
    font-weight: bold;
    width: 90px;
    height: 25px;
    margin: 0 auto;
    margin-top: 5px;
    border-radius: 5px;
    cursor: pointer;
}
</style>