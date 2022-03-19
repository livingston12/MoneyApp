import * as React from 'react';
import Home from '../../Views/Home';
import Tranfer from '../../Views/Tranfer';
import {  BottomNavigation } from 'react-native-paper';

export default class MyComponent extends React.Component {
  constructor(props) { super(props) }
  state = {
    index: 0,
    routes: [
      { key: 'home', title: '', icon: 'bank' },
      { key: 'tranfer', title: '', icon: 'currency-usd' },
    ],
  };
  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    home: () => <Home navigation={this.props.navigation}> </Home>,
    tranfer: () => <Tranfer navigation={this.props.navigation}></Tranfer>,
  });

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
        labeled={false}
        style={{fontWeight: 'bold'}}
        navigation ={this.props.navigation}
      />
      
    );
  }
}