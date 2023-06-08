import React from "react";
import {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import { Historyprops } from "../types/App";

const styles = StyleSheet.create({
    Historycontain: {
        position: "relative",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "rgba(241,241,241,0.65)",
        width: '100%',
        height: '100%',
      },
      History: {
        position: "absolute",
        top: 20,
        left: 140,
        color: "rgba(0,0,0,1)",
        fontSize: 24,
        lineHeight: 24,
        fontFamily: "Lato, sans-serif",
        fontWeight: "600",
      },
      Containisi: {
        // position: "absolute",
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100%",
        height: "90%",
        paddingLeft: 22,
        paddingRight: 22,
        paddingTop: 20,
        paddingBottom: 557,
        // backgroundColor: "red",
        marginTop:50,
      },
      Historysatuan: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100%",
        height: "50%",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 20,
        // backgroundColor: "rgba(241,241,241,0.5)",
        backgroundColor: "white",
        marginTop: 20,
      },
      Framecontain: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        height: "100%",
      },
      Framedetailkondisi: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "20%",
        marginRight: 10,
      },
      _06012023: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginRight: 5,
        color: "rgba(0,0,0,1)",
        fontSize: 10,
        lineHeight: 10,
        fontFamily: "Lato, sans-serif",
        fontWeight: "400",
        textAlign: "center",
      },
      Icondetail: {
        width: 25,
        height: "270%",
      },
      Detailfotolokasi: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "100%",
      },
      Image: {
        width: 70,
        height: 40,
      },
      Detaillokasi: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "100%",
        paddingRight: 2,
        paddingBottom: 2,
        marginLeft:10,
      },
      YogyaBojongsoang: {
        color: "rgba(31,31,31,1)",
        fontSize: 14,
        lineHeight: 14,
        fontFamily: "Lato, sans-serif",
        fontWeight: "600",
      },
      JlBojongsoang: {
        color: "rgba(0,0,0,1)",
        fontSize: 8,
        lineHeight: 8,
        fontFamily: "Lato, sans-serif",
        fontWeight: "400",
      },
});

const History = (props:Historyprops) => {
  return(
    <View style={styles.Historycontain}>
      <Text style={styles.History}>HISTORY</Text>
      <View style={styles.Containisi}>

        <TouchableOpacity style={styles.Historysatuan}>
          <View style={styles.Framecontain}>
            <View style={styles.Framedetailkondisi}>
              <Text style={styles._06012023}>06/01/2023</Text>
              <Image
                style={styles.Icondetail}
                source={{
                  uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/9zsluplmnto-272%3A492?alt=media&token=c817a183-8ec6-4f03-82be-7366cb573679",
                }}
              />
            </View>
            <View style={styles.Detailfotolokasi}>
              <Image
                style={styles.Image}
                source={{
                  uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/9zsluplmnto-272%3A497?alt=media&token=5f9b8a8c-9067-4ddd-8378-dd6f8c04999d",
                }}
              />
              <View style={styles.Detaillokasi}>
                <Text style={styles.YogyaBojongsoang}>Yogya Bojongsoang</Text>
                <Text style={styles.JlBojongsoang}>Jl. Bojongsoang</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Historysatuan}>
          <View style={styles.Framecontain}>
            <View style={styles.Framedetailkondisi}>
              <Text style={styles._06012023}>06/01/2023</Text>
              <Image
                style={styles.Icondetail}
                source={{
                  uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/9zsluplmnto-272%3A492?alt=media&token=c817a183-8ec6-4f03-82be-7366cb573679",
                }}
              />
            </View>
            <View style={styles.Detailfotolokasi}>
              <Image
                style={styles.Image}
                source={{
                  uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/9zsluplmnto-272%3A497?alt=media&token=5f9b8a8c-9067-4ddd-8378-dd6f8c04999d",
                }}
              />
              <View style={styles.Detaillokasi}>
                <Text style={styles.YogyaBojongsoang}>Yogya Bojongsoang</Text>
                <Text style={styles.JlBojongsoang}>Jl. Bojongsoang</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Historysatuan}>
          <View style={styles.Framecontain}>
            <View style={styles.Framedetailkondisi}>
              <Text style={styles._06012023}>06/01/2023</Text>
              <Image
                style={styles.Icondetail}
                source={{
                  uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/9zsluplmnto-272%3A492?alt=media&token=c817a183-8ec6-4f03-82be-7366cb573679",
                }}
              />
            </View>
            <View style={styles.Detailfotolokasi}>
              <Image
                style={styles.Image}
                source={{
                  uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/9zsluplmnto-272%3A497?alt=media&token=5f9b8a8c-9067-4ddd-8378-dd6f8c04999d",
                }}
              />
              <View style={styles.Detaillokasi}>
                <Text style={styles.YogyaBojongsoang}>Yogya Bojongsoang</Text>
                <Text style={styles.JlBojongsoang}>Jl. Bojongsoang</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        
      </View>
    </View> 
  )
};

export default History;