import React from 'react'
import { View, FlatList, StyleSheet, Text} from 'react-native';
import { Button} from 'react-native-paper';

import { connect } from 'react-redux';
import CardProduct from '../../components/CardProduct';

const Cart = ({ cart, navigation }) => {

  console.log(cart)
  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        numColumns={2}
        renderItem={({item}) => <CardProduct
          name={item.name} 
          image={item.image} 
          unit_price={item.unit_price}
          stock={item.stock}
          id={item.id}
          action={navigation}
        />
      }
      keyExtractor={item => item.id}
      />
       { cart.length  >= 1 && <Button 
        buttonColor="#6200ee"
        mode="contained"
        style={styles.btn}
      >Comprar</Button> }
    
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 8
  },
  btn: {
    position: 'absolute',
    bottom: 50,
    left: 8,
    width: '100%',
    borderRadius: 8
  }
})

const mapStateToProps = state => state;

export default connect(mapStateToProps, {})(Cart);