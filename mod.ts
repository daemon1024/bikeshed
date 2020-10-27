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
      console.log(data);
      reply(data);
    } catch (error) {
      console.log(error);
    }
  },
);

const reply: (data: any) => void = async (data) => {
  if (data.issue && data.action === "opened") {
    // An issue is created.
    const msg: string = "Thanks for opening an issue.";
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
  } else if (data.pull_request && data.action === "opened") {
    // A PR is made.
    const msg: string =
      `Thanks for making a PR @${data.pull_request.user.login}`;
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
