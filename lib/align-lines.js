'use babel';

function repeat(string, times) {
  let result = '';
  for (let i = 0; i < times; i++) {
    result += string;
  }
  return result;
}

function transformLines(lines, regexp, n = 0) {
  let alignPosition = -1;

  const transformed = lines.map(line => {
    let match;

    // reset regexp and find nth match
    regexp.lastIndex = 0;
    for (let i = 0; i <= n; i++) {
      match = regexp.exec(line);
    }
    if (!match) {
      return {matched: false, content: line};
    }

    let alignStart = match.index;

    // search the first non-whitespace character
    while (alignStart > 0 && line[alignStart - 1] === ' ') alignStart--;

    // part before regex match with no trailing whitespace (e.g. `let a`)
    const left = line.substring(0, alignStart);
    // part after regex match starting (e.g. `= 'foo'`)
    const right = line.substring(match.index);

    if (alignStart > alignPosition) {
      alignPosition = alignStart;
    }
    return {matched: true, left, right, alignStart};
  }).map(line => {
    // leave unmatched lines as is
    if (!line.matched) {
      return line.content;
    }
    // leave one space before the aligned char/string
    const spacesCount = alignPosition - line.alignStart + 1;
    return line.left + repeat(' ', spacesCount) + line.right;
  });
  return [transformed, alignPosition > -1];
}

export default function alignLines(content, regexp, options = {}) {
  const lineEnding  = options.lineEnding || '\n';
  let lines         = content.split(lineEnding);
  let changed       = false;
  let n = 0;
  do {
    [newLines, changed] = transformLines(lines, regexp, n);
    lines = newLines;
    n++;
  } while (regexp.global && changed && n <= 100);

  // there will probably not be 100 occurences on the same line
  // so it is most likely to be an issue with the regexp
  if (n === 100) {
    console.error('stopped alignment after 100th match, check regexp');
  }
  return lines.join(lineEnding);
};
