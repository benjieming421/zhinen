import { BasePaging } from "./Base.js";
class CoursePaging extends BasePaging {
  name;
  // eslint-disable-next-line constructor-super
  constructor(name = "", page, count = 15) {
    super(page, count);
    this.name = name;
  }
}

export { CoursePaging };
