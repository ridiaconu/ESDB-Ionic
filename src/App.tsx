import { Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import Login from "./pages/Login";
import Profil from "./pages/Profil";
import Adeziune from "./pages/Adeziune";
import Docs from "./pages/Docs";
import Home from "./pages/Home";
import Organigrama from "./pages/Organigrama";
import Plata from "./pages/Plata";

import "./firebase";
import Anunturi from "./pages/Anunturi";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/">
          <Login />
        </Route>
        <Route component={Profil} path="/profil" />
        <Route component={Adeziune} path="/adeziune/" />
        <Route component={Docs} path="/docs/" />
        <Route component={Home} path="/home/" />
        <Route component={Plata} path="/plata/" />
        <Route component={Anunturi} path="/anunturi/" />
        <Route path="/organigrama/:context/" component={Organigrama} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
