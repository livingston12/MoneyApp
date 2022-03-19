<template>
  <view class="container">
    <view class="header">
      <touchable-opacity class="header-item" :on-press="() => goBack()">
        <materialCommunityIcons class="iconos" name="arrow-left" />
      </touchable-opacity>
      <text class="text-primary header-item">Cuentas</text>
    </view>
    <view class="sub-container">
      <view class="sub-item">
        <Caption class="text-secundary">Nombre Completo</Caption>
        <touchable-opacity class="header-item">
          <text class="txt">{{ fullName }}</text>
        </touchable-opacity>
      </view>
      <view class="sub-item">
        <Caption class="text-secundary">$Usuario</Caption>
        <touchable-opacity class="header-item">
          <text class="txt">{{ userName }}</text>
        </touchable-opacity>
      </view>
      <view class="sub-item">
        <Caption class="text-secundary">Cuenta</Caption>
        <touchable-opacity class="header-item">
          <text class="txt">{{ account }}</text>
        </touchable-opacity>
        <!--<Divider />
         <touchable-opacity class="header-item" :on-press="goBack">
          <Caption class="txt-sub">Agregar telefono o email</Caption>
        </touchable-opacity> -->
      </view>
      <view class="sub-item">
        <Caption class="text-secundary">Dirección</Caption>
        <touchable-opacity class="header-item">
          <text class="txt">{{ address }}</text>
        </touchable-opacity>
      </view>
      <view class="sub-item">
        <text></text>
      </view>
    </view>
  </view>
</template>

<script>
import {
  Button,
  Text,
  List,
  ToggleButton,
  Caption,
  Divider,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getCurrentUser } from "../utils/core";
import { getAuth } from "@firebase/auth";

export default {
  components: {
    Button,
    Text,
    List,
    ToggleButton,
    Caption,
    MaterialCommunityIcons,
    Divider,
  },
  props: {
    navigation: {
      type: Object,
    },
  },
  data() {
    return {
      fullName: "",
      userName: "",
      address: "",
      account: "",
    };
  },
  methods: {
    getCurrentUser: getCurrentUser,
    goBack() {
      this.navigation.goBack();
    },
  },
  mounted() {
    const currentUserData = this.getCurrentUser(getAuth());
    const address2Isvalid = currentUserData.address2;
    const address = address2Isvalid
      ? `${currentUserData.address}(${currentUserData.address2})`
      : currentUserData.address;

    this.fullName = currentUserData.fullName;
    this.userName = currentUserData.username;
    this.address = `${address}, ${currentUserData.state}, ${currentUserData.city}`;
    this.account = currentUserData.account;
  },
};
</script>

<style>
.container {
  background-color: #0d0d0d;
  flex: 2;
}
.sub-container {
  flex: 1;
  flex-direction: column;
  margin-top: 20;
}
.sub-item {
  width: 100%;
  margin-top: 30;
}
.item-text {
  background-color: #121212;
}
.header {
  flex: 0.07;
  padding-top: 12%;
  flex-direction: row;
  background-color: #121212;
  width: 100%;
}
.header-item {
  width: 100%;
}
.iconos {
  color: white;
  font-size: 30;
  padding-left: 3%;
  bottom: 15;
  top: 5;
}
.text-primary {
  font-size: 20;
  font-weight: bold;
  text-align: left;
  position: absolute;
  bottom: 15;
  text-align: center;
}
.txt {
  font-size: 18;
  font-weight: bold;
  background-color: #121212;
  padding-top: 20;
  padding-bottom: 20;
  padding-left: 5%;
  flex-wrap: wrap;
}
.txt-sub {
  padding-top: 5;
  padding-bottom: 20;
  background-color: #121212;
  padding-left: 5%;
}
.text-secundary {
  font-size: 15;
  left: 20;
}
</style>