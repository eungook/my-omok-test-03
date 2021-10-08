// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  push,
  child,
  ref,
  update,
  onValue,
} from 'firebase/database';
import dotenv from 'dotenv';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
};
console.log({ firebaseConfig });

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase();

/**
 * 새 오목방을 만든다
 * @returns 새 오목방의 key
 */
async function createRoom() {
  const key = push(child(ref(database), 'room')).key;
  const updates = {};
  const now = new Date();
  updates[`/room/${key}`] = {
    createAt: now.getTime(),
    createAtISO: now.toISOString(),
    createAtLocale: now.toLocaleString(),
  };
  await update(ref(database), updates);
  return key;
}

/**
 * 오목방에 입장한다
 * @param {*} roomKey 오목방의 key
 * @param {*} color 입장하는 사람의 돌 색깔
 * @returns 입장한 사람의 key
 */
async function joinRoom(roomKey, color) {
  const updates = {};

  const key = push(child(ref(database), `room/${roomKey}/user`)).key;
  const now = new Date();
  updates[`/room/${roomKey}/user/${key}`] = {
    createAt: now.getTime(),
    createAtISO: now.toISOString(),
    createAtLocale: now.toLocaleString(),
    color,
  };

  await update(ref(database), updates);
  return key;
}

export {
  firebaseApp,
  database,
  createRoom,
  joinRoom,
};