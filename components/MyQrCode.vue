<template>
  <view class="container">
    <view class="qrCode">
      <QRCode
        :value="myQrCode"
        size="3000"
        :logo="logoFromFile"
        logoSize="800"
        logoBackgroundColor="transparent"
        logoBorderRadius="100"
      />
    </view>
    <view class="dataUser">
      <text class="text-primary"> {{ FullName }} </text>
      <text class="text-secundary"> Escanea para pagar a {{ userName }} </text>
    </view>
  </view>
</template>

<script>
import { IconButton, ToggleButton } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";
import { getCurrentUser } from "../utils/core";
import { getAuth } from '@firebase/auth';

export default {
  components: { IconButton, ToggleButton, QRCode },
   props: {
    navigation: {
      type: Object,
    },
  },
  computed: {
    logoFromFile() {
      let logoFromFile = require("../assets/logo.jpg");
      return logoFromFile;
    },
    myQrCode() {
      return this.QrCode;
    }
  },
  data() {
    return {
      FullName: "",
      userName: "",
      QrCode: "no Code"
    };
  },
  created() {
    const user = this.getCurrentUser(getAuth());
    this.userName = user.username;
    this.FullName = user.fullName;
    this.QrCode = user.userId;
  },
  mounted() {
  },
  methods: {
    getCurrentUser: getCurrentUser
  },
};
</script>

<style>
.container {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  flex: 0.8;
  padding-left: 4%;
}
.header {
  flex-direction: row;
  margin-top: 30;
  justify-content: space-between;
  flex: 0.2;
}
.qrCode {
  flex: 0.5;
  margin-left: 10%;
  padding-top: 15%;
}
.dataUser {
  flex: 0.4;
}
.text-primary {
  text-align: center;
  font-weight: bold;
  font-size: 25;
  padding-bottom: 5;
}
.text-secundary {
  text-align: center;
  color: grey;
}
.footer {
  flex-direction: row;
  padding-right: 10;
}
.btn {
  width: 50%;
}
</style>