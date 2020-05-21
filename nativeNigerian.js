;(function(global, $){

    //'new' an object.
    var Greetr = function(firstName, lastName, language){
        return new Greetr.init(firstName, lastName, language);
    }

    //hidden within the scope of the IIFE and never directly accessible.
    var supportedLang = ['en','pg','ib','yr','ha','ed','it','ur','ij','np','fl','ig','jk','tv'];

    //Informal Greetings
    var greetings = {
        'en': 'Hello',
        'pg': 'I Greet You',
        'ib': 'Nno',
        'yr': 'Ekabo',
        'ha': 'Sannu de zuwa',
        'ed': 'Ob okhian',
        'it': 'Erubo',
        'ur': 'Migwuo',
        'ij': 'Tobaroa',
        'np': 'Yegi',
        'fl': 'Jabbama',
        'ig': 'A lo le',
        'jk': 'Ten',
        'tv': 'Msugh'
    };

    //Formal greetings
    var formalgreetings = {
        'en': 'Greetings',
        'pg': 'I Greet You',
        'ib': 'Nno',
        'yr': 'Ekabo',
        'ha': 'Sannu de zuwa',
        'ed': 'Ob okhian',
        'it': 'Erubo',
        'ur': 'Migwuo',
        'ij': 'Tobaroa',
        'np': 'Yegi',
        'fl': 'Jabbama',
        'ig': 'A lo le',
        'jk': 'Ten',
        'tv': 'Msugh'
    };

    //logger message
    var logMessages = {
        'en': 'Logged in',
        'pg': 'You don enter',
        'ib': 'E ba go',
        'yr': 'E ti wole',
        'ha': 'logged in',
        'ed': 'Logged in',
        'it': 'Logged in',
        'ur': 'Logged in',
        'ij': 'Logged in',
        'np': 'Logged in',
        'fl': 'Logged in',
        'ig': 'Logged in',
        'jk': 'Logged in',
        'tv': 'Logged in'
    };

    //Prototype holds methods to save memory space.
    Greetr.prototype = {
        fullName: function() {

            //this refers to the calling method at execution time.
            return this.firstName + ' ' + this.lastName;
        },

        validate: function(){

            //check that its a valiod language.
            //references the externally inaccessible 'supportLang' within the closure.
           if(supportedLang.indexOf(this.language) === -1){
               throw "Invalid Language";
           }
        },

        //Retrieve messages from object by referring to properties using[] syntax.
        greeting: function(){
            return greetings[this.language] + ' ' + this.firstName + " ! ";
        },

        formalGreeting: function(){
            return formalgreetings[this.language] + ' , ' + this.fullName();
        },

        //chainable methods return their own containing objects
        greet: function(formal){
            var msg;
            //if undefined or null it will be coerced to false.
            if(formal){
                msg = this.formalGreeting();
            }
            else{
                msg = this.greeting();
            }
            if(console){
                console.log(msg);
            }
            //this referes to the calling object at execution time
            //makes the method chainable
            return this;
        },

        log: function(){
            if(console){
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }

            //make chainable
            return this;
        },

        setLang: function(lang){

            //set language.
            this.language = lang;

            //validate.
            this.validate();

            //make chainable
            return this;
        },

        HTMLGreeting : function(selctor, formal){
            if(!$){
                throw 'jQuery not loaded';
            }

            if(!selector){
                throw 'Missing jQuery selector';
            }

            //determines the message.
            var msg;
            if(formal){
                msg = this.formalGreeting();
            }
            else{
                this.greeting();
            }

            //injects the message in the chosen place in the DOM
            $(selector).html(msg);

            //make chainable
            return this;
        }
    };

    //the actual object is created here, allowing us to "new" an object without call the "new".
    Greetr.init = function(firstName, lastName, language){
        var self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';

        self.validate();
    }
    
    //trick borrowed from jQuery so we dont have to use the "new" keyword.
    Greetr.init.prototype = Greetr.prototype;

    //Attach our Greetr to the global object, and provide a shorthand 'N$'
    //for ease to our poor fingers.
    global.Greetr = global.N$ = Greetr;

}(window, jQuery));