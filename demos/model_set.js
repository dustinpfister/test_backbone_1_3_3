
var Item = Backbone.Model.extend(
        {

        // some defaults set with a function
        defaults : {

            foo : 'notbar',
            anwser : 10

        }

    });

// making a new instance of the Model
var i = new Item();

i.on('change:anwser', function () {

    console.log('a new anwser!');

});

// you can not get a state attribute this way
console.log(i.foo); // undefined

// it's in the attributes object, so you can get
// it this way.
console.log(i.attributes.foo); // 'notbar'

// or user get
console.log(i.get('foo')); // 'notbar'

// To set a state value do not just
// set the value via the attributes array
// use set
i.set('foo', 'bar');

i.attributes.anwser = 43; // no event fires
i.set('anwser', 42); // the change event fires

console.log(i.get('foo')); // 'bar'
console.log(i.get('anwser')); // 42
