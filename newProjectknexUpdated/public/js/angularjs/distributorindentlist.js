var app = angular.module('myAppr1', []);
app.controller('myCtrlr1', function($scope,$location,$http,$window) {
    console.log(localStorage.getItem('username'));
     if(! localStorage.getItem('username'))
     {
         $window.location.href ='/distributorportal';
     }
    else {   //$window.location.href ='';  
              //list of indent 
                              var datausername = localStorage.getItem('username');
                                datausername={"username":datausername};
                                $scope.value={}
                                 $http({
                                     method: 'POST',
                                     url: '/callforindentlist',
                                     data: datausername
                                    }).then(function(rest) {
            
                                               d1 = rest.data;  
                                               console.log(d1);
                                           var element = document.getElementById("parent");
                                          /* var length =element.childElementCount;
         
                                       while(length >= 1){
                                            element.removeChild(element.childNodes[1]);
                                               --length; 
                                           }*/
                                     var para = document.createElement("tr");
                                      element.appendChild(para);
                                      var a = ['Store name','Drug Name','Company Name','Formula name','Strength','Max retails price'];
                                      var i=0;
                                      var l = a.length;
                            while(i<l)
                              {      
                                     
                                     var para = document.createElement("td");
                                      var node = document.createTextNode(a[i]);
                                      if(i==0)
                                      {
                                        var x = document.createElement("INPUT");
                                        x.setAttribute("type", "checkbox");
                                        para.appendChild(x);
                                     
                                      }
                                      para.appendChild(node);
                                      element.appendChild(para);
                                      i++;
                                }
                                    var para = document.createElement("tr");
                                    element.appendChild(para);
                         for(var item in d1){
                             var xx=1;
                                      
                            for(var item1 in d1[item] )
                            {
                                
                             var l = d1[item];
                             
                            
                             var para = document.createElement("td");
                             var node = document.createTextNode(l[item1]);
                             if(l[item1]==l.indent_id)
                             {
                                     var x = document.createElement("INPUT");
                                     x.setAttribute("type", "checkbox");
                                     x.setAttribute("id","xx")
                                     para.appendChild(x);
                            
                             }
                             para.appendChild(node);
                             element.appendChild(para);
                             
                             
                           }
                             var para = document.createElement("tr");
                             var node = document.createTextNode("");
                             para.appendChild(node);
                             element.appendChild(para); 
                             xx=xx+1;
                          }
                        });

                         $scope.submit1 = function() { 
      //  var element1 = document.getElementById("parent");
                             var datausername = localStorage.getItem('username');
                             datausername={"username":datausername};
                            $http({
                             method: 'POST',
                             url: '/callforindentlist',
                             data: datausername
                             }).then(function(rest) {
            
                               d1 = rest.data;  
                        
                              var element = document.getElementById("parent");
                              var length =element.childElementCount;
         
                          while(length >= 1)
                          {
                              element.removeChild(element.childNodes[1]);
                              --length; 
                          }
                              var para = document.createElement("tr");
                              element.appendChild(para);
                              var a = ['Store name','Drug Name','Company Name','Formula name','Strength','Max retails price'];
                              var i=0;
                              var l = a.length;
                          while(i<l)
                         {    var para = document.createElement("td");
                              var node = document.createTextNode(a[i]);
                              para.appendChild(node);
                              element.appendChild(para);
                              i++;
                         }
                            var para = document.createElement("tr");
                            element.appendChild(para);
                        for(var item in d1){
                         for(var item1 in d1[item] )
                        {              var l = d1[item];
                             var para = document.createElement("td");
                             var node = document.createTextNode(l[item1]);
                             para.appendChild(node);
                             element.appendChild(para);
                         }
                             var para = document.createElement("tr");
                             var node = document.createTextNode("");
                             para.appendChild(node);
                             element.appendChild(para); 
                         }
                      })
                   }
    }
                })
    
   