import React, {useState} from "react";
import {Link, useParams} from "@reach/router";

function AddMovie(props){
	//title, desc, genre, yearOfRelease
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const [genre, setGenre] = useState("");
	const [yearOfRelease, setYearOfRelease] = useState(0);

	function onSubmit(event){
		props.addMovie(title,desc,genre,yearOfRelease)
	}

	return(
		<>
			<h3>Add new movie</h3>
			<form>
				<label htmlFor="form_title">Title</label><br/>
				<input onChange={event => setTitle(event.target.value)} id="form_title" name="form_title"/><br/>
				<label htmlFor="form_rating">Description</label><br/>
				<input onChange={event => setDesc(event.target.value)} type="text" id="form_desc" name="form_desc"/><br/>
				<label htmlFor="form_genre">Genre</label><br/>
				<input onChange={event => setGenre(event.target.value)} type="text" id="form_genre" name="form_genre"/><br/>
				<label htmlFor="form_yearOfRelease">Year of Release</label><br/>
				<input onChange={event => setYearOfRelease(parseInt(event.target.value))} type="text" id="form_yearOfRelease" name="form_yearOfRelease"/><br/>


				<button type="button" onClick={(event) => onSubmit(event)}>
					Submit
				</button>
			</form>
		</>
	)
}

export default AddMovie