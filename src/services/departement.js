import * as axios from 'axios';


const getDepartements = async function() {
    try {
        const response = await axios.get(' http://localhost:3000/departements', {
            headers: { 'authorization': 'barear ' + localStorage.getItem('token') }
        });
        console.log(response)
        let data = parseList(response);
        const departements = data.departements.map(d => {
            return d;
        })
        console.log(departements)
        return departements;
    } catch (error) {
        console.error(error);
        return []
    }

};

const deleteDepartement = async function(departement) {
    try {
        const response = await axios.delete(' http://localhost:3000/departements/' + departement._id, {
            headers: { 'authorization': 'barear ' + localStorage.getItem('token') }
        });
        parseItem(response, 200);
        return departement._id;
    } catch (error) {
        return console.error(error);
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

const parseList = response => {
    if (response.status !== 200) throw Error(response.message);
    if (!response.data) return [];
    let list = response.data;
    if (typeof list !== 'object') {
        list = [];
    }
    return list;
};




export const departementService = {
    getDepartements,
    deleteDepartement,
}