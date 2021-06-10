import { LinkList } from '../src/linklist'

describe('Linklist', () => {
  it('Construct a linklist', () => {
    const ll = new LinkList('abc')
    expect(ll.head()).toBe('abc')
    expect(ll.tail()).toBe('abc')
    expect(ll.size()).toBe(1)
  })

  it('Insert to head of linklist', () => {
    //  0 ,  1 ,  2 ,  3
    // jkl, ghi, def, abc
    const ll = new LinkList('abc')
    ll.addFirst('def')
    ll.addFirst('ghi')
    ll.addFirst('jkl')
    expect(ll.head()).toBe('jkl')
    expect(ll.tail()).toBe('abc')

    expect(ll.get(0)).toBe('jkl')
    expect(ll.get(1)).toBe('ghi')
    expect(ll.get(2)).toBe('def')
    expect(ll.get(3)).toBe('abc')
  })

  it('Insert to tail of linklist', () => {
    //  0 ,  1 ,  2 ,  3
    // abc, def, ghi, jkl
    const ll = new LinkList('abc')
    ll.addTail('def')
    ll.addTail('ghi')
    ll.addTail('jkl')
    expect(ll.head()).toBe('abc')
    expect(ll.tail()).toBe('jkl')

    expect(ll.get(0)).toBe('abc')
    expect(ll.get(1)).toBe('def')
    expect(ll.get(2)).toBe('ghi')
    expect(ll.get(3)).toBe('jkl')
  })

  it('Insert by position in linklist', () => {
    const ll = new LinkList('abc')
    ll.addAt('def', 1)
    expect(ll.head()).toBe('abc')
    expect(ll.tail()).toBe('def')
    ll.addAt('ghi', 1)
    ll.addAt('jkl', 1)
    expect(ll.get(0)).toBe('abc') // head
    expect(ll.get(1)).toBe('jkl')
    expect(ll.get(2)).toBe('ghi')
    expect(ll.get(3)).toBe('def') // tail
    expect(ll.size()).toBe(4)
  })

  it('Replace value in linklist', () => {
    const ll = new LinkList('abc')
    expect(ll.replace('def', 'aaa')).toBeFalsy()
    ll.addAt('def', 0)
    ll.replace('def', 'aaa')
    expect(ll.get(0)).toBe('aaa')
    expect(ll.replace('notfound', 'fewg')).toBeFalsy()
  })

  it('Contains value in linklist', () => {
    const ll = new LinkList('abc')
    ll.add('def')
    ll.add('ghi')
    ll.add('jkl')
    expect(ll.size()).toBe(4)
    expect(ll.contains('def')).toBeTruthy()
    expect(ll.contains('ghi')).toBeTruthy()
    expect(ll.contains('notfound')).toBeFalsy()
  })

  it('Remove head in linklist', () => {
    const ll = new LinkList('abc')
    ll.removeFirst()
    expect(ll.size()).toBe(0)
    ll.addFirst('abc')
    ll.addFirst('efg')
    ll.removeFirst()
    expect(ll.size()).toBe(1)
    expect(ll.tail()).toBe('abc')
    expect(ll.head()).toBe('abc')
    expect(ll.get(0)).toBe('abc')

    ll.removeFirst()
    expect(ll.size()).toBe(0)
    expect(ll.tail()).toBeNull()
    expect(ll.head()).toBeNull()
    expect(() => ll.get(0)).toThrow(RangeError)

    ll.add('abc')
    ll.add('def')
    ll.add('efg')
    ll.removeFirst()
    expect(ll.size()).toBe(2)
    expect(ll.head()).toBe('def')
    expect(ll.get(1)).toBe('efg')
    expect(ll.tail()).toBe('efg')
  })

  it('Remove tail in linklist', () => {
    const ll = new LinkList('abc')
    ll.removeLast()
    expect(ll.size()).toBe(0)
    ll.addTail('abc')
    ll.addTail('efg')
    ll.removeLast()
    expect(ll.size()).toBe(1)
    expect(ll.tail()).toBe('abc')
    expect(ll.head()).toBe('abc')
    expect(ll.get(0)).toBe('abc')

    ll.removeLast()
    expect(ll.size()).toBe(0)
    expect(ll.tail()).toBeNull()
    expect(ll.head()).toBeNull()
    expect(() => ll.get(0)).toThrow(RangeError)

    ll.add('abc')
    ll.add('def')
    ll.add('efg')
    ll.removeLast()
    expect(ll.size()).toBe(2)
    expect(ll.head()).toBe('abc')
    expect(ll.get(1)).toBe('def')
    expect(ll.tail()).toBe('def')
  })

  it('Remove value in linklist', () => {
    //  0 ,  1 ,  2 ,  3
    // jkl, ghi, def, abc
    const ll = new LinkList('abc')
    ll.add('def')
    ll.add('ghi')
    ll.add('jkl')
    expect(ll.get(1)).toBe('def')

    ll.remove(1)
    expect(ll.size()).toBe(3)
    expect(ll.head()).toBe('abc')
    expect(ll.get(1)).toBe('ghi')
    expect(ll.tail()).toBe('jkl')

    ll.remove(2)
    expect(ll.size()).toBe(2)
    expect(ll.head()).toBe('abc')
    expect(ll.tail()).toBe('ghi')

    ll.remove(0)
    expect(ll.size()).toBe(1)
    expect(ll.head()).toBe('ghi')
    expect(ll.tail()).toBe('ghi')
  })

  it('Clear a linklist', () => {
    const ll = new LinkList('abc')
    ll.add('def')
    expect(ll.size()).toBe(2)

    ll.clear()
    expect(ll.size()).toBe(0)
    expect(ll.head()).toBeNull()
    expect(ll.tail()).toBeNull()
    expect(ll.isEmpty()).toBeTruthy()

    ll.addFirst('abc')
    ll.add('def')
    ll.addFirst('aaa')
    ll.addTail('ggg')

    expect(ll.size()).toBe(4)
    expect(ll.head()).toBe('aaa')
    expect(ll.get(0)).toBe('aaa')
    expect(ll.get(1)).toBe('abc')
    expect(ll.get(2)).toBe('def')
    expect(ll.get(3)).toBe('ggg')
    expect(ll.tail()).toBe('ggg')
    expect(ll.isEmpty()).toBeFalsy()
  })

  it('Reverse a linklist', () => {
    const ll = new LinkList('abc')
    ll.addFirst('def')
    ll.addFirst('ghi')
    ll.addFirst('jkl')
    ll.reverse()

    expect(ll.size()).toBe(4)
    expect(ll.head()).toBe('abc')
    expect(ll.tail()).toBe('jkl')

    expect(ll.get(0)).toBe('abc')
    expect(ll.get(1)).toBe('def')
    expect(ll.get(2)).toBe('ghi')
    expect(ll.get(3)).toBe('jkl')
  })

  it('Interate over linklist', () => {
    const ll = new LinkList('abc')
    ll.add('d')
    ll.add('e')
    ll.add('f')
    const values = []
    for (const v of ll) {
      values.push(v)
    }
    expect(values).toStrictEqual(['abc', 'd', 'e', 'f'])
  })
})
