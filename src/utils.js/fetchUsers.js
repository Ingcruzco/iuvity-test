import axios from 'axios'

export const createUser = async (user, setUsers) => {
	const data = JSON.stringify({
		name: user.name,
		lastName: user.lastName,
		email: user.email,
		phoneNumber: user.phoneNumber,
		cc: user.cc
	});

	const config = {
		method: 'post',
		url: process.env.REACT_APP_USERS_URL,
		headers: { 
			'Content-Type': 'application/json'
		},
		data : data
	};

	await axios(config);
	const users = await axios.get(process.env.REACT_APP_USERS_URL);
	setUsers(users.data);
}

export const deleteUser = async (id, setUsers) => {
	const config = {
		method: 'delete',
		url: `${process.env.REACT_APP_USERS_URL}/${id}`,
		headers: { }
	};

	await axios(config);
	const users = await axios.get(process.env.REACT_APP_USERS_URL);
	setUsers(users.data);
}

export const updateUser = async (user, setUsers) => {
	const data = JSON.stringify({
		'name': user.name,
		'lastName': user.lastName,
		'email': user.email,
		'phoneNumber': user.phoneNumber,
		'cc': user.cc
	});

	const config = {
		method: 'put',
		url: `${process.env.REACT_APP_USERS_URL}/${user._id}`,
		headers: { 
			'Content-Type': 'application/json'
		},
		data : data
	};

	await axios(config);
	const users = await axios.get(process.env.REACT_APP_USERS_URL);
	setUsers(users.data);
}

export const getUserByID = async (id) => {
	const config = {
		method: 'get',
		url: `${process.env.REACT_APP_USERS_URL}/${id}`,
		headers: { }
	};
	return await axios(config);
}