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

class reactChat extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.chatContainer}>
          <View style={styles.messages}>
            <Text>message</Text>
            <Image
              style={styles.iconMsg}
              source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
            />
          </View>
          <View style={styles.messages}>
            <Text>message</Text>
            <Image
              style={styles.iconMsg}
              source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
            />
          </View>  
          <View style={styles.messages}>
            <Text>message</Text>
            <Image
              style={styles.iconMsg}
              source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
            />
          </View>
          <View style={styles.messages}>
            <Text>message</Text>
            <Image
              style={styles.iconMsg}
              source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
            />
          </View>
          <View style={styles.messages}>
            <Text>message</Text>
            <Image
              style={styles.iconMsg}
              source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
            />
          </View>  
          <View style={styles.messages}>
            <Text>message</Text>
            <Image
              style={styles.iconMsg}
              source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
            />
          </View><View style={styles.messages}>
            <Text>message</Text>
            <Image
              style={styles.iconMsg}
              source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
            />
          </View>
          <View style={styles.messages}>
            <Text>message</Text>
            <Image
              style={styles.iconMsg}
              source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
            />
          </View>  
          <View style={styles.messages}>
            <Text>message</Text>
            <Image
              style={styles.iconMsg}
              source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
            />
          </View><View style={styles.messages}>
            <Text>message</Text>
            <Image
              style={styles.iconMsg}
              source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
            />
          </View>
          <View style={styles.messages}>
            <Text>message</Text>
            <Image
              style={styles.iconMsg}
              source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
            />
          </View>  
          <View style={styles.messages}>
            <Text>message</Text>
            <Image
              style={styles.iconMsg}
              source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
            />
          </View>
        </ScrollView>
        <View style={styles.messageText}>
          <Text style={styles.inputMessage}>
            hola
          </Text>
          <Image
            style={styles.icon}
            source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          />
        </View>
         <View>
          <TextInput style={styles.inputMessage} placeholder={'Please choose an username'} multiline={true} />
        </View>
      </View>
    );
  }
}

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
  },
});

AppRegistry.registerComponent('reactChat', () => reactChat);
