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
    localStorage.removeItem('token');
};

const getAll = async function() {
    try {
        const response = await axios.get('http://localhost:3000/users', {
            headers: { 'authorization': 'barear ' + localStorage.getItem('token') }
        });
        const users = parseList(response);
        return users.data;
    } catch (error) {
        console.error(error);
    }

};

const deleteUser = async function(user) {
    try {
        const response = await axios.delete(' http://localhost:3000/users/' + user._id, {
            headers: { 'authorization': 'barear ' + localStorage.getItem('token') }
        });
        parseItem(response, 204);
        return user._id;
    } catch (error) {
        return console.error(error);
    }
};

const parseList = response => {
    if (response.status !== 200) throw Error(response.message);
    if (!response.data) return [];
    let list = response.data;
    if (typeof list !== 'object') {
        list = [];
    }
    return list;
};

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
    getAll,
    deleteUser

}