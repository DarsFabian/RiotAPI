class RiotClient {

  private token: string; 

  constructor(token: string) {
    if(!token || token == "") new Error("You didn't provide any token.");
    this.token = token;
  }

  displayToken = (): void => {
    console.log(this.token);
  }

  getToken = (): string => {
    return this.token;
  }
}

export { RiotClient };