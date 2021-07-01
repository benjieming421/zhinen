import { BasePaging } from "./Base.js";
class FeedBackPaging extends BasePaging {
  begin;
  end;
  constructor(begin = null, end = null, page = 0, count = 10) {
    super(page, count);
    this.begin = begin;
    this.end = end;
  }
}

export { FeedBackPaging };
