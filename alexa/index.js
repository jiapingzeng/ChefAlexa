'use strict';
const Alexa = require('alexa-sdk');
const request = require('sync-request')

const appId = 'a593916b'
const appKey = '5e107e6eccb15211d97ac9cc54c287de'
const appUri = 'https://api.edamam.com/search'

var getRecipe = (keywords) => {
  var res = request('GET', appUri, {
    qs: {
      app_id: appId,
      app_key: appKey,
      q: keywords,
      to: 10
    }
  })
  var body = JSON.parse(res.getBody())
  var recipes = body.hits
  return recipes
}

var getIngredients = (r) => {
  var ingredients = ""
  for (i = 0; i < 5 && i < r.ingredientLines.length; i++) {
    ingredients += r.ingredientLines[i] + ", "
  }
  return ingredients
}


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
    const responseText = 'I am sorry, but I do not understand what you are trying to say. Can you please rephrase your query?'
    this.response.speak(responseText);
    this.response.cardRenderer("Chef Alexa: I don't understand", responseText);
    this.emit(':responseReady')
  },
  'easterEggIntent': function () {
    this.response.speak("RUN <audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_alarm_02'/><audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_alarm_03'/><audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_alarm_03'/>")
    this.emit(':responseReady')
  },
  'RecipeIntent': function () {
    var FoodA = this.event.request.intent.slots.foodA.value;
    const recipe = getRecipe(FoodA)[0].recipe
    //const ingredients = getIngredients(recipe)
    this.response.speak(`Would you like to try ${recipe.label}?`)
    this.response.cardRenderer(`Chef Alexa: ${recipe.label}` , `Would you like to try ${recipe.label}?`);

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
