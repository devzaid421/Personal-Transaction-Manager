function addCred() {
  var userId = sessionStorage.getItem("id");
  let dt = document.getElementsByClassName("dt")[0].value;
  let nt = document.getElementsByClassName("nt")[0].value;
  let cred = document.getElementsByClassName("amount")[0].value;

  axios
    .post(
      "https://codingshika.com/APP/EXP/insert_credit.php?uid=" +
        userId +
        "&date=" +
        dt +
        "&note=" +
        nt +
        "&credit=" +
        cred
    )
    .then((res) => {
      console.log(res.data);
      if (res.data.posts && res.data.posts.status === "200") {
        location.reload();
        alert(`${cred}₹ is Credited Successfully`);
      } else {
        alert("All fields are required !");
        location.reload();
      }
    });
}

function addDeb() {
  var userId = sessionStorage.getItem("id");
  let dt = document.getElementsByClassName("ddate")[0].value;
  let nt = document.getElementsByClassName("dnote")[0].value;
  let deb = document.getElementsByClassName("damount")[0].value;

  axios
    .get(
      "https://codingshika.com/APP/EXP/insert_debit.php?uid=" +
        userId +
        "&date=" +
        dt +
        "&note=" +
        nt +
        "&debit=" +
        deb
    )
    .then((res) => {
      console.log(res.data);
      if (res.data.posts && res.data.posts.status === "200") {
        location.reload();
        alert(`${deb}₹ is Debited`);
      } else {
        console.log(res.data);
        alert("All fields are required !");
        location.reload();
      }
    });
}

function dash() {
  var value = sessionStorage.getItem("id");
  let credAmt = document.getElementsByClassName("amount")[0].value;
  console.log(value);
  let amt = Number(credAmt);
  console.log(amt);

  axios
    .get("https://codingshika.com/APP/EXP/opbal_list.php?uid=" + value)
    .then((res) => {
      console.log(res.data);
      currBal.innerHTML = res.data.posts.post[0].OPBAL;
      currBal.style.color = "green";
    });

  axios
    .post("https://codingshika.com/APP/EXP/transaction_list.php?uid=" + value)
    .then((res) => {
      let ar = res.data.posts.post;
      let l = res.data.posts.post.length;
      let totalCredit = 0;
      let totalDebit = 0;
      let CredpDeb = 0;
      let CredmDeb = 0;

      for (let i = 0; i < l; i++) {
        let rowData = "<tr><td>" + formatDate(ar[i].DATE) + "</td>";
        rowData += "<td>" + ar[i].NOTE + "</td>";

        if (Number(ar[i].CREDIT) != 0) {
          rowData += "<td style='color: green;'>" + ar[i].CREDIT + "</td>";
        } else {
          rowData += "<td style='color: black;'>" + ar[i].CREDIT + "</td>";
        }

        if (Number(ar[i].DEBIT) != 0) {
          rowData += "<td style='color: red;'>" + ar[i].DEBIT + "</td>";
        } else {
          rowData += "<td style='color: black;'>" + ar[i].DEBIT + "</td>";
        }

        rowData += "<td>" + ar[i].CLBAL + "</td>";
        $("#dt").append(rowData);

        let totalCred = Number(ar[i].CREDIT);
        let totalDeb = Number(ar[i].DEBIT);
        let CredandDeb = totalCred + totalDeb;
        let CredfromDeb = totalCred - totalDeb;

        totalCredit += totalCred;
        totalDebit += totalDeb;
        CredpDeb += CredandDeb;
        CredmDeb += CredfromDeb;

        document.getElementById("totalCred").innerHTML = totalCredit;
        document.getElementById("totalDeb").innerHTML = totalDebit;
        document.getElementById("credpDeb").innerHTML = CredpDeb;
        document.getElementById("credmDeb").innerHTML = CredmDeb;
      }
    });

  const formatDate = (d) => {
    let date = new Date(d);
    let yy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();

    mm = mm < 10 ? "0" + mm : mm;
    dd = dd < 10 ? "0" + dd : dd;

    return `${dd}-${mm}-${yy}`;
  };
}
