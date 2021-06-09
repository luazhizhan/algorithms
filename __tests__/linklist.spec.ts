import { LinkList } from '../src/linklist'

test('Construct a linklist', () => {
  const ll = new LinkList('abc')
  expect(ll.head()).toBe('abc')
  expect(ll.tail()).toBe('abc')
  expect(ll.size()).toBe(1)
})

test('Insert to head of linklist', () => {
  const ll = new LinkList('abc')
  ll.insertHead('def')
  expect(ll.head()).toBe('def')
  expect(ll.tail()).toBe('abc')
})

test('Insert to tail of linklist', () => {
  const ll = new LinkList('abc')
  ll.insertTail('def')
  expect(ll.head()).toBe('abc')
  expect(ll.tail()).toBe('def')
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
