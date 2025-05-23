const chessBoardLength = 8;

function createAdjList(dimension = chessBoardLength){
    let AdjList = {};
    for(let i=0; i < dimension; i++){
        for(let j = 0; j< dimension; j++){
            AdjList[`[${i}, ${j}]`] = [];
        }
    }
    return AdjList;
}

function isMovePossible(move){
     // check if move is outside board or knight can move
    if(move[0] < 0 || move[0] > (chessBoardLength-1) || move[1] < 0 || move[1] > (chessBoardLength-1)) return false
    else return true
}

function upRight(from){
return [from[0]+1, from[1]+2]
}
function upLeft(from){
    return [from[0]-1, from[1]+2]
}
function RightUp(from){
    return [from[0]+2, from[1]+1]
}
function RightDown(from){
    return [from[0]+2, from[1]-1]
}
function leftUp(from){
    return [from[0]-2, from[1]+1]
}
function leftDown(from){
    return [from[0]-2, from[1]-1]
}
function downRight(from){
    return [from[0]+1, from[1]-2]
}
function downLeft(from){
    return [from[0]-1, from[1]-2]
}

const moveFunctions = [upRight, upLeft, RightUp, RightDown, leftUp, leftDown, downRight, downLeft];

function makeMove(from, moveFunction){
 const move = moveFunction(from);
 const moveIsPossible = isMovePossible(move);
 if(moveIsPossible) return move
 else return null
}


export function knightMoves(from, to){
// process errors
if(!Array.isArray(from) || !Array.isArray(to)) throw new Error("Coordinates for a move should be inside of array");
if(typeof from[0] !== 'number' || typeof from[1] !== 'number' || typeof to[0] !== 'number' || typeof to[1] !== 'number') throw new Error("Coordinates for a move should be numbers");
if(from[0] < 0 || from[0] > (chessBoardLength-1) || from[1] < 0 || from[1] > (chessBoardLength-1) || to[0] <0 || to[1] > (chessBoardLength-1) ||  to[1] < 0 || to[1] > (chessBoardLength-1) ) throw new Error("Knight cannot move outside the border");

const AdjList = createAdjList();
let queue = [];
let path = [];
queue.push(from);
let moveCount = 0;
while(queue.length > 0){
    let moveFrom = queue.shift();
    // add move to path
    path.push(moveFrom)
    // check possible paths
    let moveResults = moveFunctions.map(moveFunction => makeMove(moveFrom, moveFunction)).filter(result => result !== null)
    // if no paths were discovered for that node, add them to AdjList
    if(AdjList[`[${moveFrom[0]}, ${moveFrom[1]}]`].length === 0) AdjList[`[${moveFrom[0]}, ${moveFrom[1]}]`] = moveResults
    
    let destinationReached = false;
    // check if destination is reached
    moveResults.forEach(result => {
        if(result.toString() === to.toString()) {
            destinationReached = true;
            path.push(result)
        }
    })
    if(destinationReached){
        const pathRes = [];
        // add two last nodes to the path - destination and the node it came from
        pathRes.push(path[path.length-2])
        pathRes.push(path[path.length-1])
        // exclude destination from path
        path.pop();
        // from the node that lead to destination check path in reverse order using AdjList
        // (find a path from destination to origin, knowing the edges between them)
        while(path.length > 1){
            const length = path.length;
            const lastNode = path[length-1]
            const previousNode = path[length-2]
            const previousNodeEdges = AdjList[`[${previousNode[0]}, ${previousNode[1]}]`]
            let nodeStays = false;
            // check if the last node in the path is inside previous path node edgelist 
            previousNodeEdges.forEach(node => {
                if(node.toString() === lastNode.toString()) {
                    nodeStays = true;
                }
                })
            // if last node was reached from previous, add it to result path
            if(nodeStays) {
                pathRes.unshift(previousNode)
                path.pop();
            // if not, remove previous node 
            } else{
                path.splice(-2, 1)
            }
            
        }
        moveCount = pathRes.length-1
        if (moveCount === 1) console.log(`Congrats! You made it in ${moveCount} move! Here's your path:`)
        else console.log(`Congrats! You made it in ${moveCount} moves! Here's your path:`)
        pathRes.forEach(res => console.log(res))
        break
    }

    // if destination is not in results - continue search
    // check presence of each result in Adjlist - if its paths are discovered do nothing, if not - push result to the queue so its paths will be discovered 
    moveResults.forEach(result => {
        if(AdjList[`[${result[0]}, ${result[1]}]`].length === 0){
            queue.push(result)
        }
    })
    
}
}


