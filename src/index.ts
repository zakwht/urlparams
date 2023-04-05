const castStr = (s: string): string | boolean | number => {
  if (s === "true") return true;
  if (s === "false") return false;
  if (!isNaN(Number(s))) return Number(s);
  return s;
};

const definedObj = (o: Record<string, any>): Record<string, any> => {
  Object.entries(o).forEach(([k, v]) => {
    if (!v && v !== 0) delete o[k];
  });
  return o;
};

export class URLQuery {
  private params: URLSearchParams;

  constructor(search?: string | URLSearchParams | Record<string, any>) {
    if (!search) {
      if (typeof window === "undefined") throw TypeError("No search query");
      this.params = new URLSearchParams(window.location.search);
    } else if (search instanceof URLSearchParams) this.params = search;
    else if (search instanceof Object)
      this.params = new URLSearchParams(definedObj(search));
    else if (search.includes("?"))
      this.params = new URLSearchParams(
        search.substring(
          search.indexOf("?"),
          search.indexOf("#") >= 0 ? search.indexOf("#") : search.length
        )
      );
    else this.params = new URLSearchParams(search.split("?")[1] || search);
  }

  toURLParams = () => this.params;

  toObject = () => Object.fromEntries(this.params);

  toString = () => this.params.toString();

  toCastedObject = () =>
    Object.fromEntries(
      [...this.params.entries()].map(([k, v]) => {
        return [k, castStr(v)];
      })
    );

  isEmpty = () => this.params.toString() === "";
}
