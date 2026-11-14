import { Platform } from 'react-native';

// Set this to your computer's IP so your PHONE can reach the API
const PHONE_URL = 'http://192.168.254.129:5000';

function getBaseUrl() {
  if (Platform.OS === 'web') return 'http://localhost:5000';
  if (PHONE_URL) return PHONE_URL;
  return Platform.OS === 'android' ? 'http://10.0.2.2:5000' : 'http://localhost:5000';
}

export const API_URL = `${getBaseUrl()}/api/todos`;