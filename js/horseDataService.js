const horseDataServiceUrl = "http://" + window.location.hostname + ":8080/";

getHorseGamesList = ()  => {
  return $.ajax({
      method:"get",
      url: horseDataServiceUrl + "games"
  })
}

getHorseGameData = (id) => {
    return $.ajax({
        method: "get",
        url: horseDataServiceUrl + "game/" + id
    });
}

getPlayersInGame = (id) => {
    return $.ajax({
        method: "get",
        url: horseDataServiceUrl + "game/" + id + "/players"
    });
}

getPlayerHorses = (gameId, playerId) => {
    return $.ajax({
        method: "get",
        url: horseDataServiceUrl + "game/" + gameId + '/horsesFor/' + playerId
    })
}

getHorseForm = (gameId, horseId) => {
    return $.ajax({
        method: "get",
        url: horseDataServiceUrl + "game/" + gameId + '/horseForm/' + horseId
    })
}


savePlayerHorses = (gameId, playerId, horses) => {
    return $.ajax({
        method: "post",
        url: horseDataServiceUrl + "game/" + gameId + '/horsesFor/' + playerId,
        data : STRINGIFY(horses),
        contentType: "application/json",
        dataType: 'json'
    });
}

updatePlayerData = (gameName, playerObject) => {
    return $.ajax({
        method:"put",
        url: horseDataServiceUrl + "game/" + gameName + "/players",
        data: STRINGIFY(playerObject),
        contentType: "application/json",
        dataType: 'json'
    });
}

getBetsForRace = (gameId, raceId) => {
    return $.ajax({
        method:"get",
        url: horseDataServiceUrl + "game/" + gameId + "/bets/" + raceId,
    });
}