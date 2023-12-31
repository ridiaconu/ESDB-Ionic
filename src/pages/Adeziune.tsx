import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
} from "@ionic/react";
import { logoGoogle } from "ionicons/icons";

const Adeziune = () => {
  const doLogin = (event: any) => {
    event.preventDefault();
    console.log("doLogin");
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Adeziune</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          <h1 className="ion-text-center">Hai alaturi de noi!</h1>
          <h2 className="ion-text-center ion-margin-top">
            Te rugam sa completezi rubricile de mai jos
          </h2>
          <IonCard>
            <IonCardContent>
              <form onSubmit={doLogin}>
                <IonInput
                  label="Nume"
                  labelPlacement="floating"
                  fill="outline"
                />
                <IonInput
                  label="Prenume"
                  labelPlacement="floating"
                  fill="outline"
                  className="ion-margin-top"
                />
                <IonInput
                  label="Adresa de E-mail"
                  labelPlacement="floating"
                  type="email"
                  fill="outline"
                  className="ion-margin-top"
                />

                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonList>
                          <IonItem>
                            <IonSelect
                              aria-label="Judet"
                              interface="action-sheet"
                              placeholder="Judet"
                            >
                              <IonSelectOption value="DJ">Dolj</IonSelectOption>
                              <IonSelectOption value="GJ">Gorj</IonSelectOption>
                              <IonSelectOption value="VL">
                                Valcea
                              </IonSelectOption>
                            </IonSelect>
                          </IonItem>
                        </IonList>
                      </IonItem>
                    </IonCol>
                    <IonCol>
                      <IonItem>
                        {" "}
                        <IonList>
                          <IonItem>
                            <IonSelect
                              aria-label="Oras"
                              interface="action-sheet"
                              placeholder="Oras"
                            >
                              <IonSelectOption value="DJ">
                                Craiova
                              </IonSelectOption>
                              <IonSelectOption value="GJ">
                                Targu Jiu
                              </IonSelectOption>
                              <IonSelectOption value="VL">
                                Ramnicu Valcea
                              </IonSelectOption>
                            </IonSelect>
                          </IonItem>
                        </IonList>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonGrid>
                <IonCheckbox labelPlacement="end">
                  <IonLabel className="ion-text-wrap">
                    Sunt de acord ca partidul SDB sa imi prelucreze datele
                    personale in conformitate cu reglementarile nationale si
                    europene in domeniul acesta
                  </IonLabel>
                </IonCheckbox>
                <IonButton
                  routerLink="/home/avizier"
                  type="button"
                  className="ion-margin-top"
                  expand="full"
                >
                  Trimite
                </IonButton>
              </form>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Adeziune;
