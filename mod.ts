import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

const router = new Router();

router.post(
  "/hello",
  async ({ request, response }: { request: any; response: any }) => {
    try {
      const body = request.body();
      const data = await body.value;
      console.log(data);
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
