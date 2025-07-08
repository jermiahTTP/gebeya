import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json'; // Assuming app.json will be created by react-native init

AppRegistry.registerComponent(appName, () => App);
