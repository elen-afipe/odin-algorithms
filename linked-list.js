class LinkedList {
    constructor(){
        this.head = new Node();
    }

    append(value){
        if(this.head.value === null) this.head = new Node(value)
        else { 
            let currentNode = this.head;
            while (currentNode.next!== null){
                    currentNode=currentNode.next;
                }
            currentNode.next =  new Node(value);
        }
        return
    }

   prepend(value){
       if(this.head.value === null) this.head = new Node(value)
       else this.head = new Node(value, this.head)
   }

    size(){
        let currentNode = this.head;
        let length=0;
        while (currentNode.next!== null){
            currentNode = currentNode.next;
            length++;
        }
        return length+1;
    } 

    getHead(){
        return this.head
    }

    tail(){
        let currentNode = this.head;
        while (currentNode.next!== null){
            currentNode = currentNode.next;
        }
        return currentNode;
    }
    
    at(index){
        const length = this.size();
        let nodeAt = this.head;
        let i = 1;
        if (index <=0) throw new RangeError('Index should be a positive number starting from one')
        if (index === 1) return nodeAt;
        if(index > length) throw new RangeError(`No node at ${index}`)
        else{
        while(i< index){
            nodeAt = nodeAt.next;
            i++
        }
    }
        return nodeAt;
    }

    pop(){
        const length = this.size();
        let nodePosition = 1;
        if(length === 1) {
            this.head = new Node(null, null)
        }
        else {
        let currentNode = this.head;
        while (nodePosition<(length-1)){
            currentNode = currentNode.next;
            nodePosition++
        }
        currentNode.next = null;
        }
        return
    }

    contains(value){
        const length = this.size();
        let nodePosition = 1;
        let currentNode = this.head;
        while (nodePosition<=(length)){
            if (currentNode.value === value) return true
            else{
            currentNode = currentNode.next;
            nodePosition++
            }
        }
        return false
    } 

    find(value){
        const length = this.size();
        let nodeIndex = 1;
        let currentNode = this.head;
        while (nodeIndex<=(length)){
            if (currentNode.value === value) return nodeIndex
            else{
            currentNode = currentNode.next;
            nodeIndex++
            }
        }
        return null
    }
    
    toString(){
        let string = "";
        let currentNode = this.head;
        string += `( ${currentNode.value} ) -> `
        while (currentNode.next!== null){
            currentNode = currentNode.next;
            string += `( ${currentNode.value} ) -> `
        }
        return string + "null";
    }

    insertAt(value, index){
        const length = this.size();
        if(index === 1) this.prepend(value);
        else if(index === (length+1)) this.append(value)
        else if (index <=0) throw new RangeError('Index should be a positive number, starting from one')
        else if(index > length) throw new RangeError(`List has length of ${length}, you are trying to insert a value further tha that`)
        else{
        const prevNode = this.at(index-1)
        const nextNode = this.at(index)
        prevNode.next = new Node(value, nextNode)
        }
        return
    }

    removeAt(index) {
        const length = this.size();
        if(index === length) this.pop();
        else if (index <=0) throw new RangeError('Index should be a positive number, starting from one')
        else if(index > length) throw new RangeError(`List has length of ${length}, you are trying to remove non-existing node`)
        else if(index === 1){
            this.head = this.at(2);
        }
        else{
        const prevNode = this.at(index-1)
        const nextNode = this.at(index+1)
        prevNode.next = nextNode
        }
        return
    }
}

class Node {
    constructor (value, nextNode){
    this.value = value ? value : null;
    this.next = nextNode ? nextNode : null;
    }
}

export {LinkedList}