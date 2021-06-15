import { UnionFind } from '../src/unionFind'

describe('UnionFind', () => {
  it('number of components', () => {
    const uf = new UnionFind(5)
    expect(uf.components()).toBe(5)

    uf.unify(0, 1)
    expect(uf.components()).toBe(4)

    uf.unify(1, 0)
    expect(uf.components()).toBe(4)

    uf.unify(1, 2)
    expect(uf.components()).toBe(3)

    uf.unify(0, 2)
    expect(uf.components()).toBe(3)

    uf.unify(2, 1)
    expect(uf.components()).toBe(3)

    uf.unify(3, 4)
    expect(uf.components()).toBe(2)

    uf.unify(4, 3)
    expect(uf.components()).toBe(2)

    uf.unify(1, 3)
    expect(uf.components()).toBe(1)

    uf.unify(4, 0)
    expect(uf.components()).toBe(1)
  })

  it('Size of each component', () => {
    const uf = new UnionFind(5)
    expect(uf.componentSize(0)).toBe(1)
    expect(uf.componentSize(1)).toBe(1)
    expect(uf.componentSize(2)).toBe(1)
    expect(uf.componentSize(3)).toBe(1)
    expect(uf.componentSize(4)).toBe(1)

    uf.unify(0, 1)
    expect(uf.componentSize(0)).toBe(2)
    expect(uf.componentSize(1)).toBe(2)
    expect(uf.componentSize(2)).toBe(1)
    expect(uf.componentSize(3)).toBe(1)
    expect(uf.componentSize(4)).toBe(1)

    uf.unify(1, 0)
    expect(uf.componentSize(0)).toBe(2)
    expect(uf.componentSize(1)).toBe(2)
    expect(uf.componentSize(2)).toBe(1)
    expect(uf.componentSize(3)).toBe(1)
    expect(uf.componentSize(4)).toBe(1)

    uf.unify(1, 2)
    expect(uf.componentSize(0)).toBe(3)
    expect(uf.componentSize(1)).toBe(3)
    expect(uf.componentSize(2)).toBe(3)
    expect(uf.componentSize(3)).toBe(1)
    expect(uf.componentSize(4)).toBe(1)

    uf.unify(0, 2)
    expect(uf.componentSize(0)).toBe(3)
    expect(uf.componentSize(1)).toBe(3)
    expect(uf.componentSize(2)).toBe(3)
    expect(uf.componentSize(3)).toBe(1)
    expect(uf.componentSize(4)).toBe(1)

    uf.unify(2, 1)
    expect(uf.componentSize(0)).toBe(3)
    expect(uf.componentSize(1)).toBe(3)
    expect(uf.componentSize(2)).toBe(3)
    expect(uf.componentSize(3)).toBe(1)
    expect(uf.componentSize(4)).toBe(1)

    uf.unify(3, 4)
    expect(uf.componentSize(0)).toBe(3)
    expect(uf.componentSize(1)).toBe(3)
    expect(uf.componentSize(2)).toBe(3)
    expect(uf.componentSize(3)).toBe(2)
    expect(uf.componentSize(4)).toBe(2)

    uf.unify(4, 3)
    expect(uf.componentSize(0)).toBe(3)
    expect(uf.componentSize(1)).toBe(3)
    expect(uf.componentSize(2)).toBe(3)
    expect(uf.componentSize(3)).toBe(2)
    expect(uf.componentSize(4)).toBe(2)

    uf.unify(1, 3)
    expect(uf.componentSize(0)).toBe(5)
    expect(uf.componentSize(1)).toBe(5)
    expect(uf.componentSize(2)).toBe(5)
    expect(uf.componentSize(3)).toBe(5)
    expect(uf.componentSize(4)).toBe(5)

    uf.unify(4, 0)
    expect(uf.componentSize(0)).toBe(5)
    expect(uf.componentSize(1)).toBe(5)
    expect(uf.componentSize(2)).toBe(5)
    expect(uf.componentSize(3)).toBe(5)
    expect(uf.componentSize(4)).toBe(5)
  })

  it('Connectivity of element', () => {
    const sz = 7
    const uf = new UnionFind(sz)
    for (let i = 0; i < sz; i++) expect(uf.connected(i, i)).toBeTruthy()

    uf.unify(0, 2)
    expect(uf.connected(0, 2)).toBeTruthy()
    expect(uf.connected(2, 0)).toBeTruthy()
    expect(uf.connected(0, 1)).toBeFalsy()
    expect(uf.connected(3, 1)).toBeFalsy()
    expect(uf.connected(6, 4)).toBeFalsy()
    expect(uf.connected(5, 0)).toBeFalsy()

    for (let i = 0; i < sz; i++) expect(uf.connected(i, i)).toBeTruthy()

    uf.unify(3, 1)
    expect(uf.connected(0, 2)).toBeTruthy()
    expect(uf.connected(2, 0)).toBeTruthy()
    expect(uf.connected(1, 3)).toBeTruthy()
    expect(uf.connected(3, 1)).toBeTruthy()

    expect(uf.connected(0, 1)).toBeFalsy()
    expect(uf.connected(1, 2)).toBeFalsy()
    expect(uf.connected(2, 3)).toBeFalsy()
    expect(uf.connected(1, 0)).toBeFalsy()
    expect(uf.connected(2, 1)).toBeFalsy()
    expect(uf.connected(3, 2)).toBeFalsy()

    expect(uf.connected(1, 4)).toBeFalsy()
    expect(uf.connected(2, 5)).toBeFalsy()
    expect(uf.connected(3, 6)).toBeFalsy()

    for (let i = 0; i < sz; i++) expect(uf.connected(i, i)).toBeTruthy()

    uf.unify(2, 5)
    expect(uf.connected(0, 2)).toBeTruthy()
    expect(uf.connected(2, 0)).toBeTruthy()
    expect(uf.connected(1, 3)).toBeTruthy()
    expect(uf.connected(3, 1)).toBeTruthy()
    expect(uf.connected(0, 5)).toBeTruthy()
    expect(uf.connected(5, 0)).toBeTruthy()
    expect(uf.connected(5, 2)).toBeTruthy()

    expect(uf.connected(0, 1)).toBeFalsy()
    expect(uf.connected(1, 2)).toBeFalsy()
    expect(uf.connected(2, 3)).toBeFalsy()
    expect(uf.connected(1, 0)).toBeFalsy()
    expect(uf.connected(2, 1)).toBeFalsy()
    expect(uf.connected(3, 2)).toBeFalsy()
    expect(uf.connected(4, 6)).toBeFalsy()
    expect(uf.connected(4, 5)).toBeFalsy()
    expect(uf.connected(1, 6)).toBeFalsy()

    for (let i = 0; i < sz; i++) expect(uf.connected(i, i)).toBeTruthy()

    uf.unify(1, 2)
    uf.unify(3, 4)
    uf.unify(4, 6)

    for (let i = 0; i < sz; i++) {
      for (let j = 0; j < sz; j++) {
        expect(uf.connected(i, j)).toBeTruthy()
      }
    }
  })

  it('Size of union find', () => {
    const uf = new UnionFind(5)
    expect(uf.size()).toBe(5)
    uf.unify(0, 1)
    uf.find(3)
    expect(uf.size()).toBe(5)
    uf.unify(1, 2)
    expect(uf.size()).toBe(5)
    uf.unify(0, 2)
    uf.find(1)
    expect(uf.size()).toBe(5)
    uf.unify(2, 1)
    expect(uf.size()).toBe(5)
    uf.unify(3, 4)
    uf.find(0)
    expect(uf.size()).toBe(5)
    uf.unify(4, 3)
    uf.find(3)
    expect(uf.size()).toBe(5)
    uf.unify(1, 3)
    expect(uf.size()).toBe(5)
    uf.find(2)
    uf.unify(4, 0)
    expect(uf.size()).toBe(5)
  })

  it('Bad union find creation', () => {
    expect(() => new UnionFind(-1)).toThrowError()
    expect(() => new UnionFind(-434)).toThrowError()
    expect(() => new UnionFind(0)).toThrowError()
  })
})
