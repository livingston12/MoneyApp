<template>
  <view class="container">
    <view class="header">
      <IconButton
        :size="32"
        icon="qrcode"
        class="icon1"
        :onPress="() => goQrCode()"
      />
      <IconButton
        :size="32"
        icon="close"
        class="icon2"
        :onPress="() => goBack()"
      />
    </view>
    <view class="avatar">
      <touchable-opacity class="suaguiti" :onPress="() => tomarFoto()">
        <image class="test" :source="urlPhoto" :style="styles" />
      </touchable-opacity>
    </view>
    <view class="subHeader">
      <text class="center text-white text-primary"> {{ name }}</text>
      <text class="center text-white text-primary"> {{ lastName }}</text>
      <Caption class="center userName">{{ username }}</Caption>

      <Button icon="calendar" class="calendar" :uppercase="false">
        <text class="text-white">Registrado el {{ createdDate }}</text>
      </Button>
    </view>
    <Divider />
    <view class="detail">
      <flat-list
        :data="listItem"
        class="bold"
        :render-item="(item) => renderList(item)"
      />
    </view>

    <view class="footer"> </view>
    <Button
      mode="contained"
      :uppercase="false"
      class="btn-footer"
      :onPress="singOut"
    >
      <text class="text-footer bold">Cerrar sesion</text>
    </Button>
  </view>
</template>

<script>
import React from "react";
import { Platform } from "react-native";
import {
  IconButton,
  List,
  Caption,
  Button,
  Divider,
  Avatar,
} from "react-native-paper";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "@firebase/storage";
import { getAuth, signOut } from "@firebase/auth";
import {
  getCurrentUser,
  getNames,
  timeConverter,
} from "../utils/core";

export default {
  components: { IconButton, Caption, Button, Divider, Avatar },
  props: {
    navigation: {
      type: Object,
    },
  },
  mounted() {
    const currentUserData = this.getCurrentUser(getAuth());
    const names = this.getNames(currentUserData.fullName);
    const createdAt = getAuth().currentUser.metadata.createdAt;
    this.name = names.name;
    this.userName = currentUserData.username;
    this.lastName = names.lastName;
    this.createdDate = this.timeConverter(createdAt);
    const storageRef = ref(getStorage(),`user/${getAuth().currentUser.uid}/profile.jpg`);
    getDownloadURL(storageRef).then((url)=> { 
      this.fotomeme = url;
    });
  },
  computed: {
    urlPhoto() {
      return { uri: this.fotomeme };
    },
  },
  data() {
    return {
      upload: null,
      styles: {
        resizeMode: "stretch",
      },
      name: "",
      username: "",
      createdDate: "",
      lastName: "",
      fotomeme:
        "https://st2.depositphotos.com/3904951/6157/v/950/depositphotos_61575251-stock-illustration-flat-long-shadow-icon-of.jpg",
      listItem: [
        {
          key: 0,
          value: {
            title: "Cuenta",
            description: "",
            icon: "account",
          },
        },
        {
          key: 1,
          value: {
            title: "Asociar bancos",
            description: "",
            icon: "link-variant",
          },
        },
        {
          key: 2,
          value: {
            title: "Limite",
            description: "",
            icon: "infinity",
          },
        },
      ],
    };
  },
  methods: {
    timeConverter: timeConverter,
    getCurrentUser: getCurrentUser,
    getNames: getNames,
    goBack() {
      this.navigation.navigate("Home");
    },
    tomarFoto() {
      this.navigation.navigate("Camera", {
        onGoBack: this.refresh,
        tipo: "Foto",
      });
    },
    refresh(uri, tipo) {
      if (tipo == "Foto") {
        this.fotomeme = uri;
        this.guardarPhoto(uri);
      }
    },
    async guardarPhoto(uri) {
      var metadata = {
        contentType: "image/jpeg",
      };
      // Upload to firebase file
      new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      }).then((blob) => {
        const userId = getAuth().currentUser.uid;
        const storageRef = ref(getStorage(), `user/${userId}/profile.jpg`);
        uploadBytesResumable(storageRef, blob, metadata).then(() => {
        });
      });
    },
    renderList: function (item) {
      let leftIcon = (
        <List.Icon {...item} icon={item.item.value.icon} color="white" />
      );
      return (
        <List.Accordion
          title={item.item.value.title}
          left={(props) => leftIcon}
          right={(item) => <List.Icon {...item} icon="play" />}
          expanded={false}
          onPress={() => this.getPage(item.item.key)}
        ></List.Accordion>
      );
    },
    getPage(key) {
      switch (key) {
        case 0:
          this.navigation.navigate("Personal");
          break;
        case 1:
          this.navigation.navigate("LinkBank");
          break;
        case 2:
          this.navigation.navigate("Personal");
          break;
      }
    },
    goQrCode() {
      this.navigation.navigate("ToogleScanCode", {
        navigation: this.navigation,
      });
    },
    singOut() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.navigation.navigate("Step1");
        })
        .catch((error) => {});
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
.header {
  flex-direction: row;
  margin-top: 30;
}
.detail {
  flex: 0.6;
}
.subHeader {
  flex: 0.3;
  justify-content: center;
}
.avatar {
  align-self: center;
}
.icon2 {
  right: 10;
  position: absolute;
}
.text-white {
  color: white;
}
.text-primary {
  font-size: 30;
  font-weight: bold;
  flex-wrap: wrap;
  width: 100%;
}
.center {
  text-align: center;
}
.userName {
  padding-top: 5;
  font-size: 22;
  padding-bottom: 30;
}
.calendar {
  width: 60%;
}
.text-footer {
  font-size: 16;
  position: absolute;
  bottom: 0;
}
.bold {
  font-weight: bold;
}
.img {
  justify-content: center;
}
.test {
  width: 70;
  height: 70;
  border-radius: 200;
}
</style>