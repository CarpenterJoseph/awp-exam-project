module.exports = (mongoose) => {

	const movieSchema = new mongoose.Schema({
		title: String,
		description: String,
		genre: String,
		yearOfRelease: Number,
		reviews: [{
			rating: Number,
			text: String,
			date: Date,
			user: String
		}]
	});

	const movieModel = mongoose.model("movies", movieSchema);
	mongoose.set('useFindAndModify', false);

	async function getMovies() {
		try {
			return await movieModel.find();
		} catch (error) {
			console.error("getMovies:", error.message);
			return {};
		}
	}

	async function createMovie(title, desc, genre, yearOfRelease) {
		const movie = new movieModel({
			title: title,
			description: desc,
			genre: genre,
			yearOfRelease: yearOfRelease,
		});
		return movie.save();
	}

	async function addReview(movieID, rating, text, date, user){
		const review = {
			rating: rating,
			text: text,
			date: date,
			user: user
		}
		return movieModel.findOneAndUpdate(
			{_id: movieID},
			{$push: {reviews: review}});
	}

	async function bootstrap() {
		let l = (await getMovies()).length;
		console.log("Movie collection size:", l);

		if (l === 0) {
			await createMovie("Home Alone",
				"An eight-year-old troublemaker " +
				"must protect his house from a pair " +
				"of burglars when he is accidentally " +
				"left home alone by his family during " +
				"Christmas vacation.",
				"Comedy/Family",
				1990);
		}
	}

	return {
		getMovies,
		createMovie,
		bootstrap,
		addReview
	}
}