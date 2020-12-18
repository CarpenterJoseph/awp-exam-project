module.exports = (DB) => {
	const express = require("express");
	const router = express.Router();

	/**** Routes ****/
	//Get movies
	router.get('/movies', async (req, res) => {
		res.json(await DB.getMovies());
	});

	//Post movie
	router.post('/movies', async (req, res) => {
		//title, desc, genre, yearOfRelease
		const title = req.body.title
		const desc = req.body.description
		const genre = req.body.genre
		const yearOfRelease = req.body.yearOfRelease
		await DB.createMovie(title, desc, genre, yearOfRelease)
		res.json({msg: title + ' has been added!'})
	})

	//post review
	router.post('/movies/addreview', async (req, res) => {
		const movieID = req.body.movieID
		const rating = req.body.rating
		const text = req.body.text
		const user = req.body.user
		await DB.addReview(movieID, rating, text, new Date(), user)
		res.json({msg: 'review has been added!'})
	})

	return router;
}
