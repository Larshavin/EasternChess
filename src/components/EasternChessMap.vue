<template>
    <!-- row -->
    <div v-for="i in 10" class="flex">
        <!-- column -->
        <div v-for="j in 9" class="relative p-0 flex justify-content-center align-items-center"
            :style="{ 'height': size + 'px', 'width': size + 'px' }">
            <div v-if="board[i - 1][j - 1] != 0" class="z-4">
                <img :src="getPieceImageUrl(board[i - 1][j - 1])" class="z-4 cursor-pointer" :class="{
                    'border-round border-3 border-green-300': isSelected(i - 1, j - 1),
                    'pointer-events-none': isOnTurn(i - 1, j - 1)
                }" @click="pathFinding(i - 1, j - 1)" />
            </div>
            <div v-if="isMoveAvailable(i - 1, j - 1)"
                class="absolute border-circle w-2rem h-2rem bg-green-200 border-1 border-green-600 z-5 shadow-2 cursor-pointer"
                @click="move(i - 1, j - 1)">
            </div>
            <div class="z-0">
                <div v-if="i != 1" class="absolute top-0 left-0 border-right-1 m-0 p-0 "
                    :style="{ 'height': (size / 2) + 'px', 'width': (size / 2) - 1 + 'px' }">
                </div>
                <div v-if="j != 9" class="absolute top-0 right-0 border-bottom-1 m-0 p-0"
                    :style="{ 'height': (size / 2) + 'px', 'width': (size / 2) + 'px' }">
                </div>
                <div v-if="j != 1" class="absolute bottom-0 left-0 border-top-1 m-0 p-0"
                    :style="{ 'height': (size / 2) - 1 + 'px', 'width': (size / 2) + 'px' }">
                </div>
                <div v-if="i != 10" class="absolute bottom-0 right-0 border-left-1 m-0 p-0"
                    :style="{ 'height': (size / 2) + 'px', 'width': (size / 2) + 'px' }">
                </div>
                <div v-if="cross_position(j, i)" class="absolute cross"></div>
                <div v-if="(j == 5 && i == 2) || (j == 5 && i == 9)" class="absolute bigCross" style="height: 50px;"></div>
                <!-- Real pieces placed -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['turn'])

onMounted(() => {
    console.log("mounted")
    getInitialBoard('blue')
    // console.log(board.value[0][0])
})

function getPieceImageUrl(num) {

    const pieceImages = {
        9: `../assets/janggi_pieces/blue_chariot.svg`,
        10: `../assets/janggi_pieces/blue_elephant.svg`,
        11: `../assets/janggi_pieces/blue_horse.svg`,
        12: `../assets/janggi_pieces/blue_cannon.svg`,
        13: `../assets/janggi_pieces/blue_king.svg`,
        14: `../assets/janggi_pieces/blue_advisor.svg`,
        15: `../assets/janggi_pieces/blue_pawn.svg`,
        17: `../assets/janggi_pieces/red_chariot.svg`,
        18: `../assets/janggi_pieces/red_elephant.svg`,
        19: `../assets/janggi_pieces/red_horse.svg`,
        20: `../assets/janggi_pieces/red_cannon.svg`,
        22: `../assets/janggi_pieces/red_advisor.svg`,
        21: `../assets/janggi_pieces/red_king.svg`,
        23: `../assets/janggi_pieces/red_pawn.svg`,
    }

    return new URL(pieceImages[num], import.meta.url).href;
}

const size = ref(100)
const cross_position = (i, j) => {

    const list = [[2, 3], [8, 3], [2, 8], [8, 8], [1, 4], [3, 4], [5, 4], [7, 4], [9, 4], [1, 7], [3, 7], [5, 7], [7, 7], [9, 7]]

    for (let k = 0; k < list.length; k++) {
        if (list[k][0] == i && list[k][1] == j) {
            return true
        }
    }
    return false
}

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
        8: "blue",
        16: "red",
    }
)

// const AddColorsToPiece = (num) => {
//     return
// }

// const getPiece = (num) => {
//     return pieces.value[num]
// }

const board = ref(
    [
        [1, 3, 2, 6, 0, 6, 2, 3, 1],
        [0, 0, 0, 0, 5, 0, 0, 0, 0],
        [0, 4, 0, 0, 0, 0, 0, 4, 0],
        [7, 0, 7, 0, 7, 0, 7, 0, 7],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [7, 0, 7, 0, 7, 0, 7, 0, 7],
        [0, 4, 0, 0, 0, 0, 0, 4, 0],
        [0, 0, 0, 0, 5, 0, 0, 0, 0],
        [1, 3, 2, 6, 0, 6, 2, 3, 1],
    ]
)

const getInitialBoard = (color) => {
    if (color == "blue") {
        for (var i in board.value) {
            if (i <= 3) {
                for (var j in board.value[i]) {
                    if (board.value[i][j] != 0) {
                        board.value[i][j] += 16
                    }
                }
            }
            if (i >= 6) {
                for (var j in board.value[i]) {
                    if (board.value[i][j] != 0) {
                        board.value[i][j] += 8
                    }
                }
            }
        }
    }
    else {
        for (var i in board.value) {
            if (i <= 3) {
                for (var j in board.value[i]) {
                    if (board.value[i][j] != 0) {
                        board.value[i][j] += 8
                    }
                }
            }
            if (i >= 6) {
                for (var j in board.value[i]) {
                    if (board.value[i][j] != 0) {
                        board.value[i][j] += 16
                    }
                }
            }
        }
    }
    // console.log(board.value)
}

const seletedPiece = ref(null)

const isSelected = (i, j) => {
    if (seletedPiece.value == null) {
        return false
    }
    else if (seletedPiece.value[0] == i && seletedPiece.value[1] == j) {
        return true
    }
    else {
        return false
    }
}

const turn = ref(8) // blue: 8, red: 16
const isOnTurn = (i, j) => {
    if (turn.value == 8) {
        if (board.value[i][j] < 16) {
            return false // no 'pointer-events: none;' in css
        }
        else {
            return true
        }
    }
    else {
        if (board.value[i][j] > 16) {
            return false
        }
        else {
            return true
        }
    }
}

const availableMoves = ref(null)
const isMoveAvailable = (i, j) => {
    if (availableMoves.value == null) {
        return false
    }
    else {
        for (const move in availableMoves.value) {
            if (availableMoves.value[move][0] == i && availableMoves.value[move][1] == j) {
                return true
            }
        }
        return false
    }
}


const pathFinding = (i, j) => {
    var delta
    availableMoves.value = null
    // console.log(board.value[i][j])
    const num = board.value[i][j]

    if (seletedPiece.value != null) {
        if (seletedPiece.value[0] == i && seletedPiece.value[1] == j) {
            seletedPiece.value = null
            availableMoves.value = null
            return
        }
    }
    seletedPiece.value = [i, j]

    switch (num) {
        case 9: // 초나라 차
            return
        case 10: // 초나라 상
            return
        case 11: // 초나라 마
            delta = [[-1, 0], [0, 1], [1, 0], [0, -1]]
            getHorseMovement(i, j, delta)
            return
        case 12: // 초나라 포
            return
        case 13: // 초나라 왕
            return
        case 14: // 초나라 사
            return
        case 15: // 초나라 졸
            delta = [[0, -1], [-1, 0], [0, 1]]
            getPawnMovement(i, j, delta)
            return
        case 17: // 한나라 차
            return
        case 18: // 한나라 상
            return
        case 19: // 한나라 마
            delta = [[-1, 0], [0, 1], [1, 0], [0, -1]]
            getHorseMovement(i, j, delta)
            return
        case 20: // 한나라 포
            return
        case 21: // 한나라 왕
            return
        case 22: // 한나라 사
            return
        case 23: // 한나라 병
            delta = [[0, -1], [1, 0], [0, 1]]
            getPawnMovement(i, j, delta)
            return
        default:
            return
    }
}

const move = (row, column) => {
    board.value[row][column] = board.value[seletedPiece.value[0]][seletedPiece.value[1]]
    board.value[seletedPiece.value[0]][seletedPiece.value[1]] = 0
    turn.value = turn.value == 8 ? 16 : 8
    emit('turn', turn.value)
    seletedPiece.value = null
    availableMoves.value = null
}

const getPawnMovement = (i, j, delta) => {
    availableMoves.value = []
    for (const d in delta) {
        const row = i + delta[d][0]
        const column = j + delta[d][1]
        // console.log(board.value[column][row])
        if (row < 0 || row > 9 || column < 0 || column > 8) {
            continue
        }
        if (board.value[row][column] == 0 || compareBitsAtPosition(board.value[row][column], board.value[i][j], 5)) {
            availableMoves.value.push([row, column])
        }
    }
    // console.log([i, j], availableMoves.value)
}

const getKingMovement = (i, j) => {

}

const getAdvisorMovement = (i, j) => {

}

const getHorseMovement = (i, j, delta) => {
    availableMoves.value = []
    for (const d in delta) {
        const row = i + delta[d][0]
        const column = j + delta[d][1]
        // console.log(board.value[column][row])
        if (row < 0 || row > 9 || column < 0 || column > 8) {
            continue
        }
        if (board.value[row][column] == 0) {
            var newDelta = []
            if (delta[d][0] == 0) {
                newDelta = [[1, delta[d][1]], [-1, delta[d][1]]]
            }
            else {
                newDelta = [[delta[d][0], 1], [delta[d][0], -1]]
            }
            // availableMoves.value.push([row, column])
            for (const nd in newDelta) {
                var newRow = row + newDelta[nd][0]
                var newColumn = column + newDelta[nd][1]
                console.log(delta[d], newDelta)

                if (newRow < 0 || newRow > 9 || newColumn < 0 || newColumn > 8) {
                    continue
                }
                if (board.value[newRow][newColumn] == 0 || compareBitsAtPosition(board.value[newRow][newColumn], board.value[i][j], 5)) {
                    availableMoves.value.push([newRow, newColumn])
                }
            }
        }
    }
    // console.log([i, j], availableMoves.value
}

const getElephantMovement = (i, j) => {

}

const getChariotMovement = (i, j) => {

}

const getCannonMovement = (i, j) => {

}


function compareBitsAtPosition(num1, num2, position) {
    // Convert numbers to binary strings with leading zeros
    const binary1 = num1.toString(2).padStart(position, '0');
    const binary2 = num2.toString(2).padStart(position, '0');
    console.log(binary1, binary2)
    // Check if the bits at the specified position are the same
    return binary1[0] !== binary2[0];
}

</script>

<style scoped>
.diagonalLine {
    position: absolute;
    top: 50%;
    left: 50%;
    border-top: 1px solid black;
    width: 10%;
    height: 10%;
    transform: rotate(90deg);
    transform-origin: 0 0;
}

.cross {
    position: relative;
    top: 50%;
    left: 50%;
}

.cross:before,
.cross:after {
    position: absolute;
    right: 0%;
    top: -6px;
    content: '';
    height: 12px;
    width: 1px;
    background-color: black;
}

.cross:before {
    transform: rotate(45deg);
}

.cross:after {
    transform: rotate(-45deg);
}


.bigCross {
    position: relative;
    top: 50%;
    left: 50%;
}

.bigCross:before,
.bigCross:after {
    position: absolute;
    right: 0%;
    top: calc(200px * -0.5 * sqrt(2));
    content: '';
    height: calc(200px * sqrt(2));
    width: 1px;
    background-color: black;
}

.bigCross:before {
    transform: rotate(45deg);
}

.bigCross:after {
    transform: rotate(-45deg);
}
</style>
