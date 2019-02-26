import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import config from './config';
import Verify from './Verify';
import Login from './Login';

const initialValues = { email: '', password: '' }
const userPool = new CognitoUserPool(config.cognito);
let attributeList = [];



const signup = () => {
  return (
    <div>
      <h1>User services</h1>
      <h2>Sign up for more info</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          // Set call to AWS service
          console.log('set call to aws service in here!', values);
          let attributeEmail = new CognitoUserAttribute({ Name: 'email', Value: values.email })
          attributeList.push(attributeEmail)
          userPool.signUp(values.email, values.password, attributeList, null, (err, result) => {
            if (err) {
              alert(err.message || JSON.stringify(err));
              return;
            }
            var cognitoUser = result.user;
            console.log('user name is ' + cognitoUser.getUsername());
          });


          actions.setSubmitting(false);
          actions.resetForm(initialValues);
          attributeList = [];


        }}
        render={(errors, status, touched, isSubmitting) => (
          <Form>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>Submit my info</button>
          </Form>
        )}
      />
      <Verify email="chiroy_134@hotmail.com"/>
      
      <Login />

    </div>
  )
}

export default signup;