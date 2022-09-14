import { StatusBar } from "react-native";

import { Background } from './src/Components/Background';

export default function App() {
  return (
    <Background>
      <StatusBar
      barStyle="light-content"
      backgroundColor="transparent"
      translucent
      />
    </Background>
  );

}