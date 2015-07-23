"use strict"
Ivoire = require('ivoire-weighted-choice')
Handlebars = require('handlebars')
_ = require('lodash')



Ivoire.train_grammar = (frames_obj, categories) ->
    Ivoire.assert(_.keys(frames_obj).length > 0, "Must give at least one frame")
    weights = []
    frames = []
    _.each(frames_obj, (weight, frame) ->
      weights.push(weight)
      frames.push(Handlebars.compile(frame))
    )

    compiled_categories = {}
    _.each(categories, (choices, category) ->
      compiled_categories[category] = _.map(choices, (choice) ->
        return Handlebars.compile(choice)
      )
    )

    result =
      frames: frames
      weights: weights
      categories: compiled_categories

    return result


Ivoire.prototype.get_grammar_generator = (training_data) ->
  return new GrammarGenerator(this, training_data)


class GrammarGenerator
  constructor: (@ivoire, {frames: @frames, weights: @weights, categories: @categories}) ->

  generate: () ->
    frame = @ivoire.weighted_choice(@frames, @weights)
    context = {}
    _.each @categories, (word_list, category) =>
      context[category] = @ivoire.pick(word_list)



    return frame(context)

module.exports = Ivoire
