const rankSummonerChampionMastery = require('./rankSummonerChampionMastery');
const rankMatchHistory = require('./rankMatchHistory');

const championRankings = async (region, id, accountId, matchHistoryWeight, masteryPointWeight) => {
  const rankingsMastery = await rankSummonerChampionMastery(region, id);
  const rankingsHistory = await rankMatchHistory(region, accountId);
  let rankings = {};

  const MATCH_HISTORY_WEIGHTING = matchHistoryWeight;
  const MASTERY_POINT_WEIGHTING = masteryPointWeight;

  for (const championHistory of rankingsHistory) {
    for (const championMastery of rankingsMastery) {
      if (championHistory[0] == championMastery[0]) {
        rankings[championHistory[0]] = rankingsHistory.indexOf(championHistory) + rankingsMastery.indexOf(championMastery);
        break;
      }
    }
  }

  var items = Object.keys(rankings).map(function(key) {
    return [key, rankings[key]];
  });
  
  items.sort(function(first, second) {
    return parseInt(first[1]) - parseInt(second[1]);
  });

  return items;
}

module.exports = championRankings