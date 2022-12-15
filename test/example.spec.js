import { GenericContainer } from "testcontainers";

describe("GenericContainer", () => {
  let container;
  let redisClient;

  before(async function () {
    this.timeout(60 * 60 * 1000); // 1 hour
    container = await new GenericContainer("redis")
      .withExposedPorts(6379)
      .start();
  });

  after(async () => {
    await container.stop();
  });

  it("works", async () => {});
});
