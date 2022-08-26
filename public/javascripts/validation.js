$(document).ready(function(){
    $("#userSignup").validate({
        rules:
        {
            name:{
                required:true,
                minlength:4,
                maxlength:20
            },
            email:{
                required:true,
                email:true
            },
            Password:{
                required:true,
                minlength:5
            }

        }
    })
})
$(document).ready(function(){
    $("#userLogin").validate({
        rules:
        {
          email:{
              required:true,
              email:true
          },
          Password:{
              required:true
          }  
        }
    })
})

$(document).ready(function(){
    $("#adminlogin").validate({
        rules:
        {
          email:{
              required:true,
              email:true
          },
          Password:{
              required:true
          }  
        }
    })
})

$(document).ready(function(){
    $("#adminadduser").validate({
        rules:
        {
            name:{
                required:true,
                minlength:4,
                maxlength:20
            },
            email:{
                required:true,
                email:true
            },
            Password:{
                required:true,
                minlength:5
            }

        }
    })
})