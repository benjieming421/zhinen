class BasePaging {
  page;
  count;
  constructor(page = 0, count = 10) {
    this.page = page;
    this.count = count;
  }
}

export { BasePaging };
