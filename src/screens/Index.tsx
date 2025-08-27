import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { StatusBar } from "expo-status-bar";
import { RequestBuilder } from "../components/request/RequestBuilder";
import { ResponseViewer } from "../components/response/ResponseViewer";
import { Header } from "../components/common/Header";
import { RequestData } from "../types/api";
import { Req } from "../lib/request";
import { Res } from "../lib/response";


export default function APITesterScreen() {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<Res | null>(null);
  

  const handleExecuteRequest = async (requestData: RequestData) => {
    setIsLoading(true);
    let endTime,
      startTime,
      responseTime = null,
      response = null;

    try {
      const request = new Req(requestData);
      startTime = performance.now();
      const result = await request.fetch();
      response = new Res(result);
    } catch (error) {
      console.error("Error executing request:", error);
      const result = new Response(null, {
        status: 0,
        statusText: "Error",
        headers: {},
      });
      response = new Res(result);
    } finally {
      endTime = performance.now();
      responseTime = Math.round(endTime - startTime);
      if (response) {
        response._time = responseTime;
      }
      setResponse(response);
      setIsLoading(false);
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar style={theme.colors.statusBar} />
      <Header title="API Tester" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          <RequestBuilder
            onExecute={handleExecuteRequest}
            isLoading={isLoading}
          />
          {response && <ResponseViewer response={response} />}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 90,
    paddingBottom: 40,
  },
});
