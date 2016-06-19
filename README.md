# align-regexp Atom package

This package is more or less the equivalent of Emacs `align-regexp` command for Atom.

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

## Known limitations

This package does not handle full-width chars, such as Japanese or Chinese.
If someone wants to send a PR to support it, I will be glad to merge it.

## Comparison to alternatives

There are a lot of packages for this task, most of them try to be smart.
This ones tries to be stupid, so you have to enter explicitly on which
regexp you want to align.
I was using [atom-alignment](https://github.com/Freyskeyd/atom-alignment) before creating this package.
Pick the one that fits your needs the best.
