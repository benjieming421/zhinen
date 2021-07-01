import { BasePaging } from "./Base.js";

class OpinionPaging extends BasePaging {
  begin = null;
  end = null;
  status = null;
  constructor(page = 0, count = 10) {
    super(page, count);
  }
}

export { OpinionPaging };
