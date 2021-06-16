import { BST } from '../src/binarySearchTree'

describe('Binary Search Tree', () => {
  it('Empty', () => {
    const tree = new BST<string>()
    expect(tree.isEmpty()).toBeTruthy()

    tree.add(tree, 'Hello World!')
    expect(tree.isEmpty()).toBeFalsy()
  })

  it('Size', () => {
    const tree = new BST<string>()
    expect(tree.size(tree)).toBe(0)

    tree.add(tree, 'Hello World!')
    expect(tree.size(tree)).toBe(1)

    tree.add(tree, 'Hello World')
    expect(tree.size(tree)).toBe(2)

    tree.add(tree, 'abc')
    expect(tree.size(tree)).toBe(3)
  })

  it('Height', () => {
    const tree = new BST<string>()

    // No tree
    expect(tree.height(tree)).toBe(0)

    // Layer One
    tree.add(tree, 'M')
    expect(tree.height(tree)).toBe(1)

    // Layer Two
    tree.add(tree, 'J')
    expect(tree.height(tree)).toBe(2)
    tree.add(tree, 'S')
    expect(tree.height(tree)).toBe(2)

    // Layer Three
    tree.add(tree, 'K')
    expect(tree.height(tree)).toBe(3)
    tree.add(tree, 'T')
    expect(tree.height(tree)).toBe(3)
    tree.add(tree, 'O')
    expect(tree.height(tree)).toBe(3)

    // Layer Four
    tree.add(tree, 'P')
    expect(tree.height(tree)).toBe(4)
  })

  it('Add', () => {
    const tree = new BST<string>()
    tree.add(tree, 'a')
    expect(tree.contains('a'))

    tree.add(tree, 'a')
    expect(tree.height(tree)).toBe(1)

    tree.add(tree, 'a')
    expect(tree.height(tree)).toBe(1)

    tree.add(tree, 'b')
    expect(tree.height(tree)).toBe(2)
  })

  it('Remove', () => {
    const tree = new BST<string>()
    expect(tree.remove(tree, 'A')).toBe(tree)

    tree.add(tree, 'A')
    tree.clear()
    expect(tree.size(tree)).toBe(0)

    // Try removing an element which doesn't exist
    tree.add(tree, 'A')
    expect(tree.size(tree)).toBe(1)
    expect(tree.remove(tree, 'B')).toBe(tree)
    expect(tree.size(tree)).toBe(1)

    // Try removing an element which does exist
    tree.add(tree, 'B')
    expect(tree.size(tree)).toBe(2)
    expect(tree.remove(tree, 'B')).toBe(tree)
    expect(tree.size(tree)).toBe(1)
    expect(tree.height(tree)).toBe(1)

    // Try removing the root
    expect(tree.remove(tree, 'A')).toBe(tree)
    expect(tree.size(tree)).toBe(0)
    expect(tree.height(tree)).toBe(0)

    tree.add(tree, 'C')
    tree.add(tree, 'B')
    tree.add(tree, 'A')
    tree.add(tree, 'D')
    tree.add(tree, 'E')
    tree.add(tree, 'F')
    tree.add(tree, 'G')
    expect(tree.size(tree)).toBe(7)
    expect(tree.height(tree)).toBe(5)

    expect(tree.remove(tree, 'E')).toBe(tree)
    expect(tree.size(tree)).toBe(6)
    expect(tree.height(tree)).toBe(4)

    expect(tree.remove(tree, 'B')).toBe(tree)
    expect(tree.size(tree)).toBe(5)
    expect(tree.height(tree)).toBe(4)

    expect(tree.remove(tree, 'A')).toBe(tree)
    expect(tree.size(tree)).toBe(4)
    expect(tree.height(tree)).toBe(4)

    expect(tree.remove(tree, 'D')).toBe(tree)
    expect(tree.size(tree)).toBe(3)
    expect(tree.height(tree)).toBe(3)

    expect(tree.remove(tree, 'F')).toBe(tree)
    expect(tree.size(tree)).toBe(2)
    expect(tree.height(tree)).toBe(2)

    expect(tree.remove(tree, 'G')).toBe(tree)
    expect(tree.size(tree)).toBe(1)
    expect(tree.height(tree)).toBe(1)

    expect(tree.remove(tree, 'C')).toBe(tree)
    expect(tree.size(tree)).toBe(0)
    expect(tree.height(tree)).toBe(0)
  })

  it('Print order', () => {
    const tree = new BST<string>()
    tree.add(tree, 'a')
    tree.add(tree, 'b')
    tree.add(tree, 'c')
    tree.add(tree, 'd')
    tree.add(tree, 'e')
    tree.add(tree, 'f')
    tree.add(tree, 'g')
    const preLST: string[] = []
    const inLST: string[] = []
    const postLST: string[] = []
    const levelLST: string[] = []
    tree.preOrder(preLST, tree)
    tree.inOrder(inLST, tree)
    tree.postOrder(postLST, tree)
    tree.levelOrder(levelLST, tree)

    expect(preLST).toStrictEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g'])
    expect(inLST).toStrictEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g'])
    expect(postLST).toStrictEqual(['g', 'f', 'e', 'd', 'c', 'b', 'a'])
    expect(levelLST).toStrictEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g'])
  })
})
