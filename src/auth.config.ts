import { isPlatform } from '@ionic/angular';
//import config from '../capacitor.config';

export const domain = 'dev-o06c7mkq.us.auth0.com';
export const clientId = 'cK5uH18RiJKMtvefcGmNFphx8JR6ps8W';
//const { appId } = config;

// Use `auth0Domain` in string interpolation below so that it doesn't
// get replaced by the quickstart auto-packager
const auth0Domain = domain;
const iosOrAndroid = isPlatform('ios') || isPlatform('android');

export const callbackUri = iosOrAndroid
  ? 'com.auth.heyapp://dev-o06c7mkq.us.auth0.com/capacitor/com.auth.heyapp/callback'
  : 'http://localhost:4200';
