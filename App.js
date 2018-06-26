/**
 * Sample React Native App  
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    DeviceEventEmitter,
    NativeModules,
    ToastAndroid,
    Platform
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {



    componentWillMount() {
        DeviceEventEmitter.addListener('EventName', function (msg) {

            console.log('DeviceEventEmitter收到消息'+msg);

              alert('DeviceEventEmitter收到消息'+ msg.key)
        });
    }


  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.welcome}
                onPress={this.getDeviceEventEmitterTime.bind(this)}
          >
            RCTDeviceEventEmitter获取时间
          </Text>
          <Text style={styles.welcome}
                onPress={this.getCallBackTime.bind(this)}
          >
            CallBack获取时间
          </Text>
          <Text style={styles.welcome}
                onPress={this.getPromiseTime.bind(this)}
          >
            Promise获取时间
          </Text>
        </View>
    );
  }

    getDeviceEventEmitterTime() {
        NativeModules.TransMissonMoudle.getTime();
    }

    getCallBackTime() {
        NativeModules.TransMissonMoudle.callBackTime("Allure",
            (msg) => {
                console.log('callBack:---' + msg);
                alert('callBack:---'+msg)
            }
        );

    }

    getPromiseTime() {
        NativeModules.TransMissonMoudle.sendPromiseTime("Allure").then(msg=> {
            console.log("年龄:" + msg.age + "/n" + "时间:" + msg.time);
            alert("年龄" + msg.age + "时间" + msg.time)
            this.setState({
                age: msg.age,
                time: msg.time,
            })
        }).catch(error=> {
            console.log('错误' + error);
        });
    }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
