import { API_HOST } from "../constants";

const millisecondsInAnHour = 60 * 60 * 1000;

function generateRequestTimestamp(args) {
  return {
    ...args,
    time: Date.now(),
  };
}

class ProjectRequestHandler {
  constructor() {
    this.requestsLog = [];
  }

  async fetch(url, options = {}, data = {}) {
    if (this.requestsLog.length) {
      const [firstRequest, ...rest] = this.requestsLog;
      const { time } = firstRequest;

      if (Date.now() - time < millisecondsInAnHour) {
        this.requestLog = rest;
      } else {
        // eslint-disable-next-line no-console
        console.warn(
          `Already completed ${this.requestlog.length} requests in throttle window`
        );
      }
    }

    this.requestsLog.push(generateRequestTimestamp({ url }));

    const { method } = options;
    const fetchURL = new URL(`${API_HOST}${url}`);
    if (method === "GET") {
      fetchURL.search = new URLSearchParams(data).toString();
    }

    const response = await fetch(fetchURL, {
      ...options,
      ...(["POST", "UPDATE"].includes(method)
        ? { data: JSON.stringify(data) }
        : {}),
    });

    try {
      return response.json();
    } catch (err) {
      console.log(err);
    }

    return null;
  }
}

const RequestHandler = new ProjectRequestHandler();

export default RequestHandler;
