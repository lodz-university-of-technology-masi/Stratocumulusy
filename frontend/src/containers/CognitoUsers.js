import config from '../config';

const  AWS = require('aws-sdk');

export const params = {
    UserPoolId: config.cognito.USER_POOL_ID,
      AttributesToGet: ["email", "email_verified"], // jesli nie ma tego atrybutu to zwroci wszystko

};

export const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18',
    region: config.cognito.REGION,
    credentials: new AWS.Credentials('ASIAYAN7EXI7KIKCHNWW', 'WhkBJKq9DAZ9s5T4/LGjdd13iEt5/pTZThVAbLDP'
        , 'FwoGZXIvYXdzEOX//////////wEaDI6xCokaMRnkf2m2kyLDAWrlC+qHCmKkp5haL98o5n8hGTC6ycPccISE0L2PXGzyJzNNKUmnnuItMthSbxHYKeCek89QGnYopCkYdNVWQFmkpzCh/1rXbCUnryrfT3ygwUZeMBLPtyx2bLXdynKAqV1r1l1VJsEd5n/XSHQdniFDgBdN7X+hkB6YGiLVJiDI3009h6kGYx8XJrMGa3MYjsAbhkAgctOsIhuMcxitfWQh5Sql0evP8DWBOpSnGc5XkMKXuuPNEYZofNsXytx43j8sRijxrr7wBTItRXPskn2xi/TznQfyrKtrIVnSr19sX9GEpQYJjQMnW/jIDY0diWzYGRSSW587')
});