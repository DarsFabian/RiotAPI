import { RiotClient } from "./BaseClient";
import axios, { AxiosResponse } from "axios";
import { Summoner } from "./typings/ISummoner";

class LeagueClient extends RiotClient {

  private servers_v4: Array<string> = new Array<string>(11);
  //private servers_v5: Array<string> = new Array<string>(3);

  constructor(token: string) {
    super(token);
    this.servers_v4 = [
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
   * Tries to get a player from its username. If it doesn't get any, it will return null.
   * <b> Prefer providing a server parameter as the function will automatically try to get a valid '200 OK' reponse by querying each server if you don't. </b>
   * @param username username of the player.
   * @param server server to query. (null by default).
   * @returns Instance of {@link Summoner}
   */
  async getPlayer(username: string, server: string = null): Promise<Summoner | null> {
    username = username.trim();
    if(username == "" || username == null) throw new Error("The username cannot be empty or null!");

    if(server != null) {
      const reponse: AxiosResponse = await axios.get(`https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${this.token}`);
      if(reponse.status != 403) return reponse.data as Summoner;
      else return null;
    }

    for(let i = 0; i < this.servers_v4.length; i++) {
      const reponse: AxiosResponse = await axios.get(`https://${this.servers_v4[i]}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${this.token}`);
      if(reponse.status != 403) return reponse.data as Summoner;
    }
    return null;
  }
}

export { LeagueClient };