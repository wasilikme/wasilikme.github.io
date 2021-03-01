const baseUri =
  "https://textwidget-1acfa-default-rtdb.firebaseio.com/emails.json";

function newEmail() {
  let name = document.form.name.value;
  let email = document.form.email.value;
  let thereAlready = false;
  console.log(name, email);
  $.ajax({
    type: "GET",
    url: baseUri,
    success: function (data, status) {
      for (let i = 1; i < Object.keys(data).length; ++i) {
        if (data[Object.keys(data)[i]]["email"] == email) {
          thereAlready = true;
        }
      }
      if (!thereAlready) {
        let length = Object.keys(data).length + 1;
        let emailString = `email${length}`;
        let input_data = {};
        input_data[emailString] = { email: email, name: name };
        input_data = JSON.stringify(input_data);
        $.ajax({
          type: "PATCH",
          url: baseUri,
          data: input_data,
          success: function (data, status) {
            console.log(`${data} and status is ${status}`);
            alert("You're registered!");
          },
        });
      } else {
        alert("You're already registered!");
      }
    },
  });

  return 0;
}

function removeEmailN(loc) {
  var emailToRemove = `email${loc}`;
  console.log(emailToRemove);

  let input_data = {};
  input_data[emailToRemove] = { email: "unsubscribed" };
  input_data = JSON.stringify(input_data);
  $.ajax({
    type: "PATCH",
    url: baseUri,
    data: input_data,
    success: function (data, status) {
      console.log(`${data} and status is ${status}`);
    },
  });
}

var loc;
function unSub() {
  let input_email = document.form1.email.value;
  $.ajax({
    type: "GET",
    url: baseUri,
    success: function (data, status) {
      console.log(data);
      for (let i = 1; i < Object.keys(data).length; ++i) {
        console.log(data[Object.keys(data)[i]]);
        if (data[Object.keys(data)[i]]["email"] == input_email) {
          console.log("TEST");
          loc = i + 1;
        }
      }
      if (loc != null) {
        removeEmailN(loc);
        alert("You're unsubscribed!");
      } else {
        alert("That email does not exist in our database.");
      }
    },
  });
}

function ValidateEmail(addNew) {
  var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (addNew) {
    if (document.form.email.value.match(mailformat)) {
      newEmail();

      document.form.reset();
      return true;
    } else {
      alert("You have entered an invalid email address!");
      return false;
    }
  } else {
    if (document.form1.email.value.match(mailformat)) {
      unSub();
      document.form1.reset();
      return true;
    } else {
      alert("You have entered an invalid email address!");
    }
  }
}
