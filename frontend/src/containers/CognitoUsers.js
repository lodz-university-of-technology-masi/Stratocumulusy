import config from '../config';

const  AWS = require('aws-sdk');

export const params = {
    UserPoolId: config.cognito.USER_POOL_ID,
      AttributesToGet: ["email", "email_verified"], // jesli nie ma tego atrybutu to zwroci wszystko

};

export const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18',
    region: config.cognito.REGION,
    credentials: new AWS.Credentials('', ''
        , '')
});