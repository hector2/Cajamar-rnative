import './shim.js'

import { AppRegistry } from 'react-native';
import App from './App';

//si se quiere desactivar la red box
console.reportErrorsAsExceptions = false;

AppRegistry.registerComponent('cajamarapp', () => App);
