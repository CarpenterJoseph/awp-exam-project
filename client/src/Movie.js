import React from "react";
import {Link, useParams} from "@reach/router";

function Movie(props){
	let movieData = props.movieData
	const params = useParams() // necessary for line below
	const movieID = params.id
	let content = <p>loading...</p>
	if(movieData !== []) {


		const movie = movieData.find(e => e._id === movieID)
		const reviews = movie.reviews
		let totalRating = 0
		let numberOfRatings = reviews.length

		reviews.forEach(r => {
			totalRating += r.rating
		})

		let averageRating = parseFloat(totalRating / numberOfRatings).toFixed(2)
		if(isNaN(averageRating)) averageRating = 0
		content =
			<>
				<h3>{movie.title}</h3>
				<p>{movie.description}</p>
				<p>{movie.yearOfRelease}</p>
				<p>{movie.genre}</p>
				<p>Reviews average: {averageRating}</p>
				<p># of reviews: {numberOfRatings}</p>
				<Link to={`reviews`}><h4>See reviews</h4></Link>
				<Link to={`addreview`}><h4>Write Review</h4></Link>
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

export default Movie