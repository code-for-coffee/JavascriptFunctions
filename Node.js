class Node {
  constructor(attribute) {
    this._val = attribute;
    this._parent = null;
    this._children = [];
  }
  isRoot() {
    if (this._parent === true) return true;
    return false;
  }
  get children() {
    return this._children;
  }
  hasChildren() {
    return this._children.length > 0;
  }
  get value() {
    return this._val;
  }
  set value(attribute) {
    this._val = attribute;
  }
  append(child) {
    child._parent = this;
    this._children.push(child);
    return this;
  }
  toString() {
    return `Node (val: ${this._val}), children: ${this._children.length}`;
  }
}
