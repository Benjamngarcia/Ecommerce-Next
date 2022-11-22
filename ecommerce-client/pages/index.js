import { useEffect, useState } from "react"
import { size } from "lodash"
import { Loader } from "semantic-ui-react";
import BasicLayout from "../layouts/BasicLayout"
import { getLastGamesApi } from "../api/games"
import ListGames from "../components/ListGames";

export default function Home(props) {
  const [games, setGames] = useState(null)

  useEffect(() => {
    (async () => {
      const response = await getLastGamesApi(50)
      if (size(response) > 0) {
        getAttributesGame(response)
      } else {
        setGames([])
      }
    })()
  }, [])

  function getAttributesGame(games) {
    let gameArr = []
    games.data.map((game) => {
      gameArr.push(game.attributes)
      setGames(gameArr || [])
    })
  }


  return (
    <BasicLayout className="home">
      {!games && <Loader active>Cargando juegos</Loader>}
      {games && size(games) === 0 && (
        <div>
          <h3>No hay juegos</h3>
        </div>
      )}
      {size(games) > 0 && <ListGames games={games} />}
    </BasicLayout>
  )
}
