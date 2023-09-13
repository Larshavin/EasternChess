<script setup>
import EasternChessMap from '@/components/EasternChessMap.vue'
</script>

<template>
  <div class="flex flex-column justify-content-center align-items-center">
    <div>
      장기
    </div>
    <!-- Eastern Chess Map displayed -->
    <div class=" border-1 m-5"
      style="width: 900px; height: 1000px; background-image: url('board.jpg');  background-size: cover;">
      <EasternChessMap />
    </div>
  </div>
</template>
