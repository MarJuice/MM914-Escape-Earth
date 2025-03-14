import { corpAPI, compare, answer, closest } from "./app.mjs";

//#region corp api solutions

// Find difference between the equatorial radius and the mean radius of the Sun
let sunData = await corpAPI("sun") // Extract data for sun from API
    .then(data => compare(data.meanRadius, data.equaRadius)); // Send suns meanRadius and equaRadius to compare function to get the difference
await answer(sunData);

// Find the planet closest in scale to Earths axial tilt
let axialTiltData = await corpAPI("?data=englishName,axialTilt&filter[]=axialTilt,gt,0&filter[]=isPlanet,eq,true&filter[]=englishName,neq,earth") // Extract name and axial tilt for planets greater than 0 (excluding earth)
    .then(data => closest(data, 23.44, "axialTilt")); // Find the planet closest to earths axial tilt
await answer(axialTiltData.englishName);
//endregion
