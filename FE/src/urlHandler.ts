const API = 'http://localhost:8000';

const AUTH = '/auth';
const mapUrls: any = {
  base: '/',
  register: `${AUTH}/register`,
  login: `${AUTH}/login`,
  logout: `${AUTH}/logout`,
  refresh: `${AUTH}/refresh`,
};

export const urlToURI = (endpoint: string) => {
  return `${API}${mapUrls[endpoint]}`;
};

export function decodeJwtPayload(jwt: string) {
  //get payload
  const payload = jwt.split('.')[1];
  //first convert baseurl64 to base64
  //then convert base64 to string
  const decoded = window.atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
  //parse string to json
  return JSON.parse(decoded);
}

export function isTokenExpired(tokenExp: number) {
  const currentUnixTimestamp = Math.floor(Date.now() / 1000);
  return tokenExp < currentUnixTimestamp;
}

async function refreshTokenCallback(
  token: string,
  uri: string,
  responseParseCallback: any
) {
  localStorage.removeItem('accessToken');
  let refreshToken = localStorage.getItem('refreshToken');
  //call refresh route and reset token in local storage
  let response = await fetch(urlToURI('refresh'), {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
  });
  if (response.ok) {
    let data = await response
      .json()
      ?.catch((err) => console.error('error with refresh token', err));
    token = data?.accessToken;
    token && localStorage.setItem('accessToken', token);
    //call original route again
    return fetchWithCredentials(uri, responseParseCallback);
  }
  //push to login
}

export async function fetchWithCredentials(
  url: string,
  responseParseCallback: (response: Response) => Promise<any> = (
    //initialize responseParseCallback to use response.json() if not provided
    response: Response
  ) => response.json()
) {
  let token: string | null = localStorage.getItem('accessToken');
  if (!token) {
    //push to login
    console.error('no token');
    return;
  }

  try {
    let response = await fetch(urlToURI(url), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const error: any = new Error('error with fetch');
      error.response = response;
      throw error;
    }
    return await responseParseCallback(response);
  } catch (error: any) {
    if (error.response.status === 401) {
      refreshTokenCallback(token, url, responseParseCallback);
    }
    console.error('error with fetch', error.response);
  }
}
