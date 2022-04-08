export default class Team {
    constructor(teamName, groupName) {
        this.name = teamName,
        this.group = groupName,
        this.points = 0,
        this.goalsFor = 0,
        this.goalsAgainst = 0,
        this.matchesWon = 0,
        this.matchesDrawn = 0,
        this.matchesLost = 0
    }
}