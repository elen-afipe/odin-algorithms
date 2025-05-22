import { Tree } from "./tree.js";
function createRandomArray(length){
    const arrayRes = [];
    for(let i = 0; i<length; i++){
        const arrayValue = Math.floor(Math.random()*100);
        arrayRes.push(arrayValue)
    }
    return arrayRes
}
function printNodeValue(node){
    console.log(node.value)
}

const arrayForTree = createRandomArray(30)
const tree = new Tree(arrayForTree)
tree.prettyPrint(tree.root)
console.log(tree.isBalanced())
tree.insert(110)
tree.insert(112)
tree.insert(113)
console.log(tree.isBalanced())
tree.rebalance();
tree.prettyPrint(tree.root)
console.log(tree.isBalanced())
console.log("level")
tree.levelOrder(printNodeValue)
console.log("in")
tree.inOrder(printNodeValue)
console.log("pre")
tree.preOrder(printNodeValue)
console.log("post")
tree.postOrder(printNodeValue)
