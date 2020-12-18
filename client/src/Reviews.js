import React from "react";
import {useParams} from "@reach/router";

function Reviews(props){
	let movieData = props.movieData
	const params = useParams() // necessary for line below
	const movieID = params.id
	let content = <p>loading...</p>

	if(movieData !== []) {
		const movie = movieData.find(e => e._id === movieID)
		const reviews = movie.reviews
		let id = 0
		const reviewList = reviews.map(e => {
			if(e.text === "") return null
			return (
				<li key={id++}>
					<div>
						<h4>User: {e.user}</h4>
						<h4>Rating: {e.rating}</h4>
						<p>{e.text}</p>
						<h4>{e.date}</h4>
					</div>

				</li>
			)})
		content =
			<>
				<h3>Reviews for "{movie.title}"</h3>
				<ul style={{listStyleType: "none"}}>
					{reviewList}
				</ul>
			</>
	}

	// title: String,
	// description: String,
	// averageRating: Number,
	// numberOfRatings: Number,
	// genre: String,
	// yearOfRelease: Number
	return(
		<>
			{content}
		</>
	)
}

export default Reviews