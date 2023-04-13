import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { readFile } from 'fs/promises';
const serviceAccountKey = JSON.parse(
    await readFile(
        new URL('./serviceAccountKey.json', import.meta.url)
    )
);
const app = initializeApp({
    credential: cert(serviceAccountKey),
});
const auth = getAuth(app);
export default auth;