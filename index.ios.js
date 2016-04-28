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

  
  sendChat: function(message) {
    console.log(message);
    var data = { user: this.state.username, message: this.state.message };
    socket.emit('post', {url: '/chat/addConversation', data: data }, function (response) { console.log(response); });
    this.setState({message:''});
  },
  setUsername: function(username) {
    this.setState({username:username});
  },
  componentWillUnmount: function() {
    socket.close();
  },

  renderSetUsername: function(){
    return (<View>
          <TextInput style={styles.inputMessage} placeholder={'TypeYourNameHere'} 
            returnKeyType={'send'}
            onSubmitEditing={(event) => this.setUsername(event.nativeEvent.text)}
            />
        </View>);
  },
  renderMessageList : function () {
    return (
      <View>
        <MessageList messages={this.state.messageList} />
        <TextInput style={styles.inputMessage} 
          ref='MessageInput'
          placeholder={'TypeYourMessageHere'}
          returnKeyType={'send'}
          onChangeText={(text) => this.setState({message:text})}
          value={this.state.message}
          onSubmitEditing={(event) => this.sendChat()} />
            
      </View>)
  },
  
  render: function() {
    return (
      <View style={styles.container}>
        {this.state.username ? this.renderMessageList(): this.renderSetUsername()}
      </View>
    );
  }
});

var MessageList = React.createClass( {
  renderMessage: function (mes, i) {
    return (
        <View style={styles.messages} key={i}>
            <Text style={styles.userMessage}>{mes.user}</Text>
            <Text style={styles.message}>{mes.message}</Text>
          </View>
      );
  },
  render: function() {
    return (<View style={styles.container}>

        <ScrollView style={styles.chatContainer}>
          { this.props.messages.map(this.renderMessage) }
        </ScrollView>
      </View>)
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
  message: {
    flex:3,
  },
  userMessage: {
    flex:1,
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
