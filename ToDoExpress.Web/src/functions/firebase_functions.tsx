import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import {
  IItem,
  ITodo,
  ITodoItem,
  IUser,
} from "@/interfaces/firebase_interfaces";

function firebaseConnexionRequest() {
  const fetchPost = async () => {
    await getDocs(collection(db, "users")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(newData);
    });
  };

  fetchPost();

  return true;
}

export function firebaseConnexion(username: string, password: string) {
  var result = firebaseConnexionRequest();
  return result;
}

export async function userFromUid(uid: string) {
  var documentData = await getDocumentById("users", uid);

  return documentData ? (documentData as IUser) : undefined;
}

async function getDocumentById(collectionPath: string, documentId: string) {
  const documentRef = doc(db, collectionPath, documentId);
  const documentSnapshot = await getDoc(documentRef);

  if (documentSnapshot.exists()) {
    const documentData = documentSnapshot.data();
    return documentData;
  }
}

export async function getTodosItemsByUser(uid: string) {
  const documentData = await getDocumentById("todos", uid);
  var todosItems: Array<ITodoItem> = [];
  if (documentData) {
    for (const todoItemRef of documentData.items) {
      const itemId = todoItemRef._key.path.segments[6];
      const todoItemData = await getDocumentById("todos_items", itemId);
      console.log("item:", todoItemData);

      if (todoItemData) {
        const todoItem: ITodoItem = {
          title: todoItemData.title,
          order: todoItemData.order,
          description: todoItemData.description,
        };
        todosItems.push(todoItem);
      }
    }
    return todosItems;
  }

  return [];
}

export async function itemsFromUid(uid: string) {
  var documentData = await getDocumentById("todos", uid);

  return documentData ? (documentData as ITodo) : undefined;
}
