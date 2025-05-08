import { LinkedList } from "./linked-list.js";
class HashMap{
    constructor(capacity = 16, loadFactor = 0.75, numberOfEntries = 0){
        this.map = new Array(capacity)
        this.loadFactor = loadFactor
        this.capacity  = capacity
        this.numberOfEntries = numberOfEntries;
    }

    checkNeedToExpand(){
      // add one to check if adding one item would overflow load factor
        if (this.numberOfEntries+1 > Math.floor(this.loadFactor * this.capacity)) return true
        return false;
    }

    hash(key) {
        let hashCode = 0; 
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
      } 

    has(key){
        const mapIndex = this.hash(key);
        const bucketList = this.map[mapIndex]
        if (bucketList === undefined) return false
        else if (bucketList.contains(key)) return true
        return false
      }

    set(key, value){
        // if there is a key in the list, update value, no expand check
        const mapIndex = this.hash(key);
        const listHasKey = this.has(key);
        if(listHasKey){ 
          const bucketList = this.map[mapIndex]
          const valueIndex = bucketList.find(key)
          bucketList.removeAt(valueIndex)
          bucketList.insertAt(valueIndex, key, value)
          return
        }
        const needsToExpand = this.checkNeedToExpand();
        // if needs to expand, expand and populate data
        if(needsToExpand){
          const mapCopy = this.entries();
          const newCapacity = this.capacity * 2;
          this.map = new Array(newCapacity)
          this.capacity  = newCapacity;
          this.numberOfEntries = 0;
          // copy existing values
          for(let i=0; i < mapCopy.length; i++){
            const key = mapCopy[i][0]
            const value = mapCopy[i][1]
            this.set(key, value)
          }
          // append new one
          this.set(key, value)
        }
        // if no need to expand, proceed data
        if(!listHasKey & !needsToExpand){
        // if there is no list, create one
        if(this.map[mapIndex] === undefined) {this.map[mapIndex] = new LinkedList()}
        const bucketList = this.map[mapIndex]
       // add a value and a key to a list
        bucketList.append(key, value)
        this.numberOfEntries++
        }
        return
      }
  
    get(key){
      const mapIndex = this.hash(key);
      const bucketList = this.map[mapIndex]
      if (bucketList === undefined) return null
      else {
        let currentNode = bucketList.head;
        if (currentNode.key === key) return currentNode.value
        else {
        while (currentNode.next!== null){
            currentNode = currentNode.next;
            if (currentNode.key === key) return currentNode.value
        }
        return null
        }
      }
    }

    remove(key){
      const mapIndex = this.hash(key);
      const bucketList = this.map[mapIndex]
      if (bucketList === undefined) return false
      const nodeIndex = bucketList.find(key);
      if(nodeIndex !== null){
        bucketList.removeAt(nodeIndex)
        // if key was the only element in the list, delete linked list
        if(bucketList.head.key === null) delete this.map[mapIndex];
        this.numberOfEntries--;
        return true
      }
      return false
    }

    length(){return this.numberOfEntries}

    clear(){
      this.map = new Array(this.capacity)
      this.numberOfEntries = 0;
      return
    }

    keys(){
      const keysArray = [];
      for(let i=0; i < this.map.length; i++){
            if(this.map[i] !== undefined){
            let currentNode = this.map[i].head;
            keysArray.push(currentNode.key)
            while (currentNode.next!== null){
                currentNode = currentNode.next;
                keysArray.push(currentNode.key)
            }
            }
          }
      return keysArray
    }

    values(){
      const valuesArray = [];
      for(let i=0; i < this.map.length; i++){
            if(this.map[i] !== undefined){
            let currentNode = this.map[i].head;
            valuesArray.push(currentNode.value)
            while (currentNode.next!== null){
                currentNode = currentNode.next;
                valuesArray.push(currentNode.value)
            }
            }
          }
      return valuesArray
    }

    entries(){
      const entriesArray = [];
      for(let i=0; i < this.map.length; i++){
            if(this.map[i] !== undefined){
            let currentNode = this.map[i].head;
            entriesArray.push([currentNode.key, currentNode.value])
            while (currentNode.next!== null){
                currentNode = currentNode.next;
                entriesArray.push([currentNode.key, currentNode.value])
            }
            }
          }
      return entriesArray
    }
}

export {HashMap}