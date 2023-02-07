import { check, sleep, group } from "k6";
import http from "k6/http";

export const options = {
  stages: [
    { duration: "50s", target: 70 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
    { duration: "100s", target: 70 }, // stay at 100 users for 10 minutes
    { duration: "50s", target: 0 }, // ramp-down to 0 users
  ],
};

export default function () {
  let response;

  group("buka page", function () {
    response = http.get("https://your-url-here.com");
    sleep(1);
    check(response, {
      "status is 200": (r) => r.status === 200,
    });
  });
}
