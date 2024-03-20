import React from 'react';
import WebView from 'react-native-webview';
export function TermsConditionsScreen() {
  return (
    <WebView source={{uri: `https://www.aptlymanaged.com/user-agreement`}}/>
  );
}