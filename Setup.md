# Setup

## Getting and using the personal access token

- Follow the steps given in this [article](https://github.com/TheOdinProject/odin-bot-v2/pull/104) to generate your personal access token(Only give the `repo` permission in 7th step)

- Make a file named `.env` in the root directory, and add your Access token as `GH_TOKEN=YourToken`. You may now proceed to the next step.

## Exposing your localhost to the Internet

- You can use ngrok or some other software, but for this setup we will be using `ngrok`.

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

- Go back to our README [Usage guide](https://github.com/daemon1024/bikeshed/blob/main/README.md#usage) on how to start the bot.
