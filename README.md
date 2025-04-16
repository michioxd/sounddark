# DEPRECATED - NO LONGER NEEDED!!

SoundCloud has finally implemented a dark mode theme—looks better, right? That means this extension is no longer needed and will be archived soon. Please remove it from your browser and enjoy the new official theme. Thanks for using this extension!

# SoundDark

A better Dark theme for SoundCloud, supported Chromium-based browser and Firefox

[![CI status](https://github.com/michioxd/sounddark/actions/workflows/test-pack.yaml/badge.svg)](https://github.com/michioxd/sounddark/actions/workflows/test-pack.yaml)

![chrome_jndP7OEisJ](https://github.com/michioxd/sounddark/assets/80969068/a0602884-b07e-4d94-b4ea-b88b902d50d9)

## Features

- Toggle theme (original light theme, SoundDark dark theme and auto theme followed the system setting)
- Dark theme :)

## Installation
<a href="https://chromewebstore.google.com/detail/sounddark/ablcfojnfkneoplpflnpbeglgkjmiman" target="_blank"><img src="https://github.com/user-attachments/assets/3033658a-3b91-4fd3-8f4e-28c61bc55b32" width="200" alt="Chrome Web Store"/></a>
<a href="https://microsoftedge.microsoft.com/addons/detail/sounddark/mdjnpmfeinnmbhanpikmfcbigpnjcplj" target="_blank"><img src="https://get.microsoft.com/images/en-us%20dark.svg" width="200" alt="Microsoft Edge"/></a>
<a href="https://addons.mozilla.org/firefox/addon/sounddark/" target="_blank"><img src="https://github.com/michioxd/sounddark/assets/80969068/9e7bac62-4b49-4754-9852-a58ee108b952" width="160" alt="Firefox"/></a>

### Install manually

**Chromium-based browser (Chrome, Microsoft Edge, Brave, Opera,...):**

- Go to [Release page](https://github.com/michioxd/sounddark/releases/latest) then download `chromium-release.zip`
- Extract it in anywhere you want
- Go to Chrome Extension (`chrome://extensions/`), toggle the `Developer Mode` at header
- Click `Load unpacked` then choose the directory of SoundDark you have extracted
- Go to [SoundCloud](https://soundcloud.com) and enjoy :)

[Watch install instruction video on YouTube](https://youtu.be/eIGdk0d-oSQ)

**Firefox-based browser (Firefox, Tor Browser,...):**

- Go to [Release page](https://github.com/michioxd/sounddark/releases/latest) then download `firefox-release.zip`
- Go to Debugging (`about:debugging#/runtime/this-firefox`) then click "Load Temporary Add-on"
- Select `firefox-release.zip` where you downloaded that file.

**Note:** They will unload this extension if you restart your browser!

**WARNING**: Make sure you allow permission for SoundDark on Firefox (not On When Clicked)

![image](https://github.com/michioxd/sounddark/assets/80969068/7806287e-2ca0-417f-918e-54a7ffe725fa)


## Development

- Clone this repository

  ```shell
  git clone https://github.com/michioxd/sounddark
  ```

- Go to Chrome Extension (`chrome://extensions/`), toggle the `Developer Mode` at header
- Click `Load unpacked` then choose the `src` directory of SoundDark repository you have cloned
- Do everything you want :)

## Building

You can use `npm` if you want, i used `pnpm` instead

```shell
pnpm install
pnpm run pack
```

You should see the `chromium-release.zip` and `firefox-release.zip` in the `dist` directory

## Screenshots

![chrome_H8OF3Yfp5K](https://github.com/michioxd/sounddark/assets/80969068/c3d42c75-4f89-428d-a930-21d43f43b3f4)
![chrome_jndP7OEisJ](https://github.com/michioxd/sounddark/assets/80969068/a0602884-b07e-4d94-b4ea-b88b902d50d9)

wanna see more? [install it lol](#installation)

## Copyright

The SoundCloud logo is a trademark of SoundCloud Global Limited & Co. KG.

## License

All codes are released under [MIT License](LICENSE)

## Credits

Made with love from [michioxd](https://github.com/michioxd) and all [contributors](https://github.com/michioxd/sounddark/graphs/contributors).
