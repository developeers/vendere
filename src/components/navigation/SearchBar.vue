<template>
    <input type="text" class="search-bar" id="search-bar" placeholder="Search here">
    <div class="search-bar-results"></div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import ProductModule from '@/store/modules/Product'

export default defineComponent({
    mounted() {
        const searchBarInput = document.getElementById("search-bar") as HTMLInputElement
        searchBarInput!.addEventListener("keyup", () => {
            const searchKeyWord = searchBarInput!.value.toLowerCase()
            if (searchKeyWord.length < 3) {
                ProductModule.setProductsList(ProductModule.allProductsList)
                return
            }
            
            const matchedProducts = computed(() => ProductModule.allProductsList.filter((product) => {
                return product.name.toLowerCase().includes(searchKeyWord)
            }))
            ProductModule.setProductsList(matchedProducts.value)
            ProductModule.setSearchKeyWord(searchKeyWord)
        })
    }
})
</script>


<style scoped>
.search-bar {
    outline: none;
    height: 30px;
    width: 25vw;
    border-radius: 20px;
    border: 0;
    padding-left: 12px;
    max-width: 280px;
    min-width: 190px;
}
</style>