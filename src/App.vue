<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <header>
      <div class="">
        <nav>
          <RouterLink to="/" class="mr-2">Home</RouterLink>
          <!-- <RouterLink to="/about">About</RouterLink> -->
          <RouterLink to="/janggi" class="mr-2">장기</RouterLink>
        </nav>
      </div>
    </header>
    <RouterView style="max-height: 1200px; min-height:900px; height: calc(100vh - 50px);
                       min-width: 800px;" />
  </div>
</template>

<style scoped></style>
