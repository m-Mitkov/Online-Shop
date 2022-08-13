# Online-Shop
 online shop app, where you can add, update and delete products, depending on the permisions the user has.


to start BE run 'npm run start' in the console

to run the FE run 'npm run start'

to change permissions on already created user,
there is a hidden End Point, just send a POST request to this endpoint:
https://online-shop-be.herokuapp.com/api/auth/change/permissions
and add in the headers 'x-auth-token': 'token of the user'(in the terminal where the BE is running there is a log of the current user once logged in, there we can find the token)

method: POST
URL: https://online-shop-be.herokuapp.com/api/auth/change/permissions
headers: {
 x-auth-token: token
},
body: {
  permissions: ['Create', 'Update', 'Read', 'Delete']
}
