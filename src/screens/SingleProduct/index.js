import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { getSingleProduct } from '../../api/products';
import { Appbar, Button, Snackbar } from 'react-native-paper';
import { connect } from 'react-redux';
import { cartAction } from '../../redux/actions/cart.action';
import { doc, getDoc, getFirestore} from "firebase/firestore"; 


const SingleProduct = ({ navigation, route, cart, cartAction }) => {
  const [productInfo, setProductInfo] = useState(null)
  const [visible, setVisible] = useState(false);

  async function getProductData(){
    try {
      const data = await getSingleProduct(route.params.productId);
      if(data.error){
        const db =  getFirestore();
        const docRef = doc(db, "products", route.params.productId);
        const docSnap = await getDoc(docRef);
        setProductInfo(docSnap.data())

      }else{
        setProductInfo(data)
      }
    } catch (error) {
      console.log('error ->', error)
    }
  }

  const addTocart = () => {
    let currentCart = cart;
 
    let objProduct = {
      id: route.params.productId,
      image: productInfo.image,
      namea: productInfo.name,
      unit_price: productInfo.unit_price
    }
    let find = currentCart.find(i => i.id === route.params.productId);
    if(find){
      find.stock = find.stock + 1;
      let filterObj = currentCart.filter(i => i.id != route.params.productId );
      filterObj.push(find);
      cartAction(currentCart);
      setVisible(!visible)
      
    }else{

      currentCart.push(objProduct);
      cartAction(currentCart);
      setVisible(!visible)
    }
    
  }

  useEffect( () => {
    getProductData()
  }, [route.params.productId] )

  console.log(productInfo);
  return (
    <ScrollView>
      <Appbar.Header type="small">
        <Appbar.BackAction onPress={ () => navigation.goBack() } />
          <Appbar.Content title="Producto" />
          <Appbar.Action icon="cart" onPress={() => navigation.navigate({ name: 'Cart' })} />
       </Appbar.Header>
      { productInfo && <View>
        <Image 
          style={styles.image}
          source={{ uri: productInfo.image }}
        />
        <View style={styles.containerInfo}>
          <Text style={styles.title}>{productInfo.name}</Text>
          <Text style={styles.price}>${productInfo.unit_price}</Text>
          <Text style={styles.stock}> stock: {productInfo.stock}</Text>
          { productInfo.stock >= 1 ? 
            <Button icon="cart" 
            buttonColor="#6200ee"
            mode="contained" 
            onPress={addTocart}
            style={styles.btn}
          >
           Agregar al carrito
          </Button>
          : 
          
          <Button icon="cart" 
            buttonColor="#808080"
            mode="contained" 
            style={styles.btn}
          >
            Producto agotado
          </Button>
          }
          
          <Text style={styles.description}> {productInfo.description}</Text>
        </View>
        
      </View>
      }
   
   <Snackbar
          visible={visible}
          onDismiss={() => setVisible(!visible)}
          action={{
            label: 'ir al carrito',
            onPress: () =>  {
              setVisible(!visible)
              navigation.navigate({ name: 'Cart' })
            } ,
          }}>
          Product add to cart
        </Snackbar>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 350,
    resizeMode: 'contain',
    backgroundColor: '#fff'
  },
  containerInfo: {
    padding: 12,
  },
  btn: {
    marginBottom: 16,
    padding: 10,
    borderRadius: 8
  },
  stock: {
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 16
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10
  },
  price: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10
  },
  description: {
    fontSize: 16,
    fontWeight: '400'
  }
})

const mapStateToProps = state => state;
export default connect(mapStateToProps, { cartAction })(SingleProduct);