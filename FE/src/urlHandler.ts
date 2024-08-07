import { useAuthContext } from './context/authContext';
const API = `${import.meta.env.VITE_API_URL}`;
const WS = `${import.meta.env.VITE_WS_URL}`;

const AUTH = '/auth';
const mapUrls: any = {
  base: '/',
  revalidate: `${AUTH}`,
  register: `${AUTH}/register`,
  login: `${AUTH}/login`,
  logout: `${AUTH}/logout`,
  refresh: `${AUTH}/refresh`,
  searchUsers: '/search_users/',
  getFriendsListIds: '/friends/list_ids',
  addFriend: '/friends/add',
  removeFriend: '/friends/remove',
  searchFriends: '/friends/search',
  getUsers: '/users',
  chat: '/chat',
  chatExists: '/chat/check_exists',
  allChats: '/chat/list',
};

export const urlToURI = (endpoint: string, protocol?: string) => {
  return `${protocol === 'ws' ? WS : API}${mapUrls[endpoint]}`;
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

async function refreshTokenCallback(token: string) {
  localStorage.removeItem('accessToken');
  let refreshToken = localStorage.getItem('refreshToken');
  //call refresh route and reset token in local storage
  try {
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
      return true;
    }
    return false;
  } catch (error) {
    console.error('error with refresh token', error);
    return false;
  }
}

async function fetchWithCredentials(
  url: string,
  responseParseCallback: (response: Response) => Promise<any>,
  setUserisAuthenticated: (value: boolean) => void,
  customHeaders?: any,
  retry = 1
): Promise<any> {
  let token: string | null = localStorage.getItem('accessToken');
  if (!token) {
    //push to login
    console.error('no token');
    setUserisAuthenticated(false);
    return;
  }

  let config: any = {
    cache: 'no-store',
    ...(customHeaders && { ...customHeaders }),
  };
  config.headers = {
    ...(config.headers && { ...config.headers }),
    Authorization: `Bearer ${token}`,
  };
  let finalUrl: string = urlToURI(url).includes('undefined')
    ? url
    : urlToURI(url);
  try {
    let response = await fetch(finalUrl, { ...config });
    if (!response.ok) {
      const error: any = response;
      throw error;
    }
    setUserisAuthenticated(true);
    const data = await responseParseCallback(response);
    return { data, status: response.status, ok: response.ok };
  } catch (error: any) {
    if (error?.response?.status === 401) {
      const isRefreshSuccesful = await refreshTokenCallback(token);
      return isRefreshSuccesful
        ? //if refresh is successful, retry fetch
          retry >= 0 &&
            fetchWithCredentials(
              url,
              responseParseCallback,
              setUserisAuthenticated,
              retry - 1
            )
        : //if refresh is not successful, redirect to login
          setUserisAuthenticated(false);
    }
    console.error('error with fetch', error);
    return error;
  }
}

export function useFetchWithCredentials() {
  const { setUserIsAuthenticated } = useAuthContext();
  return async (
    url: string,
    customHeaders?: any,
    responseParseCallback: (response: Response) => Promise<any> = (
      //initialize responseParseCallback to use response.json() if not provided
      response: Response
    ) => response.json()
  ): Promise<any> => {
    return await fetchWithCredentials(
      url,
      responseParseCallback,
      setUserIsAuthenticated,
      customHeaders
    );
  };
}
