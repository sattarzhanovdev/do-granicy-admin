import axios from "axios";

export const API = {
  getNews: () => axios.get('/news.json/'),
  deleteNew: (id) => axios.delete('/news.json/', id ),
  postNews: (data) => axios.post('/news.json/', data)
}