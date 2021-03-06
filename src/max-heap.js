const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.sizee = 0;
	}

	push(data, priority) {
	    var n = new Node(data, priority);
		this.insertNode(n);
		// console.log(n);
		// console.log('---------');
		this.shiftNodeUp(n);
		this.sizee += 1;
		// console.log(n);
		// console.log('-----------------------');

	}

	pop() {

		if  (!this.root) {
            this.sizee = 0;
            return;
		}

        // if(this.parentNodes.length == 1) {
		// 	const currentRoot = this.root;
        // 	this.root = null;
        // 	this.parentNodes= [];
        // 	this.sizee -= 1;
        //     return currentRoot.data;
        // }


        const currentRoot = this.root;

        let detached = this.detachRoot();

        this.restoreRootFromLastInsertedNode(detached);

        this.shiftNodeDown(this.root);


        this.sizee -= 1;


		return currentRoot.data;

	}

	detachRoot() {
		const r = this.root;
		if (this.parentNodes.length == 1) {
            this.root = null;
            this.parentNodes = [];
            return r;
        }
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

		if (this.parentNodes.length == 0) {
			// this.root = detached;
			// this.parentNodes.push(detached);
			return;
		}
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

		let ind = this.parentNodes.indexOf(detached);

		if (ind !== -1) {
		    this.parentNodes.splice(ind, 1);
        }


        if(detached.left !== n && detached.left !== null) {
            	var left = detached.left;
            	left.parent = n;
            }
            if (detached.right !== n && detached.right !== null) {
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
		//


	}

	size() {
		return this.sizee;
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
		this.sizee = 0;
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
		if (this.parentNodes.length == 0) {
			return;
		}

		if(node.left && node.right) {

			if(node.left.priority > node.priority && node.right.priority > node.priority) {

				if (node.left.priority >= node.right.priority) {

				    if (!node.parent) {
				        this.root = node.left;
                    }

					node.left.swapWithParent();

                    if (node.left == node) {
                        node.left = null;
                    }

					if(node.left) {
						node.left.parent = node;
					}

					if(node.right) {
						node.right.parent = node;
					}

					// if(node.parent.parent == null) {
					// 	this.root = node.parent;
					// }


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

                    if (!node.parent) {
                        this.root = node.right;
                    }

					node.right.swapWithParent();

                    if (node.right == node) {
                        node.right = null;
                    }

					if(node.left) {
						node.left.parent = node;
					}

					if(node.right) {
						node.right.parent = node;
					}

					// if(node.parent.parent == null) {
					// 	this.root = node.parent;
					// }

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

                if (!node.parent) {
                    this.root = node.left;
                }

				node.left.swapWithParent();

                if (node.left == node) {
                    node.left = null;
                }

				if(node.left) {
					node.left.parent = node;
				}

				if(node.right) {
					node.right.parent = node;
				}

				// if(node.parent.parent == null) {
				// 	this.root = node.parent;
				// }

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

                if (!node.parent) {
                    this.root = node.right;
                }

				node.right.swapWithParent();

                if (node.right == node) {
                    node.right = null;
                }

				if(node.left) {
					node.left.parent = node;
				}

				if(node.right) {
					node.right.parent = node;
				}

				// if(node.parent.parent == null) {
				// 	this.root = node.parent;
				// }

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

                if (!node.parent) {
                    this.root = node.left;
                }

				node.left.swapWithParent();

                if (node.left == node) {
                    node.left = null;
                }

				if(node.left) {
					node.left.parent = node;
				}

				if(node.right) {
					node.right.parent = node;
				}

				// if(node.parent.parent == null) {
				// 	this.root = node.parent;
				// }

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

                if (!node.parent) {
                    this.root = node.right;
                }

				node.right.swapWithParent();

                if (node.right == node) {
                    node.right = null;
                }

				if(node.left) {
					node.left.parent = node;
				}

				if(node.right) {
					node.right.parent = node;
				}

				// if(node.parent.parent == null) {
				// 	this.root = node.parent;
				// }

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

