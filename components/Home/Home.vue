<template>
  <view class="container">

    <TabFooter :navigation="navigation"> </TabFooter>
  </view>
</template>

<script>
import TabFooter from './tab-footer';



export default {
  components: { TabFooter },
  props: {
    navigation: {
      type: Object,
    },
  },
};
</script>

<style>
.container {
  background-color: #121212;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  flex: 1;
  padding-top: 15%;
}
</style>