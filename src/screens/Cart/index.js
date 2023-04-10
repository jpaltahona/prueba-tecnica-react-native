import React from 'react'
import { View, FlatList, StyleSheet, Text} from 'react-native';
import { Button, Modal, Portal, Provider} from 'react-native-paper';
import { connect } from 'react-redux';
import CardProduct from '../../components/CardProduct';
import { cartAction } from '../../redux/actions/cart.action';

const Cart = ({ cart, navigation, cartAction }) => {
  const [visible, setVisible] = React.useState(false);

  const comprar = () => {
    console.log(cart)
    cart.forEach( i => {
      console.log(i)
    })
    setVisible(true);
    cartAction([])
  }


  const hideModal = () => setVisible(false);


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
        onPress={comprar}
      >Comprar</Button> }
    
        <Modal visible={visible} onDismiss={hideModal} style={{ alignItems: 'center' }}>
          <View style={{ height: 200, backgroundColor: '#fff', width: 300, borderRadius: 8, justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, textAlign: 'center' }}>Productos comprados</Text>
          </View>
        </Modal>

    
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

export default connect(mapStateToProps, { cartAction })(Cart);