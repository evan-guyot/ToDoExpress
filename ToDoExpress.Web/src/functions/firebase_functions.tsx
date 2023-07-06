import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { IItem, ITodo, IUser } from "@/interfaces/firebase_interfaces";

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

export async function itemsFromUid(uid: string) {
  var documentData = await getDocumentById("todos", uid);

  return documentData ? (documentData as ITodo) : undefined;
}

async function getDocumentById(collectionPath: string, documentId: string) {
  const documentRef = doc(db, collectionPath, documentId);
  const documentSnapshot = await getDoc(documentRef);

  if (documentSnapshot.exists()) {
    const documentData = documentSnapshot.data();
    console.log("Document data:", documentData);
    return documentData;
  }
}
