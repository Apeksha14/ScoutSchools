
/**
 * Main AngularJS Web Application
 */
var app = angular.module('tutorialWebApp',['ngRoute']);

app.run(function(Session) {}); //bootstrap session;

app.factory('Session', function($http,$rootScope) {
  
  var Session = {
    data: '',
    saveSession: function() { /* save session data to db */ },
    updateSession: function() { 
      /* load data from db */
      $http.get('/getsessiondata')
        .then(function(r) { 
          console.log("sessiondata");
          console.log(r);
          if(r.data)
          {
          return Session.data = r.data
        }
        else
        {
          return Session.data = null;
        }})
    }
  };
  Session.updateSession();
  return Session; 
});

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
   
    .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
    // Pages
    .when("/about", {templateUrl: "partials/about.html", controller: "PageCtrl"}) //aboutus
    .when("/team", {templateUrl: "partials/team.html", controller: "PageCtrl"}) //ourteam
    .when("/login", {templateUrl: "partials/login.html", controller: "PageCtrl"}) //login
    .when("/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl"}) //contactus

    //daycare search
    .when("/daycares", {templateUrl: "partials/daycare.html", controller: "PageCtrl"}) 
    .when("/daycaresearch", {templateUrl: "partials/daycaresearch.html", controller: "PageCtrl"})
    
    //browse schools
    .when("/school", {templateUrl: "partials/nearbySchool.html", controller: "BlogCtrl"})
    .when("/search", {templateUrl: "partials/search1.html", controller: "PageCtrl"})

    //school search
    .when("/schoolsearch", {templateUrl: "partials/school.html", controller: "BlogCtrl"})
    .when("/searchschool", {templateUrl: "partials/search3.html", controller: "PageCtrl"})

    //city overview
    .when("/city", {templateUrl: "partials/cityOverview.html", controller: "BlogCtrl"})
    .when("/cityoverview", {templateUrl: "partials/search7.html", controller: "PageCtrl"})

    //nearby citites
    .when("/cities", {templateUrl: "partials/nearbyCities.html", controller: "BlogCtrl"})
    .when("/nearbycities", {templateUrl: "partials/search8.html", controller: "PageCtrl"})

    //browse districts
    .when("/districts", {templateUrl: "partials/browseDistricts.html", controller: "BlogCtrl"})
    .when("/browsedistricts", {templateUrl: "partials/search9.html", controller: "PageCtrl"})

    //test scores
    .when("/testscores", {templateUrl: "partials/search5.html", controller: "PageCtrl"})

    //census data
    .when("/censusdata", {templateUrl: "partials/search6.html", controller: "PageCtrl"})

    .when("/usersaved", {templateUrl: "partials/usersaved.html", controller: "PageCtrl"})

     .when("/userdaycares", {templateUrl: "partials/userdaycares.html", controller: "PageCtrl"})


    .when("/savedsearch", {templateUrl: "partials/savedsearch.html", controller: "PageCtrl"})

    .when("/successpage", {templateUrl: "partials/successpage.html", controller: "PageCtrl"})

    .when("/profilesearch", {templateUrl: "partials/search2.html", controller: "PageCtrl"})

    .when("/signup", {templateUrl: "partials/signup.html", controller: "PageCtrl"})

    .when("/errorpage", {templateUrl: "partials/errorpage.html", controller: "PageCtrl"})
    .when("/successsignup", {templateUrl: "partials/successsignup.html", controller: "PageCtrl"})


    /*
    
    .when("/schooldetails", {templateUrl: "partials/schooldetails.html", controller: "BlogCtrl"})
    .when("/search4", {templateUrl: "partials/search4.html", controller: "PageCtrl"})

    .when("/successpage", {templateUrl: "partials/successpage.html", controller: "PageCtrl"})
    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"}); */
}]);

/**
 * Controls the Blog
 */
app.controller('BlogCtrl', function ($scope, $location, $http ) {
  console.log("Blog Controller reporting for duty.");
  console.log("dropdownCtrl");
  $scope.schoolsearch= function(){

      var state = $scope.state;
      var city = $scope.city;
      var query = $scope.query;
      var limit = $scope.limit;

    
     console.log($scope.state);
     console.log($scope.city);
     console.log($scope.query);
     console.log($scope.limit);

      var input = {

        state:state,
        city:city,
        query:query,
        limit:limit
      }

     $http({
       method: 'post',
       url: '/schoolsearch',
       data: input
 }).success(function(response){
   console.log(response);
  
   $scope.items = [];
  // console.log(response.schools.school.length);
    for(var i=0;i<response.schools.school.length;i++)
    {
      $scope.items[i] =

      {  
        "id":response.schools.school[i].gsId[0],
        "name":response.schools.school[i].name[0],
        "type":response.schools.school[i].type[0],
        "address" :response.schools.school[i].address[0],
        
      }

      
    }
    searchResult = $scope.items;
    console.log(searchResult);
    $location.path('/search/');
   
});
}
  
});


/**
 * Controls all other Pages
 */
var searchResult = [];
var user;
app.controller('myCtrl', function($rootScope,$scope,$http,$location) {

  $scope.error="";

$scope.nearby= function(){

      var city = $scope.city;
      var state = $scope.state;
      var zipcode = $scope.zipcode;
      var address = $scope.address;
      var type = $scope.type;
      var level = $scope.level;
      var radius = $scope.radius;
      var limit = $scope.limit;

     console.log($scope.city);
     console.log($scope.state);
     console.log($scope.type);
     console.log($scope.level);
     console.log($scope.zipcode);
     console.log($scope.radius);
     console.log($scope.limit);
     console.log($scope.address);

      var input = {

        city: city,
        state:state,
        zipcode: zipcode,
        address:address,
        type:type,
        level:level,
        radius:radius,
        limit:limit
      }

     $http({
       method: 'post',
       url: '/nearbyschools',
       data: input
 }).success(function(response){
   console.log(response);
  $scope.items = [];
   if(response.error)
   {
      $scope.error = "Invalid search parameters!!";
        document.getElementById('errordiv').style.display = "block";
        document.getElementById('school').style.display = "none";
        document.getElementById("error").innerHTML = $scope.error;
   }
  else if(response)
   {
     if(response.schools)
     {
    for(var i=0;i<response.schools.school.length;i++)
    {

     
      $scope.items[i] =

      { 
        
        "id":response.schools.school[i].gsId,
        "name":response.schools.school[i].name,
        "type":response.schools.school[i].type,
        "address" :response.schools.school[i].address,
        "range":response.schools.school[i].gradeRange,
        "enroll":response.schools.school[i].enrollment,
        "rating":response.schools.school[i].parentRating,
        "city":response.schools.school[i].city,
        "state":response.schools.school[i].state,
        "phone":response.schools.school[i].phone,
        "fax":response.schools.school[i].fax,
        "website":response.schools.school[i].website
        
      }

      
    }
    searchResult = $scope.items;
    console.log($scope.items);
          
                      
    $location.path('/search/');

     }
   }
    else
     {
      
       $scope.error = "Invalid search parameters!!";
        document.getElementById('errordiv').style.display = "block";
        document.getElementById('school').style.display = "none";
        document.getElementById("error").innerHTML = $scope.error;
        
  
     }
});
}

$scope.profile= function(item){

    
    var input = {};

      
      var state = $scope.state;
      var id = $scope.gsid;
      
       console.log($scope.state);
     console.log($scope.gsid);
 
 if(item)
      {
        input = {
           state: item.state,
        gsID:item.id
        }

      }
      else
      {
           input = {

        state: state,
        gsID:id
        
      }
      }

      console.log(input);

     $http({
       method: 'post',
       url: '/profile',
       data: input
 }).success(function(response){
   console.log(response);
   console.log(response.school.gsId[0]);
    
      $scope.items=[];

       for(var i=0;i<1;i++)
    {

      $scope.items[i] =

      { 
        
        "id":response.school.gsId,
        "name":response.school.name,
        "type":response.school.type,
        "address" :response.school.address,
        "range":response.school.gradeRange,
        "enroll":response.school.enrollment,
        "rating":response.school.parentRating,
        "gsrating":response.school.gsRating,
        "district":response.school.district,
        "nces":response.school.ncesId,
        "parentreviews":response.school.parentReviews,
        "phone":response.school.phone,
        "fax":response.school.fax,
        "website":response.school.website
        
      }
    }

    searchResult = $scope.items;
          
                      
    $location.path('/profilesearch');
 


  
});
}


$scope.schoolsearch= function(){

      var state = $scope.state;
      var city = $scope.city;
      var query = $scope.query;
      var limit = $scope.limit;

    
     console.log($scope.state);
     console.log($scope.city);
     console.log($scope.query);
     console.log($scope.limit);

      var input = {

        state:state,
        city:city,
        q:query,
        limit:limit
      }

     $http({
       method: 'post',
       url: '/schoolsearch',
       data: input
 }).success(function(response){
   console.log(response);
  
   $scope.items = [];
   if(response.error)
   {
      $scope.error = "Invalid search parameters!!";
        document.getElementById('errordiv').style.display = "block";
        document.getElementById('schoolsearch1').style.display = "none";
        document.getElementById("error").innerHTML = $scope.error;
   }
   else if(response)
   {
     if(response.schools)
     {
    for(var i=0;i<response.schools.school.length;i++)
    {
      
     
      $scope.items[i] =

      { 
        
        "id":response.schools.school[i].gsId,
        "name":response.schools.school[i].name,
        "type":response.schools.school[i].type,
        "address" :response.schools.school[i].address,
        "range":response.schools.school[i].gradeRange,
        "enroll":response.schools.school[i].enrollment,
        "rating":response.schools.school[i].parentRating,
        "city":response.schools.school[i].city,
        "state":response.schools.school[i].state,
        "phone":response.schools.school[i].phone,
        "fax":response.schools.school[i].fax,
        "website":response.schools.school[i].website
        
      
      }
   
    }

    searchResult = $scope.items;
    $location.path('/searchschool/');
   }
   else
   {
     
        $scope.error = "Invalid search parameters!!";
        document.getElementById('errordiv').style.display = "block";
        document.getElementById('schoolsearch1').style.display = "none";
        document.getElementById("error").innerHTML = $scope.error;
    
   
   }
  }
  else
  {
       $scope.error = "Invalid search parameters!!";
        document.getElementById('errordiv').style.display = "block";
        document.getElementById('schoolsearch1').style.display = "none";
        document.getElementById("error").innerHTML = $scope.error;
  }
   
});
}

$scope.schoolreview= function(){

    console.log($scope.type);
     console.log($scope.name);
     console.log($scope.state);
     console.log($scope.city);
     console.log($scope.limit);

     var type = $scope.type;
      var state = $scope.state;
      var city = $scope.city;
      var gsid = $scope.gsid;
      var limit = $scope.limit;
      var cutoffAge = $scope.age;

      var input = {

        type:type,
        state:state,
        city:city,
        gsid:gsid,
        limit:limit,
        cutoffAge:cutoffAge
      }

     $http({
       method: 'post',
       url: '/reviews',
       data: input
 }).success(function(response){
   console.log(response);
  
   $scope.items = [];
  // console.log(response.schools.school.length);
    for(var i=0;i<response.schools.school.length;i++)
    {
      $scope.items[i] =

      {  
        "id":response.schools.school[i].gsId[0],
        "name":response.schools.school[i].name[0],
        "type":response.schools.school[i].type[0],
        "address" :response.schools.school[i].address[0],
        "rating":response.schools.school[i].rating[0]
      }

      
    }
    searchResult = $scope.items;
    //console.log(searchResult);
          
                      
                $location.path('/search4/');
 


  
});
}

$scope.test= function(item){

     
     console.log($scope.state);
     console.log($scope.gsid)
      var state = $scope.state;
      var id = $scope.gsid;
    var input = {};

      if(item)
      {
        input = {
           state: item.state,
        gsID:item.id
        }

      }
      else
      {
           input = {

        state: state,
        gsID:id
        
      }
      }
     


     $http({
       method: 'post',
       url: '/tests',
       data: input
 }).success(function(response){
  
   $scope.items = [];
  
   console.log(response);
   console.log(response.testResults.rank[0].name);
   console.log(response.testResults.rank[0].score);
   console.log(response.testResults.rank[0].scale);
   console.log(response.testResults.rank[0].year);

  
  for(var i=0;i<1;i++)
    {

     $scope.items[i] = {
        
        "rank":response.testResults.rank[0].name,
        "score": response.testResults.rank[0].score,
        "scale":response.testResults.rank[0].scale,
        "year":response.testResults.rank[0].year,
        "name":response.testResults.schoolName,
        "tests":response.testResults.test

      }

    }
  
    console.log($scope.items);
    searchResult = $scope.items;
    //console.log(searchResult);
          
                      
                $location.path('/testscores/');
 


  
});
}


$scope.schoolcensus= function(item){

     console.log($scope.state);
     console.log($scope.gsid)
     console.log(item);
      var state = $scope.state;
      var id = $scope.gsid;

      var input = {};

      if(item)
      {
        input = {
           state: item.state,
        gsID:item.id
        }

      }
      else
      {
           input = {

        state: state,
        gsID:id
        
      }
      }
     

      


     $http({
       method: 'post',
       url: '/census',
       data: input
 }).success(function(response){
   console.log(response['census-data']);
  
   $scope.items = [];
  
    for(var i=0;i<1;i++)
    {
      $scope.items[i] =

      {  
        "address":response['census-data'].address,
        "district":response['census-data'].district,
        "enrollment":response['census-data'].enrollment,
        "ethnicities" :response['census-data'].enthnicities,
        "percent":response['census-data'].percentTeachersInFirstSecondYear,
        "email":response['census-data'].headOfficialEmail,
        "name":response['census-data'].headOfficialName,
        "phone":response['census-data'].phone,
        "schoolName": response['census-data'].schoolName,
        "type": response['census-data'].type,

      }

      
    }
    searchResult = $scope.items;
  console.log(searchResult);
          
                      
                $location.path('/censusdata/');
 

 
  
});
      
      
     
}
$scope.overview= function(){

     console.log($scope.city);
     console.log($scope.state);
     

      var city = $scope.city;
      var state = $scope.state;
      

      var input = {

        city: city,
        state:state,
        
      }

     $http({
       method: 'post',
       url: '/cities',
       data: input
 }).success(function(response){
   console.log(response);
  
   $scope.items = [];
   console.log(response.city);
if(response.error)
   {
      $scope.error = "Invalid search parameters!!";
        document.getElementById('errordiv').style.display = "block";
        document.getElementById('cityoverview').style.display = "none";
        document.getElementById("error").innerHTML = $scope.error;
   }
    else if(response)
   {
    
      for(var i=0;i<1;i++)
    {
      $scope.items[i] =

      {  
        "charter":response.city.charterSchools,
        "elementary":response.city.elementarySchools,
        "high":response.city.highSchools,
        "middle" :response.city.middleSchools,
        "name":response.city.name,
        "private":response.city.privateSchools,
        "public":response.city.publicSchools,
        "rating":response.city.rating,
        "total": response.city.totalSchools,
      }

      
    
      
    }
    searchResult = $scope.items;
    $location.path('/cityoverview/');

   }
   else
   {
    
        $scope.error = "Invalid search parameters!!";
        document.getElementById('errordiv').style.display = "block";
        document.getElementById('cityoverview').style.display = "none";
        document.getElementById("error").innerHTML = $scope.error;
    
   
   }
 


  
});
}
$scope.nearbycity= function(){

     console.log($scope.city);
     console.log($scope.state);
     console.log($scope.radius);
          console.log($scope.sortresult);

     

      var city = $scope.city;
      var state = $scope.state;
      var radius = $scope.radius;
      var sort = $scope.sortresult;
      

      var input = {

        
        state:state,
        city: city,
        radius:radius,
        sort:sort
      }

     $http({
       method: 'post',
       url: '/nearbycities',
       data: input
 }).success(function(response){
   console.log(response);
  
   $scope.items = [];
if(response.error)
   {
      $scope.error = "Invalid search parameters!!";
        document.getElementById('errordiv').style.display = "block";
        document.getElementById('cities').style.display = "none";
        document.getElementById("error").innerHTML = $scope.error;
   }


   else if(response)
   {
     if(response.cities)
     {
  for(var i=0;i<response.cities.city.length;i++)
    {
     
      $scope.items[i] =

      {  
        "charter":response.cities.city[i].charterSchools[0],
        "elementary":response.cities.city[i].elementarySchools[0],
        "high":response.cities.city[i].highSchools[0],
        "middle" :response.cities.city[i].middleSchools[0],
        "name":response.cities.city[i].name[0],
        "private":response.cities.city[i].privateSchools[0],
        "public":response.cities.city[i].publicSchools[0],
        "rating":response.cities.city[i].rating,
        "total": response.cities.city[i].totalSchools[0],
      }

      
      
    }
    searchResult = $scope.items;
    console.log(searchResult);
     $location.path('/nearbycities/');
    }
    else
    {
         $scope.error = "Invalid search parameters!!";
        document.getElementById('errordiv').style.display = "block";
        document.getElementById('cities').style.display = "none";
        document.getElementById("error").innerHTML = $scope.error;
    
    }
 
   }
   else
   {
       $scope.error = "Invalid search parameters!!";
        document.getElementById('errordiv').style.display = "block";
        document.getElementById('cities').style.display = "none";
        document.getElementById("error").innerHTML = $scope.error;
    
   
   }

  
});
}
$scope.district= function(){

     console.log($scope.city);
     console.log($scope.state);
     

      var city = $scope.city;
      var state = $scope.state;
      
      
      var input = {

        city: city,
        state:state
        
      }

     $http({
       method: 'post',
       url: '/districts',
       data: input
 }).success(function(response){
   console.log(response);
  
   $scope.items = [];
   
if(response.error)
   
   {
        $scope.error = "Invalid search parameters!!";
        document.getElementById('errordiv').style.display = "block";
        document.getElementById('districts').style.display = "none";
        document.getElementById("error").innerHTML = $scope.error;
    
   }
   else if(response)
   {

    if(response.districts)
    {
   
  for(var i=0;i<response.districts.district.length;i++)
    {
     
      $scope.items[i] =

      {  
        "address":response.districts.district[i].address[0],
        "charter":response.districts.district[i].charterSchools,
        "elementary" :response.districts.district[i].elementarySchools,
        "fax":response.districts.district[i].fax,
        "grade":response.districts.district[i].gradeRange,
        "high":response.districts.district[i].highSchools,
        "middle":response.districts.district[i].middleSchools,
        "name": response.districts.district[i].name,
        "nces":response.districts.district[i].ncesCode,
        "phone":response.districts.district[i].phone,
        "public":response.districts.district[i].publicSchools,
        "total":response.districts.district[i].totalSchools,
        "website":response.districts.district[i].website
      }

      
      
    }
    searchResult = $scope.items;
     $location.path('/browsedistricts/');
    }
    else
    {
       $scope.error = "Invalid search parameters!!";
        document.getElementById('errordiv').style.display = "block";
        document.getElementById('districts').style.display = "none";
        document.getElementById("error").innerHTML = $scope.error;
    }
   }
   else
   {
    
        $scope.error = "Invalid search parameters!!";
        document.getElementById('errordiv').style.display = "block";
        document.getElementById('districts').style.display = "none";
        document.getElementById("error").innerHTML = $scope.error;
    
   
   }
 


  
});
}

$scope.daycares = function (){

    console.log($scope.city);
     console.log($scope.state);
     

      var city = $scope.city;
      var state = $scope.state;
      
      
      var input = {

        city: city
        
      }

     $http({
       method: 'post',
       url: '/daycares',
       data: input
 }).success(function(response){
   

    $scope.items = [];
    if(response.error)
   
   {
        $scope.error = "Invalid search parameters!!";
        document.getElementById('errordiv').style.display = "block";
        document.getElementById('daycarediv').style.display = "none";
        document.getElementById("error").innerHTML = $scope.error;
    
   }
   else if(response)
   {
     if(response.PlaceSearchResponse.result)
     {
   for(var i=0;i<response.PlaceSearchResponse.result.length;i++)
    {
     
      $scope.items[i] =

      {  
        
        "name": response.PlaceSearchResponse.result[i].name,
        "address":response.PlaceSearchResponse.result[i].formatted_address,
        "rating":response.PlaceSearchResponse.result[i].rating
        
      }

      
      
    }

    searchResult = $scope.items;
     $location.path('/daycaresearch/');
  
   }
   else
   {
     
        $scope.error = "Invalid search parameters!!";
        document.getElementById('errordiv').style.display = "block";
        document.getElementById('daycarediv').style.display = "none";
        document.getElementById("error").innerHTML = $scope.error;
    
   
   }
   }
   else
   {
     
        $scope.error = "Invalid search parameters!!";
        document.getElementById('errordiv').style.display = "block";
        document.getElementById('daycarediv').style.display = "none";
        document.getElementById("error").innerHTML = $scope.error;
    
   
   }
 });

}

$scope.savedsearch = function (){

    console.log($scope.city);
     console.log($scope.state);
     

      var city = $scope.city;
      var state = $scope.state;
      
      
      var input = {

        city: city
        
      }

     $http({
       method: 'get',
       url: '/getuserdata'
       
 }).success(function(response){

    console.log(response.schoolid);
    console.log(response);console.log(response);console.log(response);
     $scope.items = [];
  if(response)
  {
  
      for(var i=0;i<response.length;i++)
    {

     
      $scope.items[i] =

      { 
        
        "id":response[i].schoolid,
        "name":response[i].schoolname,
        "type":response[i].type,
        "address" :response[i].address,
        
        
      }

      
    }
    searchResult = $scope.items;
    console.log($scope.items);
          
                      
    $location.path('/usersaved/');

}
else
{
  console.log(response);
}

 });
}


$scope.saveddaycares = function (){

    console.log($scope.city);
     console.log($scope.state);
     

      var city = $scope.city;
      var state = $scope.state;
      
      
      var input = {

        city: city
        
      }

     $http({
       method: 'get',
       url: '/getdaycares'
       
 }).success(function(response){

    
     $scope.items = [];
  if(response)
  {
  
      for(var i=0;i<response.length;i++)
    {

     
      $scope.items[i] =

      { 
        
        
        "name":response[i].name,
        "address":response[i].address,
        "rating" :response[i].rating,
        
        
      }

      
    }
    searchResult = $scope.items;
    console.log($scope.items);
          
                      
    $location.path('/userdaycares/');

}
else
{
  console.log(response);
}

 });
}



$scope.back = function()
{
          if(document.getElementById('school'))
          {
          document.getElementById('school').style.display = "block";
        }
        if(document.getElementById('cityoverview'))
        {
          document.getElementById('cityoverview').style.display = "block";
        }
        if(document.getElementById('cities'))
        {
          document.getElementById('cities').style.display = "block";
        } 
        if(document.getElementById('districts'))
        {
          
          document.getElementById('districts').style.display = "block";

        }       
        if(document.getElementById('schoolsearch1'))
        {
          document.getElementById('schoolsearch1').style.display = "block";
        }
        if(document.getElementById('login'))
        {
          document.getElementById('login').style.display = "block";
        }
         if(document.getElementById('daycarediv'))
        {
          document.getElementById('daycarediv').style.display = "block";
        }
         if(document.getElementById('signup'))
        {
          document.getElementById('signup').style.display = "block";
        }
       document.getElementById('errordiv').style.display = "none";
}



});

app.controller('PageCtrl', function ( $rootScope,$scope, $location, $http,Session ) {
  console.log("Page Controller reporting for duty."); 
  //angular.element(document.getElementById("nameh4")).innerHTML = "";
  $rootScope.session = Session;
  //Session = null;
  $scope.items = searchResult;  

  $http({
       method: 'get',
       url: '/login'
       
 }).success(function(response){
  
   console.log(response);
   if(response === "home")
   {
     console.log("response home");
     
      $http({
       method: 'get',
       url: '/getuserdata'
       
 }).success(function(response){

    console.log(response);

 })

   }
 });

$scope.logout = function()
{
  Session = null;
 
console.log(Session);
 console.log("LOGOUT");

   $http({
       method: 'get',
       url: '/logout'
       
 }).success(function(response){
   
   console.log(response);
   
   Session = null;

   $location.path('/');
  
 });



} 



 // initMap($scope.items);
  // Activates the Carousel
  $('.carousel').carousel({
    interval: 5000
  });

  // Activates Tooltips for Social Links
  $('.tooltip-social').tooltip({
    selector: "a[data-toggle=tooltip]"
  })
});

app.controller('myCtrl1', function($rootScope,$scope,$http,$location,$filter) {

  var savedItems = [];
  $scope.setSelected = function(item)
{
       
       $scope.selected = item;
       savedItems.push($scope.selected);
}
  $scope.saveSearch = function() {
  console.log("save Search");
  var formData = {};
  var userid;
  console.log($rootScope);
  if($rootScope.userlogin)
  {
     userid = $rootScope.userlogin.userid;
  }
    else
  {
    userid = 0;
  }
  console.log(savedItems);

  for(var i=0;i<(savedItems.length);i++)
  
  {
    
  formData[i] = {
    "userid":userid,
    "schoolid":savedItems[i].id,
    "name": savedItems[i].name,
    "type":savedItems[i].type,
    "address":savedItems[i].address
  }
  
  }
   console.log(formData);
  $http({
       method: 'post',
       url: '/savesearch',
       headers: {'Content-Type': 'application/json'},
       data: formData
 }).success(function(response){
  console.log("repsonse"+response);
  if(response === "login")
  {
    $location.path("/login");
  }
  else if(response === "success")
  {
    $location.path("/successpage");
  }

 });
 
}
$scope.savedaycares = function() {
  console.log("save savedaycares");
  var formData = {};
  var userid;
  if($rootScope.userlogin)
  {
     userid = $rootScope.userlogin.userid;
  }
    else
  {
    userid = 0;
  }
  console.log(savedItems);

  for(var i=0;i<(savedItems.length);i++)
  
  {
    
  formData[i] = {
    "userid":userid,
    "name":savedItems[i].name,
    "address": savedItems[i].address,
    "rating":savedItems[i].rating,
  }
  
  }
   console.log(formData);
  $http({
       method: 'post',
       url: '/savedaycare',
       headers: {'Content-Type': 'application/json'},
       data: formData
 }).success(function(response){
  console.log("repsonse"+response);
  if(response === "login")
  {
    $location.path("/login");
  }
  else if(response === "success")
  {
    $location.path("/successpage");
  }

 });
 
}
$scope.schooldetails = function(id)
{
  
  console.log("schooldetails");
  
  console.log(id.gsId[0]);
  console.log(id.name[0]);
  console.log(id.address[0]);

  $scope.details= [];

  $scope.details = {
    
    id:id.gsId[0],
    name:id.name[0],
    address:id.address[0]

  }
  
    $location.path("/schooldetails");

}





});

app.controller('loginCtrl',function ($rootScope,$scope, $location, $http,Session ) {
  console.log("Login Controller.");
    
  $rootScope.session = Session;
 
  $scope.userlogin ={};
  $scope.login = function()
  {

    console.log($scope.user);
    console.log($scope.password);
   
    var login= {
      username: $scope.user,
      password:$scope.password,
     

    }
    console.log(login);
     $http({
       method: 'post',
       url: '/login',
       headers: {'Content-Type': 'application/json'},
       data: login
 }).success(function(response){
 

   console.log(response);

  if(response.username)
   {
     user  = response.username; 
     $rootScope.userlogin = {
       userid:response._id,
       username:user
     };
     console.log($rootScope);
    // $location.path("/");
     $http({
       method: 'get',
       url: '/getuserdata'
       
 }).success(function(response){

    console.log(response.schoolid);
    console.log(response);console.log(response);console.log(response);
     $scope.items = [];
  if(response)
  {
  
      for(var i=0;i<response.length;i++)
    {

     
      $scope.items[i] =

      { 
        
        "id":response[i].schoolid,
        "name":response[i].schoolname,
        "type":response[i].type,
        "address" :response[i].address,
        
        
      }

      
    }
    searchResult = $scope.items;
    console.log($scope.items);
          
                      
  //  $location.path('/usersaved/');
   $location.path('/');

}
else
{
  console.log(response);
}

 });
   }
   else
   {

       
        document.getElementById('errordiv').style.display = "block";
        document.getElementById('login').style.display = "none";
        document.getElementById("error").innerHTML = response;
    
       
  }
     
   

   

   
 });
  }
 

  $scope.signup = function()
  {

    console.log($scope.user);
    console.log($scope.password);
    console.log($scope.confirmpwd);
    console.log($scope.email);
    var register= {
      username: $scope.user,
      password:$scope.password,
      confirmpwd:$scope.confirmpwd,
      email:$scope.email

    }
     $http({
       method: 'post',
       url: '/register',
       data: register
 }).success(function(response){
   $rootScope.errors1 = [];
   
   console.log("response");
   console.log(response);

   if(response === "userexists")
   {
    for(var i=0;i<1;i++)
     {
       $rootScope.errors1[i] = 
       {
         msg: "User already Exists.Please choose a different email id"
        
       }
       
     }

   }

  else if(response.length > 0)
   {
      
     for(var i=0;i<response.length;i++)
     {
       $rootScope.errors1[i] = 
       {
         msg: response[i].msg,
        
       }
       
     }
        $scope.error = "Invalid search parameters!!";
        document.getElementById('errordiv').style.display = "block";
        document.getElementById('signup').style.display = "none";
        document.getElementById("error").innerHTML = $scope.error;
   
     }
   else
   {
     console.log(response);
     $scope.name = response.username;
     $location.path("/successsignup");
   }
   

 })

  }
});




/*

function PageCtrl(){}
PageCtrl.prototype = {
  addElement:function(){
    var newEle = angular.element("<h3 style='color:red' ng-bind='session.data'></h3>");
    var target = document.getElementById('namediv');
    angular.element(target).append(newEle);
  }
};
*/