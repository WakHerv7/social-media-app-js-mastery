import { Client, Account, Databases, Storage, Avatars } from 'appwrite';

export const appwriteConfig = {
  projectId: import.meta.env.VITE_APP_APPWRITE_PROJECT_ID,
  endpoint: import.meta.env.VITE_APP_APPWRITE_PROJECT_URL,
  database: import.meta.env.VITE_APP_APPWRITE_DATABASE_ID,
  storage: import.meta.env.VITE_APP_APPWRITE_STORAGE_ID,
  savesCollectionId: import.meta.env.VITE_APP_APPWRITE_SAVES_COLLECTION_ID,
  postsCollectionId: import.meta.env.VITE_APP_APPWRITE_POSTS_COLLECTION_ID,
  usersCollectionId: import.meta.env.VITE_APP_APPWRITE_USERS_COLLECTION_ID,
}

// create an instance of  the client
export const client = new Client();

// configure the client using the projectID and appwrite config
client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.endpoint);

// pass client to the other appwrite SDK
export const account = new Account(client); // Account creation
export const database = new Databases(client); // Database creation
export const storage = new Storage(client); // storage buckets
export const avatars = new Avatars(client); // images and avatars