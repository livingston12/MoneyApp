<template>
<view>
  <view  class="container">
    <view class="left-header">
      <view v-if="!isHome" class="row">
        <touchable-opacity class="suaguiti">
          <materialCommunityIcons class="iconos" name="vector-square" :on-press="goQrCode" />
        </touchable-opacity>
        <touchable-opacity class="suaguiti">
          <materialCommunityIcons class="iconos" name="account-search" :on-press="goFindUser" />
        </touchable-opacity>
      </view>
      <view v-else>
          <text class="text-primary">Cuentas Bancarias</text>
      </view>
    </view>
    <view class="right-header">
      <view  class="row">
        <touchable-opacity class="suaguiti" :on-press="goAccount">
          <materialCommunityIcons class="iconos" name="account-circle" />
        </touchable-opacity>
      </view>
    </view>
  </view>
  </view>
</template>

<script>
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Personal from "../../Views/Personal.vue";

export default {
  components: { MaterialCommunityIcons, Personal },
  props: {
    isHome: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    navigation: {
      type: Object,
    },
  },
  created() {     
  },
  methods: {
      goAccount(){
        this.navigation.navigate("UserInformation");
      },
      goQrCode() {
          this.navigation.navigate("ToogleScanCode", {isHome : true});
      },
      goFindUser() {
        this.navigation.navigate("SearchUser");
      }
  }
  
};
</script>

<style>
.container {
  flex-direction: row;
  justify-content: space-between;
}
.row{
flex-direction: row;
padding-left: 20;
}
.suaguiti {
  align-self: flex-start;
  align-items: center;
  background-color: transparent;
  padding-right: 10;
}
.iconos {
  color: white;
  font-size: 40;
}
.text-primary{
    color: white;
    font-weight: bold;
    font-size: 23;
    padding-top: 1%;
    padding-left: 5%;
}
</style>