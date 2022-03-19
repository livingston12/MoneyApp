import { getDatabase, ref, onValue, set } from "firebase/database";
import axios from 'axios';
import {
  getDownloadURL,
  ref as refStorage,
  getStorage
} from "@firebase/storage";

export function isValidPhoneNumber(number) {
  var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
  var digits = number.replace(/\D/g, "");
  return phoneRe.test(digits);
}

export function maskPhoneNumber(number) {
  const count = number.length;
  if (count === 3 || count === 7) {
    return number + '-';
  } else {
    return number;
  }
}

export function maskDebitCard(number) {
  let result = number.replaceAll(' ', '').replace(/\d{4}(?=.)/g, '$& ').toString();
  return result.substring(0, 19);
}

export function messageAuth(code) {
  let result = '';
  switch (code) {
    case 'auth/internal-error':
      result = 'Favor validar los datos ingresados'
      break;
    case 'auth/weak-password':
      result = 'La contraseña como minimo tiene que tener 6 caracteres'
      break;
  }
  return result;
}

export function convertUrlToObject(url) {
  var byteString;
  if (url.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(url.split(',')[1]);
  else
    byteString = unescape(url.split(',')[1]);

  // separate out the mime component
  var mimeString = url.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
}

export function getCurrentUser(auth) {

  let result = {};
  const user = auth.currentUser;
  const userId = user.uid;
  const account = user.email.length > 0 ? user.email : user.phoneNumber;

  const db = getDatabase();
  const userRef = ref(db, `users/${userId}`);
  onValue(userRef, (data) => {
    result = {
      account: account,
      createAt: user.metadata.createdAt,
      ...data.val()
    };
  },
    {
      onlyOnce: false
    });

  return result;
}

export function getNames(fullName) {
  const indexName = fullName.indexOf(" ");
  const name = fullName.substring(0, indexName);
  const lastName = fullName.substring(indexName + 1, fullName.length);

  return {
    name: name,
    lastName: lastName
  }
}

export function timeConverter(timestamp) {
  var milisecons = parseFloat(timestamp);
  var a = new Date(milisecons);
  var months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var time = date + ' ' + month + ' ' + year;
  return time;
}

export function getDebitCards(auth) {
  const userId = auth.currentUser.uid;
  let result = [];
  const db = getDatabase();
  const dbRef = ref(db, `DebitCards/${userId}/CardNumbers`);

  onValue(dbRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const debitCard = hideDebitCard(childSnapshot.val().CardNumber);
      result.push({ Key: childKey, CardNumber: debitCard });
    });
  }, {
    onlyOnce: false
  });

  return result;
}

export function hasDebitCard(auth) {
  const userId = auth.currentUser.uid;
  let result = false;
  const db = getDatabase();
  const dbRef = ref(db, `DebitCards/${userId}/CardNumbers`);

  onValue(dbRef, (snapshot) => {
    result = snapshot.exists();
  }, {
    onlyOnce: false
  });

  return result;
}

export function convertBase64ToBlob(auth) {

}

export async function addCashBalanceToCardnet() {
  const url = "https://ecommerce.cardnet.com.do/api/payment/transactions/sales";
  var result = [];
  const payload = {
    "amount": 100,
    "card-number": "548878******5579",
    "client-ip": "10.0.0.1",
    "currency": "214",
    "cvv": "930",
    "environment": "ECommerce",
    "expiration-date": "11/17",
    "idempotency-key": "ba3b0a1548b942938843d950b5c78bda",
    "invoice-number": "123456",
    "merchant-id": "349000001",
    "reference-number": "0000001",
    "tax": 15,
    "terminal-id": "454500350001",
    "tip": 10,
    "token": "3520b278c"
  };

  const response = await axios(url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      data: payload
    }, {
    responseType: 'JSON',
  });

  result = response.data;
  return result;
}

export function getBalances(auth) {
  const userId = auth.currentUser.uid;
  let balance = 0;

  const db = getDatabase();
  const dbRef = ref(db, `Balances/${userId}`);

  onValue(dbRef, (snapshot) => {
    balance = parseFloat(snapshot.val().balance)

  }, {
    onlyOnce: false
  });

  return balance;
}

export function addCashBalanceToDb(auth, balance) {
  const currentBalance = getBalances(auth);
  let result = false;
  const userId = auth.currentUser.uid;

  const balanceData = {
    balance: parseFloat(balance) + currentBalance
  }
  const db = getDatabase();
  const key = set(ref(db, `Balances/${userId}`), balanceData).key;
  if (key) {
    result = true;
  } else {
    result = false;
  }
  return result;
}

export function number_format_js(number, decimals, dec_point, thousands_point) {

  if (number === null || !isFinite(number)) {
    throw new TypeError("number is not valid");
  }

  if (!decimals) {
    var len = number.toString().split('.').length;
    decimals = len > 1 ? len : 0;
  }

  if (!dec_point) {
    dec_point = '.';
  }

  if (!thousands_point) {
    thousands_point = ',';
  }

  number = parseFloat(number).toFixed(decimals);

  number = number.replace(".", dec_point);

  var splitNum = number.split(dec_point);
  splitNum[0] = splitNum[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_point);
  number = splitNum.join(dec_point);

  return number;
}

function hideDebitCard(card) {
  let hideNum = [];
  for (let i = 0; i < card.length; i++) {
    if (i < card.length - 5) {
      hideNum.push("*");
    } else {
      hideNum.push(card[i]);
    }
  }
  return hideNum.join("");
}

export function getListUser() {
  const result = [];
  const db = getDatabase();
  const dbRef = ref(db, `users`);

  onValue(dbRef, (snapshot) => {
    snapshot.forEach((childSnapshot)  => {

      const userId = childSnapshot.key;
      const userName = childSnapshot.val().username;
      const fullName = childSnapshot.val().fullName;
      getImagesUserURL(getStorage(), userId).then((avatarUrl) => {
        result.push({
          id: userId,
          fullName: fullName,
          userName: userName,
          avatarUrl: avatarUrl
        });
      });
    });
  }, {
    onlyOnce: false
  });

  return result;
}
export async function getImagesUserURL(storage, userId) {
  let result = '';
  const storageRef = refStorage(storage, `user/${userId}/profile.jpg`);
  result = await getDownloadURL(storageRef);
  return result;
}


