<template>
  <view class="container">
      <view class="header">
        <touchable-opacity class="header-item" :on-press="() => goBack()">
          <materialCommunityIcons class="iconos" name="arrow-left" />
        </touchable-opacity>
        <text class="text-primary">Asociar Tarjetas</text>
      </view>
      <Caption class="center">CUENTAS</Caption>
      <view class="accounts">
        <flat-list
          :data="listItem"
          class="bold"
          :render-item="(item) => renderList(item)"
        />
        <Button
          icon="credit-card"
          :uppercase="false"
          class="btn"
          mode="contained"
          :on-press="() => linkBank()"
        >
          Asociar Tarjeta
        </Button>
      </view>
  </view>
</template>

<script>
import React from "react";
import { List, Caption, Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getDebitCards } from "../utils/core";
import { getAuth } from '@firebase/auth';

export default {
  components: { Caption, List, Button, MaterialCommunityIcons },
  props: {
    navigation: {
      type: Object,
    },
  },
  created() {
    this.listItem =  this.getDebitCards(getAuth());
  },
  data() {
    return {
      listItem: [],
    };
  },
  methods: {
    getDebitCards: getDebitCards,
    renderList: function (item) {
      return (
        <List.Accordion
          title={item.item.CardNumber}
          right={(item) => <List.Icon {...item} icon="delete" />}
          expanded={false}
          onPress={() => this.getPage(item.item.Key)}
        ></List.Accordion>
      );
    },
    getPage(key) {
      alert(key);
    },
    goBack() {
      this.navigation.goBack();
    },
    linkBank(){
        this.navigation.navigate("Step3", {isLogged: true, goingTo: "UserInformation"});
    }
  },
};
</script>

<style>
.container {
  background-color: #0d0d0d;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  flex: 2;
}
.btn,
.accounts {
  margin-top: 20;
  padding-left: 3%;
  padding-right: 3%;
}

.header {
  flex: 0.07;
  padding-top: 12%;
  flex-direction: row;
  background-color: #121212;
}

.header-item {
  width: 35%;
  padding-left: 3%;
}

.iconos {
  color: white;
  font-size: 30;
  padding-left: 3%;
  top: 5;
}

.text-primary {
  font-size: 20;
  font-weight: bold;
  text-align: center;
  color: white;
  top: 5;
}
.center {
  padding-top: 3%;
  padding-left: 3%;
}
</style>