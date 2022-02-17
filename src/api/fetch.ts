// get token

let user = {
  username: "gmlogic@gmail.com",
  password: "1Mgergm++",
};

let token: string;

const domain = "https://dns.netshops.gr";

type creds = {
  username: string;
  password: string;
};

export const getToken = async (creds: creds) => {
  let response = await fetch(`${domain}/api/Token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(creds),
  });
  let result = await response.json();
  console.log(result);
  token = result.access_token;
  if (token) {
    localStorage.setItem("AppToken", token);
    return true;
  }
  return false;
};

export const makeRequest = async (
  method = "GET",
  url: string,
  body: any = null
) => {
  const auth = localStorage.getItem("AppToken");
  if (auth) {
    const defaultHeaders = {
      Accept: "application/json",
      Authorization: "bearer " + auth,
      body: JSON.stringify(body),
    };
    const response = await fetch(`${domain + url}`, {
      method: method,
      headers: defaultHeaders,
    });
    let result = await response.json();
    return result;
  }
};
