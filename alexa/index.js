
'use strict';
const Alexa = require('alexa-sdk');

const handlers = {
  'LaunchRequest': function () {
    const responseText = 'Hello I am Chef Alexa! Tell me what ingredients you have on hand and I will tell you what you can make with them!'
    this.response.speak(responseText);
    this.response.cardRenderer('Chef Alexa: Welcome!', responseText);
    this.emit(':responseReady')
  },
  'GetNewFactIntent': function () {
    this.response.cardRenderer('SKILL_NAME', 'randomFact');
    this.response.speak('speechOutput');
    this.emit(':responseReady');
  },
  'AMAZON.HelpIntent': function () {
    this.response.speak('speechOutput').listen('reprompt');
    this.emit(':responseReady');
  },
  'AMAZON.CancelIntent': function () {
    this.response.speak('STOP_MESSAGE');
    this.emit(':responseReady');
  },
  'AMAZON.StopIntent': function () {
    this.response.speak('STOP_MESSAGE');
    this.emit(':responseReady');
  },
};

exports.handler = function (event, context, callback) {
  const alexa = Alexa.handler(event, context, callback);
  alexa.registerHandlers(handlers);
  alexa.execute();
};
