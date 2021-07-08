import { Comparable, compareTo } from './helper'

export class TreeNode<T extends Comparable> {
  // 'bf' is short for Balance Factor
  bf = 0

  // The value/data contained within the node.
  value: T

  // The height of this node in the tree.
  height = 0

  // The left and the right children of this node.

  left: TreeNode<T> | undefined

  right: TreeNode<T> | undefined

  constructor(value: T) {
    this.value = value
  }
}

export class AVLTree<T extends Comparable> {
  // The root node of the AVL tree.
  root: TreeNode<T> | undefined

  // Tracks the number of nodes inside the tree.
  nodeCount = 0

  // The height of a rooted tree is the number of edges between the tree's
  // root and its furthest leaf. This means that a tree containing a single
  // node has a height of 0.
  height(): number {
    if (this.root === undefined) return 0
    return this.root.height
  }

  // Returns the number of nodes in the tree.
  size(): number {
    return this.nodeCount
  }

  // Returns whether or not the tree is empty.
  isEmpty(): boolean {
    return this.size() === 0
  }

  contains(value: T): boolean {
    return this._contains(this.root, value)
  }

  private _contains(node: TreeNode<T> | undefined, value: T): boolean {
    if (node === undefined) return false

    // Compare current value to the value in the node.
    const cmp = compareTo(value, node.value)

    // Dig into left subtree.
    if (cmp < 0) return this._contains(node.left, value)

    // Dig into right subtree.
    if (cmp > 0) return this._contains(node.right, value)

    // Found value in tree.
    return true
  }

  // Insert/add a value to the AVL tree. The value must not be null, O(log(n))
  insert(value: T): boolean {
    if (this._contains(this.root, value) === false) {
      this.root = this._insert(this.root, value)
      this.nodeCount++
      return true
    }
    return false
  }

  private _insert(node: TreeNode<T> | undefined, value: T): TreeNode<T> {
    // Base case.
    if (node === undefined) return new TreeNode(value)

    // Compare current value to the value in the node.
    const cmp = compareTo(value, node.value)

    // Insert node in left subtree.
    if (cmp < 0) this._insert(node.left, value)
    // Insert node in right subtree.
    else this._insert(node.right, value)

    // Update balance factor and height values.
    this.update(node)

    // Re-balance tree.
    return this.balance(node)
  }

  // Update a node's height and balance factor.
  private update(node: TreeNode<T>): void {
    const leftNodeHeight = node.left === undefined ? -1 : node.left.height
    const rightNodeHeight = node.right === undefined ? -1 : node.right.height

    // Update this node's height.
    node.height = 1 + Math.max(leftNodeHeight, rightNodeHeight)

    // Update balance factor.
    node.bf = rightNodeHeight - leftNodeHeight
  }

  // Re-balance a node if its balance factor is +2 or -2.
  private balance(node: TreeNode<T>): TreeNode<T> {
    // Left heavy subtree.
    if (node.bf === -2) {
      if (node.left === undefined) throw new Error('Impossible case')
      if (node.left.bf <= 0) return this.leftLeftCase(node)
      return this.leftRightCase(node)
    } else if (node.bf === +2) {
      if (node.right === undefined) throw new Error('Impossible case')
      if (node.right.bf >= 0) return this.rightRightCase(node)
      return this.rightLeftCase(node)
    }

    // Node either has a balance factor of 0, +1 or -1 which is fine.
    return node
  }

  private leftLeftCase(node: TreeNode<T>): TreeNode<T> {
    return this.rightRotation(node)
  }

  private leftRightCase(node: TreeNode<T>): TreeNode<T> {
    node.left = this.leftRotation(node.left as TreeNode<T>)
    return this.leftLeftCase(node)
  }

  private rightRightCase(node: TreeNode<T>): TreeNode<T> {
    return this.leftRotation(node)
  }

  private rightLeftCase(node: TreeNode<T>): TreeNode<T> {
    node.right = this.rightRotation(node.right as TreeNode<T>)
    return this.rightRightCase(node)
  }

  private leftRotation(node: TreeNode<T>): TreeNode<T> {
    const newParent = node.right
    if (newParent === undefined) throw new Error('Impossible case')
    node.right = newParent.left
    newParent.left = node
    this.update(node)
    this.update(newParent)
    return newParent
  }

  private rightRotation(node: TreeNode<T>): TreeNode<T> {
    const newParent = node.left
    if (newParent === undefined) throw new Error('Impossible case')
    node.left = newParent.right
    newParent.right = node
    this.update(node)
    this.update(newParent)
    return newParent
  }

  // Remove a value from this binary tree if it exists, O(log(n))
  remove(elem: T): boolean {
    if (this._contains(this.root, elem)) {
      this.root = this._remove(this.root, elem)
      this.nodeCount--
      return true
    }

    return false
  }

  // Removes a value from the AVL tree.
  _remove(node: TreeNode<T> | undefined, elem: T): TreeNode<T> | undefined {
    if (node === undefined) return undefined

    const cmp = compareTo(elem, node.value)

    // Dig into left subtree, the value we're looking
    // for is smaller than the current value.
    if (cmp < 0) {
      node.left = this._remove(node.left, elem)

      // Dig into right subtree, the value we're looking
      // for is greater than the current value.
    } else if (cmp > 0) {
      node.right = this._remove(node.right, elem)

      // Found the node we wish to remove.
    } else {
      // This is the case with only a right subtree or no subtree at all.
      // In this situation just swap the node we wish to remove
      // with its right child.
      if (node.left === undefined) {
        return node.right

        // This is the case with only a left subtree or
        // no subtree at all. In this situation just
        // swap the node we wish to remove with its left child.
      } else if (node.right === undefined) {
        return node.left

        // When removing a node from a binary tree with two links the
        // successor of the node being removed can either be the largest
        // value in the left subtree or the smallest value in the right
        // subtree. As a heuristic, I will remove from the subtree with
        // the greatest hieght in hopes that this may help with balancing.
      } else {
        // Choose to remove from left subtree
        if (node.left.height > node.right.height) {
          // Swap the value of the successor into the node.
          const successorValue = this.findMax(node.left)
          node.value = successorValue

          // Find the largest node in the left subtree.
          node.left = this._remove(node.left, successorValue)
        } else {
          // Swap the value of the successor into the node.
          const successorValue = this.findMin(node.right)
          node.value = successorValue

          // Go into the right subtree and remove the leftmost node we
          // found and swapped data with. This prevents us from having
          // two nodes in our tree with the same value.
          node.right = this._remove(node.right, successorValue)
        }
      }
    }

    // Update balance factor and height values.
    this.update(node)

    // Re-balance tree.
    return this.balance(node)
  }

  // Helper method to find the leftmost node (which has the smallest value)
  private findMin(node: TreeNode<T>): T {
    while (node.left !== undefined) node = node.left
    return node.value
  }

  // Helper method to find the rightmost node (which has the largest value)
  private findMax(node: TreeNode<T>): T {
    while (node.right !== undefined) node = node.right
    return node.value
  }
}
