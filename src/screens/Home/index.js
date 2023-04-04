import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, useColorScheme  } from 'react-native';
import { Appbar, Snackbar, ActivityIndicator, Text } from 'react-native-paper';
import { getAllProducts } from '../../api/products';
import CardProduct from '../../components/CardProduct';
import { connect } from 'react-redux';
import { cartAction } from '../../redux/actions/cart.action';
import { collection, getDocs, getFirestore } from "firebase/firestore"; 
import { theme } from '../../utils/contants';

const Home = (props) => {
  let colorScheme = useColorScheme();
  const [products, setProduct] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  async function apigetAllProducts(){
    try {
        const api = await getAllProducts({ limite: 40 });
    
        if(api){
          setProduct(api);
          setLoading(false)
        }
        else{
          console.log('firestore')
          const db = getFirestore();
          const colRef = collection(db, "products");

          getDocs(colRef)
          .then((snapshot) => {
            let collection = []
            snapshot.docs.forEach((doc) => {
                collection.push({...doc.data(), id: doc.id })
            })
            console.log(collection)
            setProduct(collection);
            setLoading(false)
          })
        }
        
       
    } catch (error) {
      console.log(error)
    }
  }
  useEffect( () => {
    apigetAllProducts()
  }, [] )

  const addToCart = (product) => {
    let currentCart = props.cart;
    currentCart.push(product);
    props.cartAction(currentCart);
    setVisible(!visible)
  }

  return (
    <View style={{ backgroundColor: colorScheme === 'light' ? theme.container_light.backgroundColor  :  theme.container_dark.backgroundColor }}>
       <Appbar.Header type="small">
          <Appbar.Content title="Home" />
          <Appbar.Action icon="cart" onPress={() => props.navigation.navigate({ name: 'Cart' })} />
       </Appbar.Header>
            
        { loading === true ?
        <View style={styles.container}>
          <ActivityIndicator animating={true} color='#808080' />
        </View> 
        : 
        <>
        <FlatList
          data={products}
          numColumns={2}
          renderItem={({item}) => <CardProduct
            name={item.name} 
            image={item.image} 
            unit_price={item.unit_price}
            stock={item.stock}
            id={item.id}
            action={props.navigation}
            addToCart={addToCart}
          />
          }
          keyExtractor={item => item.id}
        />
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(!visible)}
          action={{
            label: 'ir al carrito',
            onPress: () =>  {
              setVisible(!visible)
              props.navigation.navigate({ name: 'Cart' })
            } ,
          }}>
          Product add to cart
        </Snackbar>

        </> }
       
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

const mapStateToProps = state => state;

export default connect(mapStateToProps, {cartAction})(Home)