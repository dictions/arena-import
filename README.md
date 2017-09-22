# Pinboard -> Are.na

## Installation

1. `git clone git@github.com:dictions/arena-import.git`
2. Download the JSON export from Pinboard settings. Put in root of directory (`pinboar_export.json`).
3. Add a `.env` file at the root of the directory. Add `ARENA_ACCESS_TOKEN`, `ARENA_CHANNEL`,  and `ARENA_SIMULTANEOUS_REQUESTS`. We recommend you start with 5.
4. Install dependencies via `yarn`.

## Running

```
$ yarn start
```