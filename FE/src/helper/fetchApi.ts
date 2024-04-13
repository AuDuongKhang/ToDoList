import {baseUrl} from '../constant';

export const fetchApi = async ({ url = "", method = "GET", body = {} }) => {
  const newUrl = baseUrl + url;
  return await fetch(newUrl, {
    method: method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    referrerPolicy: "no-referrer",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
    },
    body: method === "GET" || method === "DELETE" ? null : JSON.stringify(body),
  });
};
