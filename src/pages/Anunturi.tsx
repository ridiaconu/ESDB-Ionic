import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { onAuthStateChanged } from "firebase/auth";
import {
  DocumentData,
  DocumentSnapshot,
  QueryDocumentSnapshot,
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";

const Anunturi: React.FC = () => {
  let isMember: boolean;
  const [memberData, setMemberData] = useState<
    QueryDocumentSnapshot | undefined
  >(undefined); // Use state to store the member data
  const [anunturiCentral, setAnunturiCentral] = useState<
    QueryDocumentSnapshot[] | undefined
  >(undefined);
  const [anunturiJudetean, setAnunturiJudetean] = useState<
    QueryDocumentSnapshot[] | undefined
  >(undefined);
  const [anunturiLocal, setAnunturiLocal] = useState<
    QueryDocumentSnapshot[] | undefined
  >(undefined);
  const [filialeJudetene, setFilialeJudetene] = useState<
    Array<String> | undefined
  >(undefined);
  const [filialeLocale, setFilialeLocale] = useState<Array<String> | undefined>(
    undefined
  );

  const fireDb = db;
  const fireAuth = auth;

  useEffect(() => {
    async function fetchMemberData() {
      const data = await getMemberData();
      setMemberData(data); // Update the state with the member data
    }

    fetchMemberData();
  }, []);

  useEffect(() => {
    async function fetchAnunturiCentral() {
      const anunturi = await getAnunturi("Central");
      setAnunturiCentral(anunturi);
    }

    fetchAnunturiCentral();
  }, []);
  useEffect(() => {
    async function fetchAnunturiJudetean() {
      if (memberData) {
        const anunturi = await getAnunturi(memberData.data()?.filialaJudeteana);
        setAnunturiJudetean(anunturi);
      } else {
        const anunturi = await getAnunturi("Dolj");
        setAnunturiJudetean(anunturi);
      }
    }

    fetchAnunturiJudetean();
  }, []);
  useEffect(() => {
    async function fetchAnunturiLocal() {
      if (memberData) {
        const anunturi = await getAnunturi(memberData.data()?.filialaLocala);
        setAnunturiLocal(anunturi);
      } else {
        const anunturi = await getAnunturi("Craiova");
        setAnunturiLocal(anunturi);
      }
    }

    fetchAnunturiLocal();
  }, []);

  useEffect(() => {
    async function fetchFilialeJudetene() {
      const data = await getFilialeJudetene();
      setFilialeJudetene(data); // Update the state with the member data
    }

    fetchFilialeJudetene();
  }, []);

  useEffect(() => {
    async function fetchFilialeLocale() {
      const data = await getFilialeLocale();
      setFilialeLocale(data); // Update the state with the member data
    }

    fetchFilialeLocale();
  }, []);

  async function getMemberData(): Promise<QueryDocumentSnapshot | undefined> {
    let user = auth.currentUser;

    if (user) {
      const uid = user.uid;
      const docRef = doc(db, "members", uid);

      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Member data:", docSnap.data());
          return docSnap;
        } else {
          console.log("Member does not exist");
          return undefined;
        }
      } catch (error) {
        console.error("Error getting member data:", error);
        throw error;
      }
    } else {
      console.log("User is not authenticated");
      return undefined;
    }
  }

  async function getAnunturi(
    filiala: string
  ): Promise<QueryDocumentSnapshot[] | undefined> {
    const colRef = collection(db, "filiale/" + filiala + "/anunturi");
    try {
      const colSnap = await getDocs(colRef);
      const anunturi: QueryDocumentSnapshot[] = [];

      for (const doc of colSnap.docs) {
        if (doc.data()?.isInternal == true) {
          doc.data().titlu = "🟣" + doc.data()?.titlu;
          anunturi.push(doc);
        } else {
          doc.data().titlu = "🔴" + doc.data()?.titlu;
          anunturi.push(doc);
        }
      }

      return anunturi;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async function getFilialeJudetene(): Promise<String[] | undefined> {
    const colRef = collection(db, "filiale");
    try {
      const colSnap = await getDocs(colRef);
      const filialeJudetene = [];
      for (const doc of colSnap.docs) {
        if (doc.data()?.context == "judetean") {
          filialeJudetene.push(doc.id);
        }
      }
      return filialeJudetene;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async function getFilialeLocale(): Promise<String[] | undefined> {
    const colRef = collection(db, "filiale");
    try {
      const colSnap = await getDocs(colRef);
      const filialeLocale = [];
      for (const doc of colSnap.docs) {
        if (doc.data()?.context == "local") {
          filialeLocale.push(doc.id);
        }
      }
      return filialeLocale;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  if (memberData == undefined) {
    isMember = false;
  } else {
    isMember = true;
  }

  switch (isMember) {
    case true:
      return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Anunturi</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent className="ion-padding">
            {anunturiCentral?.map((anunt, index) => (
              <IonCard key={index}>
                <IonCardTitle>
                  {anunt.data().isInternal ? "🟣 " : "🔴 "}
                  {anunt.data().titlu}
                </IonCardTitle>

                <IonCardContent>
                  <div>{anunt.data().content}</div>
                  <IonButton routerLink="/plata/cotizatie" expand="full">
                    Deschide anuntul
                  </IonButton>
                </IonCardContent>
              </IonCard>
            ))}
          </IonContent>
        </IonPage>
      );

      break;
    case false:
      return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Anunturi</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent className="ion-padding">
            {anunturiCentral
              ?.filter((anunt) => anunt.data().isInternal === false)
              .map((anunt, index) => (
                <IonCard key={index}>
                  <IonCardTitle>🔴 {anunt.data().titlu}</IonCardTitle>

                  <IonCardContent>
                    <div>{anunt.data().content}</div>
                    <IonButton routerLink="/plata/cotizatie" expand="full">
                      Deschide anuntul
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              ))}
          </IonContent>
        </IonPage>
      );
  }
};

export default Anunturi;
