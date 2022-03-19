<template>
  <view class="container">
      <view class="header">
      <IconButton :size="32" icon="arrow-left" color="black" class="icon1" :on-press="goBack" />
    </view>
    <MyQrCode v-if="value == 'Codigo'" :navigation="navigation">
    </MyQrCode>
    <QrScanCode v-if="value == 'Escanear'" :navigation="navigation"></QrScanCode>

    <ButtonToggleGroup
      highlightBackgroundColor="#0293b2"
      highlightTextColor="white"
      inactiveBackgroundColor="transparent"
      inactiveTextColor="#0293b2"
      :values="values"
      :value="value"
      :onSelect="(val) => setValue(val)"
      style="borderRadius: 600;"
      class="btn"
    />
  </view>
</template>

<script>
import ButtonToggleGroup from "react-native-button-toggle-group";
import { IconButton } from "react-native-paper";
import MyQrCode from "./MyQrCode";
import QrScanCode from "./QrScanCode";

export default {
  components: { ButtonToggleGroup, MyQrCode, QrScanCode, IconButton },
   props: {
    navigation: {
      type: Object,
    },
   },
  data() {
    return {
      values: ["Escanear", "Codigo"],
      value: {},
    };
  },
  methods: {
      setValue(val){
          this.value = val;
      },
      goBack(){
      this.navigation.navigate("UserInformation");
    }
  },
  created() {
      //this.value = "Codigo";
  },
  mounted() {
      console.log(this.navigation.state.params);
      const isHome = this.navigation.state.params.isHome;
      this.value = isHome ? "Escanear" : "Codigo";
  }
};
</script>

<style>
.container {
    flex: 1;
}
.btn {
    padding-left: 3%;
    padding-right: 3%;
}
.header {
  flex-direction: row;
  margin-top: 30;
  justify-content: space-between;
  flex: 0.1;
}
</style>