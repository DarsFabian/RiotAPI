import { RiotClient } from "./BaseClient";
import axios, { AxiosResponse } from "axios";
import { Summoner } from "./typings/ISummoner";

class LeagueClient extends RiotClient {

  private servers: Array<string> = new Array<string>(11);

  constructor(token: string) {
    super(token);
    this.servers = [
      "euw1",
      "eun1",
      "br1",
      "jp1",
      "kr",
      "la1",
      "la2",
      "na1",
      "oc1",
      "ru",
      "tr1"
    ];
  }

  /**
   * 
   * @param username username of the player.
   * @returns Instance of {@link Summoner}
   */
  async getPlayer(username: string): Promise<Summoner | null> {
    username = username.trim();
    if(username == "" || username == null) throw new Error("The username cannot be empty or null!");
    for(let i = 0; i < this.servers.length; i++) {
      const reponse: AxiosResponse = await axios.get(`https://${this.servers[i]}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${this.token}`);
      if(reponse.status != 403) return reponse.data as Summoner;
    }
    return null;
  }
}

export { LeagueClient };