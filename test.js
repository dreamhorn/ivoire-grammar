var chai = require('chai');
var Ivoire = require("./lib/ivoire-grammar");

var should = chai.should();

describe('ivoire-grammar', function () {
  var seed = 42
  var ivoire;

  var ship_frames = {
      "{{actor}} of {{awesome}}": 3,
      "{{awesome}}'s {{actor}}": 2,
      "{{adjective}} {{awesome}}": 2,
      "{{adjective}} {{actor}}": 2,
      "{{adjective}} {{actor}} of {{awesome}}": 1,
      "{{actor}} of {{adjective}} {{awesome}}": 1
  };

  var ship_categories = {
      actor: [
          "Bringer",
          "Destroyer",
          "Conveyor",
      ],
      awesome: [
          "Death",
          "Destruction",
          "Light",
      ],
      adjective: [
          "Deadly",
          "Whispering",
          "Invincible"
      ]
  };


  beforeEach(function(){
    ivoire = new Ivoire({seed: seed});
  });

  describe('.train_grammar()', function () {
    it('should train a grammar', function () {
      var trained = Ivoire.train_grammar(ship_frames, ship_categories);
      trained.frames.should.be.an('Array').of.length(6);
      trained.weights.should.be.an('Array').of.length(6);
      trained.categories.should.be.an('Object');
      trained.categories.should.contain.keys('actor', 'awesome', 'adjective');
    });
  });

  describe('#get_grammar_generator()', function () {
    it('should return a grammar generator', function () {
      var trained = Ivoire.train_grammar(ship_frames, ship_categories);
      var generator = ivoire.get_grammar_generator(trained);
      var result = generator.generate();
      result.should.be.a('string');
    });
  });

  describe('generator.generate()', function () {
    it('should generate strings', function () {
      var trained = Ivoire.train_grammar(ship_frames, ship_categories);
      var generator = ivoire.get_grammar_generator(trained);
      generator.generate().should.equal('Invincible Light');
      generator.generate().should.equal('Invincible Destruction');
      generator.generate().should.equal('Destruction\'s Destroyer');
      generator.generate().should.equal('Light\'s Bringer');
      generator.generate().should.equal('Bringer of Whispering Destruction');
    });
  });
});
