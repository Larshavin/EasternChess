<script setup>
import { ref } from 'vue'
import KoreanChessMap from '@/components/KoreanChessMap.vue'
const turn = ref('초나라')

const height_size = ref(600)
const width_size = ref(height_size.value * 0.9)
const size = ref(height_size.value * 0.1)

const pieces = ref(
  {
    0: null,
    1: "차",
    2: "상",
    3: "마",
    4: "포",
    5: "왕",
    6: "사",
    7: "졸병",
    8: "초나라",
    16: "한나라",
  }
)

const died = ref({
  '초': {
    "차": 0,
    "상": 0,
    "마": 0,
    "포": 0,
    "사": 0,
    "졸": 0,
  },
  '한': {
    "차": 0,
    "상": 0,
    "마": 0,
    "포": 0,
    "사": 0,
    "병": 0,
  }
})

const turnChange = (n) => {
  turn.value = pieces.value[n]
}

const getDiedPiece = (n) => {
  console.log(n)
  if (n < 16) {
    var pieceNum = n - 8
    var pieceName = pieces.value[pieceNum]
    if (pieceNum == 5) {
      alert("초나라 왕이 죽었습니다.")
      return
    }
    if (pieceNum != 7) {
      died.value['초'][pieceName] += 1
    }
    else {
      died.value['초']['졸'] += 1
    }
  } else {
    pieceNum = n - 16
    pieceName = pieces.value[pieceNum]
    if (pieceNum == 5) {
      alert("한나라 왕이 죽었습니다.")
      return
    }
    if (pieceNum != 7) {
      died.value['한'][pieceName] += 1
    } else {
      died.value['한']['병'] += 1
    }
  }
}
</script>

<template>
  <div class="flex flex-column justify-content-center align-items-center">
    <div>
      장기
    </div>
    <div>
      {{ turn }}의 순서 입니다.
    </div>
    <!-- Korean Chess Map displayed -->
    <!-- 장기판 이미지 로딩 속도 느린 이슈 있음 -->
    <!-- background-image: url('board.jpg'); -->
    <div class="relative border-1 m-5 overflow-hidden"
      :style="{ 'width': width_size + 'px', 'height': height_size + 'px' }">
      <KoreanChessMap @turn="(n) => turnChange(n)" @died="(n) => getDiedPiece(n)" :size="size" />
      <img src="@/assets/board.jpeg" class="absolute top-0"
        style="background-size: cover; width: 100%; height: 100%; z-index: -1;" />
    </div>
    <div>
      <div class="flex justify-content-center m-4">
        &lt 먹힌 기물 &gt
      </div>
      <!-- 초나라 먹힌 기물 -->
      <div class="flex mb-2">
        <div class="mr-3"> 초나라 == </div>
        <div v-for="count, piece in died['초']" :key="piece" class="mr-3">
          {{ piece }}: {{ count }}
        </div>
      </div>
      <!-- 한나라 먹힌 기물 -->
      <div class="flex">
        <div class="mr-3"> 한나라 == </div>
        <div v-for="count, piece in died['한']" :key="piece" class="mr-3">
          {{ piece }}: {{ count }}
        </div>
      </div>
    </div>
  </div>
</template>
