import React, {useState} from "react";
import {useParams} from "@reach/router";

function AddReview(props){
	const params = useParams() // necessary for line below
	const movieID = params.id

	const [text, setText] = useState("");
	const [rating, setRating] = useState(0);

	function onSubmit(event){
		props.addReview(movieID, text, rating)
		props.getData()
	}

	return(
		<>
			<form>
				<label htmlFor="form_text">Text</label><br/>
				<textarea onChange={event => setText(event.target.value)} id="form_text" name="form_text"/><br/>
				<label htmlFor="form_rating">Rating (1-5)</label><br/>
				<input onChange={event => setRating(parseInt(event.target.value))} type="text" id="form_rating" name="form_rating"/><br/>


				<button type="button" onClick={(event) => onSubmit(event)}>
					Submit
				</button>
			</form>
		</>
	)
}

export default AddReview