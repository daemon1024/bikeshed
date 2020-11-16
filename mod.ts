import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import "https://deno.land/x/dotenv/load.ts";

const app = new Application();

const router = new Router();

const ghtoken = Deno.env.get("GH_TOKEN");

router.post(
  "/hello",
  async ({ request }: { request: any }) => {
    try {
      const body = request.body();
      const data = await body.value;
      console.log("invoked");
      // console.log(data);
      reply(data);
    } catch (error) {
      console.log(error);
    }
  },
);

const reply: (data: any) => void = async (data) => {
  if (data.issue && data.action === "opened") {
    // An issue is created.
    let msg: string = "Thanks for opening an issue.";
    if (data.issue.author_association == "NONE") {
      //TODO set in config file
      //TODO check if previously created any issue
      msg = "Thanks for opening your first issue.";
    }
    const reqbody = {
      "body": msg,
    };
    console.log(msg);
    const ghresp = await fetch(
      data.issue.comments_url,
      {
        method: "POST",
        headers: {
          "Accept": "application/vnd.github.v3+json",
          "Authorization": `token ${ghtoken}`,
        },
        body: JSON.stringify(reqbody),
      },
    );
    console.log(ghresp);
  }
  if (data.pull_request && data.action === "opened") {
    // A PR is made.
    let msg: string = `Thanks for making a PR @${data.pull_request.user.login}`;
    if (data.pull_request.author_association == "NONE") {
      msg = `Thanks for making your first PR @${data.pull_request.user.login}`;
    }
    const reqbody = {
      "body": msg,
    };
    console.log(msg);
    const ghresp = await fetch(
      data.pull_request.issue_url,
      {
        method: "POST",
        headers: {
          "Accept": "application/vnd.github.v3+json",
          "Authorization": `token ${ghtoken}`,
        },
        body: JSON.stringify(reqbody),
      },
    );
    console.log(ghresp);
  }
  if (data.pull_request && data.action === "closed") {
    // A PR is made.
    let msg: string =
      `Grats your PR is merged now @${data.pull_request.user.login}`;
    if (data.pull_request.author_association == "NONE") {
      msg = `Grats for your first PR @${data.pull_request.user.login}`;
    }
    const reqbody = {
      "body": msg,
    };
    console.log(msg);
    const ghresp = await fetch(
      data.pull_request.issue_url,
      {
        method: "POST",
        headers: {
          "Accept": "application/vnd.github.v3+json",
          "Authorization": `token ${ghtoken}`,
        },
        body: JSON.stringify(reqbody),
      },
    );
    console.log(ghresp);
  }
};

app.use(router.routes());
app.use(router.allowedMethods());

app.use((ctx) => {
  ctx.response.body = "Hello world!";
});

await app.listen("127.0.0.1:8000");
