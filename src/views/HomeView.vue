<script setup>
import { ref } from 'vue'
import EasternChessMap from '@/components/EasternChessMap.vue'
const turn = ref('초나라')

const pieces = ref(
  {
    0: null,
    1: "chariot",
    2: "elephant",
    3: "horse",
    4: "cannon",
    5: "king",
    6: "advisor",
    7: "pawn",
    8: "초나라",
    16: "한나라",
  }
)

</script>

<template>
  <div class="flex flex-column justify-content-center align-items-center">
    <div>
      장기
    </div>
    <div>
      {{ turn }}의 순서 입니다.
    </div>
    <!-- Eastern Chess Map displayed -->
    <div class=" border-1 m-5"
      style="width: 900px; height: 1000px; background-image: url('board.jpg');  background-size: cover;">
      <EasternChessMap @turn="(n) => turn = pieces[n]" />
    </div>
  </div>
</template>
