import { generateResultGoals, getWinnerTeamNameResult } from "../utils.js";

const LOCAL_TEAM = 0;
const localTeamText = "Home Team";
const VISIT_TEAM = 1;
const visitTeamText = "Guest Team";

export default class Group {
    constructor(name, teams, config) {
      this.name = name;
      this.teams = [];
      this.summaries = [];
      this.config = {};
      this.matchScheduleDay = [];
      this.setup(teams, config);
    }
  
    setup(teams, config) {
      this.teams = teams;
      this.config = config;
    }
  
    initRound() {
      const numberMatchDays = this.teams.length - 1;
      const numberMatchesPerMatchDays = this.teams.length / 2;
      for (let iMatchDays = 0; iMatchDays < numberMatchDays; iMatchDays++) {
        const matchDay = [];
        for (
          let iMatchesPerMatchDays = 0;
          iMatchesPerMatchDays < numberMatchesPerMatchDays;
          iMatchesPerMatchDays++
        ) {
          const match = [];
          match[LOCAL_TEAM] = localTeamText;
          match[VISIT_TEAM] = visitTeamText;
          matchDay.push(match);
        }
        this.matchScheduleDay.push(matchDay);
      }
    }
  
    setLocalTeamsRound() {
      const maxLocalTeams = this.teams.length - 2;
      let indexTeams = 0;
      for (const match of this.matchScheduleDay) {
        for (const matchDay of match) {
          matchDay[LOCAL_TEAM] = this.teams[indexTeams].name;
          indexTeams++;
          if (indexTeams > maxLocalTeams) {
            indexTeams = 0;
          }
        }
      }
    }
  
    setVisitTeamsRound() {
      const maxVisitTeams = this.teams.length - 2;
      let indexTeams = maxVisitTeams;
      for (const match of this.matchScheduleDay) {
        for (const matchDay of match) {
          if (match.indexOf(matchDay) == 0) {
            matchDay[VISIT_TEAM] = this.teams[maxVisitTeams + 1].name;
          } else {
            matchDay[VISIT_TEAM] = this.teams[indexTeams].name;
            indexTeams--;
            if (indexTeams < 0) {
              indexTeams = maxVisitTeams;
            }
          }
        }
      }
    }
  
    invertFirstMatchRound() {
      const initialPosition = 0;
      for (const match of this.matchScheduleDay) {
        if (this.matchScheduleDay.indexOf(match) % 2 != 0) {
          const matchDay = match[initialPosition];
          const visitTeam = matchDay[VISIT_TEAM];
          matchDay[VISIT_TEAM] = matchDay[LOCAL_TEAM];
          matchDay[LOCAL_TEAM] = visitTeam;
        }
      }
    }
  
    configScheduleMatchDays() {
      for (let i = 0; i < this.config.rounds; i++) {
        this.initRound();
        this.setLocalTeamsRound();
        this.setVisitTeamsRound();
        this.invertFirstMatchRound();
      }
    }
  
    play(matchDay) {
      const localResult = generateResultGoals();
      const visitResult = generateResultGoals();
      return {
        localTeam: matchDay[LOCAL_TEAM],
        localResult,
        visitTeam: matchDay[VISIT_TEAM],
        visitResult,
      };
    }
  
    updateTeams(result) {
      const localTeam = this.teams.find((team) => team.name == result.localTeam);
      const visitTeam = this.teams.find((team) => team.name == result.visitTeam);
  
      if (localTeam && visitTeam) {
        //Update goals
        localTeam.goalsFor += result.localResult;
        visitTeam.goalsFor += result.visitResult;
        localTeam.goalsAgainst += result.visitResult;
        visitTeam.goalsAgainst += result.localResult;
        //Update points
        if (result.localResult > result.visitResult) {
          //win localTeam
          localTeam.points += this.config.pointsPerWin;
          visitTeam.points += this.config.pointsPerLost;
          localTeam.matchesWon += 1;
          visitTeam.matchesLost += 1;
        } else if (result.visitResult > result.localResult) {
          //win visitTeam
          visitTeam.points += this.config.pointsPerWin;
          localTeam.points += this.config.pointsPerLost;
          visitTeam.matchesWon += 1;
          localTeam.matchesLost += 1;
        } else {
          //drawn
          localTeam.points += this.config.pointsPerDrawn;
          visitTeam.points += this.config.pointsPerDrawn;
          localTeam.matchesDrawn += 1;
          visitTeam.matchesDrawn += 1;
        }
      }
    }
  
    calculateStandings(matchSummaryResults, summaries) {
      const resultsBeforeMatchesDays = summaries.map(summary => summary.results);
      this.teams.sort(function (teamA, teamB) {
        //points
        if (teamA.points > teamB.points) {
          return -1;
        } else if (teamA.points < teamB.points) {
          return 1;
        } else {
          //match: teamA vs teamB
          if (teamA.points == teamB.points) {
            const winnerNameMatch = getWinnerTeamNameResult(
              teamA,
              teamB,
              matchSummaryResults,
              resultsBeforeMatchesDays
            );
            if (winnerNameMatch == teamA.name) {
              return -1;
            } else if (winnerNameMatch == teamB.name) {
              return 1;
            } else if (winnerNameMatch == null) {
              //goals
              const goalsDiffA = teamA.goalsFor - teamA.goalsAgainst;
              const goalsDiffB = teamB.goalsFor - teamB.goalsAgainst;
              if (goalsDiffA > goalsDiffB) {
                return -1;
              } else if (goalsDiffA < goalsDiffB) {
                return 1;
              } else {
                //alphabetic sort
                if (teamA.name > teamB.name) {
                  return 1;
                } else if (teamA.name < teamB.name) {
                  return -1;
                } else {
                  return 0;
                }
              }
            }
          }
        }
      });
    }
  
    start() {
      this.matchScheduleDay.forEach((match) => {
        const matchSummary = {
          results: [],
          standings: [],
        };
        //Results
        match.forEach((matchDay) => {
          const result = this.play(matchDay);
          this.updateTeams(result);
          matchSummary.results.push(result);
        });
        //Standings
        const func = this.getWinnerNameResult;
        this.calculateStandings(matchSummary.results, this.summaries, func);
        matchSummary.standings = this.teams.map(team => Object.assign({}, team));
        this.summaries.push(matchSummary);
      });
    }
  
    getLastStanding() {
      const indexLastStanding = this.summaries.length - 1;
      return this.summaries[indexLastStanding].standings;
    }
  }
  