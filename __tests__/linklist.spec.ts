import { LinkList } from '../src/linklist'

test('Construct a linklist', () => {
  const ll = new LinkList('abc')
  expect(ll.head()).toBe('abc')
  expect(ll.tail()).toBe('abc')
  expect(ll.size()).toBe(1)
})

test('Insert to head of linklist', () => {
  //  0 ,  1 ,  2 ,  3
  // jkl, ghi, def, abc
  const ll = new LinkList('abc')
  ll.insertHead('def')
  ll.insertHead('ghi')
  ll.insertHead('jkl')
  expect(ll.head()).toBe('jkl')
  expect(ll.tail()).toBe('abc')

  expect(ll.get(0)).toBe('jkl')
  expect(ll.get(1)).toBe('ghi')
  expect(ll.get(2)).toBe('def')
  expect(ll.get(3)).toBe('abc')
})

test('Insert to tail of linklist', () => {
  //  0 ,  1 ,  2 ,  3
  // abc, def, ghi, jkl
  const ll = new LinkList('abc')
  ll.insertTail('def')
  ll.insertTail('ghi')
  ll.insertTail('jkl')
  expect(ll.head()).toBe('abc')
  expect(ll.tail()).toBe('jkl')

  expect(ll.get(0)).toBe('abc')
  expect(ll.get(1)).toBe('def')
  expect(ll.get(2)).toBe('ghi')
  expect(ll.get(3)).toBe('jkl')
})

test('Insert by position in linklist', () => {
  const ll = new LinkList('abc')
  ll.insert('def', 1)
  expect(ll.head()).toBe('abc')
  expect(ll.tail()).toBe('def')
  ll.insert('ghi', 1)
  expect(ll.get(0)).toBe('abc') // head
  expect(ll.get(1)).toBe('ghi')
  expect(ll.get(2)).toBe('def') // tail
  expect(ll.size()).toBe(3)
})

test('Replace value in linklist', () => {
  const ll = new LinkList('abc')
  ll.insert('def', 0)
  ll.replace('def', 'aaa')
  expect(ll.get(0)).toBe('aaa')
})

test('Contains value in linklist', () => {
  const ll = new LinkList('abc')
  ll.insert('def', 0)
  ll.insert('ghi', 1)
  ll.insert('jkl', 1)
  expect(ll.size()).toBe(4)
  expect(ll.contains('def')).toBeTruthy()
  expect(ll.contains('ghi')).toBeTruthy()
})

test('Remove head in linklist', () => {
  const ll = new LinkList('abc')
  ll.removeHead()
  expect(ll.size()).toBe(0)
  ll.insertHead('abc')
  ll.insertHead('efg')
  ll.removeHead()
  expect(ll.size()).toBe(1)
  expect(ll.tail()).toBe('abc')
  expect(ll.head()).toBe('abc')
  expect(ll.get(0)).toBe('abc')

  ll.removeHead()
  expect(ll.size()).toBe(0)
  expect(ll.tail()).toBeNull()
  expect(ll.head()).toBeNull()
  expect(() => ll.get(0)).toThrow(RangeError)

  ll.insert('abc', 0)
  ll.insert('def', 1)
  ll.insert('efg', 2)
  ll.removeHead()
  expect(ll.size()).toBe(2)
  expect(ll.head()).toBe('def')
  expect(ll.get(1)).toBe('efg')
  expect(ll.tail()).toBe('efg')
})

test('Remove tail in linklist', () => {
  const ll = new LinkList('abc')
  ll.removeTail()
  expect(ll.size()).toBe(0)
  ll.insertTail('abc')
  ll.insertTail('efg')
  ll.removeTail()
  expect(ll.size()).toBe(1)
  expect(ll.tail()).toBe('abc')
  expect(ll.head()).toBe('abc')
  expect(ll.get(0)).toBe('abc')

  ll.removeTail()
  expect(ll.size()).toBe(0)
  expect(ll.tail()).toBeNull()
  expect(ll.head()).toBeNull()
  expect(() => ll.get(0)).toThrow(RangeError)

  ll.insert('abc', 0)
  ll.insert('def', 1)
  ll.insert('efg', 2)
  ll.removeTail()
  expect(ll.size()).toBe(2)
  expect(ll.head()).toBe('abc')
  expect(ll.get(1)).toBe('def')
  expect(ll.tail()).toBe('def')
})

test('Remove value in linklist', () => {
  //  0 ,  1 ,  2 ,  3
  // jkl, ghi, def, abc
  const ll = new LinkList('abc')
  ll.insertHead('def')
  ll.insertHead('ghi')
  ll.insertHead('jkl')
  expect(ll.get(1)).toBe('ghi')
  ll.remove(1)

  expect(ll.size()).toBe(3)
  expect(ll.head()).toBe('jkl')
  expect(ll.get(1)).toBe('def')
  expect(ll.tail()).toBe('abc')
})

test('Reverse a linklist', () => {
  const ll = new LinkList('abc')
  ll.insertHead('def')
  ll.insertHead('ghi')
  ll.insertHead('jkl')
  ll.reverse()

  expect(ll.size()).toBe(4)
  expect(ll.head()).toBe('abc')
  expect(ll.tail()).toBe('jkl')

  expect(ll.get(0)).toBe('abc')
  expect(ll.get(1)).toBe('def')
  expect(ll.get(2)).toBe('ghi')
  expect(ll.get(3)).toBe('jkl')
})
