var express = require("express");
const path = require("path");
const router = express.Router();
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");

app.use(session({ secret: "key", saveUninitialized: true, resave: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

var sess;

const port = process.env.PORT || 8080;
app.get("/", (req, res) => {
  sess = req.session;
  sess.userType = "Admin";
  res.render("home.ejs");
});

app.get("/adminLogin", (req, res) => {
  sess.userType = "Admin";
  res.render("login.ejs", {
    user_type: sess.userType,
  });
});

app.get("/userLogin", (req, res) => {
  sess.userType = "User";
  res.render("login.ejs", {
    user_type: sess.userType,
  });
});

//login
app.post("/login", (req, res) => {
  var reqData = req.body;

  var mysql = require("mysql");
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "jobportal",
  });

  connection.connect(function (err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
  });

  if (sess.userType == "User") {
    var query =
      "SELECT user_id, password FROM jobseeker_user_account WHERE user_id = ? and password = ?;";
    connection.query(
      query,
      [reqData["id"], reqData["pass"]],
      function (error, results) {
        if (error) throw error;

        if (results.length == 0) {
          res.status(200).send({ stat: "wrong" });
        } else {
          sess.userid = results[0]["user_id"];
          res.status(200).send({ stat: "right", usertype: "User" });
        }
      }
    );
  } else {
    // company
    var query =
      "SELECT company_id, password FROM company_user_account WHERE company_id = ? and password = ?;";
    connection.query(
      query,
      [reqData["id"], reqData["pass"]],
      function (error, results) {
        if (error) {
          throw error;
        }

        if (results.length == 0) {
          res.status(200).send({ stat: "wrong" });
        } else {
          sess.companyid = results[0]["company_id"];
          var query = "SELECT * FROM company WHERE company_id = ?;";
          connection.query(query, [sess.companyid], function (error, results) {
            if (error) {
              throw error;
            } else {
              sess.compname = results[0]["company_name"];

              res.status(200).send({ stat: "right", usertype: "Admin" });
            }
          });
        }
      }
    );
  }
});

app.get("/register", (req, res) => {
  var mysql = require("mysql");
  if (sess.userType == "User") {
    var connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "jobportal",
    });

    connection.connect(function (err) {
      if (err) {
        console.error("error connecting: " + err.stack);
        return;
      }

      console.log("connected as id " + connection.threadId);
    });

    connection.query(
      "Select skill_name from skill_set",
      function (error, results) {
        if (error) throw error;
        skillset = [];
        for (i = 0; i < results.length; i++) {
          skillset.push(results[i]["skill_name"]);
        }
        res.render("user-registration.ejs", {
          skills: skillset,
        });
      }
    );
  } else {
    res.render("company-registration.ejs");
  }
});

app.post("/companyFormSubmit", (req, res) => {
  var reqData = req.body;

  var mysql = require("mysql");
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "jobportal",
  });

  connection.connect(function (err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }

    console.log("connected as id " + connection.threadId);
  });
  var query =
    "SELECT company_id FROM company_user_account WHERE company_id = ?;";
  connection.query(query, [reqData["compid"]], function (error, results) {
    if (error) {
      throw error;
    }

    if (results.length == 0) {
      connection.query(
        "INSERT into company_user_account VALUES(?,?,?) ",
        [reqData["compid"], reqData["comppwd"], reqData["compmail"]],
        function (error, results) {
          if (error) throw error;
        }
      );
      connection.query(
        "INSERT into company VALUES(?,?,?,?,?) ",
        [
          reqData["compid"],
          reqData["compname"],
          reqData["compdesc"],
          reqData["compdesc"],
          reqData["compurl"],
        ],
        function (error, results) {
          if (error) throw error;
        }
      );
      connection.end();
      res.status(200).send({ stat: "right" });
    } else {
      console.log("already there");
      res.status(200).send({ stat: "exist" });
    }
  });
});
app.post("/userFormSubmit", (req, res) => {
  var reqData = req.body;
  var mysql = require("mysql");
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "jobportal",
  });

  connection.connect(function (err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }

    console.log("connected as id " + connection.threadId);
    query = "SELECT user_id from jobseeker_user_account where user_id = ?;";
    connection.query(query, [reqData["user_id"]], function (error, results) {
      if (error) {
        throw error;
      }
      if (results.length == 0) {
        query = "INSERT into jobseeker_user_account VALUES(?,?,?);";
        connection.query(
          query,
          [reqData["user_id"], reqData["password"], reqData["user_email"]],
          function (error, results) {
            if (error) {
              throw error;
            }
          }
        );

        query = "INSERT into seeker_profile VALUES(?,?,?,?,?);";
        connection.query(
          query,
          [
            reqData["user_id"],
            reqData["fname"],
            reqData["lname"],
            reqData["gender"],
            reqData["phone_no"],
          ],
          function (error, results) {
            if (error) {
              throw error;
            }
          }
        );

        var i = 7;
        var x = 0;
        for (i = 7; ; i = i + 6) {
          ed = Object.keys(reqData).slice(i, i + 6);
          values = [reqData["user_id"]].concat(
            Object.values(reqData).slice(i, i + 6)
          );
          if (ed[0].substring(0, 3) == "edu") {
            query = "INSERT into education_details VALUES(?,?,?,?,?,?,?);";
            connection.query(query, values, function (error, results) {
              if (error) {
                throw error;
              }
            });
          } else {
            x = i - 6;
            break;
          }
        }

        for (i = x + 1; i < Object.values(reqData).length - 1; i = i + 5) {
          values = [reqData["user_id"]].concat(
            Object.values(reqData).slice(i, i + 5)
          );

          query = "INSERT into experience_details VALUES(?,?,?,?,?,?);";
          connection.query(query, values, function (error, results) {
            if (error) {
              throw error;
            }
          });
        }

        if (typeof reqData["mulselect"] == "object") {
          for (i = 0; i < reqData["mulselect"].length; i = i + 1) {
            query = "INSERT into seeker_skill_set VALUES(?,?);";
            connection.query(
              query,
              [reqData["user_id"], reqData["mulselect"][i]],
              function (error, results) {
                if (error) {
                  throw error;
                }
              }
            );
          }
        } else if (typeof reqData["mulselect"] == "string") {
          query = "INSERT into seeker_skill_set VALUES(?,?);";
          connection.query(
            query,
            [reqData["user_id"], reqData["mulselect"]],
            function (error, results) {
              if (error) {
                throw error;
              }
            }
          );
        }

        res.render("user-dashboard.ejs");
      } else {
        console.log("Username already exists");
        res.render("user-registration.ejs");
      }
    });
  });
});
app.get("/userDashboard", (req, res) => {
  res.render("user-dashboard.ejs", {
    user_id: sess.userid,
  });
});

app.get("/userProfile", (req, res) => {
  var mysql = require("mysql");
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "jobportal",
  });

  connection.connect(function (err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }

    console.log("connected as id " + connection.threadId);

    var query =
      "SELECT * FROM jobseeker_user_account natural join seeker_profile where user_id = ?;";
    connection.query(query, [sess.userid], function (error, results1) {
      if (error) {
        throw error;
      }

      var query = "SELECT * FROM education_details where user_id = ?;";
      connection.query(query, [sess.userid], function (error, results2) {
        if (error) {
          throw error;
        }

        var query = "SELECT * FROM experience_details where user_id = ?;";
        connection.query(query, [sess.userid], function (error, results3) {
          if (error) {
            throw error;
          }

          var query =
            "SELECT skill_name FROM seeker_skill_set where user_id = ?;";
          connection.query(query, [sess.userid], function (error, results4) {
            if (error) {
              throw error;
            }

            console.log(results1, results2, results3, results4);
            res.render("profile.ejs", {
              results: results1,
              education_details: results2,
              experience_details: results3,
              skills: results4,
            });
          });
        });
      });
    });
  });
});
app.get("/userJobListing", (req, res) => {
  var mysql = require("mysql");
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "jobportal",
  });

  connection.connect(function (err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }

    console.log("connected as id " + connection.threadId);

    var query = "SELECT * FROM job_post natural join company;";
    connection.query(query, function (error, results) {
      if (error) {
        throw error;
      } else {
        console.log(results);
        res.render("job-listing.ejs", { results: results });
      }
    });
  });
});

app.get("/userJobDetails", (req, res) => {
  job_id = req.query.id;
  comp_id = req.query.comp;

  var mysql = require("mysql");
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "jobportal",
  });

  connection.connect(function (err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }

    console.log("connected as id " + connection.threadId);

    var query =
      "SELECT * FROM job_post natural join company natural join company_user_account WHERE company_id = ? and job_post_id = ?;";
    connection.query(query, [comp_id, job_id], function (error, results) {
      if (error) {
        throw error;
      } else {
        console.log(results);
        var query =
          "select * from job_post_activity where company_id=? and user_id=? and job_post_id=? ";
        connection.query(
          query,
          [comp_id, sess.userid, job_id],
          function (error, results2) {
            if (error) {
              throw error;
            }

            if (results2.length > 0) {
              text = "Applied";

              res.render("job-details.ejs", {
                results: results,
                text: text,
                alert: "hhh",
              });
            } else {
              var query =
                "select * from job_post where company_id=? and job_post_id=? ";
              connection.query(
                query,
                [comp_id, job_id],
                function (error, results3) {
                  if (error) {
                    throw error;
                  }
                  // var array = results3[0].end_date.split("-");
                  // var d = array[2] + "-" + array[1] + "-" + array[0];
                  var n = new Date(results3[0]);
                  var t = new Date();
                  if (n.getTime() >= t.getTime()) {
                    text = "Apply";

                    res.render("job-details.ejs", {
                      results: results,
                      text: text,
                      alert: "hhh",
                    });
                  } else {
                    text = "Applications Closed";

                    res.render("job-details.ejs", {
                      results: results,
                      text: text,
                      alert: "hhh",
                    });
                  }
                }
              );
            }
          }
        );
      }
    });
  });
});

app.get("/companyDashboard", (req, res) => {
  res.render("company-dashboard.ejs", {
    comp_id: sess.companyid,
  });
});
app.get("/companyJobPostings", (req, res) => {
  var companyID = sess.companyid;

  var mysql = require("mysql");
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "jobportal",
  });

  connection.connect(function (err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }

    console.log("connected as id " + connection.threadId);
  });
  var query = "SELECT * FROM job_post WHERE company_id = ?;";
  connection.query(query, [companyID], function (error, results) {
    if (error) {
      throw error;
    } else {
      res.render("job-postings.ejs", {
        all_postings: results,
      });
    }
  });
});

app.get("/apply", (req, res) => {
  job_id = req.query.jobid;
  com_id = req.query.compid;

  var mysql = require("mysql");
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "jobportal",
  });

  connection.connect(function (err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }

    console.log("connected as id " + connection.threadId);
  });
  const d = new Date();

  var query = "INSERT into job_post_activity values(?,?,?,?)";
  connection.query(
    query,
    [sess.userid, job_id, com_id, datestr],
    function (error, results) {
      if (error) {
        throw error;
      }
    }
  );

  res.render("user-dashboard.ejs", { user_id: sess.userid });
});

app.get("/companyJobPostingsApplied", (req, res) => {
  var jobid = req.query.id;
  var companyID = sess.companyid;

  var mysql = require("mysql");
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "jobportal",
  });

  connection.connect(function (err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }

    console.log("connected as id " + connection.threadId);
  });
  let applicantsdict = {};
  var query =
    "SELECT * FROM job_post_activity natural join seeker_profile where job_post_id=?  and company_id=?;";
  connection.query(query, [jobid, sess.companyid], function (err, results) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    } else {
      if (results.length == 0) {
        res.render("job-posting-applied.ejs", { details: 0 });
      }
      applicantsdict["seeker_details"] = results;
      applicantsdict["education_details"] = [];
      applicantsdict["exp_details"] = [];
      size = results.length;
      for (i = 0; i < size; i++) {
        let iter = i;
        let vsize = size;
        var query1 = "SELECT * FROM education_details where user_id=?;";
        var query2 = "SELECT * FROM experience_details where user_id=?;";

        temp = connection.query(
          query1,
          [results[i]["user_id"]],
          function (err, edresults) {
            if (err) throw err;
            else {
              var data = JSON.parse(JSON.stringify(edresults));

              applicantsdict["education_details"].push(data);
            }
          }
        );

        temp = connection.query(
          query2,
          [results[i]["user_id"]],
          function (err, exresults) {
            if (err) throw err;
            else {
              var data = JSON.parse(JSON.stringify(exresults));

              applicantsdict["exp_details"].push(data);
            }

            if (iter == vsize - 1) {
              res.render("job-posting-applied.ejs", {
                details: applicantsdict,
              });
            }
            return true;
          }
        );
      }
    }
  });
});
app.get("/companyJobPostNew", (req, res) => {
  res.render("company-job-post.ejs");
});
app.post("/companyJobPostNewFormSubmit", (req, res) => {
  var reqData = req.body;
  console.log(reqData);
  var mysql = require("mysql");
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "jobportal",
  });

  connection.connect(function (err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }

    console.log("connected as id " + connection.threadId);
    query =
      "SELECT job_post_id from job_post where job_post_id = ? and company_id = ?;";
    connection.query(
      query,
      [reqData["job_post_id"], sess.companyid],
      function (error, results) {
        if (error) {
          throw error;
        }
        console.log(results);
        if (results.length == 0) {
          query = "INSERT into job_post VALUES(?,?,?,?,?,?,?);";
          connection.query(
            query,
            [
              reqData["job_post_id"],
              sess.companyid,
              reqData["job_type"],
              reqData["created_date"],
              reqData["end_date"],
              reqData["job_description"],
              reqData["job_location"],
            ],
            function (error, results) {
              if (error) {
                res.status(200).send({ stat: "exist" });
              } else {
                res.status(200).send({ stat: "right" });
              }
              console.log(results);
            }
          );
          connection.end();
        } else {
          console.log("already exists");
          res.status(200).send({ stat: "exist" });
        }
      }
    );
  });
});
app.get("/companyRegistration", (req, res) => {
  res.render("company-registration.ejs");
});

app.listen(port, () => console.log(port));
