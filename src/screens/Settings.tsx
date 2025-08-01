import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Header } from "../components/common/Header";
import { Sun, Moon, Info, Code, ExternalLink } from "lucide-react-native";
import * as Linking from "expo-linking";
import pckgJson from "../../package.json";

export default function SettingsScreen() {
  const { theme, isDark, toggleTheme } = useTheme();

  const version = pckgJson.version;

  const goToGitHubRepositoryPage = async () => {
    try {
      await Linking.openURL("https://github.com/Open-Devans/postdroid");
    } catch (error) {}
  };

  const settingsSections = [
    {
      title: "Appearances",
      items: [
        {
          title: "Dark Mode",
          icon: isDark ? (
            <Moon size={20} color={theme.colors.primary} />
          ) : (
            <Sun size={20} color={theme.colors.primary} />
          ),
          type: "toggle",
          value: isDark,
          onToggle: toggleTheme,
        },
      ],
    },
    {
      title: "About",
      items: [
        {
          title: `Version ${version}`,
          icon: <Info size={20} color={theme.colors.primary} />,
          type: "info",
        },
        {
          title: "GitHub Repository",
          icon: <Code size={20} color={theme.colors.primary} />,
          type: "link",
          rightIcon: <ExternalLink size={16} color={theme.colors.subtext} />,
          onPress: async () => await goToGitHubRepositoryPage(),
        },
      ],
    },
  ];

  const renderSettingItem = (item: any, index: number) => {
    return (
      <View
        key={index}
        style={[
          styles.settingItem,
          {
            borderLeftColor: isDark ? '#71C6FF' : '#143447'
          },
        ]}
      >
        <View style={styles.settingItemLeft}>
          {item.icon}
          <Text
            style={[
              styles.settingItemText,
              {
                color: item.textColor || theme.colors.text,
                fontFamily: theme.typography.fontFamily.regular,
              },
            ]}
          >
            {item.title}
          </Text>
        </View>

        {item.type === "toggle" && (
          <Switch
            value={item.value}
            onValueChange={item.onToggle}
            trackColor={{ false: "#767577", true: `${theme.colors.primary}80` }}
            thumbColor={item.value ? theme.colors.primary : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
          />
        )}

        {item.type === "button" && (
          <TouchableOpacity onPress={item.onPress}>
            <Text
              style={[
                styles.actionText,
                {
                  color: item.textColor || theme.colors.primary,
                  fontFamily: theme.typography.fontFamily.medium,
                  
                },
              ]}
            >
              {item.actionText || ""}
            </Text>
          </TouchableOpacity>
        )}

        {item.type === "link" && (
          <View style={styles.linkContainer}>
            <TouchableOpacity onPress={item.onPress}>
              {item.rightIcon}
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Header title="Settings" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {settingsSections.map((section, sectionIndex) => (
          <View style={[styles.sectionContainer, 
            {
              backgroundColor: theme.colors.card,
               borderBottomColor: theme.colors.border,
               margin: 20,
              
            }
          ]}>
                <View key={sectionIndex} style={styles.section}>
            <Text
              style={[
                styles.sectionTitle,
                {
                  fontFamily: theme.typography.fontFamily.medium,
                  backgroundColor: isDark ? '#DEF3FF' : '#71C6FF',
                  borderLeftColor: isDark ? '#71C6FF' : '#143447'
                },
              ]}
            >
              {section.title}
            </Text>
            <View
              style={[
                styles.sectionContent,
                // { backgroundColor: theme.colors.card },
              ]}
            >
              {section.items.map((item, index) =>
                renderSettingItem(item, index)
              )}
            </View>
          </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 140,
  
  },
  sectionContainer: {
    justifyContent: 'center',
    alignItems: "center",

    padding: 20,
    borderBottomWidth: 0.5,
    borderRadius: 15,
    width: 390,
    
    
  },
  section: {
    marginBottom: 24,
    gap: 26,
  
  },
  sectionTitle: {
    fontSize: 20,
    paddingHorizontal: 5,
    width: 350,
    padding: 10,
    borderLeftWidth: 6,
    
    

  },
  sectionContent: {
    borderRadius: 12,
   
    
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderLeftWidth: 0.5,
  },
  settingItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingItemText: {
    fontSize: 16,
    marginLeft: 12,
  },
  actionText: {
    fontSize: 14,
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
