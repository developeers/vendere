<template>
    <h2>Product create</h2>
    <div class="create-product-form">
        <input type="text" id="product-name" name="product-name" placeholder="Product name">
        <input type="text" id="product-price" name="product-price" placeholder="Product price">
        <input type="text" id="owner-name" name="owner-name" placeholder="Owner name">
    </div>
</template>

<style scoped>
.create-product-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 40vw;
    max-width: 300px;
    margin: 0 auto;
    margin-top: 20px;
}
</style>
