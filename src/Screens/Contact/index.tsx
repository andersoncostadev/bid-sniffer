import React, {useEffect, useState} from "react";
import {
  View,
  Text, 
  StyleSheet,
  TextInput, 
  Dimensions, 
  TouchableOpacity,
  Alert
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";


const Contact: React.FC = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sendForm, setSendForm] = useState(false);

  const handleSubmit = () => {
    if (!name.trim()) {
      Alert.alert('Por favor, insira seu nome');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Por favor, insira seu e-mail');
      return;
    }
    if (!phone.trim()) {
      Alert.alert('Por favor, insira seu telefone');
      return;
    }
    if (!message.trim()) {
      Alert.alert('Por favor, insira sua mensagem');
      return;
    }
    axios.post('https://webhook.site/4e54000c-f27e-4205-9cc8-d869efd1d2bf' , {
      name,
      email,
      phone,
      message
    }).catch(error => console.log(error));
      setSendForm(!sendForm)
  }
  function clearInputs() {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  }

  useEffect(() => {
    clearInputs();
  }, [sendForm]);
  return (
   
    <ScrollView>
    <View style={styles.default}>
      <TextInput
        value={name}
        onChangeText={setName} 
        placeholder={'Digite seu nome'}
        style={styles.input}
      />

      <TextInput
        value={phone}
        onChangeText={setPhone} 
        placeholder={'Digite seu Telefone'}
        keyboardType= 'numeric'
        style={styles.input}
      />

      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCorrect={false} 
        placeholder={'Digite seu email'}
        keyboardType= 'email-address'
        style={styles.input}
      />

      <TextInput
        multiline
        maxLength={100}
        numberOfLines={5}
        autoCorrect={false}
        value={message}
        onChangeText={setMessage} 
        placeholder={'Digite sua Mensagem'}
        style={styles.inputMessage}
      />

      <TouchableOpacity 
        style={styles.button}
        activeOpacity={0.7}
        onPress={handleSubmit}
        > 
        <Text style={styles.text}>Enviar Mensagem</Text>
      </TouchableOpacity>

    </View>
   </ScrollView> 
  );
};

const styles = StyleSheet.create({
  default: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    paddingVertical: 20,
  },
  input: {
    height: 40,
    width: Dimensions.get('window').width - 30,
    margin: 12,
    borderWidth: 0.2,
    borderRadius: 5,
    padding: 10,
  },
  inputMessage: {
    height: 200,
    width: Dimensions.get('window').width - 30,
    margin: 12,
    borderWidth: 0.2,
    borderRadius: 5,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ff0055',
    padding: 15,
    marginVertical: 15,
    borderRadius: 5
  },
  text: {
    color: '#fff',
    fontWeight:'bold'
  }
})

export default Contact;