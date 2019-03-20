const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize = 30) {
		this.maxSize = maxSize;
		this.heap = new MaxHeap;
	}

	push(data, priority) {
		if (this.heap.sizee >= this.maxSize) {
			throw new Error('error');
		} else {
			this.heap.push(data, priority);
		}
	}

	shift() {

		if(this.isEmpty()) {
			throw new Error('error');
		}

		let n = this.heap.pop();
		return n;

	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		if (this.size() == 0) {
			return true;
		}
		return false;
	}
}

module.exports = PriorityQueue;

let q = new PriorityQueue(5);
q.push(1, 12);
q.push(2, 13);
q.push(2, 3);
q.shift();
q.shift();
q.shift();



console.log (q.size());