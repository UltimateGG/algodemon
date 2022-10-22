import axios, { AxiosResponse } from 'axios';


const getToken = () => localStorage.getItem('token');

const getResponse = (res: AxiosResponse) => {
  return {
    status: res.status,
    error: res.data.error ? (res.data.message || 'Unknown error') : undefined,
    data: res.data
  };
}

export const apiGet = async (url: string, auth?: boolean) => {
  const res = await axios.get(`api/${url}`, {
    headers: {
      Authorization: auth ? `Bearer ${getToken()}` : '',
    }
  }).catch(err => {
    console.error(err);
    return err.response;
  });

  return getResponse(res);
}

export const apiPost = async (url: string, data: Object, auth: boolean = false) => {
  const res = await axios.post(`api/${url}`, JSON.stringify(data), {
    headers: {
      'Authorization': auth ? `Bearer ${getToken()}` : '',
      'Content-Type': 'application/json',
    }
  }).catch(err => {
    console.error(err);
    return err.response;
  });

  return getResponse(res);
}
