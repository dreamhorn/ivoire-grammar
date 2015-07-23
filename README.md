ivoire-grammar
==============

Generative grammars and text expansion. A plugin for the
[Ivoire](https://www.npmjs.com/package/ivoire) random number generator
framework.


- [Installing](#installing)
- [Getting Started](#getting-started)
- [Reference](#reference)


Installing
----------

To install, use `npm`:

    npm install ivoire-grammar

Alternately, you can find the source [on Github](https://github.com/dreamhorn/ivoire-grammar).


Getting Started
---------------

`ivoire-grammar` extends the `ivoire` package. You can require it directly:

    var Ivoire = require('ivoire-grammar');

Or you can require it alongside `ivoire`:

    var Ivoire = require('ivoire');
    require('ivoire-grammar');

Either way, instantiate and start rolling!


    var ivoire = new Ivoire();

    // "frames" are weighted templates: each template gets a number of
    // "shares"; the more shares, the more likely that template will be picked.
    var ship_frames = {
      "{{actor}} of {{awesome}}": 3,  // 3 shares means three times more likely to be picked
      "{{awesome}}'s {{actor}}": 2,   // 2 shares, twice as likely
      "{{adjective}} {{awesome}}": 2,
      "{{adjective}} {{actor}}": 2,
      "{{adjective}} {{actor}} of {{awesome}}": 1, // 1 share, normal odds
      "{{actor}} of {{adjective}} {{awesome}}": 1
    };

    // "categories" are what fills the template variables in the frames above.
    // Each time the template
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
    var trained = Ivoire.train_grammar(ship_frames, ship_categories);
    var generator = ivoire.get_grammar_generator(trained);



Reference
---------

`ivoire-grammar` adds some methods to the `Ivoire` prototype object, making them
available on all `Ivoire` instances.

TODO: Add API reference

- [`#TODO()`](#TODO')—TODO

### #TODO()

#### Syntax

    ivoire.TODO(arg)

#### Usage

TODO: Describe methods

```
var ivoire = new require('ivoire-grammar');

// TODO: Give usage examples
```


Acknowledgements
----------------

String templating algorithm based on the implementation in
[Darmok](https://github.com/forana/darmok-js), and modified to interoperate
with the Ivoire framework.
