import { GenericContainer } from "testcontainers";

import fetch from "node-fetch";

import assert from "assert";

const COUCHDB_USER = "admin";
const COUCHDB_PASSWORD = "secret";

describe("Example with CouchDB", () => {
  let container;

  before(async function () {
    this.timeout(60 * 60 * 1000); // 1 hour
    container = await new GenericContainer("couchdb:3.2.2")
      .withEnvironment({ COUCHDB_USER, COUCHDB_PASSWORD })
      .withExposedPorts(5984)
      .start();
  });

  after(async () => {
    await container.stop();
  });

  function baseUrl() {
    const host = container.getHost();
    const port = container.getMappedPort(5984);

    return `http://${COUCHDB_USER}:${COUCHDB_PASSWORD}@${host}:${port}`;
  }

  it("works", async () => {
    const r = await fetch(baseUrl());
    const j = await r.json();

    assert.equal(j.version, "3.2.2");
  });
});
