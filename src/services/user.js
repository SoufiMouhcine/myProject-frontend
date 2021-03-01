import * as axios from 'axios';


const register = async function(user) {
    try {
        const response = await axios.post(' http://localhost:3000/users/signup', user);
        const addeduser = parseItem(response, 201);
        return addeduser;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const login = async function(user) {
    try {
        const response = await axios.post('http://localhost:3000/users/signin', user);
        const login = parseItem(response, 200);
        return login;
    } catch (error) {
        console.error(error);
        return null
    }
};

const logout = () => {
    console.log("mouchiazeazeqsd")
    localStorage.removeItem('token');
}

export const parseItem = (response, code) => {
    if (response.status !== code) throw Error(response.message);
    let item = response.data;
    if (typeof item !== 'object') {
        item = undefined;
    }
    return item;
};

export const userService = {
    register,
    login,
    logout,
}