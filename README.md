# R-E-S-Q Mobile App

Mobile application for R-E-S-Q built with Expo and React Native.

## Prerequisites

- Node.js 18 or newer
- npm 9 or newer
- Expo Go app on your phone (Android or iOS) or an Android/iOS emulator

## Project Structure

The runnable app is inside the `resq-mob` folder.

## Install Dependencies

From the repository root:

```bash
cd resq-mob
npm install
```

## Run the App

From `resq-mob`, start the Expo development server:

```bash
npm start
```

Then choose one of the following:

- Press `a` to open Android emulator/device.
- Press `i` to open iOS simulator (macOS only).
- Press `w` to open the web version.
- Or scan the QR code with Expo Go on your phone.

## Direct Platform Commands

You can also run platform-specific commands:

```bash
npm run android
npm run ios
npm run web
```

## Linting

To run lint checks:

```bash
npm run lint
```

## Notes

- If Metro cache issues appear, restart with:

```bash
npx expo start -c
```

- Ensure you are running commands inside `resq-mob`, not the repository root.
