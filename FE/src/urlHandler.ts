const API = 'http://localhost:8000';

const AUTH = '/auth';
const mapUrls: any = {
  register: `${AUTH}/register`,
  login: `${AUTH}/login`,
};

export const urlToURI = (endpoint: string) => {
  return `${API}${mapUrls[endpoint]}`;
};
