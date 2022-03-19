<template>
  <view class="subrounded">
    <Header :isHome="true" :navigation="getNavigation"> </Header>

    <view class="container">
      <view id="firtGroup" class="firtGroup">
        <view>
          <text class="text-primary"> {{ currentBalance }}</text>
          <text class="text-secundary"> Balance</text>
        </view>
        <view class="footer">
          <touchable-opacity
            icon="arrow-right"
            :uppercase="false"
            class="btn-primary rounded"
            mode="contained"
            :onPress="addCash"
          >
            <text class="text-footer">Agregar Dinero</text>
          </touchable-opacity>
          <touchable-opacity
            icon="arrow-right"
            :uppercase="false"
            class="btn-primary rounded"
            mode="contained"
          >
            <text class="text-footer">Cobrar</text>
          </touchable-opacity>
        </view>
      </view>
      <view class="secondGroup">
        <view class="headerGroup">
          <text class="text">Mas formas de agregar dinero</text>
        </view>
        <flat-list :data="listItem" :render-item="(item) => renderList(item)" />
      </view>
    </view>
  </view>
</template>

<script>
import React from "react";
import { Button, List } from "react-native-paper";
import Header from "../components/Home/Header";
import { hasDebitCard, getBalances, number_format_js } from "../utils/core";
import { getAuth } from "@firebase/auth";

export default {
  components: { Button, Header },
  props: {
    navigation: {
      type: Object,
    },
  },
  watch: { 
      	navigation: function() { 
          const number = this.getBalances(getAuth()); 
          this.myBalance = this.number_format_js(number, 2);
        }
      },
  computed: {
    currentBalance() {
      return `$${this.myBalance}`;
    },
    getNavigation() {
      return this.navigation;
    },
  },
  data() {
    return {
      listItem: [
        {
          key: 0,
          value: {
            title: "Deposito Recurrente",
            description: "Agregar desde tarjeta de debito",
            icon: "credit-card",
          },
        },
        {
          key: 1,
          value: {
            title: "Deposito Directo",
            description: "Obtener cheques de pago mas rapido",
            icon: "download-box",
          },
        },
        {
          key: 2,
          value: {
            title: "Tranferencia Banco",
            description: "Enviar a otra cuenta",
            icon: "bank",
          },
        },
      ],
      myBalance: 0,
    };
  },
  mounted() {
    const number = this.getBalances(getAuth()); 
    this.myBalance = this.number_format_js(number, 2);
  },
  methods: {
    hasDebitCard: hasDebitCard,
    getBalances: getBalances,
    number_format_js: number_format_js,
    renderList: function (item) {
      let leftIcon = (
        <List.Icon {...item} icon={item.item.value.icon} color="#0293b2" />
      );
      return (
        <List.Accordion
          title={item.item.value.title}
          description={item.item.value.description}
          left={(props) => leftIcon}
          right={(item) => <List.Icon {...item} icon="play" />}
          expanded={false}
          onPress={() => this.getPage(item.item.key)}
        ></List.Accordion>
      );
    },
    getPage(key) {
      alert(key);
    },
    addCash() {
      const debitCardExist = this.hasDebitCard(getAuth());
      if (!debitCardExist) {
        this.navigation.navigate("addCash");
      } else {
        this.navigation.navigate("Step3", {
          isLogged: true,
          goingTo: "addCash",
        });
      }
    },
  },
};
</script>

<style>
.subrounded {
  flex: 1;
}
.container {
  background-color: #121212;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  flex: 1;
  margin-top: 10%;
}
.firtGroup {
  flex: 0.5;
}
.secondGroup {
  background-color: #0d0d0d;
  flex: 0.5;
}

.text {
  color: gray;
  padding-left: 3%;
}
.headerGroup {
  background-color: black;
  justify-content: flex-end;
}
.footerGroup {
  background-color: #0d0d0d;
  display: flex;
  position: relative;
}
.text-primary {
  font-size: 60px;
  color: white;
  font-weight: bold;
  text-align: center;
}
.text-secundary {
  text-align: center;
  color: #0293b2;
  font-size: 16px;
}
.btn-primary {
  background-color: #424242;
  color: white;
  margin-left: 5;
  justify-content: center;
}
.rounded {
  border-radius: 30;
  width: 50%;
  height: 50;
}
.footer {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-left: 4%;
  padding-right: 4%;
  margin-top: 40;
}
.text-footer {
  font-size: 16;
  font-weight: bold;
  color: white;
  text-align: center;
}
</style>