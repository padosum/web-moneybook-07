import API from './index.js';
import {getQueryString} from '../utils/api.js';

const AccountHistoryAPI = {
  getList: filter => {
    const queryString = getQueryString(filter);
    return API.get(`/api/account-history${queryString}`);
  },
  post: detail => API.post('/api/account-history', detail),
  put: (id, detail) => API.put(`/api/account-history/${id}`, detail),
};

export default AccountHistoryAPI;
