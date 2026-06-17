import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register-1" />
      <Stack.Screen name="register-2" />
      <Stack.Screen name="home" />
      <Stack.Screen name="profile" />

      <Stack.Screen name="record/listening" />
      <Stack.Screen name="record/recording" />
      <Stack.Screen name="record/completed" />
      <Stack.Screen name="record/preview" />
      <Stack.Screen name="record/preparing" />

      <Stack.Screen name="file/preview" />
      <Stack.Screen name="file/preparing" />

      <Stack.Screen name="generate/text" />
      <Stack.Screen name="generate/loading" />
      <Stack.Screen name="generate/result" />
    </Stack>
  );
}
