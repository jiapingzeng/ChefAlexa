const https = require('https')
const port = 3000
const server = https.createServer(requestHandler)
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
      const speechText = 'What do you want?';
  
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .withSimpleCard('WHY DID YOU WAKE ME WITHOUT TELLING ME WHAT TO DO?', speechText)
        .getResponse();
    }
  };

  server.listen(port, (err) => {
    if (err) {
      return console.log('Error: ', err)
    }
  })