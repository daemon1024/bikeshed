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
      console.log(data.action);
      if (data.action == "opened") {
        const msg: string = "thanks for opening an issue.";
        const reqbody = {
          "body": msg,
        };
        console.log(msg);
        const ghresp = await fetch(
          `https://api.github.com/repos/daemon1024/demo/issues/${data.issue.number}/comments`,
          {
            method: "POST",
            headers: {
              "Accept": "application/vnd.github.v3+json",
              "Authorization": `token ${ghtoken}`,
            },
            body: JSON.stringify(reqbody), // body data type must match "Content-Type" header
          },
        );
        console.log(ghresp);
      }
    } catch (error) {
      console.log(error);
    }
  },
);

app.use(router.routes());
app.use(router.allowedMethods());

app.use((ctx) => {
  ctx.response.body = "Hello world!";
});

await app.listen("127.0.0.1:8000");
