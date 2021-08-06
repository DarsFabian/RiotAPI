import { RiotClient } from "./BaseClient";
import axios, { AxiosResponse } from "axios";
import { Summoner } from "./typings/ISummoner";
import { Match } from "./typings/IMatch";

class LeagueClient extends RiotClient {

  private servers_v4: Array<string> = new Array<string>(11);
  private servers_v5: Array<string> = new Array<string>(3);

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
    this.servers_v5 = [
      "europe",
      "asia",
      "america"
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
      if(reponse.status == 200) return reponse.data as Summoner;
      else return null;
    }

    for(let i = 0; i < this.servers_v4.length; i++) {
      const reponse: AxiosResponse = await axios.get(`https://${this.servers_v4[i]}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${this.token}`);
      if(reponse.status == 200) return reponse.data as Summoner;
    }
    return null;
  }

  /**
   * Fetches the player's last matches id. If it doesn't get any it will return null.
   * <b> Prefer providing a server parameter as the function will automatically try to get a valid '200 OK' reponse by querying each server if you don't. </b>
   * @param puuid the player's unique identifier {@link Summoner}.
   * @param server server to query (null by default).
   * @param startIndex where to start fetching the data (defaults to the last match played).
   * @param count how many matches to fetch. (defaults to 1).
   * @return Instance of Array<{@link Match}>
   */
  async getPlayerMatchId(puuid: string, server: string = null, startIndex = 0, count = 1): Promise<Array<Match> | null> {
    puuid = puuid.trim();
    if(puuid == "" || puuid == null) throw new Error("accountId cannot be empty or null!");
    if(server != null) {
      server = server.trim();

      const response: AxiosResponse = await axios.get(`https://${server}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?/start=${startIndex}&count=${count}&api_key=${this.token}`);
      if(response.status == 200) return response.data as Array<Match>;
      else return null;
    }

    for(let i = 0; i < this.servers_v5.length; i++) {
      const response: AxiosResponse = await axios.get(`https://${this.servers_v5[i]}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?/start=${startIndex}&count=${count}&api_key=${this.token}`);
      if(response.status == 200) return response.data as Array<Match>;
    }
    return null;
  }
}

export { LeagueClient };