import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  View
} from "react-native";
import {useNavigate} from 'react-router-dom'

function buscarPage() {
  const navigate = useNavigate()  
  
  return (
        <SafeAreaView>
              <Text>HOME</Text>
          <Button title="Profile" onPress={()=>{ navigate('/profile')}} />
        </SafeAreaView>
      );
}
export default buscarPage;
