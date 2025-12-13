import { Platform } from 'react-native';

// Base reusable consistency colors
export const Colors = {
  default: {
    primary: '#FFF9F0',
    secondary: "#24282E",
    background: '#F2E5D7',
    action: '#DD1504',
  },
};

// Base reusable consistency fonts
export const Fonts = {
  heading: {
    regular: 'PlayfairDisplay_400Regular',
    medium: 'PlayfairDisplay_500Medium',
    semibold: 'PlayfairDisplay_600SemiBold',
    bold: 'PlayfairDisplay_700Bold',
    black: 'PlayfairDisplay_900Black',
  },

  body: {
    regular: 'Inter_400Regular',
    medium: 'Inter_500Medium',
    semibold: 'Inter_600SemiBold',
  },

  mono: Platform.select({
    ios: 'Menlo',
    android: 'monospace',
    web: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    default: 'monospace',
  }),
};
