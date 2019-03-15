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
        } else if (this.parent.left == this){
            let child = this;
            let parent = this.parent;
            let grandPa = parent.parent;
            let childLeft = child.left;
            let childRight = child.right;
            let bro = parent.right;


            parent.parent = this;
            parent.left = childLeft;
            parent.right = childRight;
            child.parent = grandPa;

            grandPa.
            child.left = parent;
        }

	}
}

module.exports = Node;

let a = new Node (1, 15);
let b = new Node(2, 10);
let c = new Node(3, 20);
b.parent = a;
c.parent = a;

a.appendChild(b);
a.appendChild(c);
b.swapWithParent();
console.log(b);