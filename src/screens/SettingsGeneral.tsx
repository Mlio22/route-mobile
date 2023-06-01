import React from "react";
import { 
    StyleSheet, 
    Image, 
    Text, 
    View,
    TouchableOpacity, 
} from "react-native";
import { SettingsGeneralprops } from "../types/App";

const styles = StyleSheet.create({
    HalamanSetting: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100%",
        height: "100%",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 66,
        paddingBottom: 77,
        backgroundColor:
          " linear-gradient(152.13deg, rgba(94,183,84,1) 20%, rgba(83,222,217,1) 94%) ",
      },
      Containergreen: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
      },
      Settingsmenus: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        paddingRight: 2,
        paddingBottom: 2,
        marginBottom: 10,
      },
      Logosettings: {
        width: 30,
        height: "100%", 
        marginRight: 20,
        marginBottom: 20,
      },
      Settings: {
        color: "rgba(0,0,0,1)",
        fontSize: 24,
        lineHeight: 24,
        fontFamily: "Inter, sans-serif",
        fontWeight: "400",
        marginTop: 5,
      },
      Containerwhite: {
        width: "100%",
        height: 596,
        paddingLeft: 14,
        paddingRight: 77,
        paddingTop: 41,
        paddingBottom: 470,
        borderRadius: 20,
        backgroundColor: "rgba(255,255,255,0.92)",
      },
      Containsettings: {
        width: 229,
        height: "100%",
      },
      Containsettingspil: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        paddingRight: 35,
        paddingBottom: 4,
      },
      PreferencesSettings: {
        color: "rgba(0,0,0,1)",
        fontSize: 20,
        lineHeight: 20,
        fontFamily: "Inter, sans-serif",
        fontWeight: "500",
      },
      ManualLocation: {
        color: "rgba(0,0,0,1)",
        fontSize: 20,
        lineHeight: 20,
        fontFamily: "Inter, sans-serif",
        fontWeight: "400",
      },
});

const SettingsGeneral = (props:SettingsGeneralprops) => {

    return(
    <View style={styles.HalamanSetting}>
      <View style={styles.Containergreen}>
        <View style={styles.Settingsmenus}>
          <Image
            style={styles.Logosettings}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/7f6tmwcwqya-414%3A446?alt=media&token=afb8c830-05e2-4f55-91e7-324b19609681",
            }}
          />
          <Text style={styles.Settings}>SETTINGS</Text>
        </View>
        <View style={styles.Containerwhite}>
          <View style={styles.Containsettings}>
            <View style={styles.Containsettingspil}>
              <TouchableOpacity>
                <Text style={styles.PreferencesSettings}>
                  preferences settings
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.ManualLocation}>Manual Location</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
)};

export default SettingsGeneral;