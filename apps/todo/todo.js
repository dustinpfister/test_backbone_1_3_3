
var Item = Backbone.Model.extend(
 
    {
 
        // these are the default values that will
        // be augmented with the object that is passed
        // to the constructor function
        defaults : {
            title : 'unknown',
            done : false
        },
 
        // simple log method
        log : function () {
 
            console.log('title: ' + this.get('title') + '; done: ' + this.get('done'));
 
        }
 
    }
 
);
 
var blankItem = new Item();
 
blankItem.log(); // 'title: unknown; done: false
 
var it = new Item({title : 'foo'});
 
it.log(); // 'title: foo; done: false
