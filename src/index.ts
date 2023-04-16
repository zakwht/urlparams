// Primitive types
type PType = string | number | boolean;
// Types accepted by UrlSearchParams constructor
type USPType = PType | Array<PType>;

const castStr = (s: string): string | boolean | number => {
  if (s === "true") return true;
  if (s === "false") return false;
  if (!isNaN(Number(s))) return Number(s);
  return s;
};

const definedObj = (o: Record<string, USPType>): Record<string, USPType> => {
  Object.entries(o).forEach(([k, v]) => {
    if (v == null || v === "") delete o[k];
  });
  return o;
};

export class URLParams {
  private params: URLSearchParams;

  constructor(search?: string | URLSearchParams | Record<string, USPType>) {
    if (!search) {
      if (typeof window === "undefined") throw TypeError("No search query");
      this.params = new URLSearchParams(window.location.search);
    } else if (search instanceof URLSearchParams) this.params = search;
    else if (typeof search === "object")
      //@ts-ignore: URLSearchParams does accept Record<string, USPType>
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

  append = (key: string, value: USPType) =>
    this.params.append(key, value.toString());

  set = (key: string, value: USPType) => this.params.set(key, value.toString());

  toURLSearchParams = () => this.params;

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
