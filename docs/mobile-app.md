# Mobile App

The app is deployed as a PWA to mobile.

## Android

Can be deployed to Play Store using
[Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap). This is handled in
the [mobile-app](../services/mobile-app) folder.

For an existing apps, one needs to install the key store to get it to work. The
key store should not be commited to Git.

Before updating the required minimum SDK level then review
[apilevels.com](https://apilevels.com/) to see how large support is for the
different versions.

## Apple

Can be deployed as a PWA using
[PWABuilder](https://docs.pwabuilder.com/#/?id=pwabuilder).
