import React from "react";
import {Link} from "@reach/router";

function Home(props){
	const movieData = props.movieData
	let content = <p>loading...</p>
	if(movieData) {
		const movieList = movieData.map(e => {
			return (
				<li key={e._id}>
					<div>
						<Link to={`${e._id}`}><h5>{e.title}</h5></Link>
						<p>{e.description}</p>
					</div>

				</li>
		)})

		content =
			<>
				<ul style={{listStyleType: "none"}}>
					{movieList}
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
			<Link to='addmovie'>Add Movie</Link>
		</>
	)
}

export default Home