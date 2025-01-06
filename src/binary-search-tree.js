const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }
  root() {
    return this.rootNode;
  }

  add(data) {
    this.rootNode = this.addComp(this.rootNode, data);
  }

  addComp(node, data) {
    if (!node) return new Node(data);
    if (data === node.data) return node;
    if (data > node.data) node.right = this.addComp(node.right, data);
    if (data < node.data) node.left = this.addComp(node.left, data);

    return node;
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    let comp = this.rootNode;

    while (comp) {
      if (comp.data === data) return comp;

      data < comp.data ?
        comp = comp.left :
        comp = comp.right;
    }

    return null;
  }

  remove(data) {
    this.rootNode = this.removeComp(this.rootNode, data);
  }

  removeComp = (node, data) => {
    if (!node) return null;
    if (data < node.data) {
      node.left = this.removeComp(node.left, data);
    } else if (data > node.data) {
      node.right = this.removeComp(node.right, data);
    } else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      const minNode = this.findMinComp(node.right);
      node.data = minNode.data;
      node.right = this.removeComp(node.right, minNode.data);
    }
    return node;
  };


  min() {
    const minComp = this.findMinComp(this.rootNode);
    return minComp ? minComp.data : null;
  }

  findMinComp(node) {
    return node.left === null
        ? node
        : this.findMinComp(node.left);
  }

  max() {
    if (this.rootNode === null) {
      return null;
    }
    let comp = this.rootNode;
    while (comp.right !== null) {
      comp = comp.right;
    }
    return comp.data;
  }
}

module.exports = {
  BinarySearchTree
};