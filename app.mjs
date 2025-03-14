import fetch from "node-fetch";
import { writeFile } from "fs/promises";

//#region api urls
const RIS = 'https://spacescavanger.onrender.com/';
const API = 'https://api.le-systeme-solaire.net/rest/bodies/';
const player = 'mariuha@uia.no';
//endregion

//#region fetch api
const startURL = `${RIS}start?player=${player}`;
const start = await fetch(startURL, { method: 'GET' });
const startResponse = await start.json();
console.log(startResponse);

const answerURL = `${RIS}answer`;
async function answer(solution) {

    const request = await fetch(answerURL, {
        method: 'POST',
        body: JSON.stringify({ answer: solution, player: player}),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const response = await request.json();
    console.log('answer: '+ solution);
    console.log(response);

}

async function corpAPI(query) {

    const request = await fetch(API+query,
        { 
            method: 'GET', 
            headers: { 'Content-Type': 'application/json' } 
        }
    );

    const data = await request.json();
    writeFile('data.json', JSON.stringify(data, null, 2));
    return data;
}
//#endregion

//#region helper functions
function compare(value1, value2) {
    let diff = value1 - value2;
    return Math.abs(diff);
}

function closest(data, target, property) {
    let closest = data.bodies.reduce((closest, obj) => {
        return Math.abs(obj[property] - target) < Math.abs(closest[property] - target) ? obj : closest;
    });
    return closest;
}

function count(data, property) {
    return data[property].length;
}

//endregion

export { corpAPI, answer, compare, closest };
