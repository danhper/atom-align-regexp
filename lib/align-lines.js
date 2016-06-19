'use babel';

function repeat(string, times) {
  let result = '';
  for (let i = 0; i < times; i++) {
    result += string;
  }
  return result;
}

export default function alignLines(content, regexp, options = {}) {
  const lineEnding  = options.lineEnding || '\n';
  const lines       = content.split(lineEnding);
  let alignPosition = 0;

  return lines.map(line => {
    const match = regexp.exec(line);
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
  }).join(lineEnding);
};
