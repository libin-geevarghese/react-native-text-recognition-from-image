import React from 'react';
import {StyleSheet, View, StatusBar, SafeAreaView, Text} from 'react-native';
import ImageReader from './features/ImageReader';

const App = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
      <Text style={styles.title}>Lets TextImg...</Text>
      <Text style={styles.text}>Extract Text from Image</Text>
      <View style={styles.appContainer}>
        <ImageReader />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'monospace',
    marginHorizontal: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'monospace',
    marginHorizontal: 10,
  },
  appContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
