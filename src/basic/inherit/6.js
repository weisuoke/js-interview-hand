function object(o) {
  function F() { }
  F.prototype = o;
  return new F();
}

function prototype(child, parent) {
  var prototype = object(parent.prototype)
  prototype.constructor = child;
  child.prototype = prototype;
}

function Parent() { }

function Child() { }

prototype(Child, Parent);