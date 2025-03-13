import fetch from "node-fetch";

const RIS = 'https://spacescavanger.onrender.com/';
const player = 'mariuha@uia.no';

const startURL = `${RIS}start?player=${player}`;
const start = await fetch(startURL, { method: 'GET' });
const startResponse = await start.json();
console.log(startResponse);
