async function loadNavbar() {
	const template = await fetch("../components/header/header.html")
	const navbar = await template.text()

	const placeholder = document.getElementById("placeholder")
	
	const navReplace = document.createElement("nav")
	navReplace.classList.add("navigation")
	navReplace.id = "navbar"

	placeholder.replaceWith(navReplace)
	navReplace.innerHTML = navbar
}

window.onload = loadNavbar()