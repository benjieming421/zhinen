import { BasePaging } from "./Base.js";

class UserPaging extends BasePaging {
  name = "";
  constructor(page, count) {
    super(page, count);
  }
}

export { UserPaging };
