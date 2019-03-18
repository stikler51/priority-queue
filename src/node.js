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
			return true;
		} else if (!this.right){
			this.right = node;
            node.parent = this;
			return true;
		} else {
			return false;
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

	    if (parent.left === this) {
	    	this.right = parent.right;
	    	this.left = parent;

	    	if (parent.right) {
	    		parent.right.parent = this;
			}

			parent.left = leftC;
			parent.right = rightC;

			if (grandPa && grandPa.right === parent) {
				grandPa.right = this;
			} else if (grandPa && grandPa.left === parent) {
				grandPa.left = this;
			}
			return this.parent;
		} else  {
			this.left = parent.left;
			this.right = parent;

			if (parent.left) {
				parent.left.parent = this;
			}

			parent.left = leftC;
			parent.right = rightC;

			if (grandPa && grandPa.right === parent) {
				grandPa.right = this;
			} else if (grandPa && grandPa.left === parent) {
				grandPa.left = this;
			}
			return this.parent;
		}
	}
}

module.exports = Node;