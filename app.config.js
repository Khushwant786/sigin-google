export default{
  "expo": {
    "name": "expo-google-signin-firebase",
    "slug": "expo-google-signin-firebase",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
   
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.khushwant.firebasesignin",
      "googleServicesFile": process.env.GOOGLE_SERVICES_INFOPLIST
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff",
        "googleServicesFile": process.env.GOOGLE_SERVICES_JSON
      },
      "package": "com.khushwant.firebasesignin"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "eas": {
        "projectId": "1e175d1d-8866-4cd2-a4c1-c2ca1b4db400"
      }
    }
  }
}
