import * as reducers from './reducers'
import Taxonomy from '../types/Taxonomy'

describe("taxonomy reducers", () => {
  const parent1 = new Taxonomy('Parent 1')
  // const parent2 = new Taxonomy('Parent 2')
  const child11 = parent1.addChild('Child 1.1')
  const child12 = parent1.addChild('Child 1.2')
  const child121 = child12.addChild('Child 1.2.1')

  // const list = [parent1, parent2]

  it('flattens returns correctly formatted list', () => {
    const flattened = reducers.flatten(parent1)
    console.log(`flattened: ${JSON.stringify(flattened)}`)
    expect(flattened.length).toBe(2)
    expect(parent1.name).toBe('Parent 1')
    // expect(parent2.name).toBe('Parent 2')
    expect(child11.name).toBe('Child 1.1')
    expect(child12.name).toBe('Child 1.2')
    expect(child121.name).toBe('Child 1.2.1')
    expect(flattened[0].name).toBe('Parent 1 > Child 1.1')
    expect(flattened[1].name).toBe('Parent 1 > Child 1.2 > Child 1.2.1')
  })

})
