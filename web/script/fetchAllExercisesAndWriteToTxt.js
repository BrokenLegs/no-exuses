//fetcj all exercises from the Ninjas_API and write them to a txt file
require('dotenv').config({ path: '../.env.local' });
const fs = require('fs');

const axios = require('axios');

async function getAllExercises() {
    let exercises = [];
    let offset = 0;
    let hasMoreData = true;

    const options = {
        headers: {
            'X-Api-Key': process.env.NINJAS_API_KEY
        }
    };

    while (hasMoreData) {
        const response = await axios.get(`https://api.api-ninjas.com/v1/exercises?offset=${offset}`, options);
        //ta bort all övningar som har något tomt fält 
        const filteredData = response.data.filter(item => !Object.values(item).includes(''));
        exercises = exercises.concat(filteredData);

        if (response.data.length < 10) {
            hasMoreData = false;
        } else {
            offset += 10;
        }
    }

    return exercises;
}

getAllExercises().then(exercises => {
    fs.writeFile('exercises.txt', JSON.stringify(exercises, null, 2), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
});