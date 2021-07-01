import { BasePaging } from "./Base.js";

class LearnPaging extends BasePaging {
  name = "";
  constructor(page = 0, count = 10) {
    super(page, count);
  }
}

export { LearnPaging };
