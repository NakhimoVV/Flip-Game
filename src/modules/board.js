export class Board {
    #container
    constructor(squareNumber) {
        this.#container = document.createElement('div')
        this.#container.className = 'container'
        this.#container.id = 'flip-board'

        this.SQUARES_NUMBER = squareNumber
        this.IMAGES_NUMBER = this.SQUARES_NUMBER / 2
        this.imagesPosition = []
        this.colors = [
            '#FF0000',
            '#FF1493',
            '#FFA500',
            '#FFFF00',
            '#9932CC',
            '#00CED1',
            '#1E90FF',
            '#FFFFFF',
        ]
    }

    generateIMGPosition() {
        for (let i = 1; i <= this.IMAGES_NUMBER; i++) {
            this.imagesPosition.push(i)
        }
        this.imagesPosition = [
            ...this.imagesPosition,
            ...this.imagesPosition.reverse(),
        ]
        // console.log(this.imagesPosition)
        //Алгоритм "Тасование Фишера — Йетса"
        for (let i = this.imagesPosition.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1))
            ;[this.imagesPosition[i], this.imagesPosition[j]] = [
                this.imagesPosition[j],
                this.imagesPosition[i],
            ]
            // случайный индекс от 0 до i
            // поменять элементы местами
            // используя синтаксис "деструктурирующее присваивание"
            // то же самое можно записать как:
            // let t = array[i]; array[i] = array[j]; array[j] = t
        }
        // console.log(this.imagesPosition)
    }
    render() {
        return this.#container
    }
    renderSquares() {
        for (let i = 1; i <= this.SQUARES_NUMBER; i++) {
            const color = this.#getRandomColor()
            const uniqImage = this.imagesPosition[i - 1]

            const square = document.createElement('div')
            square.classList.add('square', 'flip')
            square.id = i
            square.dataset.id = uniqImage

            const front = document.createElement('div')
            front.className = 'front'
            front.style.backgroundColor = color

            const back = document.createElement('div')
            back.className = 'back'

            const img = document.createElement('img')
            img.src = require(`../../assets/uniqImages/${uniqImage}.png`)

            back.append(img)
            square.append(front, back)

            this.#container.append(square)
        }
    }
    show() {
        this.generateIMGPosition()
        this.renderSquares()
        this.watch()
    }
    watch() {
        //счетчики
        let scoreID = null
        let scoreDataID = null
        const scopeID = []
        let score = 0
        let firstElem
        let timer

        this.#container.addEventListener('click', (event) => {
            score++
            const { target } = event
            const isSquare = target.closest('.square')
            const clickedID = isSquare.id
            const clickedDataID = isSquare.dataset.id
            const isEqualSquare = scoreID === clickedID
            const isEqualData = scoreDataID === clickedDataID

            const isActiveSquare = isSquare.matches('.active')

            console.log('isActiveSquare', isActiveSquare)
            console.log('isEqualSquare', isEqualSquare)
            console.log('isEqualData', isEqualData)

            const find = scopeID.find((item) => item === clickedID)

            if (isSquare) {
                if (!find) {
                    if (score === 1) {
                        console.log('Click#1')
                        //--------------------
                        scoreID = clickedID
                        scoreDataID = clickedDataID
                        isSquare.classList.add('active')
                        firstElem = document.getElementById(scoreID)
                        timer = setTimeout(() => {
                            if (firstElem.matches('.active')) {
                                firstElem.classList.remove('active')
                            }
                        }, 2 * 1000)
                    } else if (score === 2) {
                        console.log('Click#2')
                        score = 0
                        //--------------------
                        // clearTimeout(timer)
                        if (isEqualSquare && isActiveSquare) {
                            clearTimeout(timer)
                            isSquare.classList.remove('active')
                            //Обнуляем для >=3 клика
                            scoreID = null
                            scoreDataID = null
                        }
                        if (!isEqualSquare) {
                            isSquare.classList.add('active')
                            clearTimeout(timer)
                            if (isEqualData) {
                                console.log('#1')
                                scopeID.push(+scoreID, +clickedID)
                                firstElem.classList.add('active')
                                isSquare.classList.add('active')
                            }
                            if (!isEqualData) {
                                console.log('#2')
                                timer = setTimeout(() => {
                                    firstElem.classList.remove('active')
                                    isSquare.classList.remove('active')
                                }, 1 * 1000)
                            }
                        }
                    }
                }
            }
        })
    }
    #getRandomColor() {
        const index = Math.floor(Math.random() * this.colors.length)
        return this.colors[index]
    }
}
