require('dotenv').load();

const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
const fs = require('fs');

const personalityInsights = new PersonalityInsightsV3({
    version: '2017-10-13',
    username: process.env.PERSONALITY_USERNAME,
    password: process.env.PERSONALITY_PASSWORD,
    url: 'https://gateway.watsonplatform.net/personality-insights/api'
  });


const profileParams = {
  // Get the content from the JSON file.
  content: require('./profile.json'),
  'content_type': 'application/json',
  'consumption_preferences': true,
  'raw_scores': true
};

personalityInsights.profile(profileParams, function(error, profile) {
  if (error) {
    console.log(error);
  } else {
    console.log('PROFILE 1');
    console.log(JSON.stringify(profile, null, 2));
  }
});

const profile2Params = {
  // Get the content from the JSON file.
  content: fs.readFileSync('./text.txt'),
  'content_type': 'text/plain',
  'consumption_preferences': true,
  'raw_scores': true
};

personalityInsights.profile(profile2Params, function(error, profile) {
  if (error) {
    console.log(error);
  } else {
    console.log('PROFILE2');
    console.log(JSON.stringify(profile, null, 2));
  }
});
