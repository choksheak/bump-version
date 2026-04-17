# @choksheak/bump-version

A simple CLI tool to bump the version in package.json.

## Installation

**Local:** `npm i -D @choksheak/bump-version`

**Global:** `npm i -g -D @choksheak/bump-version`

If you install globally, you can use `bump-version` from anywhere. Otherwise just use `npx bump-version` locally within your repo.

## Usage

Run this command to bump the version: `npx bump-version`

```
Usage: bump-version [major|minor|patch|plus|get]

  major: Bump the major version.
  minor: Bump the minor version.
  patch: Bump the patch version.
  plus : Increment the patch till 9, then minor till 9, then major.
  get  : Print version and exit.

  --help, -h, -?: Print help and exit.
```

For a hassle-free version bump, just run `npx bump-version` ("plus" mode). It will cause your major and minor version numbers to chug along as your project progresses, instead of getting stuck on a large patch version number like `0.1.9999`. Of course, this is just a convenience and not a rule anyone has to follow.