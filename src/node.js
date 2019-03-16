class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (!this.left) {
			this.left = node;
			node.parent = this;
		} else if (!this.right && this.left){
			this.right = node;
            node.parent = this;
		} else {
			return;
		}

	}

	removeChild(node) {
		if (this.left == node) {
			this.left = null;
			node.parent = null;
		} else if (this.right == node) {
			this.right = null;
            node.parent = null;
		} else {
			throw new Error('error');
		}
	}

	remove() {
		if (!this.parent) {
			return;
		}
		this.parent.removeChild(this);
	}

	swapWithParent() {
	    if (!this.parent) {
	        return;
        }
	    const grandPa = this.parent.parent;
	    const parent = this.parent;
	    const leftC = this.left;
	    const rightC = this.right;

		parent.parent = this;
		this.parent = grandPa;

	    if (parent.left == this) {
	    	this.right = parent.right;
	    	this.left = parent;

	    	if (parent.right) {
	    		parent.right.parent = this;
			}

			parent.left = leftC;
			parent.right = rightC;

			if (grandPa && grandPa.right == parent) {
				grandPa.right = this;
			} else if (grandPa && grandPa.left == parent) {
				grandPa.left = this;
			}


		} else  {
			this.left = parent.left;
			this.right = parent;

			if (parent.left) {
				parent.left.parent = this;
			}

			parent.left = leftC;
			parent.right = rightC;

			if (grandPa && grandPa.right == parent) {
				grandPa.right = this;
			} else if (grandPa && grandPa.left == parent) {
				grandPa.left = this;
			}
		}
	    // if (this.left) {
		// 	leftC.parent = parent;
		// 	this.parent.left = leftC;
		// }
	    // if (this.right) {
		// 	rightC.parent = parent;
		// 	this.parent.right = rightC;
		// }





	}
}

module.exports = Node;

// let a = new Node (1, 15);
// let b = new Node(2, 10);
// let c = new Node(3, 20);
// b.parent = a;
// c.parent = a;
//
// a.appendChild(b);
// a.appendChild(c);
// b.swapWithParent();
// console.log(b);