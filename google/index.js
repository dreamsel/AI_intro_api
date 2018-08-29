require('dotenv').load();

const language = require('@google-cloud/language');
const translate = require('@google-cloud/translate');
const vision = require('@google-cloud/vision');

const axios = require('axios');
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

async function main() {
  try {
    // Instantiates a client
    const client = new language.LanguageServiceClient();

    // The text to analyze

    const text = await readFile('text','utf8');

    if(text && text.length) {
      const document = {
        content: text,
        type: 'PLAIN_TEXT',
      };

      const sentimentsResults = await client.analyzeSentiment({document: document})

      const sentiment = sentimentsResults[0].documentSentiment;

      console.log(`Sentiment score: ${sentiment.score}`);
      console.log(`Sentiment magnitude: ${sentiment.magnitude}`);

      const classifyResults = await client.classifyText({document: document})
      const classification = classifyResults[0];

      console.log('Categories:');
      classification.categories.forEach(category => {
        console.log(
          `Name: ${category.name}, Confidence: ${category.confidence}`
        );
      });
    } else {
      console.log(' empty file');
    }
  }
  catch(err) {
    console.error('ERROR:', err);
  };
}

async function raw() {
  const apikey = 'AIzaSyCHNSRIMrwHDjprFcHlsd1Pc3VD27OfFvA';
  try {
    const res = await axios.post(`https://translation.googleapis.com/language/translate/v2/detect?key=${apikey}`,
    {
        q: 'some very long text to check'
    });
    console.log('raw response = ', res.data.data.detections);
  }
  catch(err){
    console.log('error', err.message);
  }

}
async function visionExample() {
  try {
    const client = new vision.ImageAnnotatorClient();
    const results = await client.labelDetection('./selin.jpg');

    const labels = results[0].labelAnnotations;

    console.log('Labels:');
    labels.forEach(label => console.log(label.description));

    const texts = await client.documentTextDetection('./selin.jpg');
    console.log(texts[0].textAnnotations);

    const face = await client.faceDetection('./selin.jpg');
    console.log(face[0].faceAnnotations);
  }
  catch(err) {
    console.log('vision err', err);
  }
}
//main();
//raw();
visionExample();
