import {worldTeams} from "./data.js"

export const generateResultGoals = function() {

    for (var i = 0; i< worldTeams.length;i++){
   
  
      return Math.floor((Math.random() * (7)));
    }
    }
     // console.log(generateResultGoals());

     function searchResultMatch(teamA, teamB, results) {
        let result = results.filter(
          (result) =>
            result.localTeam == teamA.name && result.visitTeam == teamB.name
        );
        if (result.length == 0) {
          result = results.filter(
            (result) =>
              result.localTeam == teamB.name && result.visitTeam == teamA.name
          );
        }
        return result;
      }

      function getWinnerNameResult(result) {
        if (result[0].localResult > result[0].visitResult) {
          return result[0].localTeam;
        } else if (result[0].localResult < result[0].visitResult) {
          return result[0].visitTeam;
        } else {
          return null;
        } 
      }