
/*
var Item = Backbone.Model.extend({

// some defaults
defaults : {
title : 'unknown',
done : false,
time : new Date(0)
}

});

var blank = new Item();

console.log(blank.get('title')); // 'unknown'

var book = new Item({title:'A tree grows in brooklyn'});

console.log(book.get('title')); // 'A tree grows in brooklyn'
 */

var Item = Backbone.Model.extend(
 
    {
 
        // some defaults set with a function
        defaults : function (obj) {
 
            // return a new object
            return {
 
                title : 'unknown',
                done : false,
                time : new Date() // set the current date
 
            };
 
        }
 
    }
 
);

var now = new Item();

console.log(now.get('time')); // the time now

var func = function(){

    var later = new Item();

    console.log(later.get('time')); // a time three seconds later

};

setTimeout(func,3000);

/*


var Item = Backbone.Model.extend({

// these are the default values that will
// be augmented with the object that is passed
// to the constructor function
defaults : {
title : 'unknown',
done : false,
time : new Date(0)
},

// making a custom constructor
constructor : function () {

// Go ahead and apply what there is like normal
Backbone.Model.apply(this, arguments);

// but set the time to now
this.set('time', new Date());

},

// simple log method
log : function () {

console.log('title: ' + this.get('title') + '; done: ' + this.get('done'));

}

});

var blankItem = new Item();

console.log(blankItem.get('time')); // the time it was created

var later = function () {

var it = new Item({
title : 'foo'
});

console.log(it.get('time')); // the time it was created

};

setTimeout(later, 3000);

*/
