document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let mobile = document.getElementById("mobile").value;

  axios.get("https://codingshika.com/APP/EXP/user_login.php?mobile=" + mobile)
    .then(res => {
      
      console.log("API Response:", res.data);

      if (res.data.posts && res.data.posts.status === "200") {
        
        alert("Login successful");
        location.reload(); 

        sessionStorage.setItem("id", res.data.posts.id);
        window.location.href = "/dash.html";
      } else {
        alert("Mobile number not registered");
      }
    })
    .catch(err => {
      console.error("API Error:", err);
      alert("Something went wrong");
    });
});



function add() {
  let nm = document.getElementById("unm").value;
  let mb = document.getElementById("unum").value;
  let op = document.getElementById("ub").value;

  axios
    .post(
      "https://codingshika.com/APP/EXP/add_user.php?uname=" +
      nm +
      "&mobile=" +
      mb +
      "&opbal=" +
      op
    )
    .then((res) => {
      if (res.data.posts.status == 200) {
        alert("Insert Succesfull");
        location.reload(); 
      } else {
        alert("Insert Unsuccesfull");
      }
    });
}

