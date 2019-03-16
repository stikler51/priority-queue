const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
	    var n = new Node(data, priority);
		this.insertNode(n);
		this.shiftNodeUp(n);
	}

	pop() {
		if  (!this.root && !this.parentNodes) {
			return;
		}
		let n = this.detachRoot();
		this.restoreRootFromLastInsertedNode(n);
		// this.shiftNodeDown(this.root);
		// return this.root.data;
	}

	detachRoot() {
		const r = this.root;
		this.root = null;
		this.parentNodes.unshift(r);
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
		// let a = node.swapWithParent();
		// if (node.priority > a) {
		// 	this.shiftNodeUp(node);
		// }
		// if (a == null) {
		// 	this.root = node;
		// }
		// let a = node.parent;
		// console.log(a.priority);


		// if (node.priority > node.parent.priority){
		// 	if (!node.parent.parent) {
		// 		this.root = node;
		// 	}
		// 	node.swapWithParent();
		// }
		// if (node.priority > node.parent.priority) {
		// 	this.shiftNodeUp(node);
		// }

		// console.log(node.priority);
		// console.log(node.parent.priority);
	}
//todo: нужно записать  в корень, если меняется с узлом, у которого нет отца

	shiftNodeDown(node) {
		
	}
}

module.exports = MaxHeap;

// var heap = new MaxHeap();
//
// heap.push(1, 0);
// heap.push(2, 10);
// heap.push(3, 5);
// heap.push(4, 20);
//
// console.log(heap.root.priority);
// console.log(heap.root.left.priority);
// console.log(heap.root.left.left.priority);