<template>
  <view class="container">
    <view class="top-header">
      <IconButton
        :size="25"
        icon="close"
        class="icon2"
        :onPress="() => goBack()"
      />
      <text class="text-top bold">Agregar Dinero</text>
    </view>
    <view class="header">
      <animated:view
        class="growth-animated-view"
        :style="{
          height: growth,
          width: growth,
          marginRight: 0,
          borderRadius: growth,
        }"
      >
        <text class="text-primary bold">
          ${{ currentFormatBalance
          }}<Caption class="text-secundary" v-if="containedPoint">
            {{ decimals }}
          </Caption>
        </text>
      </animated:view>
    </view>
    <view class="numbers">
      <view class="btn-currency"> </view>
      <view v-for="(item, i) in listCal" :key="i" class="numbers-detail">
        <Button color="white" :onPress="() => setNumber(item.key)">
          <text class="text">{{ getValueCal(item.key) }}</text>
        </Button>
      </view>
      <ToggleButton
        icon="replay"
        :value="13"
        class="numbers-detail"
        :onPress="() => removeNumber()"
        :status="true"
      />
    </view>
    <view class="footer">
      <Button
        dark="true"
        :uppercase="false"
        mode="contained"
        class="btn-footer"
        :onPress="() => addCash()"
        :disabled="currentBalance == 0"
      >
        <text class="text-footer bold">Agregar ${{ currentBalance }}</text>
      </Button>
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
  IconButton,
} from "react-native-paper";
import { Animated, Easing } from "react-native";
import { addCashBalanceToCardnet, addCashBalanceToDb } from "../utils/core";
import { getAuth } from '@firebase/auth';

export default {
  components: { Button, Text, List, ToggleButton, Caption, IconButton },
  props: {
    navigation: {
      type: Object,
    },
  },
  data() {
    return {
      currentBalance: "0",
      listCal: [],
    };
  },
  computed: {
    containedPoint() {
      return this.currentBalance.indexOf(".") > -1;
    },
    decimals() {
      let result = "";
      const balance = this.currentBalance;
      let count =
        3 - balance.substring(balance.indexOf("."), balance.length).length;

      while (count > 0) {
        result += "0";
        count--;
      }
      return result;
    },
    currentFormatBalance() {
      return this.currentBalance.toLocaleString();
    },
    getNavigation() {
      return this.navigation;
    },
  },
  created() {
    this.growth = new Animated.Value(340);
    const list = [];
    for (let index = 1; index < 12; index++) {
      list.push({ key: index });
    }
    this.listCal = list;
    this.growth.setValue(340);
  },
  updated() {},

  methods: {
      addCashBalanceToCardnet: addCashBalanceToCardnet,
      addCashBalanceToDb: addCashBalanceToDb,
    animateGrowth: function () {
      this.growth.setValue(500);

      Animated.timing(this.growth, {
        toValue: 390,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => {
        this.growth.setValue(500);
      });
    },
    getValueCal(key) {
      var result = key;
      if (key > 9) {
        switch (key) {
          case 10:
            result = ".";
            break;
          case 11:
            result = "0";
            break;
        }
      }
      return result;
    },
    setNumber(key) {
      const hasPoint = this.currentBalance.indexOf(".") !== -1 && key == ".";
      if (this.currentBalance.length < 6 && !this.containedPoint && !hasPoint) {
        this.addDigit(key);
      } else if (this.decimals != "" && !hasPoint) {
        this.addDigit(key);
      } else {
        this.animateGrowth();
      }
    },
    removeNumber() {
      if (this.currentBalance == "0") {
        this.animateGrowth();
        return;
      }
      this.currentBalance = this.currentBalance.substring(
        0,
        this.currentBalance.length - 1
      );
      const balance = this.currentBalance;

      if (balance == "") {
        this.currentBalance = "0";
      }
    },
    addDigit(key) {
      const balance = this.currentBalance;
      const number = "" + this.getValueCal(key);
      this.currentBalance = balance != "0" ? balance + number : number;
      if (this.currentBalance == "" || this.currentBalance == ".") {
        this.currentBalance = "0.";
      }
    },
    async addCash() {
         // proceso de cobro de la tarjeta a la aplicacion
         const result = await this.addCashBalanceToCardnet();
         if (result["response-code"] == "00"){
             // funciono
         }else 
         {
             this.addCashBalanceToDb(getAuth(), this.currentBalance);
             const error = result["response-code-desc"];
             alert(`No se pudo completar el pago por el siguiente motivo: ${error}`);
         }
    },
    goBack() {
      this.navigation.navigate("Home");
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
}
.top-header {
  flex: 0.1;
  flex-direction: row;
  align-items: flex-end;
}
.header {
  flex: 0.3;
  align-items: center;
}

.numbers {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 0.4;
}
.footer {
  flex: 0.2;
}
.btn {
  width: 33.33%;
}
.text-top {
  font-size: 23;
  padding-bottom: 12;
  padding-left: 12%;
}
.text-primary {
  font-size: 70px;
  color: white;
  text-align: center;
  margin-top: 30%;
}
.text-secundary {
  font-size: 70px;
}
.text {
  font-size: 27;
}

.numbers-detail {
  width: 33.33%;
  margin-top: 20;
}

.btn-footer {
  width: 100%;
  margin-right: 5;
}

.text-footer {
  font-size: 16;
}

.bold {
  font-weight: bold;
}
.icon2 {
  text-align: center;
}
</style>