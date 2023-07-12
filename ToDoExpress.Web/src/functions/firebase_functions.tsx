import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { auth, db } from "@/config/firebase";
import { ITodo, ITodoItem, IUser } from "@/interfaces/firebase_interfaces";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function firebaseConnexionRequest() {
  const fetchPost = async () => {
    await getDocs(collection(db, "users")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
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
      const path = todoItemRef.split("/");
      const todoItemData = await getDocumentById(path[0], path[1]);
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

export const logIn = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);

    try {
      const userData = await userFromUid(res.user.uid);
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          uid: res.user.uid,
          name: userData?.name,
          email: res.user.email,
        })
      );
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  } catch (err) {
    console.error("Authentication error !");
  }
};

export function logOut() {
  if (sessionStorage.getItem("user")) {
    sessionStorage.removeItem("user");
    window.location.reload();
  }
}

export async function register(name: string, email: string, password: string) {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const userRef = doc(db, "users", user.uid);
    const todosRef = doc(db, "todos", user.uid);

    await setDoc(userRef, {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });

    await setDoc(todosRef, {
      items: [],
    });

    logIn(email, password);
  } catch (err) {
    console.error(err);
  }
}

export async function addItemTodo(uid: string, todoItem: ITodoItem) {
  try {
    const todosItemsRef = collection(db, "todos_items");
    addDoc(todosItemsRef, {
      order: todoItem.order,
      title: todoItem.title,
      description: todoItem.description,
    }).then(async (docRef) => {
      const todosRef = doc(db, "todos", uid);
      await updateDoc(todosRef, {
        items: arrayUnion(docRef.path),
      });
      return true;
    });
  } catch (error) {
    console.error(error);
  }
  return false;
}
