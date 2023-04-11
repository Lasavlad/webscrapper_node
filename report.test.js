const { sorting } = require('./report.js')
const {test, expect } = require('@jest/globals')

test('sorting descending', ()=>{
    let unsortDic = {'item_1': 1,'item_2': 2,'item_3': 2,'item_4': 4,}
    const sorted = JSON.stringify(sorting(unsortDic))
    const expected = JSON.stringify({ 'item_4': 4, 'item_2': 2, 'item_3': 2, 'item_1': 1 })
    expect(sorted).toEqual(expected)
})
