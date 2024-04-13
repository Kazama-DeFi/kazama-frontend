import axios, { AxiosError } from 'axios';

const CHANGE_NOW_API_BASE_URL = 'https://api.changenow.io/v1';

export const getCurrencyList = async (active: boolean = true, fixedRate: boolean = true) => {
  try {
    const response = await axios.get(`${CHANGE_NOW_API_BASE_URL}/currencies`, {
      params: {
        active,
        fixedRate,
      },
    });
    return response.data;
  } catch (error) {
    // Log more details about the AxiosError
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('AxiosError details:', axiosError.response?.data || axiosError.message);
    } else {
      console.error('Error fetching currency list:', error);
    }
    throw error;
  }
};