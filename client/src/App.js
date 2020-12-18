import React, {useEffect, useState} from 'react';
import Home from "./Home";
import {Router} from "@reach/router";
import Movie from "./Movie";
import AddReview from "./AddReview";
import Reviews from "./Reviews";
import AuthService from "./AuthService";
import Login from "./Login";
import AddMovie from "./AddMovie";

const API_URL = process.env.REACT_APP_API;
const authService = new AuthService(`${API_URL}/users/authenticate`);

function App() {
	const [movieData, setMovieData] = useState([]);
	const [movieCount, setMovieCount] = useState(0);

	useEffect(() => {
		getData();
	}, [movieCount]);

	async function getData() {
		const url = `${API_URL}/movies`
		const response = await fetch(url)
		const data = await response.json()
		setMovieData(data)
	}

	async function addMovie(title, desc, genre, yearOfRelease){
		setMovieCount(movieCount + 1)
		const url = `${API_URL}/movies`
		const movie = {
			title: title,
			description: desc,
			genre: genre,
			yearOfRelease: yearOfRelease
		}
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${authService.getToken()}`
			},
			body: JSON.stringify(movie)
		})
		const data = await response.json()
	}

	async function addReview(movieID, text, rating) {
		setMovieCount(movieCount + 1)
		if (rating < 0) rating = 0
		if (rating > 5) rating = 5

		// rating: Number,
		// 	text: String,
		// 	date: Date,
		// 	user: String
		const url = `${API_URL}/movies/addreview`
		const review = {
			movieID: movieID,
			rating: rating,
			text: text,
			user: authService.getUsername()
		}
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${authService.getToken()}`
			},
			body: JSON.stringify(review)
		})
		const data = await response.json()
	}

	async function login(username, password) {
		setMovieCount(movieCount + 1)
		try {
			const resp = await authService.login(username, password);
			console.log("Authentication:", resp.msg);
		} catch (e) {
			console.log("Login", e);
		}
	}

	let loginContent = <>
			<p>You are logged in.</p>
		</>


	if (!authService.loggedIn()) {
		loginContent = <Login login={login} />;
	}

	return (
		<>
			<h1>Movie App</h1>

			{loginContent}

			<Router>
				<Home path='/' movieData={movieData}/>
				<Movie path='/:id' movieData={movieData} />
				<AddReview path='/:id/addreview/' getData={getData} addReview={addReview}/>
				<Reviews path='/:id/reviews' movieData={movieData}/>
				<AddMovie path='/addmovie' addMovie={addMovie}/>
			</Router>
		</>
	);
}

export default App;
