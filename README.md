# bikeshed

Friendly neighbourhood github bot

# Setup

- Install [`deno`](https://deno.land/#installation)

- Fork and clone the repo

  ```
  git clone https://github.com/<your-username>/bikeshed
  ```

- Move into the project folder

  ```
  cd bikeshed
  ```

- Start the server

  ```
  deno run --allow-net --allow-read --allow-env mod.ts
  ```

- The server will start in PORT `8000`

# Usage

- Download [`ngrok`](https://dashboard.ngrok.com/get-started/setup)

- Unzip the file and move `ngrok` in the project directory.

- Run `./ngrok http 8000`

# TODO

- ### Issues
  - [x] welcome comments
  - [x] assign issues on a particular string match
  - [ ] add labels on various stages of issues ( unassigned,assigned,has a PR ..
        . . )
  - [ ] claim issue
  - [ ] ask updates if no updates for a particular interval
- ### PR
  - [x] welcome comments
    - [ ] special comment for first timers
  - [ ] add labels on various stages of issues ( awaiting review,requested
        changes,awaiting merge .. . . )
  - [ ] assign reviewers on a particular string match
