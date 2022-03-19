<template>
    <view class="container">
        <text class="text-primary">
         Agregue un banco con su tarjeta de débito
        </text>
        <TextInput
            class="input-primary"
            v-model="debitCard"
            label="Tarjeta débito"
            placeholder="Número de tarjeta de débito"
            :onChangeText="setTextInputValue"
            keyboardType='numeric'
          />
        <Caption v-if="error !== ''" class="text-danger"> {{error}}</Caption>
        <view id="footer" class="footer">
          <Button
            icon="skip-next"
            class="btn color-secondary"
            mode="contained"
            :uppercase="false"
            :onPress="skip"
          >
            {{skipText}}
          </Button>
          <Button
            icon="arrow-right"
            class="btn"
            mode="contained"
            :onPress="addDebitCard"
            :uppercase="false"
          >
            {{ nextText }}
          </Button>      
    </view>
    </view>
</template>

<script>
import { Button, Caption, TextInput } from 'react-native-paper';
import validator from 'validator';
import { getDatabase, ref, push } from "firebase/database";
import { getAuth } from '@firebase/auth';
import { maskDebitCard } from "../../utils/core";

export default {
    components: {Button, Caption, TextInput},
    props: {
    navigation: {
      type: Object
    },
    isLogged: {
      type: Boolean,
      default: () => false
    },
    goingTo: {
      type: String,
      default: () => ""
    }
  },
  data() {
    return{
        debitCard: '',
        error: ''
    }
  },
  computed: {
    skipText() {
      return this.isLogged ? "Cancelar" : "Saltar";
    },
    nextText() {
      return this.isLogged ? "Agregar" : "Siguiente";
    }
  },
  mounted() {
    this.isLogged =  this.navigation.state.params
        ? this.navigation.state.params.isLogged
        : false;
    this.goingTo = this.navigation.state.params
        ? this.navigation.state.params.goingTo
        : "";
        alert(this.goingTo);
  },
  methods: {
    maskDebitCard: maskDebitCard,
    addDebitCard(){
      const validDebitCard = this.debitCard;//validator.isCreditCard(this.debitCard);
      if(validDebitCard) {
        const auth = getAuth();
        const userId = auth.currentUser.uid;
        
        const cardData = {
          CardNumber: this.debitCard
        }
        const db = getDatabase();
        const key = push(ref(db, 'DebitCards/' + userId + '/CardNumbers/'), cardData).key;
        if(key && !this.isLogged) {
          this.navigation.navigate('Step4');
        } else{
          this.navigation.navigate(this.goingTo);
        }
      }
      else {
        this.error = 'Favor ingresar una tarjeta válida';
      }
    },
    setTextInputValue() {      
       const debitCard =  this.maskDebitCard(this.debitCard);
       this.debitCard = debitCard;
    },
    skip() {
      if (this.isLogged) {
        this.navigation.navigate(this.goingTo);
      }
      else {
        this.navigation.navigate('Step4');
      }
    }
    
  }  
}
</script>

<style>
.container {
    background-color: #121212;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    flex: 1;
    padding-left: 4%;
    padding-top: 30%;
  }
  .text-primary {
    font-size: 30px;
    color: white;
    font-weight: bold;
    
  }
  .color-secondary{
    background-color: #9c389b;
  }
  .btn{
    margin-left: 5;
    width: 50%;
  }
  .input-primary{
    width: 95%;
    margin-top: 30;
    font-size: 17;
  }
  .footer{
    position: absolute;
    bottom: 30%;
    margin-bottom: 30%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-left: 4%;
  }
  .text-danger{
    color: red;
  }
</style>