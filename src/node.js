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
		} else if (!this.right && this.left){
			this.right = node;
		} else {
			return;
		}

	}

	removeChild(node) {
		if (this.left == node) {
			this.left = null;
		} else if (this.right == node) {
			this.right = null;
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

	}
}

module.exports = Node;
