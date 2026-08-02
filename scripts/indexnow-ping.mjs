/**
 * Pings IndexNow (Bing, Yandex, Seznam, Naver, Yep) with every URL in
 * public/sitemap.xml after a production build, so new /move and /guides
 * pages get crawled quickly instead of waiting for a scheduled crawl.
 *
 * Note: Google and Bing both retired the old `/ping?sitemap=` endpoints,
 * so IndexNow is the only remaining automatic submission channel.
 * Google discovery still happens via sitemap.xml + Search Console.
 *
 * Never fails the build — network problems only log a warning.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const HOST = "crosspath.site";
const KEY = "a621fe69b03641ac6aa14c88a20adf5b";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

function readSitemapUrls() {
  const xml = readFileSync(resolve("public/sitemap.xml"), "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1].trim())
    .filter((url) => url.startsWith(`https://${HOST}`));
}

async function main() {
  if (process.env.INDEXNOW_DISABLED === "1") {
    console.log("[indexnow] skipped (INDEXNOW_DISABLED=1)");
    return;
  }

  const urlList = readSitemapUrls();
  if (urlList.length === 0) {
    console.warn("[indexnow] no URLs found in public/sitemap.xml, skipping");
    return;
  }

  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    }),
  });

  const body = await response.text();
  if (response.ok) {
    console.log(`[indexnow] submitted ${urlList.length} URLs (${response.status})`);
  } else {
    console.warn(`[indexnow] submission failed [${response.status}]: ${body}`);
  }
}

main().catch((error) => {
  console.warn(`[indexnow] skipped: ${error?.message ?? error}`);
});