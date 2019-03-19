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

		return this.root.data;

	}

	detachRoot() {
		const r = this.root;
		if (this.parentNodes[0] == r) {
            this.parentNodes.shift();
        }
		if(this.root.left) {
			this.root.left.parent = null;
		}
		if (this.root.right) {
			this.root.right.parent = null;
		}
		this.root = null;
		return r;
	}

	restoreRootFromLastInsertedNode(detached) {
		let n = this.parentNodes.pop();

		if (this.parentNodes.indexOf(n.parent) == -1 && n.parent !== null) {
			this.parentNodes.unshift(n.parent);

			if (n.parent.left == n) {
				n.parent.left = null;
			}
			if (n.parent.right == n) {
				n.parent.right = null;
			}
		}



		if(detached.left !== n) {
			var left = detached.left;
			left.parent = n;
		}
		if (detached.right !== n) {
			var right = detached.right;
			right.parent = n;
		}
		this.root = n;
		this.root.parent = null;
		if(left) {
			this.root.left = left;
		}
		if(right) {
			this.root.right = right;
		}
		if(!left || !right) {
			this.parentNodes.unshift(n);
		}


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
			        this.parentNodes[1] = node.right;
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
	}


	shiftNodeDown(node) {


		if(node.left && node.right) {

			if(node.left.priority > node.priority && node.right.priority > node.priority) {

				if (node.left.priority >= node.right.priority) {
					node.left.swapWithParent();

					if(node.left) {
						node.left.parent = node;
					}

					if(node.right) {
						node.right.parent = node;
					}

					if(node.parent.parent == null) {
						this.root = node.parent;
					}


					let parentIndex = this.parentNodes.indexOf(node.parent);
					let nodeIndex = this.parentNodes.indexOf(node);

					if (parentIndex !== -1) {
						this.parentNodes[parentIndex] = node;
					}

					if (nodeIndex !== -1) {
						this.parentNodes[nodeIndex] = node.parent;
					}


					this.shiftNodeDown(node);

				} else {
					node.right.swapWithParent();

					if(node.left) {
						node.left.parent = node;
					}

					if(node.right) {
						node.right.parent = node;
					}

					if(node.parent.parent == null) {
						this.root = node.parent;
					}

					let parentIndex = this.parentNodes.indexOf(node.parent);
					let nodeIndex = this.parentNodes.indexOf(node);

					if (parentIndex !== -1) {
						this.parentNodes[parentIndex] = node;
					}

					if (nodeIndex !== -1) {
						this.parentNodes[nodeIndex] = node.parent;
					}

					this.shiftNodeDown(node);
				}

			} else if(node.left.priority > node.priority) {
				node.left.swapWithParent();

				if(node.left) {
					node.left.parent = node;
				}

				if(node.right) {
					node.right.parent = node;
				}

				if(node.parent.parent == null) {
					this.root = node.parent;
				}

				let parentIndex = this.parentNodes.indexOf(node.parent);
				let nodeIndex = this.parentNodes.indexOf(node);

				if (parentIndex !== -1) {
					this.parentNodes[parentIndex] = node;
				}

				if (nodeIndex !== -1) {
					this.parentNodes[nodeIndex] = node.parent;
				}

				this.shiftNodeDown(node);

			} else if (node.right.priority > node.priority) {
				node.right.swapWithParent();

				if(node.left) {
					node.left.parent = node;
				}

				if(node.right) {
					node.right.parent = node;
				}

				if(node.parent.parent == null) {
					this.root = node.parent;
				}

				let parentIndex = this.parentNodes.indexOf(node.parent);
				let nodeIndex = this.parentNodes.indexOf(node);

				if (parentIndex !== -1) {
					this.parentNodes[parentIndex] = node;
				}

				if (nodeIndex !== -1) {
					this.parentNodes[nodeIndex] = node.parent;
				}

				this.shiftNodeDown(node);

			}

			return;

		} else if (node.left) {
			if(node.left.priority > node.priority) {
				node.left.swapWithParent();

				if(node.left) {
					node.left.parent = node;
				}

				if(node.right) {
					node.right.parent = node;
				}

				if(node.parent.parent == null) {
					this.root = node.parent;
				}

				let parentIndex = this.parentNodes.indexOf(node.parent);
				let nodeIndex = this.parentNodes.indexOf(node);

				if (parentIndex !== -1) {
					this.parentNodes[parentIndex] = node;
				}

				if (nodeIndex !== -1) {
					this.parentNodes[nodeIndex] = node.parent;
				}

				this.shiftNodeDown(node);

			}
			return;

		} else if (node.right) {
			if (node.right.priority > node.priority) {
				node.right.swapWithParent();

				if(node.left) {
					node.left.parent = node;
				}

				if(node.right) {
					node.right.parent = node;
				}

				if(node.parent.parent == null) {
					this.root = node.parent;
				}

				let parentIndex = this.parentNodes.indexOf(node.parent);
				let nodeIndex = this.parentNodes.indexOf(node);

				if (parentIndex !== -1) {
					this.parentNodes[parentIndex] = node;
				}

				if (nodeIndex !== -1) {
					this.parentNodes[nodeIndex] = node.parent;
				}

				this.shiftNodeDown(node);
			}

			return;

		}
		return;
	}
}

module.exports = MaxHeap;

var h = new MaxHeap();

h.push(42, 15);
h.push(15, 14);
h.push(0, 16);
h.push(100, 100);

console.log(h.pop());
//
// console.log(h.parentNodes);
// console.log(det);

// h.push(100, 100);
//
// let a = h.pop();
//
// console.log(a);