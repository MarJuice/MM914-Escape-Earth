import fetch from "node-fetch";

const RIS = 'https://spacescavanger.onrender.com/';
const API = 'https://api.le-systeme-solaire.net/rest/bodies/';
const player = 'mariuha@uia.no';

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
    console.log(response);

}

// Find difference between the equatorial radius and the mean radius of the Sun
let data = await corpAPI("sun")
    .then(data => compare(data.meanRadius, data.equaRadius));
    console.log(data);
answer(data);

async function compare(value1, value2) {
    let diff = value1 - value2;
    return Math.abs(diff);
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
