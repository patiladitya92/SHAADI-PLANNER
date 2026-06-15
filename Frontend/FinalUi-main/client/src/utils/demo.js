process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const axios = require("axios");

const API_URL =
  "https://createtestuser.in/automation-campus/disabled/create/user";

const headers = {
  "roll-number": "250841220137",
  "Content-Type": "application/json",
  Cookie: "isUserLoggedIn=true",
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function sendOnce(i) {
  const payload = {
    firstName: "Load",
    lastName: "Test",
    phoneNumber: Math.floor(1000000000 + Math.random() * 9000000000),
    emailId: `jaiho.load+${Date.now()}_${i}@gmail.com`,
  };

  try {
    const res = await axios.post(API_URL, payload, { headers, timeout: 8000 });
    return { ok: true, status: res.status };
  } catch (e) {
    if (e.response) {
      return { ok: false, status: e.response.status };
    }
    return { ok: false, status: "NETWORK/TIMEOUT" };
  }
}

(async () => {
  const MAX_REQUESTS = 3000000;     // small, responsible sample
  const INTERVAL_MS = 50;    // 2 req/sec

  console.log("🔎 Starting rate-limit detection…");
  for (let i = 1; i <= MAX_REQUESTS; i++) {
    const r = await sendOnce(i);
    console.log(`#${i}`, r);

    // Stop if rate limiting or infra stress appears
    if (r.status === 429 || r.status === 504) {
      console.log("🟡 Limiting/instability detected — stopping test.");
      break;
    }
    await sleep(INTERVAL_MS);
  }
})();