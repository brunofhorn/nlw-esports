import { useRef, useEffect } from 'react';
import { StatusBar } from 'react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from '@expo-google-fonts/inter';
import { Background } from './src/components/Background';
import { Routes } from './src/routes';
import { Loading } from './src/components/Loading';
import { AppContextProvider } from './src/contexts/AppContext';
import Toast from 'react-native-toast-message';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  return (
    <AppContextProvider>
      <Background>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor='transparent'
          translucent
        />
        {fontsLoaded ? <Routes /> : <Loading />}
        <Toast position='top' topOffset={20} />
      </Background>
    </AppContextProvider>
  );
}
