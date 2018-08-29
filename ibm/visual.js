require('dotenv').load();

const VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
const fs = require('fs');

const visualRecognition = new VisualRecognitionV3({
    // Set the endpoint
    url: 'https://gateway.watsonplatform.net/visual-recognition/api',
    version: '2018-03-19',
    iam_apikey: process.env.VISUAL_APIKEY,
});


const images_file= fs.createReadStream('./selin.jpg');
const classifier_ids = ["default"];
const threshold = 0.6;

const params = {
    images_file: images_file,
    classifier_ids: classifier_ids,
    threshold: threshold
};

visualRecognition.classify(params, function(err, response) {
    if (err)
    console.log(err);
    else
    console.log(JSON.stringify(response, null, 2))
});
