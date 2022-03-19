<template>
  <view class="container">
    <text v-if="isEmail" class="text-primary">
      Para continuar tienes que validar el correo y luego hacer click en siguiente
    </text>
    <view id="footer" class="footer">
      <Button
        icon="arrow-right"
        class="btn rounded"
        mode="contained"
        :onPress="validateEmail"
      >
        Siguiente
      </Button>
      <Caption v-if="error !== ''" class="text-danger"> {{error}}</Caption>
    </view>
    </view>
</template>

<script>
import { Button, Caption, TextInput } from 'react-native-paper';
import { getAuth} from "firebase/auth";
export default {
components: {Button, Caption, TextInput},
 props: {
    navigation: {
      type: Object
    }
 },
data() {
    return{
        error: ''
    }
},
computed: {
 isEmail(){
   return this.navigation.state.params ? this.navigation.state.params.isEmail : true;
 }
},

methods: {
    validateEmail(){
      getAuth().currentUser.reload().then(()=> {
        const auth = getAuth();
        if(auth.currentUser)
        {
          const userValidate = auth.currentUser.emailVerified;
          this.error = '';
          if(userValidate) {
            this.navigation.navigate('Step3');
          }
          else{
            this.error = 'El usuario no esta válidado';
          }
        }
      }).catch(() => {
          this.error = 'El usuario no esta válidado';
        });;
      
    }
  }
}
</script>

<style>
.text-primary {
    font-size: 30px;
    color: white;
    text-align: center;
    font-weight: bold;
  }
.container {
    background-color: #121212;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    flex: 1;
    padding-left: 4%;
    padding-top: 50%;
  }
  .btn{
    margin-left: 5;
    margin-top: 15%;
    width: 95%;
  }
   .text-danger{
    color: red;
    text-align: center;
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
</style>