# Klepp frontend

Mykje bra klepp

### Local dev

- `npm install`
- `npm start`

### Linting etc.

1. Install [`pre-commit`](https://pre-commit.com/#install)
2. run `pre-commit install`
3. `pre-commit` will be run on changed files on each commit
   1. If the linter changes a file, re-add the file and attempt a new commit

Tips:

1. run `pre-commit run --all-files` to run linting on all files
2. run `git commit --no-verify` to commit to skip pre-commit checks
