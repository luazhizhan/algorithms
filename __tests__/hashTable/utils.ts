export type HashMap = { [key in string]: unknown }

export const LOOPS = 50
export const MAX_SIZE = randInt(1, 30)
export const MAX_RAND_NUM = randInt(1, 10)

export function randInt(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function genRandList(sz: number): number[] {
  const lst = []
  for (let i = 0; i < sz; i++) {
    lst.push(randInt(-MAX_RAND_NUM, MAX_RAND_NUM))
  }
  shuffle<number>(lst)
  return lst
}

export function shuffle<T>(array: T[]): T[] {
  return array.sort(() => 0.5 - Math.random())
}
