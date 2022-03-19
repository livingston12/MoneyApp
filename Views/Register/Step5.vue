<template>
  <view class="container">
    <text class="text-primary m-b-20"> {{ title }} </text>
    <TextInput class="input-primary" v-model="fullName" label="Nombre completo" />
    <TextInput class="input-primary" v-model="address" label="Dirección" />

    <TextInput
      class="input-primary"
      v-model="address2"
      label="Dirección 2 (Opcional)"
    />
    <TextInput class="input-primary" v-model="city" label="Ciudad" />
    <TextInput class="input-primary" v-model="state" label="Provincia" />
    <view id="footer" class="footer">
      <Button
        icon="arrow-right"
        class="btn-primary"
        mode="contained"
        :onPress="login"
        :disabled="isValidAll"
      >
        Siguiente
      </Button>
    </view>
  </view>
</template>

<script>
import { Button, TextInput } from "react-native-paper";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth } from "@firebase/auth";

export default {
  components: { Button, TextInput },
  props: {
    navigation: {
      type: Object,
    },
  },
  data() {
    return {
      title: "Por favor ingresa tu dirección actual",
      fullName: "",
      address: "",
      address2: "",
      city: "",
      state: "",
    };
  },
  computed: {
    isValidAll() {
      let valid =
        this.fullName.trim().length > 3 &&
        this.address.trim().length > 3 &&
        this.city.trim().length > 3 &&
        this.state.trim().length > 3;
      return !valid;
    },
    currentUsername() {
      return this.navigation.state.params
        ? this.navigation.state.params.currentUsername
        : "";
    },
  },
  methods: {
    login() {
      const userId = getAuth().currentUser.uid;
      const db = getDatabase();
      const data = {
        fullName: this.fullName,
        username: "$" + this.currentUsername,
        userId: userId,
        address: this.address,
        address2: this.address2,
        city: this.city,
        state: this.state,
      };
      set(ref(db, "users/" + userId ), data)
        .then(() => {
          set(ref(db, "userNames/" + this.currentUsername), {userId: userId})
            .then(() => {
              this.navigation.navigate("Home", {
                currentUsername: this.currentUsername,
              });
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
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
.btn-primary {
  color: white;
  margin-left: 5;
  width: 100%;
}
.input-primary {
  width: 95%;
  font-size: 17;
  margin-bottom: 3;
}
.m-b-20 {
  margin-bottom: 20;
}
.m-b-5 {
  margin-bottom: 5;
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
</style>