import { getDatabase, ref, remove, onValue} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js"

const deleteButton = document.getElementById("deleteReview")
const project = document.getElementById("projectSelector")
const user = document.getElementById("name")

const rating1 = document.getElementById("1Star")
const rating2 = document.getElementById("2Stars")
const rating3 = document.getElementById("3Stars")
const rating4 = document.getElementById("4Stars")
const rating5 = document.getElementById("5Stars")

const comment = document.getElementById("message")

const db = getDatabase()

deleteButton.addEventListener("click", function() {
	const path = ref(db, '/reviews/project' + project.value + "/" + user.innerHTML)

	onValue(path, (snapshot) => {
		if(snapshot.exists()) {
			remove(path)
				.then(
					alert("Review Deleted Successfully")
				)

			comment.value = ""
			project.value = 0
			
			rating1.classList = "fa fa-star-o"
			rating2.classList = "fa fa-star-o"
			rating3.classList = "fa fa-star-o"
			rating4.classList = "fa fa-star-o"
			rating5.classList = "fa fa-star-o"
		}
	})
})