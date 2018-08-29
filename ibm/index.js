require('dotenv').load();

var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var toneAnalyzer = new ToneAnalyzerV3({
    version: '2017-09-21',
    username: process.env.TONE_USERNAME,
    password: process.env.TONE_PASSWORD,
    url: 'https://gateway.watsonplatform.net/tone-analyzer/api'
  });

function analyzeTone()
{
var text = 'Team, I know that times are tough! Product '
  + 'sales have been disappointing for the past three '
  + 'quarters. We have a competitive product, but we '
  + 'need to do a better job of selling it!'

var toneParams = {
  'tone_input': { 'text': text },
  'content_type': 'application/json'
};

toneAnalyzer.tone(toneParams, function (error, toneAnalysis) {
  if (error) {
    console.log(error);
  } else {
    console.log(JSON.stringify(toneAnalysis, null, 2));
  }
});
}

function analyzeEngagements(){
var utterances = [
  {
    text: "Hello, I'm having a problem with your product.",
    user: "customer"
  },
  {
    text: "OK, let me know what's going on, please.",
    user: "agent"
  },
  {
    text: "Well, nothing is working :(",
    user: "customer"
  },
  {
    text: "Sorry to hear that.",
    user: "agent"
  }
]

var toneChatParams = {
  utterances: utterances
};

toneAnalyzer.toneChat(toneChatParams, function (error, utteranceAnalyses) {
  if (error) {
    console.log(error);
  } else {
    console.log(JSON.stringify(utteranceAnalyses, null, 2));
  }
});
}

//analyzeTone();
analyzeEngagements();
