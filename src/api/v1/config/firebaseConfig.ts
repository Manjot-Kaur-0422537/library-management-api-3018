import * as admin from "firebase-admin";
import serviceAccount from "../../../../final-project-3018-31d99-firebase-adminsdk-fbsvc-c710304088.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
  });
}
export const db = admin.firestore();   
export default admin;
