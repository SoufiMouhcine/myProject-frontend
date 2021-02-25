import * as axios from 'axios';


const register = async function(user) {
    try {
        const response = await axios.post('localhost:3000/users/signin', user);
        const addeduser = parseItem(response, 201);
        return addeduser;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const parseItem = (response, code) => {
    if (response.status !== code) throw Error(response.message);
    let item = response.data;
    if (typeof item !== 'object') {
        item = undefined;
    }
    return item;
};

module.exports = {
    register,
}