import { Account, Client } from 'react-native-appwrite';

const endpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;
if (!endpoint || !projectId) {
  throw new Error('Missing env vars');
}

const client = new Client();
client.setEndpoint(endpoint).setProject(projectId).setPlatform('app.onemorerep');
export const account = new Account(client);
