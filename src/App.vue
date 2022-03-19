<template>
  <app-navigator  class="app"></app-navigator>
</template>

<script>

import {
  createAppContainer,
  createStackNavigator,
} from "vue-native-router";

import Step1 from "../Views/Register/Step1";
import Step2 from "../Views/Register/Step2";
import Step3 from "../Views/Register/Step3";
import Step4 from "../Views/Register/Step4";
import Step5 from "../Views/Register/Step5";
import Home from "../components/Home/Home";
import UserInformation from "../Views/UserInformation";
import Camera from "../components/Camara"
import Personal from "../Views/Personal";
import LinkBank from "../Views/LinkBank";
import Header from "../components/Home/Header";
import MyQrCode from "../components/MyQrCode";
import ToogleScanCode from "../components/ToogleScanCode";
import addCash from "../Views/addCash";
import SearchUser from "../Views/SearchUser";

const StackNavigator = createStackNavigator(
  {
    Step1: Step1,
    Step2: Step2,
    Step3: Step3,
    Step4: Step4,
    Step5: Step5,
    Home: Home,
    UserInformation: UserInformation,
    Camera: Camera,
    Personal: Personal,
    LinkBank: LinkBank,
    Header: Header,
    MyQrCode: MyQrCode,
    ToogleScanCode: ToogleScanCode,
    addCash: addCash,
    SearchUser: SearchUser,
  },
  {
    initialRouteName: 'Step1',
    defaultNavigationOptions: {
      headerStyle: {
        display: 'none',
      },
    },
  }
);
const AppNavigator = createAppContainer(StackNavigator);
export default {
  components: { AppNavigator },
}
</script>


<style lang="scss">
</style>
