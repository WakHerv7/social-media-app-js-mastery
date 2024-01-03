import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, database } from "./config";
import { ID, Query } from "appwrite";

export async function createUserAccount(user: INewUser) {
  try {
    const userAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name,
    );

    if (!userAccount) {
      throw new Error("failed to create new user");
    }

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountId: userAccount.$id,
      name: userAccount.name,
      username: user.username,
      imageUrl: avatarUrl,
      email: userAccount.email,
    });

    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  username?: string;
}) {
  try {
    const newUser = await database.createDocument(
      appwriteConfig.database,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      user
    )

    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function signInUserAccount(user: {
  email: string;
  password: string;
}) {
  try {
    const session = await account.createEmailSession(user.email, user.password);
    return session;
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();

    // if there is no current user throw error
    if (!currentAccount) throw Error;

    const currentUser = await database.listDocuments(
      appwriteConfig.database,
      appwriteConfig.usersCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )

    // check if there is a currentUser
    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}

export async function signOutUserAccount() {
  try {
    const session = await account.deleteSession('current');
    return session;
  } catch (error) {
    console.log(error);
  }
}