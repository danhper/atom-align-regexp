'use babel';

import alignLines from '../lib/align-lines';

describe('alignLines', () => {
  it('should align input', () => {
    const input    = 'foo = bar\nfoobar = bar\n\ndontmatch\nbaz=bar';
    const expected = 'foo    = bar\nfoobar = bar\n\ndontmatch\nbaz    =bar';
    expect(alignLines(input, /=/)).toEqual(expected);
  });

  it('should align input with global regex', () => {
    const input    = 'foo = bar\nfoobar = bar\n\ndontmatch\nbaz=bar';
    const expected = 'foo    = bar\nfoobar = bar\n\ndontmatch\nbaz    =bar';
    expect(alignLines(input, /=/g)).toEqual(expected);
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

  it('should align first occcurences when regex not global', () => {
    const input    = 'foo = bar =    hello\nfoobar = bar\n\ndontmatch\nbaz=bar=qux';
    const expected = 'foo    = bar =    hello\nfoobar = bar\n\ndontmatch\nbaz    =bar=qux';
    expect(alignLines(input, /=/)).toEqual(expected);
  });

  it('should align all occcurences when regex is global', () => {
    let input    = `foo | bar | baz | qux
foobar | barbaz | bazqux | quxfoo`;
    let expected = `foo    | bar    | baz    | qux
foobar | barbaz | bazqux | quxfoo`;
    expect(alignLines(input, /\|/g)).toEqual(expected);

    input = `header 1 | header 2 | header 3
--------|---------|---------
foo | bar | baz
bar | baz | qux`;
    expected = `header 1 | header 2 | header 3
-------- |--------- |---------
foo      | bar      | baz
bar      | baz      | qux`;
    expect(alignLines(input, /\|/g)).toEqual(expected);
  });
});
