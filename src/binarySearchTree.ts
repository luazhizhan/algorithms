import { Comparable } from './helper'

export class BST<T extends Comparable> {
  key: T | null
  left: BST<T> | null
  right: BST<T> | null

  values: { [key in T]: T } // Track value added to the tree

  constructor(
    key: T | null = null,
    l: BST<T> | null = null,
    r: BST<T> | null = null
  ) {
    this.key = key
    this.right = r
    this.left = l
    this.values = {} as { [key in T]: T }
    if (key !== null) this.values[key] = key
  }

  clear(): void {
    this.key = null
    this.left = null
    this.right = null
    this.values = {} as { [key in T]: T }
  }

  isEmpty(): boolean {
    return this.key === null
  }

  contains(key: T): boolean {
    return this.values[key] !== undefined
  }

  size(node: BST<T>): number {
    return this._size(node)
  }

  /* computes number of nodes in tree */
  private _size(node: BST<T> | null): number {
    if (node === null || node.key === null) return 0
    else return this._size(node.left) + 1 + this._size(node.right)
  }

  height(node: BST<T> | null): number {
    if (node === null || node.key === null) return 0

    /* compute the depth of each subtree */
    const lDepth = this.height(node.left)
    const rDepth = this.height(node.right)

    /* use the larger one */
    if (lDepth > rDepth) return lDepth + 1
    return rDepth + 1
  }

  add(node: BST<T> | null, key: T): BST<T> | null {
    if (this.values[key] !== undefined) return node

    if (node === null) {
      node = new BST<T>(key, null, null)
      this.values[key] = key
    } else if (node.key === null) {
      node.key = key
      this.values[key] = key
    } else {
      // Place lower elem values on left
      key < node.key
        ? (node.left = this.add(node.left, key))
        : (node.right = this.add(node.right, key))
    }
    return node
  }

  remove(root: BST<T>, key: T): BST<T> | null {
    return this._deleteKey(root, key)
  }

  private _deleteKey(root: BST<T> | null, key: T | null): BST<T> | null {
    if (key === null || this.values[key] === undefined) return root
    if (root === null || root.key === null) return root

    // Tree contain only 1 key
    if (Object.keys(this.values).length === 1 && root.key === key) {
      delete this.values[key]
      root.key = null
      return root
    }

    if (key < root.key) {
      root.left = this._deleteKey(root.left, key)
    } else if (key > root.key) {
      root.right = this._deleteKey(root.right, key)
    } else {
      if (root.left === null) {
        delete this.values[key]
        return root.right
      } else if (root.right === null) {
        delete this.values[key]
        return root.left
      }
      // node with two children: Get the inorder
      // successor (smallest in the right subtree)
      root.key = this._minValue(root.right)

      // Delete the inorder successor
      root.right = this._deleteKey(root.right, root.key)
    }
    return root
  }

  private _minValue(root: BST<T>): T {
    let minv = root.key
    while (root.left !== null) {
      minv = root.left.key
      root = root.left
    }
    return minv as T
  }

  preOrder(lst: T[], node: BST<T> | null): void {
    if (node === null || node.key === null) return
    lst.push(node.key)
    if (node.left !== null) this.preOrder(lst, node.left)
    if (node.right !== null) this.preOrder(lst, node.right)
  }

  inOrder(lst: T[], node: BST<T> | null): void {
    if (node === null || node.key === null) return
    if (node.left !== null) this.inOrder(lst, node.left)
    lst.push(node.key)
    if (node.right !== null) this.inOrder(lst, node.right)
  }

  postOrder(lst: T[], node: BST<T> | null): void {
    if (node === null || node.key === null) return
    if (node.left !== null) this.postOrder(lst, node.left)
    if (node.right !== null) this.postOrder(lst, node.right)
    lst.push(node.key)
  }

  levelOrder(lst: T[], node: BST<T> | null): void {
    const queue: BST<T>[] = []
    if (node === null || node.key === null) return
    queue.push(node)
    while (queue.length > 0) {
      const n = queue.shift()
      if (n === undefined || n.key === null) continue
      lst.push(n.key)
      if (n.left !== null) queue.push(n.left)
      if (n.right !== null) queue.push(n.right)
    }
  }
}
