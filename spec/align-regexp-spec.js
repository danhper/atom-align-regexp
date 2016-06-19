'use babel';

import alignLines from '../lib/align-lines';

describe('alignLines', () => {
  it('should align input', () => {
    const input    = 'foo = bar\nfoobar = bar\n\ndontmatch\nbaz=bar';
    const expected = 'foo    = bar\nfoobar = bar\n\ndontmatch\nbaz    =bar';
    expect(alignLines(input, /=/)).toEqual(expected);
  });

  it('should add a space before align chars', () => {
    const input = 'foo=bar\nfoobar=baz';
    expect(alignLines(input, /=/)).toEqual('foo    =bar\nfoobar =baz');
  });

  it('should handle regexp with multiple chars', () => {
    const input    = "import foo from 'foo';\nimport foobar from 'foobar';";
    const expected = "import foo    from 'foo';\nimport foobar from 'foobar';";
    expect(alignLines(input, /from/)).toEqual(expected);
  });

  it('should use only a single space before align regexp', () => {
    const input = 'foo     = bar\nbar= baz';
    expect(alignLines(input, /=/)).toEqual('foo = bar\nbar = baz');
  });
});
