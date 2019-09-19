$(document).on("click", "#register", (event) => {
    event.preventDefault()
  
    const register = { 
      username: $("#registerUsername").val(),
      password: $("#registerPassword").val()
    }

    $.post("/auth/register", register, (data) => { 
      if (data.redirect) { 
        window.location.href = data.redirect
      }
    })

  }); 
  
  $(document).on("click", "#login", (event) => {
    event.preventDefault()
  
    const login = { 
      username: $("#loginUsername").val(),
      password: $("#loginPassword").val()
    }

    $.post("/auth/signin", login, (data) => { 
      if (data.redirect) { 
        window.location.href = data.redirect
      }
    })
  
  }) 

  $(document).on("click", "#notification", (event) => {
    event.preventDefault()
  
    const phone = { phone: $("#phoneNumber").val() }
    
    $.post("/notification/text", phone, (data) => { 
      if (data) { 
        console.log(data)
      }
    })

  });