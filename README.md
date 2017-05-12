# align-regexp Atom package

This package is more or less the equivalent of Emacs `align-regexp` command for Atom.

![Demo](https://cloud.githubusercontent.com/assets/1436271/16177861/6b836c04-3673-11e6-9506-38c785bd2e50.gif)

## Installation

Install the `align-regexp` package using atom package manager, if you use the CLI:

```
apm install align-regexp
```

## Usage

1. Select something
2. Type `ctrl+alt+a`, or whatever keybinding you assigned.
   The command name is `align-regexp:align-selection`.
3. Enter a regexp in the mini-editor and press enter. It will often be a single char, like `=` or `:`,
   but can also be for example `from` to align ES6 imports.

   NOTE: the string is evaluated as a regexp, so characters like `|` or `.` must be escaped


### Advanced usage

You can use regexp flags with the following syntax:

`FLAGS: REGEXP`, for example: `g: \|`.

When the `g` flag is passed all occurences of the regexp will be aligned times,
which can be handy for tables. For example, with the above expression,

```
foo | bar | baz
foobar | barbaz | bazqux
```

will become

```
foo    | bar    | baz
foobar | barbaz | bazqux
```

## Known limitations

* This package does not handle full-width chars, such as Japanese or Chinese.
  If someone wants to send a PR to support it, I will be glad to merge it.

* The regexp match is always preceded by a space when aligning,
  this works for most cases, but can be undesirable, for example for table headers

## Comparison to alternatives

There are a lot of packages for this task, most of them try to be smart.
This ones tries to be stupid, so you have to enter explicitly on which
regexp you want to align.
I was using [atom-alignment](https://github.com/Freyskeyd/atom-alignment) before creating this package.
Pick the one that fits your needs the best.
