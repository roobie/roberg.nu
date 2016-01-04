(function main(global) {
  'use strict';
  // "imports"
  var location = global.location;
  var document = global.document;
  var URL = global.URL;
  var fetch = global.fetch;


  // "aliases"
  var qs = document.querySelector.bind(document);
  var qsa = document.querySelectorAll.bind(document);

  var slice = Function.prototype.call.bind(
    Array.prototype.slice
  );

  var each = Function.prototype.call.bind(
    Array.prototype.forEach
  );


  var empty = function (what) {
    if (what === void 0 || what.length === void 0) {
      throw TypeError('invalid argument');
    }
    return what.length === 0;
  };


  var rootHash = '#/';
  var activeClass = 'active';


  var handleNavChange = function (nodes) {
    if (empty(location.hash)) {
      location.hash = rootHash;
    }

    var getContent = function (response) {
      return response.text();
    };

    var insertContent = function (html) {
      var container = qs('#content-here');
      if (container) {
        container.innerHTML = html;
      }
    };

    each(nodes, function (node) {
      var url = new URL(node.href);
      if (url.hash === location.hash) {
        node.classList.add(activeClass);
        fetch('content/%NAME.partial.html'
              .replace('%NAME', node.dataset.name))
          .then(getContent)
          .then(insertContent);
      } else {
        node.classList.remove(activeClass);
      }
    });
  };

  var hookupNavEvents = function (nodes) {
    each(nodes, function (node) {
      node.addEventListener('click', function (event) {
      });
    });
  };

  var initialise = function () {
    var nodes = qsa('nav a');
    handleNavChange(nodes);
    global.addEventListener('hashchange', function () {

      handleNavChange(nodes);
    });
    hookupNavEvents(nodes);
  };

  document.addEventListener('DOMContentLoaded', function () {
    initialise();
  });
})(this);
