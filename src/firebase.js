// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  push,
  child,
  ref,
  update,
  onValue,
  get,
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

  const uri = `/room/${roomKey}/user`;
  const key = push(child(ref(database), uri)).key;
  const now = new Date();
  updates[`${uri}/${key}`] = {
    createAt: now.getTime(),
    createAtISO: now.toISOString(),
    createAtLocale: now.toLocaleString(),
    color,
  };

  await update(ref(database), updates);
  return key;
}

/**
 * 오목방의 snapshot을 가져온다
 * @param {*} roomKey 오목방의 key
 * @returns 해당 오목방의 snapshot
 */
async function getRoomSnapshot(roomKey) {
  const result = await get(child(ref(database), `/room/${roomKey}`));
  if (result.exists() === false) return null; // early return

  const snapshot = result.val();
  return snapshot;
}

/**
 * 오목판에 돌을 놓는다
 * @param {*} roomKey 오목방의 key
 * @param {*} color 돌 색깔
 * @param {*} yx [y, x] 오목판 y좌표, x좌표 (index)
 * @returns update()의 Promise
 */
function playStone(roomKey, color, yx) {
  const updates = {};

  const uri = `room/${roomKey}/play`;
  const key = push(child(ref(database), uri)).key;
  const now = new Date();
  updates[`${uri}/${key}`] = {
    createAt: now.getTime(),
    createAtISO: now.toISOString(),
    createAtLocale: now.toLocaleString(),
    color,
    yx,
  };

  const promise = update(ref(database), updates);
  return promise;
}

/**
 * 오목방 플레이 데이터 변경 이벤트의 리스너를 등록한다
 * @see [데이터 읽기: Firebase 실시간 데이터베이스](https://firebase.google.com/docs/database/web/read-and-write?authuser=0#read_data)
 * @param {*} roomKey 오목방의 key
 * @param {*} callback 리스너(콜백) 함수. 첫번째 파라미터: firebase.database.DataSnapshot
 * @see [firebase.database.DataSnapshot: DataSnapshot | JavaScript SDK | Firebase](https://firebase.google.com/docs/reference/node/firebase.database.DataSnapshot)
 * @returns {Function} 리스너 구독 취소 함수
 */
function addOnValuePlayListener(roomKey, callback) {
  const path = `/room/${roomKey}/play`;
  const playRef = ref(database, path);
  const unsubscribe = onValue(playRef, callback);
  return unsubscribe;
}

export {
  firebaseApp,
  database,
  createRoom,
  joinRoom,
  getRoomSnapshot,
  playStone,
  addOnValuePlayListener,
};