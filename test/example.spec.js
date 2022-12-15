import { GenericContainer } from "testcontainers";

import fetch from "node-fetch";

import assert from "assert";

describe("Example with CouchDB", () => {
  let container;

  before(async function () {
    this.timeout(60 * 60 * 1000); // 1 hour
    container = await new GenericContainer("couchdb:3.2.2")
      .withEnvironment({
        COUCHDB_USER: "admin",
        COUCHDB_PASSWORD: "password",
      })
      .withExposedPorts(5984)
      .start();
  });

  after(async () => {
    await container.stop();
  });

  it("works", async () => {
    const host = container.getHost();
    const port = container.getMappedPort(5984);
    const r = await fetch(`http://admin:password@${host}:${port}`);
    const j = await r.json();

    console.log(j);

    assert.equal(j.version, "3.2.2");
  });
});
