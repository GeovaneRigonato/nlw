import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface ButtonProps {
  title: string;
}

  function Button(props: ButtonProps){
    return (
        <TouchableOpacity>
          <Text>
            {props.title}
          </Text>
        </TouchableOpacity>
    )
  }

export default function App() {
  return (
    <View style={styles.container}>
      <Text>
        App by Geovane Rigonato!
      </Text>

      <Button title="Click me --> 1" />
      <Button title="Click me --> 2" />
      <Button title="Click me --> 3" />

      <StatusBar style="auto"/>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
