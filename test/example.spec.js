import { GenericContainer } from "testcontainers";

import example from "../lib/example.js";

import assert from "assert";

describe("Example with CouchDB", () => {
  let container;
  let db;

  before(async function () {
    const COUCHDB_USER = "admin";
    const COUCHDB_PASSWORD = "secret";

    this.timeout(60 * 60 * 1000); // 1 hour
    container = await new GenericContainer("couchdb:3.2.2")
      .withEnvironment({ COUCHDB_USER, COUCHDB_PASSWORD })
      .withExposedPorts(5984)
      .start();

    const host = container.getHost();
    const port = container.getMappedPort(5984);

    db = example(`http://${COUCHDB_USER}:${COUCHDB_PASSWORD}@${host}:${port}`);
  });

  after(async () => {
    await container.stop();
  });

  it("Should report the correct version", async () => {
    assert.equal(await db.version(), "3.2.2");
  });
});
