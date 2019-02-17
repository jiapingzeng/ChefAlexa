'use strict';
const Alexa = require('alexa-sdk');
const request = require('sync-request')

const appUri = 'https://chefalexa.herokuapp.com/recipe'

var getRecipe = (keywords) => {
  var res = request('GET', appUri, {
    qs: {
      ingredients: keywords,
    }
  })
  var recipes = JSON.parse(res.getBody())
  return recipes
}

const handlers = {
  'LaunchRequest': function () {
    const responseText = 'Hello I am Chef Alexa! Tell me what ingredients you have on hand and I will tell you what you can make with them!'
    this.response.speak(responseText);
    this.emit(':responseReady')
  },
  'AMAZON.HelpIntent': function () {
    const responseText = 'Hello I am Chef Alexa! Tell me what ingredients you have on hand and I will tell you what you can make with them!'
    this.response.speak(responseText);
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
  'RecipeIntent': function () {
    var FoodA = this.event.request.intent.slots.foodA.value;
    try {
      const recipe = getRecipe(FoodA)
      var ingredients = recipe.ingredientLines[0] + ', ' + recipe.ingredientLines[1]
      this.response.speak(`Would you like to try ${recipe.label}? It requires ${ingredients} and more. For more information on this recipe and others checkout the Chef Alexa webapp on your phone.`)
      this.response.cardRenderer(`Chef Alexa: ${recipe.label}`, `${recipe.label}`);
    } catch (error) {
      this.response.speak(`I am sorry but no recipes with ${FoodA} were found`)
    }
    this.emit(':responseReady')
  },
  'easterEggIntent': function () {
    this.response.speak(`<prosody volume="x-loud">RUN <audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_alarm_02'/><audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_alarm_03'/><audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_alarm_03'/></prosody>`)
    this.emit(':responseReady')
  },
  'AMAZON.FallbackIntent': function () {
    const responseText = 'I am sorry, but I do not understand what you are trying to say. Can you please rephrase your query?'
    this.response.speak(responseText);
    this.emit(':responseReady')
  },
  'whoIsTheChefIntent': function () {
    var responseText = 'The chef is you, Alexa, and the internet. The chef can find any recipe with any ingredients.'
    this.response.speak(responseText);
    this.emit(':responseReady')
  }
};

exports.handler = function (event, context, callback) {
  const alexa = Alexa.handler(event, context, callback);
  alexa.registerHandlers(handlers);
  alexa.execute();
};
