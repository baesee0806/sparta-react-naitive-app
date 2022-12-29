import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.separator}>
        <Button title='Javascript'/>
      </View>
      <View style={styles.separator}>
        <Button title='React'/> 
      </View>
      <View style={styles.separator}>
        <Button title='Coding Test'/>
      </View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:"row",
    fontSize : "5",
  },
  separator: {
        flexDirection:"row",
        marginVertical: 8,
        width: 100,
        height: 50,
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderStyle: 'solid',
        
  },
});
