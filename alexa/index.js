const Alexa = require('ask-sdk-core')

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'Hello, I am Chef Alexa. Tell me what ingredients you have and I will tell you what you can make with them. ';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hello ', speechText)
      .getResponse();
  }
};

const HelloIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'HelloIntent';
  },
  handle(handlerInput) {
    const speechText = 'Hello are you ready to cook? Tell me what ingredients you have on hand!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello ', speechText)
      .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'As a Chef you can tell me what ingredients you have on hand and I will tell you what you can make!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('As a Chef you can tell me what ingredients you have on hand and I will tell you what you can make!', speechText)
      .getResponse();
  }
};


const FallbackIntentHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Fallback')
      .reprompt('Fallback')
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NavigateHomeIntent');
  },
  handle(handlerInput) {
    const speechText = 'Hope you enjoyed you meal and if you did not I am always here.';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hope you enjoyed you meal and if you did not I am always here.', speechText)
      .getResponse();
  }
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    //any cleanup logic goes here
    return handlerInput.responseBuilder.getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

let skill;

exports.handler = async function (event, context) {
  console.log(`REQUEST++++${JSON.stringify(event)}`);
  if (!skill) {
    skill = Alexa.SkillBuilders.custom()
      .addRequestHandlers(
        LaunchRequestHandler,
        HelloIntentHandler,
        HelpIntentHandler,
        FallbackIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
      )
      .addErrorHandlers(ErrorHandler)
      .create();
  }

  const response = await skill.invoke(event, context);
  console.log(`RESPONSE++++${JSON.stringify(response)}`);

  return response;
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    HelloIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler)
  .addErrorHandlers(ErrorHandler)
  .lambda();