<template>
  <div class="search-bar-container">
    <input
      type="text"
      class="search-bar"
      placeholder="Search here"
      ref="searchInput"
      @keyup="searchProducts"
    />
    <button type="button" class="search-button"></button>
    <div class="search-results hide" ref="searchResults">
      <router-link
        v-for="(product, index) in searchProductResults"
        :key="index"
        :to="{
          name: routeNames.PRODUCT_DETAIL,
          params: { hashId: product.hashId },
        }"
      >
        {{ product.name }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ProductModule from "@/store/modules/Product";
import { routeNames } from "@/router/index";
import { IProductInfo } from "@/services/interfaces/IProduct";

export default defineComponent({
  setup() {
    const searchProductResults = ref([] as Array<IProductInfo>);
    return {
      searchProductResults,
      routeNames,
    };
  },
  methods: {
    hideSearchResults(event: Event) {
      const searchResultElement = this.$refs.searchResults as HTMLElement;
      if (event.target instanceof HTMLElement) {
        if (
          event.target.className == "search-bar" ||
          event.target.className == "search-button"
        ) {
          return;
        }
      }
      searchResultElement.classList.add("hide");
    },
    searchProducts() {
      const searchInputElement = this.$refs.searchInput as HTMLInputElement;
      const searchResultElement = this.$refs.searchResults as HTMLElement;
      this.searchProductResults = ProductModule.filteredProductsList(
        searchInputElement.value
      );
      if (this.searchProductResults.length) {
        searchResultElement.classList.remove("hide");
      } else {
        searchResultElement.classList.add("hide");
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.hideSearchResults);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.hideSearchResults);
  },
});
</script>

<style scoped>
.search-bar-container {
  position: relative;
  max-width: 360px;
  min-width: 250px;
  width: 25vw;
}
.search-bar-container .search-bar {
  outline: none;
  width: 100%;
  height: 30px;
  border-radius: 20px;
  border: 0;
  padding-left: 12px;
  box-sizing: border-box;
}
input.search-bar::placeholder {
  font-family: "Courier New", Courier, monospace;
}
button.search-button {
  position: absolute;
  top: 7px;
  right: 10px;
  background: transparent
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E")
    no-repeat center;
  cursor: pointer;
  opacity: 0.7;
  border: none;
  width: 20px;
  height: 20px;
  padding: 0;
}
.search-bar-container .search-results {
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: absolute;
  top: 36px;
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  text-align: left;
  background: white;
  border-radius: 7px;
  border: 1px solid whitesmoke;
}
.search-bar-container .search-results > a {
  text-decoration: none;
  color: #333333;
  font-size: 15px;
}
.search-bar-container .search-results > a:hover {
  color: mediumvioletred;
}
.hide {
  display: none !important;
}
</style>
