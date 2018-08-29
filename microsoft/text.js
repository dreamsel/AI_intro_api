'use strict';

require('dotenv').load();
const request = require('request');
const fs = require('fs');

// Replace <Subscription Key> with your valid subscription key.
const subscriptionKey = process.env.VISION_KEY;

// You must use the same location in your REST call as you used to get your
// subscription keys. For example, if you got your subscription keys from
// westus, replace "westcentralus" in the URL below with "westus".
const uriBase =
    'https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/ocr';
//    'https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/recognizeText?mode=Printed';


const file = fs.readFileSync('poster.png');
// Request parameters.
const params = {
    'language': 'unk',
    'detectOrientation': 'true',
};
const options = {
    uri: uriBase,
	qs: params,
    body: file,
    headers: {
		'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
};

request.post(options, (error, response, body) => {
  if (error) {
    console.log('Error: ', error);
    return;
  }
  
  if(body) {
	  let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
	  console.log('JSON Response\n');
	  console.log(jsonResponse);
  }
});