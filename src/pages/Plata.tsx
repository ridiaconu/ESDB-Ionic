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
          <h1 className="ion-text-center">Plata Cotizatie</h1>
          <h2 className="ion-text-center ion-margin-top">Date Platitor</h2>
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
                <IonInput
                  label="Telefon"
                  labelPlacement="floating"
                  type="tel"
                  fill="outline"
                  className="ion-margin-top"
                />

                <IonGrid>
                  <IonRow>
                    <IonCol>
                      {" "}
                      <IonInput
                        label="Oras de domiciliu"
                        labelPlacement="floating"
                        fill="outline"
                      />
                    </IonCol>
                    <IonCol>
                      <IonItem className="ion-margin-top">
                        {" "}
                        <IonList>
                          <IonItem>
                            <IonSelect
                              className="never-flip"
                              aria-label="Tara"
                              interface="action-sheet"
                              placeholder="Tara"
                            >
                              <IonSelectOption value="RO">
                                Romania
                              </IonSelectOption>
                              <IonSelectOption value="EU">
                                Spatiul Economic European
                              </IonSelectOption>
                              <IonSelectOption value="NOEU">
                                Tara in afara spatiului econimic european
                              </IonSelectOption>
                            </IonSelect>
                          </IonItem>
                        </IonList>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonGrid>
                <IonInput
                  label="Suma"
                  labelPlacement="floating"
                  type="number"
                  fill="outline"
                />
                <IonButton
                  routerLink="/home/avizier"
                  type="button"
                  className="ion-margin-top"
                  expand="full"
                >
                  Plateste
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
