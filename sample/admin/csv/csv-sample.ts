import * as parse from 'csv-parse/lib/sync';
import * as  assert from 'assert';

// https://csv.js.org/parse/api/sync/

const input = `
"key_1","key_2"
"value 1","value 2"
`
const records = parse(input, {
  columns: true,
  skip_empty_lines: true
})
console.log(records);
assert.deepStrictEqual(records, [{ key_1: 'value 1', key_2: 'value 2' }])