require('dotenv').load();

const speech = require('@google-cloud/speech');

const fs = require('fs');


async function main() {
  try {

    // Creates a client
    const client = new speech.SpeechClient();
    const filename = './podcast.wav';
    const sampleRateHertz = 16000;
    const languageCode = 'ru-RU';

    const request = {
      config: {
        //encoding: encoding,
        sampleRateHertz: sampleRateHertz,
        languageCode: languageCode,
      },
      audio: {
        content: fs.readFileSync(filename).toString('base64'),
      }
    };

    // Detects speech in the audio file
    const data = await client.recognize(request);
    const response = data[0];
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    console.log(`Transcription: `, transcription);
  }
  catch(err) {
    console.error('ERROR:', err);
  };
}


main();
