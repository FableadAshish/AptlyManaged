import React from 'react';
import {WebView} from 'react-native-webview';
export function PrivacyPolicyScreen() {
  return (
      <WebView source={{uri: `https://www.aptlymanaged.com/privacy-policy`}}/>
  );
}
