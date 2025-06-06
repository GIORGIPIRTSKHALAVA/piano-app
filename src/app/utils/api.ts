import axios from 'axios';

export const api = axios.create({
  baseURL: ' https://deezerdevs-deezer.p.rapidapi.com/infos  ', // optional
});
