import React from 'react'
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';


const CardProduct = ( {name, image, unit_price, id, action, stock, addToCart} ) => {

    return (
        <View style={styles.card}>
            <TouchableHighlight onPress={ () => action.navigate(
                {
                    name: 'SingleProduct',
                    params: { productId: id },
                }) }
            >
                <Image
                    style={styles.logo}
                    source={{ uri: image }}
                />
            </TouchableHighlight>
            
            <Text style={styles.title}>{ name }</Text>
            <View style={styles.footer}>
                <Text style={styles.price}>${ unit_price }</Text>
                { stock >= 1 ? <>
                    { addToCart ?
                     <TouchableHighlight onPress={ () => addToCart ({name, image, unit_price, id, action, stock: 1}) }>
                        <Ionicons name="cart" size={32} color="grey" />
                    </TouchableHighlight>
                    : <Text>Cantidad: {stock}</Text>
                }
                </> :
                <Text style={styles.sold}>AGOTADO</Text>
                }
                
               
            </View>
        </View>
    )
}


export default CardProduct;

const styles = StyleSheet.create({
    card: {
        width: '46%',
        padding: 12,
        backgroundColor: '#ffff',
        margin: 7,
        borderRadius: 6,
        height: 230,
        shadowColor: '#171717',

        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    logo: {
        width: '100%',
        height: 110,
        resizeMode: 'contain'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        height: 50
    },
    price:{
        fontSize: 18,
        fontWeight: '600'
    },
    footer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 30
    },
    sold: {
        color: '#fff',
        backgroundColor: '#000',
        padding: 8,
    }
})