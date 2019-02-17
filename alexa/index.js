'use strict';
const Alexa = require('alexa-sdk');

const handlers = {
  'LaunchRequest': function () {
    const responseText = 'Hello I am Chef Alexa! Tell me what ingredients you have on hand and I will tell you what you can make with them!'
    this.response.speak(responseText);
    this.response.cardRenderer('Chef Alexa: Welcome!', responseText);
    this.emit(':responseReady')
  },
  'AMAZON.HelpIntent': function () {
    const responseText = 'Hello I am Chef Alexa! Tell me what ingredients you have on hand and I will tell you what you can make with them!'
    this.response.speak(responseText);
    this.response.cardRenderer('Chef Alexa: Welcome!', responseText);
    this.emit(':responseReady')
  },
  'AMAZON.CancelIntent': function () {
    const responseText = 'I hope you enjoyed your food! And remember that I am always available to help you with your food cooking needs!'
    this.response.speak(responseText);
    this.emit(':responseReady')
  },
  'AMAZON.StopIntent': function () {
    const responseText = 'I hope you enjoyed your food! And remember that I am always available to help you with your food cooking needs!'
    this.response.speak(responseText);
    this.emit(':responseReady')
  },
  'AMAZON.FallbackIntent': function () {
    const responseText = 'I am sorry, but I do not understand what you are trying to say. Can you please rephrase your quary?'
    this.response.speak(responseText);
    this.response.cardRenderer("Chef Alexa: I don't understand", responseText);
    this.emit(':responseReady')
  },
  'easterEggIntent': function () {
    this.response.speak("RUN <audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_alarm_02'/><audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_alarm_03'/><audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_alarm_03'/>")
    this.emit(':responseReady')
  },
  'whoIsTheChefIntent': function () {
    var responseText = 'The chef is you, Alexa, and the internet. The chef can find any recipe with any ingredients.'
    this.response.speak(responseText);
    this.response.cardRenderer('Chef Alexa: The Chef Is: ' + responseText);
    this.emit(':responseReady')
  }
};

exports.handler = function (event, context, callback) {
  const alexa = Alexa.handler(event, context, callback);
  alexa.registerHandlers(handlers);
  alexa.execute();
};
