class Idea {
  ideaUtext;
  userId;

  constructor(userId = null, ideaUtext = "") {
    this.ideaNumber = ideaUtext;
    this.userId = userId;
  }
}

export { Idea };
