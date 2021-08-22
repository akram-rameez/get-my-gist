import { API_HOST } from "../constants";

class ProjectRequestHandler {
  constructor(onError) {
    this.onError = onError;
  }

  async _requestErrorHandler(error, response) {
    if (error) {
      return this.onError(error);
    }

    try {
      const body = await response.json();

      if (body.message) {
        const { message } = body;
        if (message.indexOf("API rate limit exceeded") > -1) {
          return this.onError(new Error("RateLimitExceeded"));
        }
      }
    } catch (err) {
      return this.onError(new Error("UnknownError"));
    }

    return this.onError(null);
  }

  // eslint-disable-next-line class-methods-use-this
  async fetch(url, options = {}, data = {}) {
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

    const { status } = response;
    if (status >= 400) {
      return this._requestErrorHandler(null, response);
    }

    try {
      return response.json();
    } catch (err) {
      return this.onError(new Error("UnknownError"));
    }
  }
}

function getRequestHandler(onError) {
  return new ProjectRequestHandler(onError);
}

export default getRequestHandler;
