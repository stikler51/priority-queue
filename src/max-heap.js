const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
	    var n = new Node(data, priority);
		this.insertNode(n);
		// console.log(n);
		// console.log('---------');
		this.shiftNodeUp(n);
		// console.log(n);
		// console.log('-----------------------');

	}

	pop() {
		if  (!this.root) {
            return;
		}

		let dr = this.detachRoot();
        this.restoreRootFromLastInsertedNode(dr);

        this.shiftNodeDown(this.root);

		//return this.root.data;

	}

	detachRoot() {
		const r = this.root;
		this.root = null;
		if (this.parentNodes[0] == r) {
            this.parentNodes.shift();
        }
		return r;
	}

	restoreRootFromLastInsertedNode(detached) {
		
	}

	size() {
		
	}

	isEmpty() {
		if (this.root == null) {
			return true;
		}
		return false;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
	    if (this.root == null) {
			this.root = node;
			this.parentNodes.push(node);
		} else {
	    	for (let i = 0; i < this.parentNodes.length; i++) {
	    		if (this.parentNodes[i].appendChild(node)) {
	    			break;
				}
			}
			this.parentNodes.push(node);
		}
	    if (this.parentNodes[0].left && this.parentNodes[0].right) {
	    	this.parentNodes.shift();
		}
	}

	shiftNodeUp(node) {
		// node.swapWithParent();
		if (node.parent) {
			if (node.priority > node.parent.priority) {

			    let thisIndex = this.parentNodes.indexOf(node);
			    let thisParentIndex = this.parentNodes.indexOf(node.parent);

                node.swapWithParent();

			    if(thisParentIndex == -1) {
			        this.parentNodes[0] = node.left;
                } else {
                    this.parentNodes = swap(this.parentNodes, thisIndex, thisParentIndex);
                }

                // console.log(thisIndex);
                // console.log(thisParentIndex);

				this.shiftNodeUp(node);
			}
		}
		if (!node.parent) {
			this.root = node;
		}

		return;

        function swap(arr, indexFrom, indexTo) {
            let a = arr[indexFrom];
            let b = arr[indexTo];

            arr[indexTo] = a;
            arr[indexFrom] = b;
            return arr;
        }

		//неправильно вставляет правые элементы. проблема в insertNode либо в appendChild

	}


	shiftNodeDown(node) {
		
	}
}

module.exports = MaxHeap;

var h = new MaxHeap();

h.push(42, 15);
h.push(15, 14);
h.push(0, 16);
h.push(100, 100);

let a = h.pop();

console.log(a);