import axios from "axios";

export const API = {
  getNews: () => axios.get('/news.json/'),
  postNews: (data) => axios.post('/news.json/', data)
}