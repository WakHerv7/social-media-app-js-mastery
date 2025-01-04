import { INewPost, INewUser, IUpdatePost } from "@/types";
import { account, appwriteConfig, avatars, database, storage } from "./config";
import { ID, Query } from "appwrite";

export async function createUserAccount(user: INewUser) {
  try {
    const userAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
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
    );

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
      [Query.equal("accountId", currentAccount.$id)]
    );

    // check if there is a currentUser
    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}

export async function signOutUserAccount() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.log(error);
  }
}

export async function createPost(post: INewPost) {
  try {
    // first we create the file in the storage bucket
    const uploadedFile = await uploadFile(post.file[0]);

    if (!uploadFile) throw Error;

    // then we create a preview for the file
    const filePreview = getFilePreview(uploadedFile?.$id || "");

    if (!filePreview) {
      await deleteFile(uploadedFile?.$id || "");
      throw Error;
    }

    // Then we create an array from the tags
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    // then we upload the post in the database
    const savePostToDB = await database.createDocument(
      appwriteConfig.database,
      appwriteConfig.postsCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        imageId: uploadedFile?.$id,
        imageUrl: filePreview,
        caption: post.caption,
        location: post.location,
        tags: tags,
      }
    );

    if (!savePostToDB) {
      await deleteFile(uploadedFile?.$id || "");
      throw Error;
    }

    return savePostToDB;
  } catch (error) {
    console.log(error);
  }
}

export async function uploadFile(file: File) {
  try {
    const fileUploader = await storage.createFile(
      appwriteConfig.storage,
      ID.unique(),
      file
    );

    if (!fileUploader) throw Error;

    return fileUploader;
  } catch (error) {
    console.log(error);
  }
}

export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storage,
      fileId,
      800,
      800,
      "top",
      100
    );

    if (!fileUrl) throw Error;
    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFile(fileId: string) {
  try {
    const response = await storage.deleteFile(appwriteConfig.storage, fileId);
    if (response) {
      return { status: "ok" };
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getRecentPosts() {
  try {
    const recentPosts = await database.listDocuments(
      appwriteConfig.database,
      appwriteConfig.postsCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(20)]
    );

    if (!recentPosts) throw Error;

    return recentPosts;
  } catch (error) {
    console.log(error);
  }
}

export async function likePost(postId: string, likesArray: string[]) {
  try {
    const updatedPost = database.updateDocument(
      appwriteConfig.database,
      appwriteConfig.postsCollectionId,
      postId,
      {
        likes: likesArray,
      }
    );

    if (!updatedPost) throw Error;

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

export async function savePost(postId: string, userId: string) {
  try {
    const savedPost = await database.createDocument(
      appwriteConfig.database,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      {
        post: postId,
        user: userId,
      }
    );

    if (!savedPost) throw Error;

    return savedPost;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteSavedPost(savedRecordId: string) {
  try {
    const statusCode = await database.deleteDocument(
      appwriteConfig.database,
      appwriteConfig.savesCollectionId,
      savedRecordId
    );

    if (!statusCode) throw Error;

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

export async function getPostById(postId: string) {
  try {
    const post = await database.getDocument(
      appwriteConfig.database,
      appwriteConfig.postsCollectionId,
      postId
    );

    if (!post) throw Error;

    return post;
  } catch (error) {
    console.log(error);
  }
}

export async function updatePost(post: IUpdatePost) {
  const updateHasFile = post.file.length > 0;

  try {
    let image = {
      imageId: post.imageId,
      imageUrl: post.imageUrl,
    };

    if (updateHasFile) {
      // first we create the file in the storage bucket
      const uploadedFile = await uploadFile(post.file[0]);

      if (!uploadedFile) throw Error;

      // then we create a preview for the file
      const filePreview = getFilePreview(uploadedFile.$id);

      if (!filePreview) {
        await deleteFile(uploadedFile?.$id || "");
        throw Error;
      }

      image = { ...image, imageUrl: filePreview, imageId: uploadedFile.$id };
    }

    // Then we create an array from the tags
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    // then we upload the post in the database
    const savePostToDB = await database.updateDocument(
      appwriteConfig.database,
      appwriteConfig.postsCollectionId,
      post.postId,
      {
        imageId: image?.imageId,
        imageUrl: image?.imageUrl,
        caption: post.caption,
        location: post.location,
        tags: tags,
      }
    );

    if (!savePostToDB) {
      await deleteFile(post.imageId);
      throw Error;
    }

    return savePostToDB;
  } catch (error) {
    console.log(error);
  }
}

export async function deletePost(postId: string, imageId: string) {
  if (!postId || !imageId) throw Error;

  try {
    const statusCode = await database.deleteDocument(
      appwriteConfig.database,
      appwriteConfig.postsCollectionId,
      postId
    );

    if (!statusCode) throw Error;

    await deleteFile(imageId);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

export async function getAllPosts({ pageParams }: { pageParams: number }) {
  const query: any[] = [Query.orderDesc("$updatedAt"), Query.limit(20)];

  if (!pageParams) {
    query.push(Query.cursorAfter(pageParams.toString()));
  }

  try {
    const posts = await database.listDocuments(
      appwriteConfig.database,
      appwriteConfig.postsCollectionId,
      query
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

export async function getSearchPosts(searchTerm: string) {
  const query = [Query.search("caption", searchTerm)];

  try {
    const searchResult = database.listDocuments(
      appwriteConfig.database,
      appwriteConfig.postsCollectionId,
      query
    );

    if (!searchResult) throw Error;

    return searchResult;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllUsers() {
  try {
    const data = await database.listDocuments(
      appwriteConfig.database,
      appwriteConfig.usersCollectionId,
      [Query.limit(6)]
    );

    if (!data) throw Error;

    return data;
  } catch (error) {
    console.log(error);
  }
}
