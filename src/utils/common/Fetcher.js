export default class Fetcher {
  #baseURL;
  #handlers;
  #headers;

  /**
   * Create fetcher
   * @param {{baseURL: string, handlers: (response: Response) => Response, headers: HeadersInit}}
   */
  constructor({
    baseURL,
    handlers = [],
    headers = { "Content-Type": "application/json" },
  }) {
    if ((!handlers) instanceof Array)
      throw new Error("Handlers should be array");

    const defaultHandler = (res) => {
      if (!res.ok)
        throw new Error(
          `Error occured while fetching ${res.url}. Status: ${res.status}.`,
        );

      return res;
    };

    this.#baseURL = baseURL;
    this.#handlers = [...handlers, defaultHandler];
    this.#headers = structuredClone(headers);
  }

  /**
   * HTTP Method GET Request
   * @param {string} url
   * @param {{queryParams: Record<string, string>}} options
   */
  async get(url, { type = "json", queryParams = {} } = {}) {
    const queryString = this.convertParamsToQueryString(queryParams);
    const res = await fetch(`${this.#baseURL}${url}${queryString}`);
    const handledRes = this._handleResponse(res);

    let data;
    if (type === "json") {
      data = await handledRes.json();
    }
    if (type === "text") data = await handledRes.text();

    return data;
  }

  async post(url, body) {
    const res = await fetch(`${this.#baseURL}${url}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: this.#headers,
    });

    const handledRes = this._handleResponse(res);

    const data = await handledRes.json();

    return data;
  }

  setHeaders({ key, value }) {
    this.#headers.set(key, value);
  }

  convertParamsToQueryString(params) {
    const searchParams = new URLSearchParams();
    for (const key in params) {
      if (params[key] !== undefined && params[key] !== null)
        searchParams.set(key, params[key]);
    }

    return searchParams.size ? `?${searchParams.toString()}` : "";
  }

  /**
   * @param {Response} res
   * @returns {Response}
   */
  _handleResponse(res) {
    return this.#handlers.reduce((prevRes, handle) => handle(prevRes), res);
  }
}

export const serverFetcher = new Fetcher({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  handlers: [
    (res) => {
      if (res.status === 401) throw new UnAuthorizedError();
      return res;
    },
    (res) => {
      if (res.status === 404) throw new APINotFoundError();
      return res;
    },
  ],
});

export const iconFetcher = new Fetcher({
  baseURL: `${import.meta.env.VITE_ASSET_ENDPOINT}/icons`,
  headers: {},
});
