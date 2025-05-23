import { HashMap } from "./hashmap.js";
import { HashSet } from "./hashset.js";

let test = new HashMap();
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set('poster', 'white')
test.set('poster', 'black')
console.log(test.map)
console.log(test.length())
console.log(test.entries())
// console.log(test.remove('hat'))
// console.log(test.remove('grape'))
// console.log(test.remove('hat'))
// console.log(test.map)
// console.log(test.numberOfEntries)
// console.log(test.get('dog'))
// console.log(test.keys())
// console.log(test.values())
// console.log(test.clear());
// console.log(test.map)
// console.log(test.length())
// console.log(test.entries())

let hashSet = new HashSet();
hashSet.set('apple')
hashSet.set('banana')
hashSet.set('carrot')
hashSet.set('dog')
hashSet.set('elephant')
hashSet.set('frog')
hashSet.set('grape')
hashSet.set('hat')
hashSet.set('ice cream')
hashSet.set('jacket')
hashSet.set('kite')
hashSet.set('lion')
hashSet.set('poster')
hashSet.set('frog')
console.log(hashSet.map)
console.log(hashSet.length())
console.log(hashSet.keys())
// console.log(hashSet.remove('hat'))
// console.log(hashSet.remove('grape'))
// console.log(hashSet.remove('hat'))
// console.log(hashSet.map)
// console.log(hashSet.numberOfEntries)
// console.log(hashSet.get('dog'))
// console.log(hashSet.keys())
// console.log(hashSet.clear());
// console.log(hashSet.map)
// console.log(hashSet.length())

