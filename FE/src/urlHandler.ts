const API = 'https://localhost:8000';

const AUTH = '/auth';
const mapUrls: any = {
  base: API + '/',
  register: `${AUTH}/register`,
  login: `${AUTH}/login`,
};

export const urlToURI = (endpoint: string) => {
  return `${API}${mapUrls[endpoint]}`;
};

export const requestFormatter: any = (method: string, data?: any) => {
  if (method === 'GET') {
    return {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(localStorage.getItem('accessToken') && {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }),
      },
    };
  }
};
