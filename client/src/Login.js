import React, {useState} from 'react';

function Login(props) {

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	function handleLogin() {
		console.log(username, password)
		props.login(username, password);
	}

	return (
		<>
			<h3>Login</h3>
			<input onChange={(event) => setUsername(event.target.value)}
			       name="username" type="text" placeholder="username"/><br/>
			<input onChange={(event) => setPassword(event.target.value)}
			       name="password" type="password" placeholder="password"/><br/>
			<button onClick={handleLogin}>Login</button>
		</>
	);
}

export default Login;