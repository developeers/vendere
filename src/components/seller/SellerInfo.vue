<template>
    <div class="seller-info-container" v-if="seller">
        <div class="seller-profile-image">
            <img :src="seller.imageUrl" alt="Profile image">
        </div>
        <div class="seller-info">
            <h3> {{ seller.name }} </h3>
            <p> {{ seller.averageReview }} points ( {{ seller.numOfReviews }} reviews) </p>
            <div class="view-profile-button center-element" @click="navToSellerProfile">View Profile</div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import SellerModule from '@/store/modules/Seller'

export default defineComponent({
    setup() {
        const seller = computed(() => SellerModule.sellerInfo)
        return { seller }
    },
    methods: {
        navToSellerProfile() {
            if (!this.seller) return
            const sellerHashId = this.seller.hashId
            this.$router.push({name: 'SellerDetail', params: {hashId: sellerHashId}})
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
    height: 50px;
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