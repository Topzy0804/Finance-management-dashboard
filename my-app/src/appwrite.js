
import { Client, Account, ID, Databases,TablesDB } from "appwrite";

export const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_API_ENDPOINT)
  .setProject(import.meta.env.VITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const id = ID;
export const tablesDB = new TablesDB(client);