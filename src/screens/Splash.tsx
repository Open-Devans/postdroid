import { Image, StyleSheet, View, Animated, Dimensions } from "react-native";
import React, { useEffect, useRef } from "react";

const { height } = Dimensions.get("window");

const Splash = ({ onFinish }: { onFinish: () => void }) => {
  
  const scaleAnim = useRef(new Animated.Value(0.1)).current;
   const translateYAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1, // full size
      duration: 1200,
      useNativeDriver: true, // important for smooth perf
    }).start();

    Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 1200,
        delay: 0,
        useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      onFinish();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    }} >
     <View style={styles.splashcontainer}>
         <Animated.View
        style={[
          styles.minicontainer,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.splashfig1}></View>
        <View style={styles.splashfig2}>
          <View style={styles.circle}></View>
        </View>
        <View style={styles.splashfig3}>
          <Image
            source={require("../../assets/P.png")}
            style={{ width: 250, height: 250 }}
          />
        </View>
      </Animated.View>
     </View>

      <View style={{
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Animated.Text
        style={[
            styles.text,
            {
                transform: [{ translateY: translateYAnim}]
            }
        ]}
        >
            Postdroid
        </Animated.Text>
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  splashcontainer: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  minicontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  splashfig1: {
    width: 100,
    height: 140,
    backgroundColor: "#71C6FF",
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    zIndex: 1,
  },
  splashfig2: {
    width: 50,
    height: 160,
    backgroundColor: "#143447",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -50,
    zIndex: 2,
  },
  splashfig3: {
    width: 100,
    height: 180,
    backgroundColor: "#71C6FF",
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    overflow: "hidden",
    marginLeft: -25,
    zIndex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 18,
    backgroundColor: "#71C6FF",
    marginLeft: -55,
  },
  text: {
    position: "absolute",
    bottom: -40,
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
});