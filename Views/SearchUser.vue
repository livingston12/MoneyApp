<template>
  <view class="container">
    <view class="header">
      <touchable-opacity class="header-item">
        <materialCommunityIcons class="iconos" name="close" :on-press="() => goBack()" />
      </touchable-opacity>
      <TextInput
        label='Search'
        v-model="search"
        class="input"
        rounded
      />
    </view>
    <view class="container-list">
      <UserList :data="filteredData" :onHeaderClick="(userId) => payUser(userId)"  />
        <text>{{search}}</text>
    </view>
  </view>
</template>

<script>
import UserList from "../components/UserList";
import Header from "../components/Home/Header";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from 'react-native-paper';
import { getListUser } from '../utils/core';
import { getAuth } from '@firebase/auth';


export default {
  components: { UserList, Header, MaterialCommunityIcons, TextInput },
  props: {
    navigation: {
      type: Object,
    },
  },
  computed: {
    
    filteredData(){
      let result = [];
      if(this.search.length > 0){
        result= this.data.filter(
          (x) =>
            x.fullName.toLowerCase().includes(this.search.toLowerCase()) ||
          x.userName.toLowerCase().includes(this.search.toLowerCase()),
      );
      }else{
        result = this.data;
      }
     
      return result;
    }
  },
  data() {
    return {
      search: "",
      data: [],
    };
  },
  mounted() {
    const data = this.getListUser(getAuth());
    this.data = data;
  },
  methods: {
    getListUser: getListUser,
    payUser(prue) {
      alert(prue);
      //console.log(prue);
    },
    goBack() {
      this.navigation.navigate("Home");
    }
  }
};
</script>

<style>
.container {
  background-color: #0d0d0d;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  flex: 1;
}
.header {
  margin-top: 10%;
  flex-direction: row;
  flex-wrap: wrap;
}
.container-list{
  flex-direction: row;
  flex-wrap: wrap;
}
.iconos {
  color: white;
  font-size: 40;
  padding-left: 2%;
  padding-right: 2% ;
  top: 20%;
}
.input{
  width: 80%;
}
</style>