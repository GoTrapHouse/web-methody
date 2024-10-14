document.addEventListener('DOMContentLoaded', function () {
	function applySavedTheme() {
		const savedTheme = localStorage.getItem('theme')
		if (savedTheme) {
			document.body.classList.toggle('light-theme', savedTheme === 'light')
			document.body.classList.toggle('dark-theme', savedTheme === 'dark')
			document.getElementById('theme-toggle').checked = savedTheme === 'light'
			updateElementThemes(savedTheme)
		}
	}

	function updateElementThemes(theme) {
		const elements = document.querySelectorAll(
			'header, section, footer, .card, .button, .save-button, .udk-button, .toggle-button, #udk-content, #practical-content'
		)
		elements.forEach(el => {
			el.classList.toggle('light-theme', theme === 'light')
			el.classList.toggle('dark-theme', theme === 'dark')
		})

		const searchInput = document.getElementById('query')
		if (searchInput) {
			searchInput.classList.toggle('light-theme', theme === 'light')
			searchInput.classList.toggle('dark-theme', theme === 'dark')
		}
	}

	document
		.getElementById('theme-toggle')
		.addEventListener('change', function () {
			const isLightTheme = document.body.classList.toggle('light-theme')
			document.body.classList.toggle('dark-theme')
			localStorage.setItem('theme', isLightTheme ? 'light' : 'dark')
			updateElementThemes(isLightTheme ? 'light' : 'dark')
		})

	applySavedTheme()

	document.getElementById('toggle-udk').addEventListener('click', function () {
		const content = document.getElementById('udk-content')
		content.style.display = content.style.display === 'none' ? 'block' : 'none'
		this.textContent =
			content.style.display === 'block' ? 'Свернуть' : 'Развернуть'
	})

	document
		.getElementById('toggle-practical')
		.addEventListener('click', function () {
			const content = document.getElementById('practical-content')
			content.style.display =
				content.style.display === 'none' ? 'block' : 'none'
			this.textContent =
				content.style.display === 'block' ? 'Свернуть' : 'Развернуть'
		})

	const searchInput = document.getElementById('query')
	if (searchInput) {
		searchInput.addEventListener('input', function () {
			const query = this.value.trim()
			if (query) {
				highlightText(query)
			} else {
				removeHighlights()
			}
		})

		searchInput.addEventListener('keypress', function (event) {
			if (event.key === 'Enter') {
				const query = this.value.trim()
				if (query) {
					highlightText(query)
				}
			}
		})
	}

	function highlightText(query) {
		removeHighlights()
		const regex = new RegExp(`(${query})`, 'gi')
		const elements = document.querySelectorAll(
			'body *:not(script):not(style):not(button)'
		)

		elements.forEach(el => {
			if (el.children.length === 0 && el.innerText) {
				el.innerHTML = el.innerHTML.replace(
					regex,
					'<span class="highlight">$1</span>'
				)
			}
		})
	}

	function removeHighlights() {
		const highlighted = document.querySelectorAll('.highlight')
		highlighted.forEach(el => {
			el.outerHTML = el.innerHTML
		})
	}
})
