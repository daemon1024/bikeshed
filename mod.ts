import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import "https://deno.land/x/dotenv/load.ts";

interface config {
  first_issue: string;
  first_pr: string;
  issue: string;
  pr: string;
  claim_issue: string;
  first_pr_merged: string;
  pr_merged: string;
  pr_closed: string;
}

let configs: config;

Deno.readTextFile("./config.json").then((data) => configs = JSON.parse(data));

const app = new Application();

const router = new Router();

const ghtoken = Deno.env.get("GH_TOKEN");

router.post(
  "/recieveghpayload",
  async ({ request }: { request: any }) => {
    try {
      const body = request.body();
      const data = await body.value;
      console.log("invoked");
      // console.log("\n\n\n\n\n\n\n");
      // console.log(data);
      reply(data);
    } catch (error) {
      console.log(error);
    }
  },
);

const createComment = async (url: string, msg: string) =>
  await fetch(
    url,
    {
      method: "POST",
      headers: {
        "Accept": "application/vnd.github.v3+json",
        "Authorization": `token ${ghtoken}`,
      },
      body: JSON.stringify({
        "body": msg,
      }),
    },
  );

const addAssignee = async (url: string, assignee: string) =>
  await fetch(
    url + "/assignees",
    {
      method: "POST",
      headers: {
        "Accept": "application/vnd.github.v3+json",
        "Authorization": `token ${ghtoken}`,
      },
      body: JSON.stringify({
        "assignees": [assignee],
      }),
    },
  );

const addReaction = async (url: string, reaction: string) =>
  await fetch(
    url + "/reactions",
    {
      method: "POST",
      headers: {
        "Accept": "application/vnd.github.squirrel-girl-preview+json",
        "Authorization": `token ${ghtoken}`,
      },
      body: JSON.stringify({
        "content": reaction,
      }),
    },
  );

const addLabel = async (url: string, label: string) =>
  await fetch(
    url + "/labels",
    {
      method: "POST",
      headers: {
        "Accept": "application/vnd.github.squirrel-girl-preview+json",
        "Authorization": `token ${ghtoken}`,
      },
      body: JSON.stringify({
        "labels": [label],
      }),
    },
  );

const addReviewer = async (url: string, label: string) =>
  await fetch(
    url + "/requested_reviewers",
    {
      method: "POST",
      headers: {
        "Accept": "application/vnd.github.squirrel-girl-preview+json",
        "Authorization": `token ${ghtoken}`,
      },
      body: JSON.stringify({
        "reviewers": [label],
      }),
    },
  );

const reply: (data: any) => void = async (data) => {
  if (data.issue && data.action === "opened") {
    // An issue is created.
    let msg: string = configs.issue;
    if (data.issue.author_association == "NONE") {
      //TODO check if previously created any issue
      msg = configs.first_issue;
    }
    console.log(msg);
    let ghresp = await createComment(data.issue.comments_url, msg);
    console.log(ghresp);
    ghresp = await addLabel(data.issue.url, "awaiting triage");
    console.log(ghresp);
  }
  if (data.pull_request && data.action === "opened") {
    // A PR is made.
    let msg: string = configs.pr;
    if (data.pull_request.author_association == "NONE") {
      //TODO check if previously created any PR
      msg = configs.first_pr;
    }
    const ghresp = await createComment(data.pull_request.comments_url, msg);
    console.log(ghresp);
  }
  if (data.pull_request && data.action === "closed") {
    if (data.pull_request.merged_at) {
      // A PR is merged.
      let msg: string = configs.pr_merged;
      if (data.pull_request.author_association == "NONE") {
        msg = configs.first_pr_merged;
      }
      console.log(msg);
      const ghresp = await createComment(data.pull_request.comments_url, msg);
      console.log(ghresp);
    } else {
      // A PR is closed.
      let msg: string = configs.pr_closed;
      console.log(msg);
      const ghresp = await createComment(data.pull_request.comments_url, msg);
      console.log(ghresp);
    }
  }
  if (data.action === "created") {
    if (data.comment?.body) {
      let command = data.comment.body;
      // does whatever commanded :P
      command = command.split(" ");
      let ghresp;
      switch (command[0]) {
        // assigns the issue to the specified username
        case "-assign":
          ghresp = command[1][0] == "@" &&
            await addAssignee(
              data?.issue.url,
              command[1].substring(1),
            );
          ghresp = ghresp ? await addReaction(data.comment.url, "+1") : ghresp;
          console.log(ghresp);
          break;
        // adds the specified label to the issue
        case "-addlabel":
          ghresp = await addLabel(
            data?.issue.url,
            command[1].substring(1),
          );
          console.log(ghresp);
          break;
        // requests reviews
        case "-r":
          ghresp = await addReviewer(
            data.issue.pull_request.url,
            command[1].substring(1),
          );
          console.log(ghresp);
          break;
        default:
          break;
      }
    }
  }
};

app.use(router.routes());
app.use(router.allowedMethods());

app.use((ctx) => {
  ctx.response.body = "Hello world!";
});

await app.listen("127.0.0.1:8000");
