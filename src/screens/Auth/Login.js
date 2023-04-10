import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const auth = getAuth()

const Login = () => {

    const [value, setValue] = useState({
        email: '',
        password: '',
        error: ''
    })

    async function signIn() {
        if (value.email === '' || value.password === '') {
            setValue({
              ...value,
              error: 'Email and password are mandatory.'
            })
            return;
        }
        
        try {
            const result = await signInWithEmailAndPassword(auth, value.email, value.password);
            const user = result.user;
            await AsyncStorage.setItem('user', JSON.stringify(user));

          } catch (error) {
            setValue({
              ...value,
              error: error.message,
            })
        }
        
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inicia session</Text>
            {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}
            <View style={styles.controls}>
                <TextInput
                    placeholder='Email'
                    style={styles.input}
                    value={value.email}
                    onChangeText={(text) => setValue({ ...value, email: text })}
                    
                />
                 <TextInput
                    placeholder='Password'
                    style={styles.input}
                    value={value.password}
                    onChangeText={(text) => setValue({ ...value, password: text })}
                    secureTextEntry={true}
                    
                />
                <Button title="Sign in" color="#841584" onPress={signIn} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title:{
        fontSize: 20,
        fontWeight: '800'
    },
    controls: {
      flex: 1,
      width: '100%',
      padding: 16
    },
  
    button: {
      marginTop: 10,
      padding: 8,
      backgroundColor: '#000',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
  
    error: {
      marginTop: 10,
      padding: 10,
      color: '#fff',
      backgroundColor: '#D54826FF',
    }
});

export default Login