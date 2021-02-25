import * as axios from 'axios';


const register = async function(user) {
    const response = await axios.post('localhost:3000/users/signin', user);
    parseItem(response, 201);


}

export const parseItem = (response, code) => {
    if (response.status !== code) throw Error(response.message);
    let item = response.data;
    if (typeof item !== 'object') {
        item = undefined;
    }
    return item;
};