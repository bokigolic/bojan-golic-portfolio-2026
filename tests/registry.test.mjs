import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { projects, featuredProjects } from "../src/data/projects.js";
import { pageMeta } from "../src/data/site.js";

test("The brief's three projects have unique routes and local, real media", () => {
  assert.deepEqual(
    featuredProjects.map((p) => p.slug),
    ["lwr-local", "bokigym", "english-learning"],
  );
  assert.equal(new Set(projects.map((p) => p.slug)).size, projects.length);
  for (const project of featuredProjects) {
    for (const device of ["desktop", "mobile"])
      assert.ok(
        existsSync(`public${project.media[device]}`),
        `${project.slug} ${device} capture is missing`,
      );
    for (const field of [
      "problem",
      "role",
      "architecture",
      "process",
      "challenges",
      "results",
      "next",
    ])
      assert.ok(
        project.caseStudy[field]?.length > 30,
        `${project.slug}: ${field}`,
      );
    assert.ok(project.evidence);
  }
});

test("Only approved public repository links are exposed; every demo uses HTTPS", () => {
  const approved = new Set([
    "exercise-app",
    "befluent",
    "bookeasy",
    "invoicepro",
    "IV-celan",
    "fitpro",
  ]);
  for (const project of projects) {
    if (project.liveUrl)
      assert.equal(new URL(project.liveUrl).protocol, "https:");
    if (project.githubUrl) {
      const url = new URL(project.githubUrl);
      assert.equal(url.origin, "https://github.com");
      assert.ok(approved.has(url.pathname.split("/")[2]));
    }
  }
  assert.equal(featuredProjects[0].githubUrl, null);
});

test("Professional employment is not registered as independent project work", () => {
  const serializedProjects = JSON.stringify(projects).toLowerCase();
  assert.ok(!serializedProjects.includes("nacd"));
  assert.ok(!serializedProjects.includes("national association of corporate directors"));
});

test("Case studies produce distinct titles, canonical URLs, and relevant schema", () => {
  for (const project of projects) {
    const meta = pageMeta(project);
    assert.ok(meta.title.includes(project.name));
    assert.equal(meta.description, project.summary);
    assert.equal(meta.url, `https://bojangolic.com/projects/${project.slug}`);
    assert.equal(meta.schema.name, project.name);
    assert.ok(!("aggregateRating" in meta.schema));
  }
});

test("Netlify uses generated static routes, native 404 handling, and static form detection", () => {
  const config = readFileSync("netlify.toml", "utf8");
  assert.ok(!config.includes('to = "/index.html"'));
  assert.ok(
    !readFileSync("public/_redirects", "utf8").includes("/* /index.html 200"),
  );
  assert.match(readFileSync("index.html", "utf8"), /data-netlify="true"/);
});
