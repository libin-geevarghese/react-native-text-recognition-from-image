import React, {useState, useEffect} from 'react';
import {
  Image,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import Clipboard from '@react-native-clipboard/clipboard';

const {width, height} = Dimensions.get('window');
const ImageReader = () => {
  const [text, setText] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check for necessary permissions here if needed
  }, []);

  const handleTakePhoto = async () => {
    setLoading(true);
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        cameraType: 'back',
      });

      if (result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setImageUri(uri);
        const recognizedText = await TextRecognition.recognize(uri);
        setText(recognizedText.text);
      }
    } catch (error) {
      console.error('Error taking photo or recognizing text:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipBoard = () => {
    Clipboard.setString(text);
    Alert.alert('Copied', 'Text copied to clipboard');
  };

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator style={styles.loader} size="large" color="#1e90ff" />
      )}
      {imageUri && !loading && (
        <>
          <Image source={{uri: imageUri}} style={styles.image} />
          <View style={{height: 200, paddingVertical: 15}}>
            <Text>Detected Text</Text>
            <TouchableOpacity
              onPress={copyToClipBoard}
              style={{backgroundColor: 'blue', height: 50, width: 150}}>
              <Text>COPY</Text>
            </TouchableOpacity>
            <ScrollView>
              <Text style={styles.text}>{text}</Text>
            </ScrollView>
          </View>
        </>
      )}
      <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
        <Text style={styles.buttonText}>Take Photo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    marginTop: 50,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cad6e6',
  },
  button: {
    width: 300,
    alignItems: 'center',
    backgroundColor: '#1e90ff',
    padding: 15,
    borderRadius: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginVertical: 20,
  },
  text: {
    flex: 1,
    // height: 500,
    width: width * 0.9,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
  loader: {
    marginTop: 30,
  },
});

export default ImageReader;
