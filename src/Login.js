import React from 'react';
import { Formik, Form, Field } from 'formik';
import { CognitoUserPool, AuthenticationDetails, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import config from './config'

const userPool = new CognitoUserPool(config.cognito);

const login = () => {
  let logged = false
  let token = null;
  let authData = {
    Username: '',
    Password: ''
  }
  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, actions) => {
          authData.email = values.email;
          authData.Password = values.password;
          const authDetails = new AuthenticationDetails(authData)

          const userData = {
            Username: values.email,
            Pool: userPool
          };
          // Set call to AWS service
          console.log('set call to aws service in here!', values);
          var cognitoUser = new CognitoUser(userData);
          if (logged) {
            cognitoUser.signOut();
            token = null
          } else {
            cognitoUser.authenticateUser(authDetails, {
              onSuccess: function (result) {
                var accessToken = result.getAccessToken().getJwtToken();
                console.log(accessToken);
                token = accessToken;
                logged = true;
                actions.resetForm({ email: '', codigo: '' });
                actions.setSubmitting(false);
                /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer*/
                var idToken = result.idToken.jwtToken;
              },

              onFailure: function (err) {
                alert(err);
              },

            });
          }
        }}
        render={props => (
          <Form>
            <Field type="email" name="email" />
            <Field type="password" name="password" />
            {logged ? <button type="submit">Log out</button> : <button type="submit">Log in</button>}
            {/* {token ? <h4>{token}</h4> : null} */}
          </Form>
        )}
      />
      {logged ? <h1>Bienvenido de nuevo!</h1> : null}
    </div>
  )
}

export default login;
