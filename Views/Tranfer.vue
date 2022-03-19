<template>
  <view class="container">
    <Header :isHome="false"  :navigation="getNavigation" >
      
    </Header>
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
        <text class="text-primary"> ${{ currentFormatBalance }}<Caption class="text-secundary" v-if="containedPoint"> {{decimals}} </Caption></text>
       
      
      </animated:view>

    </view>
    <view class="numbers">
        <view class="btn-currency">
         <Button mode="contained"  >
          <text class="bold">DOP</text>
        </Button>
        </view>
      <view v-for="(item, i) in listCal" :key="i" class="numbers-detail">
        <Button color="white" :onPress="() => setNumber(item.key)">
          <text class="text">{{ getValueCal(item.key) }}</text>
        </Button>
      </view>
      <ToggleButton icon="replay" :value="13" class="numbers-detail" :onPress="() => removeNumber()" :status="true"  />
    </view>
    <view class="footer"> 
         <Button dark="true" :uppercase="false" mode="contained" class="btn-footer">
          <text class="text-footer bold">Prestame</text>
        </Button>
         <Button mode="contained" :uppercase="false" class="btn-footer">
            <text class="text-footer bold">Pagar</text>
        </Button>
    </view>
  </view>
</template>

<script>
import { Button, Text, List, ToggleButton, Caption } from "react-native-paper";
import { Animated, Easing } from "react-native";
import Header from '../components/Home/Header';

export default {
  components: { Button, Text, List, ToggleButton, Caption, Header },
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
      containedPoint(){
          return this.currentBalance.indexOf('.') > -1;
      },
      decimals(){
          let result = '';
          const balance = this.currentBalance;
          let count = 3 - balance.substring(balance.indexOf('.'), balance.length ).length;

          while ( count  > 0) {
              result += '0';
              count--;
          }           
          return result;
      },
      currentFormatBalance(){
          return this.currentBalance.toLocaleString();
      },
      getNavigation(){
      return this.navigation;
    }
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
  updated() {   

  },

  methods: {
    animateGrowth: function () {
    this.growth.setValue(340);

      Animated.timing(this.growth, {
        toValue: 360,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: false
      }).start(() => {
          this.growth.setValue(340);
        // this.growth.setValue(360);
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
      }
      else if (this.decimals != '' && !hasPoint) {
          this.addDigit(key);
      }
      else {
        this.animateGrowth();
      }
    },
    removeNumber(){
        if(this.currentBalance == "0" ){
            this.animateGrowth();
            return;
        }
        this.currentBalance = this.currentBalance.substring(0, this.currentBalance.length - 1);
        const balance = this.currentBalance;

        if(balance== "" ) 
        {
            this.currentBalance = "0";
        }
    },
    addDigit(key) {
        const balance = this.currentBalance;
        const number = "" + this.getValueCal(key);
        this.currentBalance =
          balance != "0" ? balance + number : number;
          if(this.currentBalance == "" || this.currentBalance == ".") {
            this.currentBalance = "0.";
        }
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
}
.numbers {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 2;
}
.btn {
  width: 33.33%;
}
.text-primary {
  font-size: 70px;
  color: white;
  font-weight: bold;
  text-align: center;
  padding-top: 50%;
}
.text-secundary{
    font-size: 70px;
}
.text {
  font-size: 27;
}
.header {
  flex: 2;
}
.numbers-detail {
  width: 33.33%;
  margin-top: 20;
}
.btn-currency{
    align-items: center;
    width: 100%;
    position: relative;
    top: 0;
}

.footer{
    display: flex;
    flex-direction: row;
    margin-bottom: 20;
    width: 95%;
}

.btn-footer{
    width: 50%;
    height: 50;
    background-color: #424242;
    justify-content: center;
    margin-right: 5;
}

.text-footer{
 font-size: 16;
 
}

.bold{
    font-weight: bold;
}

.animated-view-style {
  height: 100;
  width: 50;
  border-radius: 50;
}
</style>