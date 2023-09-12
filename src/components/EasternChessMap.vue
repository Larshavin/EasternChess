<template>
    <div v-for="j in 10" class="flex">
        <div v-for="i in 9" class="relative p-0" :style="{ 'height': size + 'px', 'width': size + 'px' }">
            <div>
                <div v-if="j != 1" class="absolute top-0 left-0 border-right-1 m-0 p-0"
                    :style="{ 'height': (size / 2) + 'px', 'width': (size / 2) - 1 + 'px' }">
                </div>
                <div v-if="i != 9" class="absolute top-0 right-0 border-bottom-1 m-0 p-0"
                    :style="{ 'height': (size / 2) + 'px', 'width': (size / 2) + 'px' }">
                </div>
                <div v-if="i != 1" class="absolute bottom-0 left-0 border-top-1 m-0 p-0"
                    :style="{ 'height': (size / 2) - 1 + 'px', 'width': (size / 2) + 'px' }">
                </div>
                <div v-if="j != 10" class="absolute bottom-0 right-0 border-left-1 m-0 p-0"
                    :style="{ 'height': (size / 2) + 'px', 'width': (size / 2) + 'px' }">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const size = ref(100)

</script>