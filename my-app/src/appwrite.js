import { Client, Account, ID, TablesDB } from "appwrite";

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_API_ENDPOINT)
  .setProject(import.meta.env.VITE_PROJECT_ID);

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
export const id = ID;