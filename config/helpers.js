'use strict';

var _ = require('lodash'),
    sails = require('sails');

if (process.env.NODE_ENV != undefined){
  var Handlebars = require('sails/node_modules/express-handlebars/node_modules/handlebars');
} else {
  var Handlebars = require('handlebars');
}

// format date by a given format.
// usage : {{#date format="YYYY" }} {{date}} {{/date}} => return Year
Handlebars.registerHelper('date', function(data, options) {
  options = options || {};
  var result = '', f;
  if (moment) {
    f = options.hash.format || 'MMM Do, YYYY';
    if (typeof data === 'number') {
      result = moment(data).format(f);
    } else {
      var date = new Date(data || new Date());
      result = moment(date).format(f);
    }
  } else {
    result = data;   //  moment plugin not available. return data as is.
  }
  return result;
});

//Count function
Handlebars.registerHelper('count', function (value) {
  return value.constructor === Array ? value.length : 0;
});
//Test function
Handlebars.registerHelper('is', function (value, test, options) {
  if (value === test) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

//Stringify a json value
//usage: {{json value}}
Handlebars.registerHelper('json', function (value) {
  return JSON.stringify(value);
});

//Mathematics operation
//usage: {{math x '+' y}}
Handlebars.registerHelper('math', function (lvalue, operator, rvalue) {
  lvalue = parseFloat(lvalue);
  rvalue = parseFloat(rvalue);

  return {
    '+': lvalue + rvalue,
    '-': lvalue - rvalue,
    '*': lvalue * rvalue,
    '/': lvalue / rvalue,
    '%': lvalue % rvalue
  }[operator];
});

//compare helper
//usage: {{#compare 3 ">=" 1}}Yes{{else}}No{{/compare}}
Handlebars.registerHelper('compare', function (lvalue, operator, rvalue, options) {

  if (arguments.length < 3)
    throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

  var operator = operator || '==';

  var operators = {
    '==':   function(l,r) { return l == r; },
    '===':  function(l,r) { return l === r; },
    '!=':   function(l,r) { return l != r; },
    '<':    function(l,r) { return l < r; },
    '>':    function(l,r) { return l > r; },
    '<=':   function(l,r) { return l <= r; },
    '>=':   function(l,r) { return l >= r; },
    'typeof': function(l,r) { return typeof l == r; }
  };

  if (!operators[operator])
    throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);

  var result = operators[operator](lvalue,rvalue);

  if( result ) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }

});

//debug
Handlebars.registerHelper('debug', function (optionalValue) {
  console.log('Value');
  console.log('====================');
  console.log(optionalValue);
});
