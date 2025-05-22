import {Node} from "./node.js"
export class Tree {
    constructor (array){
        const sortedArray = this.sortArrayRemoveDuplicates(array);
        this.root = this.buildTree(sortedArray)
    }
    
    sortArrayRemoveDuplicates(array){
        const arraySorted = [...new Set(array)].sort((a, b) => a - b);
        return arraySorted
    }
    
    buildTree(arraySorted, l=0, h=(arraySorted.length-1)){
        if(arraySorted.length === 0) return null;
        if (l > h) return null;
        if(l===h) return new Node(arraySorted[l])
        const mid = Math.floor((l+h)/2)
        const root = new Node(arraySorted[mid])
        root.left = this.buildTree(arraySorted, l, mid-1)
        root.right = this.buildTree(arraySorted, mid+1, h)
        return root
    }

    insert(value){
    if (this.find(value) === null){
        let parentNode;
        let currentNode = this.root
        while(currentNode !== null){
            parentNode = currentNode
            if(value < currentNode.value) {
               currentNode = currentNode.left;
            } else currentNode = currentNode.right;
            }
        if (value < parentNode.value) parentNode.left = new Node(value);
        else parentNode.right = new Node(value);
    }
    return 
    }

    delete(value){
      if (this.find(value) === null) return
      // get node to delete and its parent
      let parentNode;
      let currentNode = this.root
      // delete root
      if(currentNode.value === value && currentNode.right === null && currentNode.left === null) {
        this.root = null
        return
      }
      // delete root with one child
      if(currentNode.value === value && (currentNode.right === null || currentNode.left === null)){
        if (currentNode.right === null) {
          currentNode.value = currentNode.left.value;
        } else{
          currentNode.value = currentNode.right.value;
        }
        this.root.right = null;
        this.root.left = null;
        return
      }
        while(currentNode.value !== value){
            parentNode = currentNode
            if(value < currentNode.value) {
               currentNode = currentNode.left;
            } else currentNode = currentNode.right;
            }
        // delete a leaf
        if(currentNode.right === null && currentNode.left === null){
          if(currentNode.value > parentNode.value) parentNode.right = null
          else parentNode.left = null
        }
        // delete a node with one child
        else if(currentNode.right === null || currentNode.left === null){
          if(currentNode.value > parentNode.value && currentNode.left !== null) parentNode.right = currentNode.left
          else if(currentNode.value > parentNode.value && currentNode.right !== null) parentNode.right = currentNode.right
          else if(currentNode.value < parentNode.value && currentNode.left !== null) parentNode.left = currentNode.left
          else parentNode.left = currentNode.right
        }
        // delete a node with two children
        else if (currentNode.right !== null && currentNode.left !== null){
          let replacingNode = currentNode.right;
          // go right, right node does not have left child
          if(replacingNode.left === null) {
            currentNode.value = replacingNode.value
            currentNode.right = replacingNode.right;
          // go right and find lowest left child
          } else {
          let replacingNodeParent = null;
          while(replacingNode.left !== null){
            replacingNodeParent = replacingNode;
            replacingNode = replacingNode.left;
          }
          currentNode.value = replacingNode.value
          replacingNodeParent.left = replacingNode.right;
        }
        }
    }

    find(value){
    if(this.root === null) return null
    if (this.root.value === value) return this.root
    let currentNode = this.root
    while(currentNode !== null){
            if(currentNode.value === value) return currentNode
            if(currentNode.value > value) currentNode = currentNode.left;
            else currentNode = currentNode.right;
            }
    return null
  }

  levelOrder(callback){
    if (typeof callback !== "function") {
      throw new Error("Parameter is not a function!");
    }
    if (this.root === null) return;
    let currentNode = this.root;
    const queue = [];
    queue.push(currentNode);
    while (queue[0] !== undefined) {
      callback(currentNode);
      queue.shift(currentNode);
      if (currentNode.left !== null) queue.push(currentNode.left);
      if (currentNode.right !== null) queue.push(currentNode.right);
      currentNode = queue[0];
    }
    return;
  }

  inOrder(callback){
    if (typeof callback !== "function") {
      throw new Error("Parameter is not a function!");
    }
    if (this.root === null) return;
    let currentNode = this.root;
    const stack = [];
    while (currentNode !== null || stack.length > 0){
      while(currentNode !== null) {
        stack.unshift(currentNode);
        currentNode = currentNode.left
      }
      currentNode = stack.shift();
      callback(currentNode)
      currentNode = currentNode.right
   }
    return;
  }

  preOrder(callback){
     if (typeof callback !== "function") {
      throw new Error("Parameter is not a function!");
    }
    if (this.root === null) return;
    let currentNode = this.root;
    const stack = [];
    stack.push(currentNode);
    while (stack[0] !== undefined) {
      callback(currentNode);
      stack.shift(currentNode);
      if (currentNode.right !== null) stack.unshift(currentNode.right);
      if (currentNode.left !== null) stack.unshift(currentNode.left);
      currentNode = stack[0];
    }
    return;
  }

  postOrder(callback) {
  if (typeof callback !== "function") {
    throw new Error("Parameter is not a function!");
  }
  if (this.root === null) return;
  const stack = [];
  let currentNode = this.root;
  let lastVisited = null;
  while (stack.length > 0 || currentNode !== null) {
    // go left and find lowest child
    if (currentNode !== null) {
      stack.unshift(currentNode);
      currentNode = currentNode.left;
    } else {
      const peekNode = stack[0]
      // if right child exists and was not visited, go right
      if (peekNode.right !== null && peekNode.right !== lastVisited) {
        currentNode = peekNode.right;
      // process current node 
      } else {
        callback(peekNode);
        lastVisited = peekNode;
        stack.shift();
      }
    }
  }
  return
}

levelOrderRec(callback, currentNode = this.root, level = 0, res = []){
   if (typeof callback !== "function") {
    throw new Error("Parameter is not a function!");
  }
  if(currentNode === null) return;
  if (res.length === level) res.push([]);
  res[level].push(currentNode);
  this.levelOrderRec(callback, currentNode.left, level + 1, res);
  this.levelOrderRec(callback, currentNode.right, level + 1, res);
  if (level === 0) {
      for (const levelNodes of res) {
        for (const node of levelNodes) {
          callback(node);
        }
      }
    }
    
    return res;
}

inOrderRec(callback, currentNode = this.root){
  if (typeof callback !== "function") {
    throw new Error("Parameter is not a function!");
  }
  if(currentNode === null) return;

  this.inOrderRec(callback, currentNode.left);
  callback(currentNode)
  this.inOrderRec(callback, currentNode.right)
}

preOrderRec(callback, currentNode = this.root){
  if (typeof callback !== "function") {
    throw new Error("Parameter is not a function!");
  }
  if(currentNode === null) return;
  callback(currentNode)
  this.preOrderRec(callback, currentNode.left);
  this.preOrderRec(callback, currentNode.right)
}

postOrderRec(callback, currentNode = this.root){
  if (typeof callback !== "function") {
    throw new Error("Parameter is not a function!");
  }
  if(currentNode === null) return;
  this.postOrderRec(callback, currentNode.left);
  this.postOrderRec(callback, currentNode.right)
  callback(currentNode)
}

height(value) {
  const targetNode = this.find(value)
  if (targetNode === null) return null
  function getNodeHeight(node) {
    if (node === null) return -1;
    const leftHeight = getNodeHeight(node.left);
    const rightHeight = getNodeHeight(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }
  return getNodeHeight(targetNode);
}


depth(value){
  if (this.root === null) return null
  let currentNode = this.root
  let nodeDepth = 0
  while(currentNode !== null){
  if(currentNode.value === value) return nodeDepth
  if (value < currentNode.value) currentNode = currentNode.left
  else currentNode = currentNode.right
  nodeDepth++
  }
  if(nodeDepth !== 0) return nodeDepth
  else return null
}
depthRec(value, currentNode = this.root, nodeDepth = 0){
  if (this.root === null) return null
  if(currentNode === null) return null
  if (currentNode.value === value) return nodeDepth

  if (value < currentNode.value) return this.depth(value, currentNode.left, nodeDepth+1)
  else return this.depth(value, currentNode.right, nodeDepth+1)
}

isBalanced(currentNode = this.root){
if(currentNode === null) return null
let result = 1 
const checkHeightBalance = (node) => {
  const rightNode = node.right
  const leftNode = node.left
  let rightHeight
  let leftHeight
  if (rightNode !== null) {rightHeight = this.height(node.right.value)}
  if(leftNode !== null) {leftHeight = this.height(node.left.value)}
  if(leftNode !== undefined && rightNode !== undefined){
  if(Math.abs(rightHeight - leftHeight) > 1) result = result * false
  else result = result * true
  }
}
this.levelOrder(checkHeightBalance)
if(result === 1) return true
return false
}

rebalance(){
  const treeIsBalanced = this.isBalanced();
  if(!treeIsBalanced){
    const newTreeSequence = [];
    function treeToArray(node, array = newTreeSequence){
      array.push(node.value)
    }
    this.levelOrder(treeToArray)
    const newSortedArray = this.sortArrayRemoveDuplicates(newTreeSequence);
    this.root = this.buildTree(newSortedArray)
  }
}

   prettyPrint(node, prefix = "", isLeft = true){
   if (node === null) {
     return;
   }
   if (node.right !== null) {
     this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
   }
   console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
   if (node.left !== null) {
     this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
   }
   return
 };

}