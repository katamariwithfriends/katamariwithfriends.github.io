function initLoginStatus(onSuccess, onLogin){
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1020005368072813',
      cookie     : true,  // enable cookies to allow the server to access 
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.2' // use version 2.2
    });

    // Now that we've initialized the JavaScript SDK, we call 
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response, function(){
          onSuccess();
        }, function(){
          onLogin();
        });
    });
  };
}

function statusChangeCallback(response, onSuccess, onLogin) {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    console.log("logged in");
    onSuccess();
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    // document.getElementById('status').innerHTML = 'Please log ' +
    //   'into this app.';
    onLogin();
    console.log("please log in");
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    // document.getElementById('status').innerHTML = 'Please log ' +
    //   'into Facebook.';
    onLogin();
    console.log("please log in2");
  }
}


// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function checkLoginState(onSuccess, onLogin) {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response, function(){
      onSuccess();
    }, function(){
      onLogin();
    });
  });
}


function getUserId(onData) {
    FB.api('/me', function(response) {
      user_id = response["id"];
      onData(user_id);
      console.log(response);
    }, {scope: 'user_about_me,user_friends,user_photos,user_relationships'});
}


function getProPic(id, size, onData, onError){
  url = "/" + id + "/picture?height=" + size + "&width=" + size + "&";
  FB.api(
    url,
    function (response) {
      if (response && !response.error) {
        onData(response['data']['url']);
        console.log(response);
      } else {
        onError(response);
        console.log("Error");
        console.log(response);
      }
    }
  );
}

function getFriends(id, limit, onData, onError){
  url = "/" + id + "/invitable_friends?limit="+ limit + "&";
  FB.api(
      url,
      function (response) {
        if (response && !response.error) {
          onData(response["data"]);
          console.log(response);
        } else {
          onError(response);
          console.log("Error");
          console.log(response);
        }
      }
  );
}
