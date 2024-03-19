import React, {useState, useEffect} from 'react';
import {
  Image,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';

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

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
        <Text style={styles.buttonText}>Take Photo</Text>
      </TouchableOpacity>
      {loading && (
        <ActivityIndicator style={styles.loader} size="large" color="#1e90ff" />
      )}
      {imageUri && !loading && (
        <>
          <Image source={{uri: imageUri}} style={styles.image} />
          <Text style={styles.text}>Detected Text: {text}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  button: {
    backgroundColor: '#1e90ff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginVertical: 20,
  },
  text: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    elevation: 3,
  },
  loader: {
    marginTop: 30,
  },
});

export default ImageReader;
