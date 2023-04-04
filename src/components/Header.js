import React from 'react'
import { useColorScheme } from 'react-native';
import { Appbar, Badge  } from 'react-native-paper';
import { theme } from '../utils/contants';
import { connect } from 'react-redux';


const Header = ({ isBack, title, navigation, cart }) => {
    let colorScheme = useColorScheme();
    console.log(cart.length)
    return (
        <Appbar.Header type="small" 
            style={{ 
                backgroundColor: colorScheme === 'light' ? theme.container_light.backgroundColor : theme.container_dark.backgroundColor,
                shadowColor: colorScheme === 'light' ? theme.container_light.shadow : theme.container_dark.shadow,
                shadowOffset: {width: 0, height: 3.5},
                shadowOpacity: 0.2,
                shadowRadius: 3,
            }}
        >
            { isBack &&  <Appbar.BackAction onPress={() => navigation.goBack() } color={colorScheme === 'light' ? theme.container_light.textColor : theme.container_dark.textColor } /> }
           
            <Appbar.Content title={title} color={colorScheme === 'light' ? theme.container_light.textColor : theme.container_dark.textColor }/>
            <Appbar.Action icon="cart" onPress={() => navigation.navigate({ name: 'Cart' })} color={colorScheme === 'light' ? theme.container_light.textColor : theme.container_dark.textColor } />
        </Appbar.Header>
    )
}
const mapStateToProps = state => state ;
export default connect(mapStateToProps, {})(Header)