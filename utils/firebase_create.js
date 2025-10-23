import { getDatabase, set, ref, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import {app} from './firebase_init.js'

const db = getDatabase(app)

const project = document.getElementById("projectSelector")

const userName = document.getElementById("name")

let rating = 0

const ratingBox = document.getElementById("rating")

const firstStar = document.getElementById("1Star")
const secondStar = document.getElementById("2Stars")
const thirdStar = document.getElementById("3Stars")
const fourthStar = document.getElementById("4Stars")
const fifthStar = document.getElementById("5Stars")

const userComment = document.getElementById("message")

const sendReview = document.getElementById("submitForm")

// Star rating system

firstStar.addEventListener("click", function() {
	rating = 1
	
	firstStar.classList = "fa fa-star"
	secondStar.classList = "fa fa-star-o"
	thirdStar.classList = "fa fa-star-o"
	fourthStar.classList = "fa fa-star-o"
	fifthStar.classList = "fa fa-star-o"
})

secondStar.addEventListener("click", function() {
	rating = 2

	firstStar.classList = "fa fa-star"
	secondStar.classList = "fa fa-star"
	thirdStar.classList = "fa fa-star-o"
	fourthStar.classList = "fa fa-star-o"
	fifthStar.classList = "fa fa-star-o"
})

thirdStar.addEventListener("click", function() {
	rating = 3

	firstStar.classList = "fa fa-star"
	secondStar.classList = "fa fa-star"
	thirdStar.classList = "fa fa-star"
	fourthStar.classList = "fa fa-star-o"
	fifthStar.classList = "fa fa-star-o"
})

fourthStar.addEventListener("click", function() {
	rating = 4

	firstStar.classList = "fa fa-star"
	secondStar.classList = "fa fa-star"
	thirdStar.classList = "fa fa-star"
	fourthStar.classList = "fa fa-star"
	fifthStar.classList = "fa fa-star-o"
})

fifthStar.addEventListener("click", function() {
	rating = 5

	firstStar.classList = "fa fa-star"
	secondStar.classList = "fa fa-star"
	thirdStar.classList = "fa fa-star"
	fourthStar.classList = "fa fa-star"
	fifthStar.classList = "fa fa-star"
})

// Send the review to the server
sendReview.addEventListener("click", function() {

	if(rating == 0) {

		userComment.classList.remove("warning")
		userName.classList.remove("warning")
		project.classList.remove("warning")

		ratingBox.classList.add("warning")

	} else if (userName.value.trim() == ""){

		userComment.classList.remove("warning")
		ratingBox.classList.remove("warning")
		project.classList.remove("warning")

		userName.classList.add("warning")

	} else if(userComment.value.trim() == "") {

		ratingBox.classList.remove("warning")
		userName.classList.remove("warning")
		project.classList.remove("warning")

		userComment.classList.add("warning")

	} else if (project.value == 0){
		ratingBox.classList.remove("warning")
		userName.classList.remove("warning")
		userComment.classList.remove("warning")

		project.classList.add("warning")
	}
	
	else {

		userComment.classList.remove("warning")
		userName.classList.remove("warning")
		ratingBox.classList.remove("warning")
		project.classList.remove("warning")

		let projectnum = project.value

		let uid = `${Math.random()}${rating}${userComment.value.length}${userName.value[0]}${userComment.value[userComment.value.length - 1]}${userName.value.length}${Math.random()}`

		uid = uid.replaceAll(".", "")

		set(ref(db, 'reviews/project' + projectnum + '/' + uid),{
			name: userName.value,
			comment: userComment.value,
			rating: rating,
			time: serverTimestamp()
		})

	// Reset Rating
		firstStar.classList = "fa fa-star-o"
		secondStar.classList = "fa fa-star-o"
		thirdStar.classList = "fa fa-star-o"
		fourthStar.classList = "fa fa-star-o"
		fifthStar.classList = "fa fa-star-o"

		rating = 0

	// Reset name and comment box
		userName.value = ''
		userComment.value = ''
		project.value = 0
	}

})