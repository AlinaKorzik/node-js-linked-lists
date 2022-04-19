const assert = require('assert')

class Node {

    constructor(data, next = null, prev = null) {
        this.data = data
        this.next = next
        this.prev = prev
    }
}

class DoublyLinkedList {                                                 
    #size = 0
    #head = null
    #tail = null

    // O(1)
    append (data) {
        const newNode = new Node(data)

        if (!this.#head) {
            this.#head = newNode
            this.#tail = newNode
        } else {
            newNode.prev = this.#tail
            this.#tail.next = newNode
            this.#tail = newNode
        }

        this.#size++
    }

    // O(n)
    remove (index) {
        if (index < 0 || index > this.#size) {
            throw new Error(`${index} is out of range!`)
        }

        const middle = Math.round(this.#size / 2)        
        let current = this.#tail
        let next = null
        let prev = current.prev
        if(index >= middle) {    
            if(index === this.#size) {
                this.#tail = current.prev     
                prev.next = null      
            } else {
                for(let i = this.#size - 2; i >= index; i--) {
                    next = current
                    current = next.prev
                    prev = current.prev
                    if(index === i) {
                        prev.next = current.next
                        next.prev = current.prev
                    }
                }
            }
        } else {
            current = this.#head
            prev = null
            next = this.#head.next
            if(index === 0) {
                this.#head = this.#head.next
            } else{
                for(let i = 1; i <= index; i++) {
                    prev = current
                    current = prev.next
                    next = current.next
                    if(index === i) {
                        next.prev = current.prev
                        prev.next = current.next
                    }
                }
            }
        }
        this.#size--
    }

    // O(n / 2)
    getData(index) {
        const mid = Math.round(this.#size / 2)

        if (index > mid) {
            // ищем с хвоста
            let current = this.#tail
            for (let i = this.#size - 1; i >= index; i--)  {
                if (i === index) {
                    return current.data
                }
                current = current.prev
            }
        } else {
            // ищем с головы
            let current = this.#head
            for (let i = 0; i <= index; i++)  {
                if (i === index) {
                    return current.data
                }
                current = current.next
            }
        }
    }

    get size () {
        return this.#size
    }

    get tail () {
        return this.#tail
    }

    get head () {
        return this.#head
    }

    // TODO вернуть средний индекс списка
    get listMid () {
        const mid = Math.round(this.#size / 2)
        return mid
    }

    // TODO вернуть массив всех значений элементов
    // direction - можеть быть 0 или 1
    // Если 1, то результат должен быть упорядочен с head -> tail
    // Если 0 то, tail -> head
    toArray(direction = 1) {
        let arr = []
        let current = this.#head
        if (direction === 0) {
            current = this.#tail
            while(current.prev) {
                arr.push(current.data)
                current = current.prev
            }
            arr.push(this.#head.data)
            return arr
        }
        while(current.next) {
            arr.push(current.data)
            current = current.next
        }
        arr.push(this.#tail.data)
        return arr
    }

    // TODO удалить все элементы, значение которых уже встретилось в связанном списке.
    removeDuplicates () {
        let arr = this.toArray()
        let uniqArr = []
        arr.forEach((node, index) => {
            if(!uniqArr.includes(node)) {
                uniqArr.push(node)
            } else {
                console.log(node, index, this.#size)
                this.remove(index)
            }
        })
    }

    printList () {
        let current = this.#head;
        let text = `[${current.data}] `

        while (current.next) {
            current = current.next
            text += `[${current.data}] `
        }

        console.log(text)
    }
}

const linkedList = new DoublyLinkedList()
linkedList.append(20) // 0
linkedList.append(5) // 1
linkedList.append(30) // 2
linkedList.append(40) // 3
linkedList.append(50) // 4
linkedList.append(60) // 5
linkedList.append(70) // 6

const value = linkedList.getData(6)
console.log('value', value)
console.log('size', linkedList.size)
console.log('head', linkedList.head)
console.log('tail', linkedList.tail)
linkedList.printList()
linkedList.remove(2)
linkedList.remove(4)
linkedList.printList()
console.log('mid', linkedList.listMid) 
console.log('array', linkedList.toArray())
console.log('array', linkedList.toArray(0))
linkedList.append(20)
linkedList.append(40)
linkedList.printList()
linkedList.removeDuplicates()
linkedList.printList()