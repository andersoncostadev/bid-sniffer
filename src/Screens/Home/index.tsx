import React from "react";

import {View, StyleSheet, Image}  from "react-native";

const Home: React.FC = () => {
  return (
    <View style={styles.default}>
        <Image source={require('../../Assets/Images/desconto-exit.png')}/>
    </View>
  );
};

const styles = StyleSheet.create({
  default: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
  },
})

export default Home;