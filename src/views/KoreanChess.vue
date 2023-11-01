<script setup>
import { ref, onMounted } from 'vue'
import KoreanChessMap from '@/components/KoreanChessMap.vue'
import { useConfirm } from "primevue/useconfirm";

const confirm = useConfirm();
const turn = ref('초나라')

const height_size = ref(600)
const width_size = ref(height_size.value * 0.9)
const size = ref(height_size.value * 0.1)

onMounted(() => {
})

const isGameReady = ref(false)
const gameSetting = ref({
    "formation": '마상상마',
})
const formations = ref(
    [
        { name: "마상상마" },
        { name: "마상마상" },
        { name: "상마상마" },
        { name: "상마마상" }
    ]
)

const socket = ref()
const wsConnection = () => {
    console.log('websocket function')
    socket.value = new WebSocket('ws://localhost:3000/ws/match')
    socket.value.onopen = () => {
        console.log('connected')
        // 유저 ID를 서버에 전달
        // ID 는 랜덤으로 생성
        const random = (Math.random() * 100).toFixed(0)
        // console.log(gameSetting.value['formation'][0])
        var user = {
            id: 'user:' + random,
            formation: gameSetting.value['formation'],
            name: 'test' + random,
        }
        socket.value.send(JSON.stringify(user))
    }

    socket.value.addEventListener('message', (event) => {
        messageHandler(event)
    })

    socket.value.onclose = () => {
        console.log('disconnected')
    }

    const messageHandler = (event) => {
        let msg = JSON.parse(event.data)
        switch (msg.action) {
            case 'matched':
                console.log('matched')
                console.log('user info : ', msg.msg)
                socket.value.send('done')
                gameSetting.value['side'] = msg.msg.Side
                break
            case 'start':
                console.log('room info : ', msg.msg)
                gameSetting.value['room'] = msg.msg
                isGameReady.value = true
                break
            case 'move':
                console.log('enermy move', msg.msg)
                const move = msg.msg.move
                console.log(janggi.value.seletedPiece)
                janggi.value.seletedPiece = move.previous
                janggi.value.move(move.current[0], move.current[1])
                break
            case 'end':
                console.log('The game is end')
                break
            default:
                console.log('default')
                break
        }
    }
}

const sendMovementInfo = (n) => {
    console.log('send movement info : ', n)
    const game = {
        move: n,
        turn: turn.value,
        over: false,
        time: Date.now(),
    }
    socket.value.send(JSON.stringify(game))
}

const confirmMatching = () => {
    confirm.require({
        group: 'headless',
        message: '상차림을 확인해주세요',
        header: '매칭을 찾으시겠습니까?',
        // icon: 'pi pi-exclamation-triangle',
        accept: () => {
            console.log('accept')
            wsConnection()
        },
        reject: () => {
            console.log('reject')
        }
    });
};

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

const janggi = ref(null)

</script>

<template>
    <div>
        <ConfirmDialog group="headless">
            <template #container="{ message, onAccept, onReject }">
                <div class="flex flex-column align-items-center p-5 surface-overlay border-round">
                    <div
                        class="border-circle bg-primary inline-flex justify-content-center align-items-center h-6rem w-6rem -mt-8">
                        <i class="pi pi-question text-5xl"></i>
                    </div>
                    <span class="font-bold text-2xl block mb-2 mt-4">{{ message.header }}</span>
                    <p class="mb-0">{{ message.message }}</p>
                    <p class="mb-0"> 선택한 상차림 : {{ gameSetting.formation }}</p>
                    <div class="flex align-items-center gap-2 mt-4">
                        <Button label="찾기" @click="onAccept" class="w-8rem"></Button>
                        <Button label="취소하기" outlined @click="onReject" class="w-8rem"></Button>
                    </div>
                </div>
            </template>
        </ConfirmDialog>

        <div class="flex flex-column justify-content-center align-items-center">

            <!-- 메인 로고 위치 -->
            <div>
                장기
            </div>

            <!-- 게임이 준비 된 상태라면, 플레이 화면이 나타남-->
            <!-- 준비되지 않은 상태라면, 매칭 찾기 버튼이 나타남 -->
            <div v-if="isGameReady">
                <div>
                    {{ turn }}의 순서 입니다.
                </div>
                <!-- Korean Chess Map displayed -->
                <div class="relative border-1 m-5 overflow-hidden"
                    :style="{ 'width': width_size + 'px', 'height': height_size + 'px' }">
                    <KoreanChessMap ref="janggi" @turn="(n) => turnChange(n)" @died="(n) => getDiedPiece(n)" :size="size"
                        :gameSetting="gameSetting" @move="(n) => sendMovementInfo(n)" />
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
            <div v-else>
                <div class="flex flex-column justify-content-center align-items-center">
                    <!-- 상차림을 선택하는 체크박스 -->
                    <div class="card flex flex-wrap justify-content-center gap-3 m-3">
                        <div v-for="formation of formations" :key="formation.name" class="flex align-items-center">
                            <RadioButton v-model="gameSetting.formation" :inputId="formation.name" name="formation"
                                :value="formation.name" />
                            <label class="ml-2">{{ formation.name }}</label>
                        </div>
                    </div>
                    <!-- 매칭 찾을 건지 확인하는 버튼 -->
                    <Button @click="confirmMatching()" class="w-4 justify-content-center">매칭 찾기</Button>
                </div>
            </div>

            <!-- 내 프로필 -->
            <div>
                <div class="flex flex-column justify-content-center align-items-center">
                    내 프로필
                </div>
            </div>
        </div>
    </div>
</template>
