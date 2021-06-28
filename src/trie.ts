class TrieNode {
  // R links to node children
  private links: TrieNode[]

  private R = 26

  private _isEnd = false

  constructor() {
    this.links = new Array<TrieNode>(this.R)
  }

  containsKey(ch: string): boolean {
    this._checkChar(ch)
    // Get ASCII value
    return this.links[ch.charCodeAt(0) - 'a'.charCodeAt(0)] !== undefined
  }

  get(ch: string): TrieNode | undefined {
    this._checkChar(ch)
    // Get ASCII value
    return this.links[ch.charCodeAt(0) - 'a'.charCodeAt(0)]
  }

  put(ch: string, node: TrieNode): void {
    this.links[ch.charCodeAt(0) - 'a'.charCodeAt(0)] = node
  }

  setEnd(): void {
    this._isEnd = true
  }

  isEnd(): boolean {
    return this._isEnd
  }

  private _checkChar(ch: string): void {
    if (ch.length > 1) throw new Error('Only single character string allowed.')
  }
}

export class Trie {
  private root: TrieNode

  constructor() {
    this.root = new TrieNode()
  }

  // Inserts a word into the trie.
  insert(word: string): void {
    let node = this.root
    for (let i = 0; i < word.length; i++) {
      const currentChar = word.charAt(i)
      if (node.containsKey(currentChar) === false) {
        node.put(currentChar, new TrieNode())
      }
      // impossible to be undefiend since it was just inserted
      node = node.get(currentChar) as TrieNode
    }
    node.setEnd()
  }

  // search a prefix or whole key in trie and
  // returns the node where search ends
  private _searchPrefix(word: string): TrieNode | null {
    let node = this.root
    for (let i = 0; i < word.length; i++) {
      const currentChar = word.charAt(i)
      if (node.containsKey(currentChar) === false) return null
      // impossible to be undefiend since we just check it
      node = node.get(currentChar) as TrieNode
    }
    return node
  }

  search(word: string): boolean {
    const node = this._searchPrefix(word)
    return node !== null && node.isEnd()
  }

  startsWith(prefix: string): boolean {
    return this._searchPrefix(prefix) !== null
  }
}
