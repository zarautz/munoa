# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Added
- Complete rewrite of the application using [Ionic 2](http://ionicframework.com/) and [Angular](https://angular.io/).
- Translations and application configuration now use [Firebase](https://firebase.google.com/) for easier updates.
- Initial structure to allow notifications in future releases.
- API calls now point to [OpenZarautz API v2](https://data.zarautz.xyz/v2/).
- Improved Forecast section with more information about the sea and waves.
- New section with information about the traffic around Zarautz.

### Changed
- Application icon.
- Removed references to 'Zu Zarautz', as this is now an OpenZarautz project.

## [0.3.1] - 2013-12-04
### Fixed
- CSS bug on maps.

## [0.3.0] - 2013-12-04 [YANKED]
### Added
- New filter for the Events page.

### Changed
- Application icon.
- Respect the order set in the configuration for place types.
- Use the correct image when listing posts.
- French translations.

## [0.2.4] - 2013-09-26
### Added
- Privacy policy.
- Target SDK version set for Android (`targetSdkVersion=14`).

### Changed
- FirefoxOS webapp manifest.
- French translations.

## [0.2.3] - 2013-09-23
### Added
- Initial page now changes depending on user's selected profile.

### Fixed
- Events now show in the preferred language.

## [0.2.2] - 2013-09-21
### Added
- Version information on Settings page.

### Fixed
- Now using a custom angular.js so that routing can work on Android 2.3.3-2.3.7.

## [0.2.1] - 2013-09-20
### Fixed
- Fix error in cache that prevented showing the proper cached data.

## [0.2.0] - 2013-09-19
### Added
- Extra information about pharmacies on duty on Health page.

### Changed
- New design for the weather information page.

## [0.1.1] - 2013-09-18
### Changed
- Minimum supported version of Android is now 2.3.3 (`minSdkVersion=10`).

### Fixed
- Update cache times.

## 0.1.0 - 2014-05-31
### Added
- Initial release of the application using angular.js (1.2.0-rc.2) and Phonegap.
- Included sections: news, weather, tides, events, places (and health related places).

[Unreleased]: https://github.com/zarautz/munoa/compare/0.3.1...HEAD
[0.3.1]: https://github.com/zarautz/munoa/compare/0.3.0...0.3.1
[0.3.0]: https://github.com/zarautz/munoa/compare/0.2.4...0.3.0
[0.2.4]: https://github.com/zarautz/munoa/compare/0.2.3...0.2.4
[0.2.3]: https://github.com/zarautz/munoa/compare/0.2.2...0.2.3
[0.2.2]: https://github.com/zarautz/munoa/compare/0.2.1...0.2.2
[0.2.1]: https://github.com/zarautz/munoa/compare/0.2.0...0.2.1
[0.2.0]: https://github.com/zarautz/munoa/compare/0.1.1...0.2.0
[0.1.1]: https://github.com/zarautz/munoa/compare/0.1.0...0.1.1
