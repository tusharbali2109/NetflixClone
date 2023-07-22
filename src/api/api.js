import axios from "axios";
const URL = "https://api.themoviedb.org/3";
const API_KEY = "303337de587d335469343664c5333a9c";

const endpoints = {
  originals: "/discover/tv",
  trending: "/trending/all/week",
  now_playing: "/movie/now_playing",
  popular: "/movie/popular",
  top_rated: "/movie/top_rated",
  upcoming: "/movie/upcoming",
};

export const fetchData = (param) => {
  return axios.get(`${URL}${endpoints[param]}?api_key=${API_KEY}`);
};
// https://api.themoviedb.org/3/movie/550?api_key=e2f779fc682f58163e76df5c47256e8e
