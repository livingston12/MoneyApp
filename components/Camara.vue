<template>
  <view class="container">
    <view class="statusbar"></view>
    <touchable-opacity class="suaguiti" :on-press="goBack">
      <materialCommunityIcons class="iconos" name="backspace" />
    </touchable-opacity>
    <camera class="container" :type="cameraType" ratio="4:3" ref="camera" />
    <view class="meme">
      <touchable-opacity
        v-if="tipoCamara == 'Foto'"
        class="suaguiti"
        :on-press="accessCameraRoll"
      >
        <ionicons class="iconos" name="image" />
      </touchable-opacity>

      <touchable-opacity class="suaguiti" :on-press="snapPhoto">
        <fontAwesome class="iconos" name="camera" />
      </touchable-opacity>

      <touchable-opacity
        v-if="tipoCamara == 'Foto'"
        class="suaguiti"
        :on-press="handleCameraType"
      >
        <materialCommunityIcons class="iconos" name="camera-switch" />
      </touchable-opacity>
    </view>
  </view>
</template>

<script>
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
//import * as MediaLibrary from "expo-media-library";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default {
  data() {
    return {
      isRecording: false,
      hasPermission: false,
      tipoCamara: "",
      cameraType: "back",
    };
  },
  async mounted() {
    this.tipoCamara = this.navigation.state.params.tipo;
    await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
      .then((status) => {
        this.hasPermission = status.status == "granted" ? true : false;
      })
      .catch((err) => {
        //console.log(err);
      });
  },
  props: {
    navigation: {
      type: Object,
    },
  },
  methods: {
    //convertUrlToObject: convertUrlToObject,
    handleCameraType() {
      this.cameraType === "back"
        ? (this.cameraType = "front")
        : (this.cameraType = "back");
    },
    async snapPhoto() {
      let pickerResult = await this.$refs.camera.takePictureAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.1,
      });
      //MediaLibrary.saveToLibraryAsync(photo.uri);
      this.navigation.state.params.onGoBack(pickerResult.uri, "Foto");
      this.navigation.goBack();
    },
    async accessCameraRoll() {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.1,
      });
      if (!pickerResult.cancelled) {
        this.navigation.state.params.onGoBack(
          pickerResult.uri,
          "Foto"
        );
        this.navigation.goBack();
      }
    },
    goBack() {
      this.navigation.goBack();
    },
  },
  components: { Camera, FontAwesome, Ionicons, MaterialCommunityIcons },
};
</script>

<style>
.statusbar {
  background-color: black;
  height: 50;
}
.container {
  flex: 1;
  background-color: black;
}
.meme {
  flex-direction: row;
  justify-content: space-between;
  margin: 70;
  margin-right: 30;
  margin-left: 30;
}
.suaguiti {
  align-self: flex-end;
  align-items: center;
  background-color: transparent;
}
.iconos {
  color: white;
  font-size: 50;
}
</style>