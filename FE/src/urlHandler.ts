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

function decodeJwtPayload(jwt: string) {
  //get payload
  const payload = jwt.split('.')[1];
  //first convert baseurl64 to base64
  //then convert base64 to string
  const decoded = window.atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
  //parse string to json
  return JSON.parse(decoded);
}

function isTokenExpired(tokenExp: number) {
  const currentUnixTimestamp = Math.floor(Date.now() / 1000);
  return tokenExp < currentUnixTimestamp;
}

export const fetchWithCredentials: any = async (
  url: string
): Promise<Response | undefined> => {
  let token: string | null = localStorage.getItem('accessToken');
  if (!token) {
    //push to login
    console.error('no token');
    return;
  }
  let parsedToken: Record<string, number> | null = null;
  try {
    parsedToken = decodeJwtPayload(token);
  } catch (err: unknown) {
    console.error('error with parsing token', err);
  }
  if (parsedToken && isTokenExpired(parsedToken.exp)) {
    localStorage.removeItem('accessToken');
    let refreshToken = localStorage.getItem('refreshToken');
    //call refresh route and reset token in local storage
    let response = await fetch(urlToURI('refresh'), {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
    let data = await response
      .json()
      ?.catch((err) => console.error('error with refresh token', err));
    token = data?.accessToken;
    token && localStorage.setItem('accessToken', token);
  }
  return fetch(urlToURI(url), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};
