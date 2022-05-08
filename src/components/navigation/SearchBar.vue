<template>
    <div class="search-bar-container">
        <input type="text" class="search-bar" id="search-bar" placeholder="Search here">
        <button type="button" class="search-button"></button>
    </div>
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
.search-bar-container {
    display: flex;
}
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
input.search-bar::placeholder {
    font-family: 'Courier New', Courier, monospace;
}
button.search-button {
    background: transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E") no-repeat center;
    cursor: pointer;
    opacity: 0.7;
    border: none;
    position: relative;
    right: 30px;
    width: 20px;
    padding: 0;
}
</style>