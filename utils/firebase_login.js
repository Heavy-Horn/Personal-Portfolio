const page = document.getElementById("mainPage")
const loginPage = document.getElementById("signInPage")
const loadingPage = document.getElementById("loadingPage")
const verificationAwaitPage = document.getElementById("verificationPage")

loadingPage.classList.remove("hidden")
loginPage.classList.add("hidden")
page.classList.add("hidden")
verificationAwaitPage.classList.add("hidden")

import { sendEmailVerification, getAuth, onAuthStateChanged, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"

const signup = document.getElementById("signUpButton")
const login = document.getElementById("signInButton")
const logOut = document.getElementById("signOut")

const signInEmail = document.getElementById("signInEmail")
const signInPassword = document.getElementById("signInPassword")

const userNameDisplay = document.getElementById("name")

const signUpEmail = document.getElementById("signUpEmail")
const signUpPassword = document.getElementById("signUpPassword")
const signUpName = document.getElementById("signUpName")

const auth = getAuth()

onAuthStateChanged(auth, (user) => {
	if (user && user.emailVerified) {
		loadingPage.classList.add("hidden")
		loginPage.classList.add("hidden")
		page.classList.remove("hidden")
		verificationAwaitPage.classList.add("hidden")
		userNameDisplay.innerHTML = user.displayName
	} else if(user) {
		loadingPage.classList.add("hidden")
		loginPage.classList.add("hidden")
		page.classList.add("hidden")
		verificationAwaitPage.classList.remove("hidden")
	} else {
		loadingPage.classList.add("hidden")
		loginPage.classList.remove("hidden")
		verificationAwaitPage.classList.add("hidden")
		page.classList.add("hidden")
	}
})

signup.addEventListener("click", function() {
	createUserWithEmailAndPassword(auth, signUpEmail.value, signUpPassword.value)
	.then((userCredential) => {
		const user = userCredential.user

		updateProfile(user, {
			displayName: signUpName.value
		})

 		signUpEmail.value = ""
		signUpName.value = ""
		signUpPassword.value = ""

		sendEmailVerification(auth.currentUser)
		.then(
			console.log("Confirmation Email Sent")
		)
		.catch((error) => {
			const errorCode = error.code
			const errorMessage = error.message
			console.log(errorMessage)
		})

		userNameDisplay.innerHTML = user.displayName
	})
	.catch((error) => {
		const errorCode = error.code
		const errorMessage = error.message
		console.log(errorMessage)
	})
})

login.addEventListener("click", function() {
	signInWithEmailAndPassword(auth, signInEmail.value, signInPassword.value)
	.then((userCredential) => {
		const user = userCredential.user

 		signInEmail.value = ""
		signInPassword.value = ""

		userNameDisplay.innerHTML = user.displayName
	})
	.catch((error) => {
		const errorCode = error.code
		const errorMessage = error.message
		console.log(errorMessage)
	})
})

logOut.addEventListener("click", function() {
	signOut(auth)
})
