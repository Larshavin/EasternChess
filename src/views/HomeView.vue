<template>
  <div>
    메인 페이지

    - 필요한 기능 : 매칭 찾기 버튼 <br />
    - 개인 로그인 기능 <br />
    - 개인 로그아웃 기능 ... (천천히) <br />

    <div>
      <Button @click="moveToPlay" class="mr-2">매칭 찾기</Button>
      <!-- <Button>혼자 두기</Button> -->
    </div>

  </div>
</template>

<script setup>
// import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const moveToPlay = () => {
  router.push({ name: 'KoreanChess' })
}

</script>