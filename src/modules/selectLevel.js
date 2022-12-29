export class SelectLevel {
	#container
	#levelBodyHTML
	#selectedLevel
	constructor() {
		this.#container = document.createElement('div')
		this.#container.className = 'select-level'
		this.#levelBodyHTML = document.createElement('div')
		this.#levelBodyHTML.className = 'select-level__body'
		this.#selectedLevel = null
	}
	get selected() {
		return this.#selectedLevel
	}
	render() {
		const levelTitleHTML = document.createElement('div')
		levelTitleHTML.className = 'select-level__title'
		levelTitleHTML.textContent = 'Выберите сложность...'

		for (let i = 1; i <= 3; i++) {
			const levelItemHTML = document.createElement('div')
			levelItemHTML.className = 'select-level__item'
			levelItemHTML.dataset.id = `${i}`

			const levelHTML = document.createElement('h3')
			const numLevelHTML = document.createElement('span')
			switch (i) {
				case 1:
					levelHTML.textContent = 'low'
					numLevelHTML.textContent = '8'
					break
				case 2:
					levelHTML.textContent = 'medium'
					numLevelHTML.textContent = '16'
					break
				case 3:
					levelHTML.textContent = 'hard'
					numLevelHTML.textContent = '24'
					break
				default:
					console.error('Что-то не так c циклом select-level')
			}

			levelItemHTML.append(levelHTML, numLevelHTML)
			this.#levelBodyHTML.append(levelItemHTML)
		}

		this.#container.append(levelTitleHTML, this.#levelBodyHTML)

		return this.#container
	}
	onEvent() {
		this.#levelBodyHTML.addEventListener('click', (e) => {
			const isTarget = e.target.closest('.select-level__item')
			if (isTarget) {
				this.#selectedLevel = +isTarget.dataset.id
				// this.#container.remove()
				// console.log(this.#selectedLevel)
			}
		})
	}
}
