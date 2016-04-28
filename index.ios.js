/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';

//socket.io assumes navigator.userAgent is a string, supply a dummy one to make it happy
window.navigator.userAgent = "react-native";

var CONNECTION_METADATA_PARAMS = {
    version: '__sails_io_sdk_version',
    platform: '__sails_io_sdk_platform',
    language: '__sails_io_sdk_language'
};

var SDK_INFO = {
    version: '0.11.0',
    platform: typeof module === 'undefined' ? 'browser' : 'node',
    language: 'javascript'
};

SDK_INFO.versionString =
    CONNECTION_METADATA_PARAMS.version + '=' + SDK_INFO.version + '&' +
    CONNECTION_METADATA_PARAMS.platform + '=' + SDK_INFO.platform + '&' +
    CONNECTION_METADATA_PARAMS.language + '=' + SDK_INFO.language;

const io = require("./node_modules/socket.io-client/socket.io");
const socket = io('http://chat.victorv.co', {
  query: SDK_INFO.versionString,
  transports: ['websocket'] // you need to explicitly tell it to use websockets
});

var reactChat = React.createClass( {
  getInitialState: function() {
    console.log('getInitialState');
    return {
      username: '',
      message: '',
      messageList: []
    };
  },
  componentDidMount: function() {
    
    socket.on('connect', () => {
      console.log('WebSocket Connected!!');
      socket.emit('get', {url: '/chat/addConversation'}, function (response) { console.log(response); });
    });

    var me = this;

    socket.on('chat',function(obj){
        if(obj.verb === 'created') {
            console.log("Chat Message Received!");
            console.log(obj);
            var messageList = me.state.messageList.concat([obj.data]);
            me.setState({
              messageList: messageList
            });
        }
    });

  },

  renderMessage: function (mes, i) {
    return (
        <View style={styles.messages} key={i}>
            <Text>{mes.user}</Text>
            <Text>{mes.message}</Text>
          </View>
      );
  },
  sendChat: function(message) {
    console.log(message);
  },
  componentWillUnmount: function() {
    socket.close();
  },
  render: function() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.chatContainer}>
          { this.state.messageList.map(this.renderMessage) }
        </ScrollView>
        <View>
          <TextInput style={styles.inputMessage} placeholder={'TypeYourNameHere'} />
        </View>
        <View>
          <TextInput style={styles.inputMessage} 
            ref='MessageInput'
            placeholder={'TypeYourMessageHere'}
            returnKeyType={'send'}
            onSubmitEditing={(event) => this.sendChat(event.nativeEvent.text)} />
        </View>
      </View>
    );
  }
});



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  chatContainer: {
    flex: 5,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderRadius: 5,
    borderStyle:'dashed',
    padding: 5,
  },
  messageText: {
    flex:1,
    flexDirection:'row',
    margin: 20,
  },
  messages: {
    flex:1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },  
  icon: {
    width: 100,
    height: 100,
  },
  iconMsg: {
    width: 40,
    height: 40,
  },
  inputMessage: {
    borderWidth: 1,
    borderRadius: 5,
    borderStyle:'solid',
    padding: 5,
    width: 180,
    height: 50,
  },
});

AppRegistry.registerComponent('reactChat', () => reactChat);
