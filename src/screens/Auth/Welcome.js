import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'

const Welcome = ({navigation}) => {
   
    return (
        <View style={styles.container}>
            <Text>Welcome screen!</Text>

            <View style={styles.buttons}>
                <Button title="Login" buttonStyle={styles.button} onPress={() => navigation.navigate('Login')} />
                <Button title="Register" type="outline" buttonStyle={styles.button} onPress={() => navigation.navigate('Register')} />
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
  
    buttons: {
      flex: 1,
    },
  
    button: {
      marginTop: 10
    }
});
export default Welcome