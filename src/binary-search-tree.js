const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  _tree = null;

  root() {
    return this._tree;
  }

  add(data) {
    this._tree = addNode(this._tree, data)
    function addNode(node, data){
      if (!node){
        return new Node(data);
      }

      if (node.data === data){
        return node;
      }

      if (data < node.data){
        node.left = addNode(node.left, data);
      }else{
        node.right = addNode(node.right, data);
      }
      return node;
    }
  }

  has(data) {
    return !!this.find(data);
  }

  find(data, tree = this._tree) {
    return data == tree.data
      ? tree
      : tree[data > tree.data ? 'right' : 'left'] == null
      ? null
      : this.find(data, tree[data > tree.data ? 'right' : 'left']);
  }



  remove(data) {
    this._tree = deleteNode(this._tree, data);

    function deleteNode(node, data){
      if (!node){
        return null;
      }

      if (data < node.data){
        node.left = deleteNode(node.left, data);
        return node;
      }
      if (data > node.data){
        node.right = deleteNode(node.right, data);
        return node;
      }else{
         if (!node.right && !node.left){
           return null;
         }
         if (!node.left){
           node = node.right;
           return node;
         }
         if (!node.right){
           node = node.left;
           return node;
         }

         let rightMin = node.right;
         while (rightMin.left){
           rightMin = rightMin.left;
         }
         node.data = rightMin.data;
         node.right = deleteNode(node.right, rightMin.data);
         return node;
      }
    }
  }

  min() {
    if (!this._tree){
      return;
    }

    let node = this._tree;
    while (node.left){
      node = node.left;
    }

    return node.data;
  }

  max() {
    if (!this._tree){
      return;
    }

    let node = this._tree;
    while (node.right){
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};