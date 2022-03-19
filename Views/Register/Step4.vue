<template>
  <view class="container">
    <text class="text-primary m-b-20"> Elegir a ${{ currentUsername }} </text>
    <text class="text-secundary m-b-20">
      {{ title }}
    </text>
    <TextInput
      class="input-primary"
      v-model="username"
      label="Nombre de usuario"
      :onChangeText="setTextInputValue"
    />
    <Caption v-if="error !== ''" class="text-danger"> {{ error }}</Caption>
    <view id="footer" class="footer">
      <Button
        icon="arrow-right"
        class="btn-primary"
        mode="contained"
        :onPress="nextPage"
        :disabled="isValidUsername"
      >
        Siguiente
      </Button>
    </view>
  </view>
</template>

<script>
import { Button, Caption, TextInput } from "react-native-paper";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { getAuth } from "@firebase/auth";

export default {
  components: { Button, Caption, TextInput },
  props: {
    navigation: {
      type: Object,
    },
  },
  data() {
    return {
      username: "",
      error: "",
      title: "Tu nombre único para que alguien te pague",
    };
  },
  computed: {
    currentUsername() {
      return this.username.toLowerCase() .replace("$", "");
    },
    isValidUsername(){
      return  this.currentUsername.length < 5 || this.error != '';
    }
  },
  methods: {
    setTextInputValue() {
      if(this.currentUsername == '') {
        return;
      }
      this.username = "$" + this.currentUsername;
      const dbRef = ref(getDatabase());
      
      
      get(child(dbRef, `userNames/${this.currentUsername}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            this.error = `El usuario ${this.username} existe`;
          } else {
            this.error = '';
          }
        })
        .catch(() => {
          this.error = `El usuario ${this.username} existe`;
        });
    },
    nextPage() {
      this.error = "";
      if (this.currentUsername.length < 5) {
        this.error = "El nombre de usuario tiene que ser mayor de 4 dígitos";
      } else {
        let isValidUser = this.isValidUserName();
        if (isValidUser) {
          this.navigation.navigate("Step5", {currentUsername: this.currentUsername});
        }
      }
    },
    isValidUserName() {
      let result = false;
      const userId = getAuth().currentUser.uid;
      const db = getDatabase();
      const data = {
        username: this.username,
        userId: userId,
        address: "",
        address2: "",
        city: "",
        state: "",
      };
      set(ref(db, "userNames/" + this.currentUsername), data).then(
        () => {result = true}
      ).catch(() => {
          result = false;
        });
      result = true;
      return result;
    }
  },
};
</script>

<style>
.container {
  background-color: #121212;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  flex: 1;
  padding-left: 4%;
  padding-top: 20%;
}
.text-primary {
  font-size: 30px;
  color: white;
  font-weight: bold;
}
.text-secundary {
  font-size: 16px;
  color: #0293b2;
  width: 70%;
}
.btn-primary {
  margin-left: 5;
  width: 100%;
}
.input-primary {
  width: 95%;
  font-size: 17;
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
.m-b-20 {
  margin-bottom: 20;
}
</style>