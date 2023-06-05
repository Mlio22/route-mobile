import React from "react";
import { 
    StyleSheet, 
    Image, 
    Text, 
    View,
} from "react-native";

import AnimatedIconloading from '../atoms/details/Animationmanuallocation';

export default function StatusLokasiDanTujuan(props: any) {

    const navigation = props.navigation;

    return (
        <View style={styles.container}>
            <View style={styles.StatusLokasiDanTujuan}>
                <View style={styles.Framedetailmanualalocation}>
                    <Image
                    style={styles.Vector}
                    source={{
                        uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/sarxv8i0j8-292%3A346?alt=media&token=a83a79db-83c7-4d00-a7e8-1ee766d12def",
                    }}
                    />
                    <Text style={styles.Koordinat}>Koordinat</Text>
                    <Image
                    style={styles.Vector1}
                    source={{
                        uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/sarxv8i0j8-292%3A342?alt=media&token=53678b45-4651-4d97-8a6a-a7459e322ab4",
                    }}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
        bottom: 10,
        width: '100%'
    },
    StatusLokasiDanTujuan: {
        width: "90%",
        height: 60,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 18,
        paddingBottom: 18,
        borderRadius: 20,
        backgroundColor: "rgba(255,255,255,1)",
        // bottom: "100%",
    },
    Framedetailmanualalocation: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        width: "100%",
        height: "100%",
        // backgroundColor: "red",
    },
    Vector: {
        width: 20,
        height: "100%",
    },
    Koordinat: {
        color: "rgba(0,0,0,1)",
        fontSize: 12,
        lineHeight: 12,
        fontFamily: "Inter, sans-serif",
        fontWeight: "400",
    },
    Vector1: {
        width: 20,
        height: 20,
    },
})
