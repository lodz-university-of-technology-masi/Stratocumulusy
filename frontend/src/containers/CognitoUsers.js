import config from '../config';

const  AWS = require('aws-sdk');

export const params = {
    UserPoolId: config.cognito.USER_POOL_ID,
      AttributesToGet: ["email", "email_verified"], // if null return all
    //  Filter: 'name ^= \"Candidate\"',
};

export const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18',
    region: config.cognito.REGION,
    credentials: new AWS.Credentials('ASIAYAN7EXI7D2VWGUM3', 'YMXEc5hdk61D3gn4X3lLbUtfRS2fC+3tAkI1d3mK'
        , 'FwoGZXIvYXdzEGwaDNdR1Yi0C74n7uZnSCLDAS+0dd4Q2Q9NedT/PXUurIyxuTcb5ekc6xvDvpXAaQ0iSpEE4duPo22Kcj00176iiqxNkHk/1hdcKLthps1QwGOsYeee0PM62+N4RHY4MnwzubHPb6mICHvMu41JUCpoqL+cLQqlmY3fc60UbZnSRE61I53nZ8Mc8ZQuOjx+estxp+YNMvhjaWi0hWfWBWzOhF8rEmKutntIWTiodvU7LCT7PWkpX6w8Ky5whL0GTyTojAMcgeezYkCwJ3cc4yNsamkz9Cji7KPwBTIt9dROEFXR5y3OmjGHot1iPH/ytixcnu+C+XDFbqUSAetAbBkrYmFtOQTEsWxU')
});