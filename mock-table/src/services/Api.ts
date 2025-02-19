import axios, { AxiosResponse } from "axios";

const baseURL = `https://api.artic.edu`;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getData = async (pageNumber: number = 1) => {
  return await api.get(`/api/v1/artworks?page=${pageNumber}`);
};
