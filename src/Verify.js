import React from 'react';
import { Formik, Field, Error, Form } from 'formik';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
import config from './config';

const userPool = new CognitoUserPool(config.cognito);
const verify = (props) => {
  return (
    <div>
      <h2>Verify your email</h2>
      <h3>Enter the code you recieved</h3>
      <Formik
        initialValues={{ email: props.email, codigo: '' }}
        onSubmit={(values, actions) => {
          const userData = {
            Username: values.email,
            Pool: userPool
          };
          // Set call to AWS service
          console.log('set call to aws service in here!', values);
          var cognitoUser = new CognitoUser(userData);
          cognitoUser.confirmRegistration(values.codigo, true, function (err, result) {
            if (err) {
              alert(err.message || JSON.stringify(err));
              return;
            }
            console.log('call result: ' + result);
            actions.resetForm({ email: '', codigo: '' });
            actions.setSubmitting(false);
          });
        }}
        render={props => (
          <Form>
            <Field type="text" name="email" />
            <Field type="text" name="codigo" />
            <button type="submit">Submit code</button>
          </Form>
        )}
      />
    </div>
  )
}

export default verify;
