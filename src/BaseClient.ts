class RiotClient {

  protected token: string; 

  constructor(token: string) {
    if(!token || token == "") new Error("You didn't provide any token.");
    this.token = token;
  }
}

export { RiotClient };