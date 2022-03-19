<template>
  <view class="container">
    <text class="text-primary">
      {{ title }}
    </text>

    <TextInput
      class="input-primary"
      v-model="textValue"
      mode="flat"
      :label="title"
      :onChangeText="setTextInputValue()"
      :keyboardType="isEmail ? 'email-address' : 'numeric'"
    />
    <Caption v-if="error !== ''" class="text-danger"> {{ error }}</Caption>
    <TextInput
      class="input-primary"
      v-model="password"
      mode="flat"
      label="Introduce tu contraseña"
      :secureTextEntry="true"
    />

    <view id="footer" class="footer">
      <Button
        :icon="isEmail ? 'phone' : 'account'"
        class="btn color-secondary"
        mode="contained"
        :onPress="changeEmail"
      >
        {{ textButtom }}
      </Button>
      <Button
        icon="arrow-right"
        class="btn rounded"
        mode="contained"
        :onPress="nextPage"
      >
        Siguiente
      </Button>
    </view>
  </view>
</template>
<script>
import { Button, Caption, TextInput } from "react-native-paper";
import validator from "validator";
import firebase from "../../src/firebase";
import {
  isValidPhoneNumber,
  maskPhoneNumber,
  messageAuth,
} from "../../utils/core";
import { actionCodeSettings } from "../../utils/const";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default {
  components: { Button, Caption, TextInput },
  props: {
    navigation: {
      type: Object,
    },
  },
  data() {
    return {
      isEmail: true,
      textValue: "",
      error: "",
      password: "",
      actionCodeSettings: actionCodeSettings,
    };
  },
  mounted() {
    if(getAuth().currentUser) {
      this.navigation.navigate("Home");
    }
  },
  computed: {
    title() {
      return this.isEmail ? "Introduce tu email" : "Introduce tu teléfono";
    },
    textButtom() {
      return this.isEmail ? "Usar teléfono" : "usar email";
    },
  },
  methods: {
    isValidPhoneNumber: isValidPhoneNumber,
    maskPhoneNumber: maskPhoneNumber,
    messageAuth: messageAuth,
    changeEmail() {
      this.textValue = "";
      this.error = "";
      this.isEmail = !this.isEmail;
    },
    async nextPage() {
      const email = this.textValue;
      const password = this.password;
      this.error = "";
      if (this.isEmail) {
        if (validator.isEmail(this.textValue) === false) {
          this.error = "No es una dirección de correo válida";
          return;
        }
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            sendEmailVerification(userCredential.user).then(() => {
              this.navigation.navigate("Step2", { isEmail: this.isEmail });
            });
          })
          .catch((error) => {
            if(error.code != "auth/email-already-in-use"){
              this.error = this.messageAuth(error.code);
            }else{
              this.signInUserByEmail(auth, email, password);
            }
          });
      } else {
        if (this.isValidPhoneNumber(this.textValue) === false) {
          this.error = "No es un teléfono válido";
          return;
        }
      }
    },
    setTextInputValue() {
      if (this.isEmail === false) {
        this.textValue = this.maskPhoneNumber(this.textValue);
      }
    },
    signInUserByEmail(auth, email, password) {
      
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          this.navigation.navigate("Home");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorCode);
        });
    },
  },
};
</script>

<style lang="scss">
.container {
  background-color: #121212;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  flex: 1;
  padding-left: 4%;
  padding-top: 30%;
}

.text-primary {
  font-size: 30px;
  color: white;
  font-weight: bold;
}
.btn {
  margin-left: 5;
  width: 50%;
}
.color-secondary {
  background-color: #9c389b;
}

.input-primary {
  width: 95%;
  margin-top: 10;
}
.footer {
  position: absolute;
  bottom: 30%;
  margin-bottom: 30%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-left: 4%;
}
.text-danger {
  color: red;
}
</style>