import React from "react"
import { API } from "../api"

export const GetNews = (e) => {
  const [ news, setNews ] = React.useState(null)

  React.useEffect(() => {
    API.getNews()
      .then(res => {
        const result = Object.entries(res.data).map(([id, item]) => {
          return {
            item
          }
        })
        setNews(result.reverse());
      })
  }, [])

  return {
    news
  }
}