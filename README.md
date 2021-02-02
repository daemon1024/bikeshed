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

- TODO add setup for getting the bot token

- Download [`ngrok`](https://dashboard.ngrok.com/get-started/setup)

- Unzip the file and move `ngrok` in the project directory.

- Run `./ngrok http 8000`

  ![ngrok](https://user-images.githubusercontent.com/54525741/106601572-d265b700-6581-11eb-8460-e64a5aa26030.png)

- Copy the give url(For example: `http://b8972dfbbb16.ngrok.io` given in the example above)

## Setting up the webhook

- Go to your repo in which you want to setup the bot, then go to the "Settings" tab and click on "Webhooks" section on the left panel.

  ![Webhooks](https://user-images.githubusercontent.com/54525741/106602208-b1519600-6582-11eb-90f2-1b931aba23f0.png)

- Click on "Add webhook"

- For "Payload Url", add the url you get from `ngrok` + "/recieveghpayload". Ex: `http://b8972dfbbb16.ngrok.io/receiveghpayload`

- Content Type to `application/json`.

- Leave **secret** blank.

- For "Which events would you like to trigger this webhook?", Do "Send me everything"

- Here an example

  ![Example](https://user-images.githubusercontent.com/54525741/106602709-61bf9a00-6583-11eb-80d1-7644f7cd5638.png)

- Click on "Add webhook" button, now your bot is ready to go.

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
