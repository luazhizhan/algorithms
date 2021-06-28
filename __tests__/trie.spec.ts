import { Trie } from '../src/trie'

describe('Trie', () => {
  it('Construct trie', () => {
    const trie = new Trie()
    expect(trie.search('abc')).toBeFalsy()
    expect(trie.startsWith('abc')).toBeFalsy()
  })

  it('Insert', () => {
    const trie = new Trie()
    trie.insert('a')
    trie.insert('ab')
    trie.insert('abc')
    trie.insert('abdc')
    trie.insert('abcd')
    trie.insert('abecd')

    expect(trie.search('a')).toBeTruthy()
    expect(trie.search('ab')).toBeTruthy()
    expect(trie.search('abc')).toBeTruthy()
    expect(trie.search('abdc')).toBeTruthy()
    expect(trie.search('abcd')).toBeTruthy()
    expect(trie.search('abecd')).toBeTruthy()
    expect(trie.search('abe')).toBeFalsy()

    expect(trie.startsWith('a')).toBeTruthy()
    expect(trie.startsWith('ab')).toBeTruthy()
    expect(trie.startsWith('abc')).toBeTruthy()
    expect(trie.startsWith('abd')).toBeTruthy()
    expect(trie.startsWith('abe')).toBeTruthy()
    expect(trie.startsWith('abf')).toBeFalsy()
  })
})
