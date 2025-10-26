import { getDatabase, ref, get} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js"

const db = getDatabase()

const pastReviews = document.getElementById("pastReviews")

const p1Posts = ref(db, 'reviews/project1')
const p2Posts = ref(db, 'reviews/project2')
const p3Posts = ref(db, 'reviews/project3')

const formatter = new Intl.DateTimeFormat('en-US', {
	year: 'numeric',
	month: 'short',
	day: 'numeric',
	hour: '2-digit',
	minute: '2-digit',
	timeZoneName: 'short'
});

async function getPostsFrom (user) {

	get(p1Posts).then((snapshot) => {
		const data = snapshot.val()

		if(data != null) {
			const dataKeys = Object.keys(data)

			for(let i = 0; i < dataKeys.length; i++) {
				if(data[dataKeys[i]].name == user) {
					const review = document.createElement("p")
					review.innerHTML = data[dataKeys[i]].comment
					pastReviews.appendChild(review)
				}
			}
		}
	})

	get(p2Posts).then((snapshot) => {
		const data = snapshot.val()

		if(data != null) {
			const dataKeys = Object.keys(data)

			for(let i = 0; i < dataKeys.length; i++) {
				if(data[dataKeys[i]].name == user) {
					const date = new Date(data[dataKeys[i]].time)
					const formattedDateTime = formatter.format(date);
					
					let starRating = document.createElement("div")
					starRating.classList.add("starRating")

					for(let x = 0; x < data[dataKeys[i]].rating; x++){
						starRating.innerHTML += (`<i class="fa fa-star"></i>`)
					}
					for(let y = 0; y < 5-data[dataKeys[i]].rating; y++){
						starRating.innerHTML += (`<i class="fa fa-star-o"></i>`)
					}

					const review = document.createElement("div")
					review.classList.add("pastReviewWrapper")
					review.innerHTML = `
					<h3 class="name">${data[dataKeys[i]].name}</h3>
					<p class="comment">${data[dataKeys[i]].comment}</p>
					<p class="time">${formattedDateTime}</p>
					`

					review.appendChild(starRating)

					pastReviews.appendChild(review)

				}
			}
		}
	})

	get(p3Posts).then((snapshot) => {
		const data = snapshot.val()

		if(data != null) {
			const dataKeys = Object.keys(data)

			for(let i = 0; i < dataKeys.length; i++) {
				if(data[dataKeys[i]].name == user) {
					const review = document.createElement("p")
					review.innerHTML = data[dataKeys[i]].comment
					pastReviews.appendChild(review)
				}
			}
		}
	})
}

getPostsFrom("Test Mctest")
