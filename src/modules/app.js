import { Board } from './board'
import { SelectLevel } from './selectLevel'

export default class App {
    #wrapContainer
    constructor() {
        this.#wrapContainer = document.createElement('div')
        this.#wrapContainer.className = 'wrapper'

        this.selectLevel = new SelectLevel()
        this.board = null
    }
    run() {
        this.render()
        this.#wrapContainer.append(this.selectLevel.render())
        this.selectLevel.onEvent()
        if (this.selectLevel.selected > 0) {
            console.log(this.selectLevel.selected)
            this.board = new Board(this.selectLevel.selected)
            this.#wrapContainer.append(this.board.render())
            this.board.show()
            //отображаю выбранную доску
        }
    }
    render() {
        const titleHTML = document.createElement('div')
        titleHTML.className = 'title'
        titleHTML.textContent = 'Flip Game'

        this.#wrapContainer.append(titleHTML)

        document.body.prepend(this.#wrapContainer)
    }
}
