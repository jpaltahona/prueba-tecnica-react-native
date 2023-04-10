import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const auth = getAuth();

export function useAuthentication() {
    const [user, setUser] = useState(null);

    const checkAsyncStorage = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };

    useEffect( () => {
     
      //checkAsyncStorage();
      
      const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, async (user) => {
          if (user) {
            await AsyncStorage.setItem('user', JSON.stringify(user));
            setUser(user);
          } else {
            await AsyncStorage.removeItem('user');
            setUser(null);
          }
      });
      return unsubscribeFromAuthStatuChanged;
    }, [] )

    return {
        user
    };
}