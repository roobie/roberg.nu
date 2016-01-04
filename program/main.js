(function main(global) {
  'use strict';
  // "imports"
  var location = global.location;
  var document = global.document;
  var URL = global.URL;
  var fetch = global.fetch;

  var moment = global.moment;


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

  var modules = {
    timeAgo: function (elem, data) {
      var date = new Date(data);
      var mom = moment(date);
      elem.innerHTML = mom.fromNow();
    }
  };

  var hook = function (element) {
    var keys = Object.keys(element.dataset);
    each(keys, function (k) {
      var module = modules[k];
      var data = element.dataset[k];
      if (module) {
        module(element, data);
      }
    });
  };

  var handleNavChange = function (nodes, container) {
    if (empty(location.hash)) {
      location.hash = rootHash;
    }

    var getContent = function (response) {
      return response.text();
    };

    var insertContent = function (html) {
      container.innerHTML = html;
      var newElements = qsa('#content-here *');
      each(newElements, function (elem) {
        if (Object.keys(elem.dataset).length) {
          hook(elem);
        }
      });
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
    var contentContainer = qs('#content-here');
    handleNavChange(nodes, contentContainer);
    global.addEventListener('hashchange', function () {
      handleNavChange(nodes, contentContainer);
    });
    hookupNavEvents(nodes);
  };

  document.addEventListener('DOMContentLoaded', function () {
    initialise();
  });
})(this);
