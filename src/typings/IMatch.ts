interface Match {
  platformId: string,
  gameId: string,
  champion: string,
  queue: number,
  season: number,
  timestamp: number,
  role: string,
  lane: string
}

export { Match };