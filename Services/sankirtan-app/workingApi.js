const Sq = require("sequelize");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
var moment = require("moment");

const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const {
  Group,
  GroupMember,
  Item,
  Period,
  People,
  Organization,
  Group_1,
  Setting,
  AccessPermission
} = require("./models/common");
const {
  BusinessPlanSummary,
  Transaction,
  TransactionLineItem,
  TransactionPeople,
  RollupReports,
  UploadBatch,
} = require("./models/transaction");
const { start } = require("repl");
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const APP_URL = "http://localhost:8080/";
const NEWSLETTER_BOOK_TYPES = [
  "mbig",
  "big",
  "full",
  "medium",
  "small",
  "btg",
  "magazines",
];
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const split_mime = file.mimetype.split("/");
    const extension =
      typeof split_mime[1] !== "undefined" ? split_mime[1] : "jpeg";
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
  },
});

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};



router.get("/validate-host1", async function (req, res) {
  console.log(req.session);
  if (

    typeof req.session.loggedUser !== "undefined" &&
    req.session.hostname !== "undefined"
  ) {
    const useremail = req.session.loggedUser;
    const hostname = req.session.hostname;
    const headerData = JSON.parse(req.session.headerData);
    const settings = await Setting.findAll();
    const settingsFormatted = {};
    settings.map((setting) => {
      settingsFormatted[setting.key] = setting.value;
    });
    Organization.findOne({
      attributes: [
        "id",
        "name",
        "source_website_url_primary",
        "target_elvanto_url_primary",
        "new_people_default_groups",
        "new_people_default_type",
        "elvanto_api_key",
        "google_maps_api_key",
        "created_date",
        "last_modified_date",
      ],
      where: {
        target_elvanto_url_primary: hostname,
      },
    })
      .then((org) => {
        if (org) {
          People.findOne({
            attributes: ["id", "firstname", "lastname", "organization_id"],
            where: {
              email: useremail,
              organization_id: org.id,
            },
          })
            .then((user) => {
              // console.log('user detail is', user)
              if (user) {
                res.status(200).send({
                  organization: org,
                  user: user,
                  headerData: headerData,
                  settings: settingsFormatted,
                });
              } else {
                res.status(404).send({ success: 0 });
              }
            })
            .catch((err) => {
              res.send({ error: err.original });
            });
        } else {
          res.status(404).send({ success: 0 });
        }
      })
      .catch((err) => {
        res.send({ error: err.original });
      });
  } else {
    res.send({ success: 0 });
  }
});
// Validate HostName When a User Trying to Login and get back Org details
router.post("/validate-host", async function (req, res) {
  const settings = await Setting.findAll();
  const settingsFormatted = {};
  settings.map((setting) => {
    settingsFormatted[setting.key] = setting.value;
  });
  
  Organization.findOne({
    attributes: [
      "id",
      "name",
      "source_website_url_primary",
      "target_elvanto_url_primary",
      "new_people_default_groups",
      "new_people_default_type",
      "elvanto_api_key",
      "google_maps_api_key",
      "created_date",
      "last_modified_date",
    ],
    where: {
      target_elvanto_url_primary: req.body.hostname,
    },
  })
    .then((org) => {
      if (org) {
        People.findOne({
          attributes: ["id", "firstname", "lastname", "organization_id", "role"],
          where: {
            email: req.body.email,
            organization_id: org.id,
          },
        })
          .then((user) => {
            console.log('user is', user)
            if (user) {
                AccessPermission.findAll({
                  attributes: ["screen", "create", "read", "edit", "delete"],
                  where: {
                    roles: user.role
                  },
                })
                .then((array) => {
                  if(array)
                  {
                  res.status(200).send({
                    organization: org,
                    user: user,
                    settings: settingsFormatted,
                     permissions : commonPermissionsObject(array),
                      });
                  }
          //   console.log('reeesss', commonPermissionsObject(array))
   
                })
                .catch((err) => {
                  console.log('error', err)
                });
              
             
              
            } else {
              res.status(404).send({ success: 0 });
            }
          })
          .catch((err) => {
            res.send({ error: err.original });
          });



      } else {
        res.status(404).send({ success: 0 });
      }
    })
    .catch((err) => {
      res.send({ error: err.original });
    });
});



router.get("/organization", function (req, res) {
  let { page, limit, sort, order, search } = req.query;
  if (page && limit) {
    Organization.findAndCountAll()
      .then((total) => {
        console.log(Organization);
        let _where = {};
        if (search !== "null") {
          page = 1;
          _where = {
            where: {
              [Sq.Op.or]: {
                name: { [Sq.Op.iLike]: `%${search}%` },
                source_website_url_primary: { [Sq.Op.iLike]: `%${search}%` },
                target_elvanto_url_primary: { [Sq.Op.iLike]: `%${search}%` },
                elvanto_api_key: { [Sq.Op.iLike]: `%${search}%` },
                new_people_default_groups: { [Sq.Op.iLike]: `%${search}%` },
              },
            },
          };
        }
        Organization.findAll({
          ..._where,
          order: [[sort, order]],
          offset: (page - 1) * limit,
          limit,
        })
          .then((result) => {
            if (search === "null") {
              res.status(200).send({ count: total.count, rows: result });
            } else {
              res.status(200).send({ count: result.length, rows: result });
            }
          })
          .catch((err) => {
            res.status(503).send({ error: err.original });
          });
      })
      .catch((err) => {
        res.status(503).send({ error: err.original });
      });
  } else {
    Organization.findAll()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(503).send({ error: err.original });
      });
  }
});

// Get the list of Items
router.get("/items", function (req, res) {
  const { page, limit, sort, order, search } = req.query;
  if (page && limit) {
    Item.findAndCountAll()
      .then((total) => {
        let _where = {};

        if (search !== "null") {
          _where = {
            where: {
              [Sq.Op.or]: [
                { name: { [Sq.Op.iLike]: `%${search}%` } },
                Sq.where(Sq.cast(Sq.col("item.book_type"), "varchar"), {
                  [Sq.Op.iLike]: `%${search}%`,
                }),
                Sq.where(Sq.cast(Sq.col("item.description"), "varchar"), {
                  [Sq.Op.iLike]: `%${search}%`,
                }),
              ],
            },
          };
        }

        Item.findAll({
          ..._where,
        })
          .then((result) => {
            if (sort) {
              result = result.sort(dynamicSort(sort, order));
            }
            let offset = (page - 1) * limit;
            let retresult = result.slice(
              offset,
              Math.min(result.length, Number(offset) + Number(limit))
            );
            if (search == "null") {
              res.status(200).send({ count: total.count, rows: retresult });
            } else {
              res.status(200).send({ count: result.length, rows: retresult });
            }
          })
          .catch((err) => {
            res.status(503).send({ error: err.original });
          });
      })
      .catch((err) => {
        res.send({ error: err.original });
      });
  } else {
    Item.findAll()
      .then((items) => {
        if (items) {
          res.status(200).send(items);
        } else {
          res.status(404).send({ success: 0 });
        }
      })
      .catch((err) => {
        res.send({ error: err.original });
      });
  }
});

// Get the last-rollup
router.get("/last-rollup", function (req, res) {
  RollupReports.findAll({
    order: [["rollup_id", "DESC"]],
    limit: 1,
  }).then(function (result) {
    res.status(200).send({ result: result });
  });
});

// Get the list of Rollup-reports
router.get("/rollup-reports", function (req, res) {
  const { page, limit, sort, order, search } = req.query;
  if (page && limit) {
    RollupReports.findAndCountAll()
      .then((total) => {
        let _where = {};
        _where = { where: { updated_count: { [Sq.Op.not]: 0 } } };
        if (search !== "null") {
          _where = {
            where: {
              [Sq.Op.or]: [
                Sq.where(
                  Sq.cast(
                    Sq.col("transaction_rollup_reports.updated_count"),
                    "varchar"
                  ),
                  { [Sq.Op.iLike]: `%${search}%` }
                ),
                Sq.where(
                  Sq.cast(
                    Sq.col("transaction_rollup_reports.success_count"),
                    "varchar"
                  ),
                  { [Sq.Op.iLike]: `%${search}%` }
                ),
                Sq.where(
                  Sq.cast(
                    Sq.col("transaction_rollup_reports.failed_count"),
                    "varchar"
                  ),
                  { [Sq.Op.iLike]: `%${search}%` }
                ),
                Sq.where(
                  Sq.cast(
                    Sq.col("transaction_rollup_reports.start_time"),
                    "varchar"
                  ),
                  { [Sq.Op.iLike]: `%${search}%` }
                ),
                Sq.where(
                  Sq.cast(
                    Sq.col("transaction_rollup_reports.end_time"),
                    "varchar"
                  ),
                  { [Sq.Op.iLike]: `%${search}%` }
                ),
              ],
            },
          };
        }

        RollupReports.findAll({
          ..._where,
          order: [[sort, order]],
          offset: (page - 1) * limit,
          limit,
        })
          .then((result) => {
            if (search == "null") {
              res.status(200).send({ count: total.count, rows: result });
            } else {
              res.status(200).send({ count: result.length, rows: result });
            }
          })
          .catch((err) => {
            res.status(503).send({ error: err.original });
          });
      })
      .catch((err) => {
        res.send({ error: err.original });
      });
  } else {
    RollupReports.findAll()
      .then((items) => {
        if (items) {
          res.status(200).send(items);
        } else {
          res.status(404).send({ success: 0 });
        }
      })
      .catch((err) => {
        res.send({ error: err.original });
      });
  }
});

// Get the list of Items
router.get("/items/:id", function (req, res) {
  const { id } = req.params;
  Item.findOne({ where: { id: id } })
    .then((item) => {
      if (item) {
        res.status(200).send(item);
      } else {
        res.status(404).send({ success: 0 });
      }
    })
    .catch((err) => {
      res.send({ error: err.original });
    });
});

// Add new list Item
router.post("/items", function (req, res) {
  const upload = multer({ storage: storage, fileFilter: imageFilter }).single(
    "cover"
  );
  upload(req, res, function (err) {
    if (err) {
      console.log("Error:", err);
    }
    let itemData = JSON.parse(req.body.formFields);
    const userId = JSON.parse(req.body.userId);
    itemData = {
      ...itemData,
      created_by_id: userId,
      last_modified_by_id: userId,
    };
    if (typeof req.file !== "undefined") {
      if (req.fileValidationError) {
        return res.send({ success: 0, error: req.fileValidationError });
      } else if (err instanceof multer.MulterError) {
        return res.send({ success: 0, error: err });
      } else if (err) {
        return res.send({ success: 0, error: err });
      }
      itemData = { ...itemData, cover: req.file.path };
    }
    Item.create(itemData)
      .then((result) => {
        if (result) {
          res.status(200).send(result);
        } else {
          res.status(404).send({ success: 0 });
        }
      })
      .catch((err) => {
        res.status(503).send({ error: err.original });
      });
  });
});

// Add new list Item
router.patch("/items/:id", function (req, res) {
  const { id } = req.params;
  const upload = multer({ storage: storage, fileFilter: imageFilter }).single(
    "cover"
  );
  upload(req, res, function (err) {
    if (err) {
      console.log("Error:", err);
    }
    let itemData = JSON.parse(req.body.formFields);
    const userId = JSON.parse(req.body.userId);
    itemData = {
      ...itemData,
      last_modified_by_id: userId,
    };
    if (typeof req.file !== "undefined") {
      if (req.fileValidationError) {
        return res.send({ success: 0, error: req.fileValidationError });
      } else if (err instanceof multer.MulterError) {
        return res.send({ success: 0, error: err });
      } else if (err) {
        return res.send({ success: 0, error: err });
      }
      itemData = { ...itemData, cover: req.file.path };
    }
    Item.update(itemData, { where: { id: id } })
      .then((result) => {
        if (result) {
          res.status(200).send(result);
        } else {
          res.status(404).send({ success: 0 });
        }
      })
      .catch((err) => {
        res.status(503).send({ error: err.original });
      });
  });
});


router.delete("/items/:id", function (req, res) {
  const { id } = req.params;
  let item = {
    status : 0,
  };
  Item.update(item, { where: { id: id } })
    .then((result) => {
      console.log('sress', result)
      if (result) {
        res.status(200).send({ message: "Book deleted successfully!" });
      } else {
        res.status(404).send({ success: 0 });
      }
    })
    .catch((err) => {
      res.status(503).send({ error: err.original });
    });

});
/**
 * Manage Period Here
 */
router.get("/periods", function (req, res) {
  const { page, limit, sort, order, search } = req.query;
  //const _where = typeof type !== 'undefined' ? { type: type } : {};
  let _where = {};
  if (page && limit) {
    Period.findAndCountAll().then((total) => {
      if (search !== "null") {
        _where = {
          where: {
            [Sq.Op.or]: [
              {
                name: { [Sq.Op.iLike]: `%${search}%` },
              },
              Sq.where(Sq.cast(Sq.col("period.type"), "varchar"), {
                [Sq.Op.iLike]: `%${search}%`,
              }),
              Sq.where(Sq.cast(Sq.col("period.start"), "varchar"), {
                [Sq.Op.iLike]: `%${search}%`,
              }),
              Sq.where(Sq.cast(Sq.col("period.end"), "varchar"), {
                [Sq.Op.iLike]: `%${search}%`,
              }),
            ],
          },
        };
      }
      Period.findAll({
        ..._where,
        order: [[sort, order]],
        offset: (page - 1) * limit,
        limit,
      })
        .then((periods) => {
          if (search === "null") {
            res.status(200).send({ count: total.count, rows: periods });
          } else {
            res.status(200).send({ count: periods.length, rows: periods });
          }
        })
        .catch((err) => {
          res.send({ error: err.original });
        });
    });
  } else {
    Period.findAll({ where: _where, order: ["type", "number"] })
      .then((periods) => {
        if (periods) {
          res.status(200).send(periods);
        } else {
          res.status(404).send({ success: 0 });
        }
      })
      .catch((err) => {
        res.send({ error: err.original });
      });
  }
});

router.get("/periods/:id", function (req, res) {
  const { id } = req.params;
  Period.findOne({ where: { id: id } })
    .then((periods) => {
      if (periods) {
        res.status(200).send(periods);
      } else {
        res.status(404).send({ success: 0 });
      }
    })
    .catch((err) => {
      res.send({ error: err.original });
    });
});

router.post("/periods", async function (req, res) {

 
 // console.log('start', startDate)
  Period.findAll()
  .then((periods) => {
    // res.status(320).send({ success: periods });
    for(period in periods)
    { 
    var startDate = moment(req.body.start).format('YYYY-MM-DD');
    var endDate = moment(req.body.end).format('YYYY-MM-DD');
       console.log('startDate', startDate, 'oldStartDate', periods[period].dataValues.start, 'old end', periods[period].dataValues.end)
      if(startDate >= periods[period].dataValues.start && periods[period].dataValues.end >= startDate){    
       res.status(420).send({ error: "Periods Start Date Overlapping" });
      }
       else if(endDate >= periods[period].dataValues.start && periods[period].dataValues.end >= endDate){    
        res.status(420).send({ error: "Periods End Date Overlapping" });
       }
    else {
      console.log('working')
    }
    }
  })
 // var returned_endate = moment(req.body.start).add(3, 'hours');
 //  console.log('request', returned_endate)
 const start_date = new Date(req.body.start);
 // console.log('selectedDate', req.body)
  let period = {
    ...req.body,
    // number: start_date.getMonth(),
    year: start_date.getFullYear(),
  };
  Period.create(period)
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ success: 0 });
      }
    })
    .catch((err) => {
      res.status(503).send({ error: err.original });
    });
});

router.patch("/periods/:id", async function (req, res) {
  const { id } = req.params;
  const start_date = new Date(req.body.start);
  let period = {
    ...req.body,
    // number: start_date.getMonth(),
    year: start_date.getFullYear(),
  };
  Period.update(period, { where: { id: id } })
    .then((result) => {
      if (result) {
        res.status(200).send({ message: "Period updated successfully!" });
      } else {
        res.status(404).send({ success: 0 });
      }
    })
    .catch((err) => {
      res.status(503).send({ error: err.original });
    });
});

router.delete("/periods/:id", function (req, res) {
  const { id } = req.params;
  Period.destroy({ where: { id: id } })
    .then((result) => {
      res.status(200).send({ message: "Period deleted successfully!" });
    })
    .catch((err) => {
      res.send({ error: err.original });
    });
});

router.get("/open-period-interval", function (req, res) {
  Period.findAll({
    where: { status: "Open" },
    attributes: [
      [Sq.fn("min", Sq.col("start")), "minDate"],
      [Sq.fn("max", Sq.col("end")), "maxDate"],
    ],
  })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.send({ error: err.original });
    });
});

/**
 * Manage Organization Here
 */
router.get("/organization", function (req, res) {
  let { page, limit, sort, order, search } = req.query;
  if (page && limit) {
    Organization.findAndCountAll()
      .then((total) => {
        let _where = {};
        if (search !== "null") {
          _where = {
            where: {
              [Sq.Op.or]: {
                name: { [Sq.Op.iLike]: `%${search}%` },
                source_website_url_primary: { [Sq.Op.iLike]: `%${search}%` },
                target_elvanto_url_primary: { [Sq.Op.iLike]: `%${search}%` },
                elvanto_api_key: { [Sq.Op.iLike]: `%${search}%` },
                new_people_default_groups: { [Sq.Op.iLike]: `%${search}%` },
              },
            },
          };
        }
        Organization.findAll({
          ..._where,
          order: [[sort, order]],
          offset: (page - 1) * limit,
          limit,
        })
          .then((result) => {
            if (search == "null") {
              res.status(200).send({ count: total.count, rows: result });
            } else {
              res.status(200).send({ count: result.length, rows: result });
            }
          })
          .catch((err) => {
            res.status(503).send({ error: err.original });
          });
      })
      .catch((err) => {
        res.status(503).send({ error: err.original });
      });
  } else {
    Organization.findAll()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(503).send({ error: err.original });
      });
  }
});

router.get("/organization/:id", function (req, res) {
  const { id } = req.params;
  Organization.findOne({ where: { id: id } })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(503).send({ error: err.original });
    });
});

router.delete("/organization/:id", function (req, res) {
  const { id } = req.params;
  Organization.destroy({ where: { id: id } })
    .then((result) => {
      res.status(200).send({ message: "Organization deleted successfully!" });
    })
    .catch((err) => {
      res.status(503).send({ error: err.original });
    });
});

router.post("/organization", function (req, res) {
  Organization.create(req.body)
    .then((result) => {
      if (result) {
        res.status(200).send({ message: "Organization added successfully!" });
      } else {
        res.status(404).send({ success: 0 });
      }
    })
    .catch((err) => {
      res.status(503).send({ error: err.original });
    });
});

router.patch("/organization/:id", function (req, res) {
  const { id } = req.params;
  Organization.update(req.body, { where: { id: id } })
    .then((result) => {
      res.status(200).send({ message: "Organization updated successfully!" });
    })
    .catch((err) => {
      res.status(503).send({ error: err.original });
    });
});

/**
 * Manage Peoples
 */
router.post("/people", function (req, res) {
  People.create(req.body)
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ success: 0 });
      }
    })
    .catch((err) => {
      res.status(503).send({ error: err.original });
    });
});

router.get("/people", function (req, res) {
  const { page, limit, search, sort, order } = req.query;
  if (page && limit) {
    People.findAndCountAll()
      .then((total) => {
        let _where = {};
        if (search !== "null") {
          _where = {
            where: {
              [Sq.Op.or]: [
                { firstname: { [Sq.Op.iLike]: `%${search}%` } },
                { lastname: { [Sq.Op.iLike]: `%${search}%` } },
                { phone: { [Sq.Op.iLike]: `%${search}%` } },
                { home_address: { [Sq.Op.iLike]: `%${search}%` } },
                { home_city: { [Sq.Op.iLike]: `%${search}%` } },
                { home_state: { [Sq.Op.iLike]: `%${search}%` } },
              ],
            },
          };
        }

        People.findAll({
          ..._where,
          order: [[sort, order]],
          offset: (page - 1) * limit,
          limit,
        })
          .then((result) => {
            if (search === "null") {
              res.status(200).send({ count: total.count, rows: result });
            } else {
              res.status(200).send({ count: result.length, rows: result });
            }
          })
          .catch((err) => {
            res.send({ error: err.original });
          });
      })
      .catch((err) => {
        res.send({ error: err.original });
      });
  } else {
    People.findAll()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.send({ error: err.original });
      });
  }
});

router.get("/people/:id", function (req, res) {
  const { id } = req.params;
  People.findOne({ where: { id: id } })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.send({ error: err.original });
    });
});

router.get("/people-by-ids", function (req, res) {
  const { ids } = req.query;
  People.findAll({
    attributes: ["id", "firstname", "lastname"],
    where: { id: { [Sq.Op.in]: JSON.parse(ids) } },
  })
    .then((result) => {
      if (result) {
        let peoples = [];
        result.map((rlt) => {
          peoples.push({
            id: rlt.id,
            name: [rlt.firstname, rlt.lastname].join(" "),
          });
        });
        res.status(200).send(peoples);
      } else {
        res.status(404).send({ success: 0 });
      }
    })
    .catch((err) => {
      res.send({ error: err.original });
    });
});
/**
 * Manage Groups
 */
router.get("/group", function (req, res) {
  let { page, limit, sort, order, search } = req.query;
  if (page && limit) {
    Group.findAndCountAll()
      .then((total) => {
        let _where = {};
        if (search !== "null") {
          _where = {
            where: {
              [Sq.Op.or]: [
                {
                  name: { [Sq.Op.iLike]: `%${search}%` },
                },
                Sq.where(Sq.cast(Sq.col("group.group_type"), "varchar"), {
                  [Sq.Op.iLike]: `%${search}%`,
                }),
              ],
            },
          };
        }

        Group.findAll({
          ..._where,
          attributes: ["group_type", "name", "id", "picture_url"],
          include: [
            {
              model: GroupMember,
              include: [
                {
                  model: People,
                  attributes: [
                    "preferred_name",
                    "firstname",
                    "middle_name",
                    "lastname",
                    "email",
                  ],
                },
              ],
            },
          ],
        })
          .then((result) => {
            if (sort) {
              result = result.sort(dynamicSort(sort, order));
            }
            let offset = (page - 1) * limit;
            let retresult = result.slice(
              offset,
              Math.min(result.length, Number(offset) + Number(limit))
            );
            if (result) {
              if (search == "null") {
                res.status(200).send({ count: total.count, rows: retresult });
              } else {
                res.status(200).send({ count: result.length, rows: retresult });
              }
            } else {
              res.status(400).send({ success: 0 });
            }
          })
          .catch((err) => {
            res.status(503).send({ error: err.original });
          });
      })
      .catch((err) => {
        res.status(503).send({ error: err.original });
      });
  } else {
    Group.findAll({
      include: [
        {
          model: GroupMember,
          include: [
            {
              model: People,
              attributes: [
                "preferred_name",
                "firstname",
                "middle_name",
                "lastname",
                "email",
              ],
            },
          ],
        },
      ],
      order: [["name", "ASC"]],
    })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(503).send({ error: err.original });
      });
  }
});

router.get("/group/:id", function (req, res) {
  const { id } = req.params;
  Group.findOne({
    where: { id: id },
    include: [
      {
        model: GroupMember,
        include: [
          {
            model: People,
            attributes: [
              "preferred_name",
              "firstname",
              "middle_name",
              "lastname",
              "email",
            ],
          },
        ],
      },
    ],
  })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(503).send({ error: err.original });
    });
});

router.delete("/group/:id", function (req, res) {
  const { id } = req.params;
  Group.destroy({ where: { id: id } })
    .then((result) => {
      res.status(200).send({ message: "Group deleted successfully!" });
    })
    .catch((err) => {
      res.status(503).send({ error: err.original });
    });
});

router.post("/group", function (req, res) {
  Group.create(req.body)
    .then((result) => {
      if (result) {
        res.status(200).send({ message: "Group added successfully!" });
      } else {
        res.status(404).send({ success: 0 });
      }
    })
    .catch((err) => {
      res.status(503).send({ error: err.original });
    });
});

router.patch("/group/:id", function (req, res) {
  const { id } = req.params;
  Group.update(req.body, { where: { id: id } })
    .then((result) => {
      res.status(200).send({ message: "Group updated successfully!" });
    })
    .catch((err) => {
      res.status(503).send({ error: err.original });
    });
});

// Search Group
router.get("/search-group", function (req, res) {
  const { q } = req.query;
  Group.findAll({
    attributes: ["id", "name", "parent_group"],
    //where: { group_type: 'Temple', name: { [Sq.Op.iLike]: `%${q}%` } },
    where: {
      parent_group: {
        [Sq.Op.ne]: null,
      },
      name: { [Sq.Op.iLike]: `%${q}%` },
    },
    include: [
      {
        model: GroupMember,
        include: [
          {
            model: People,
            attributes: [
              "preferred_name",
              "firstname",
              "middle_name",
              "lastname",
              "email",
            ],
          },
        ],
      },
    ],
  })
    .then((items) => {
      if (items) {
        res.status(200).send(items);
      } else {
        res.status(404).send({ success: 0 });
      }
    })
    .catch((err) => {
      res.send({ error: err.original });
    });
});

periodExists = (start_date, end_date, month) => {
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);
  Period.findAll({
    where: {
      [Sq.Op.or]: {
        start: {
          [Sq.Op.between]: [startDate, endDate],
        },
        end: {
          [Sq.Op.between]: [startDate, endDate],
        },
        [Sq.Op.and]: {
          start: {
            [Sq.Op.lte]: startDate,
          },
          end: {
            [Sq.Op.gte]: startDate,
          },
        },
      },
    },
  })
    .then((result) => {
      return result.length;
    })
    .catch((err) => {
      return err.original;
    });
};

router.get("/check-period", function (req, res) {
  const startDate = new Date(req.query.start);
  const endDate = new Date(req.query.end);
  Period.findAll({
    where: {
      [Sq.Op.or]: {
        start: {
          [Sq.Op.between]: [startDate, endDate],
        },
        end: {
          [Sq.Op.between]: [startDate, endDate],
        },
        [Sq.Op.and]: {
          start: {
            [Sq.Op.lte]: startDate,
          },
          end: {
            [Sq.Op.gte]: startDate,
          },
        },
      },
    },
  })
    .then((result) => {
      res.send({ dd: result.length });
    })
    .catch((err) => {
      res.send(err.original);
    });
});

// Search Books
router.get("/search-books", function (req, res) {
  const { q } = req.query;
  Item.findAll({
    attributes: ["id", "name"],
    where: { item_type: "Book", name: { [Sq.Op.iLike]: `%${q}%` } },
  })
    .then((items) => {
      if (items) {
        res.status(200).send(items);
      } else {
        res.status(404).send({ success: 0 });
      }
    })
    .catch((err) => {
      res.send({ error: err.original });
    });
});

// Get Book By Ids
router.get("/book-by-ids", function (req, res) {
  const { ids } = req.query;
  Item.findAll({
    attributes: ["id", "name"],
    where: { item_type: "Book", id: { [Sq.Op.in]: JSON.parse(ids) } },
  })
    .then((items) => {
      if (items) {
        res.status(200).send(items);
      } else {
        res.status(404).send({ success: 0 });
      }
    })
    .catch((err) => {
      res.send({ error: err.original });
    });
});

/**
 * Manage Group Members
 */
router.post("/group-member", function (req, res) {
  GroupMember.create(req.body)
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ success: 0 });
      }
    })
    .catch((err) => {
      res.status(503).send({ error: err.original });
    });
});

router.get("/group-member", function (req, res) {
  GroupMember.findAll({
    include: [
      {
        model: People,
        attributes: [
          "preferred_name",
          "firstname",
          "middle_name",
          "lastname",
          "email",
        ],
      },
    ],
  })
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ success: 0 });
      }
    })
    .catch((err) => {
      res.send({ error: err.original });
    });
});

router.patch("/group-member/:id", async function (req, res) {
  const { id } = req.params;
  GroupMember.update(req.body, { where: { id: id } })
    .then((result) => {
      if (result) {
        res.status(200).send({ message: "Group Member updated successfully!" });
      } else {
        res.status(404).send({ success: 0 });
      }
    })
    .catch((err) => {
      res.status(503).send({ error: err.original });
    });
});

getArrOfArrToString = (arr_data) => {
  let strng = "{";
  arr_data.map((data, key) => {
    if (key !== 0) {
      strng += ",";
    }
    const arrToStrng = getArrToString(data);
    strng += arrToStrng === null ? "{0,0,0,0,0,0,0}" : getArrToString(data);
  });
  strng += "}";
  return strng;
};

getArrToString = (arr_data) => {
  let hasNonZero = false;
  let strng = "{";
  arr_data.map((data, key) => {
    if (key !== 0) {
      strng += ",";
    }
    strng += data;
    if (data > 0) {
      hasNonZero = true;
    }
  });
  strng += "}";
  return hasNonZero ? strng : null;
};
/**
 * Add Sankirtan Goal
 */
router.post("/goal", function (req, res) {
  let goalData = req.body;
  goalData = {
    ...goalData,
    msf_book_points_goal: getArrToString(goalData.msf_book_points_goal),
    msf_bbt_amount_goal: getArrToString(goalData.msf_bbt_amount_goal),
    msf_group_amount_goal: getArrToString(goalData.msf_group_amount_goal),

    msf_book_points_goal_total: getArrToString(goalData.msf_book_points_goal),
    msf_bbt_amount_goal_total: getArrToString(goalData.msf_bbt_amount_goal),
    msf_group_amount_goal_total: getArrToString(goalData.msf_group_amount_goal),

    annual_book_points_goal: getArrayValueSum(goalData.msf_book_points_goal),
    annual_bbt_amount_goal: getArrayValueSum(goalData.msf_bbt_amount_goal),
    annual_group_amount_goal: getArrayValueSum(goalData.msf_group_amount_goal),

    annual_book_points_goal_total: getArrayValueSum(
      goalData.msf_book_points_goal
    ),
    annual_bbt_amount_goal_total: getArrayValueSum(
      goalData.msf_bbt_amount_goal
    ),
    annual_group_amount_goal_total: getArrayValueSum(
      goalData.msf_group_amount_goal
    ),
  };
  BusinessPlanSummary.create(goalData)
    .then(async (result) => {
      if (result) {
        const response = await roleUpSankirtanGoal(
          req.body.parent_group_id,
          req.body.year.toString(),
          req.body
        );
        if (!response) {
          return res.status(503).send({
            success: 0,
            message: "Something went wrong in roll-up.",
          });
        } else {
          res.status(200).send(result);
        }
      } else {
        res.status(404).send({ success: 0 });
      }
    })
    .catch((err) => {
      res.status(503).send({ error: err.original });
    });
});

moneyToNumber = (money) => {
  money = money.replace("$", "");
  money = money.split(",").join("");
  return money;
};

mergeMSFRecords = (records1, records2) => {
  const mergedData = records1.map((value, key) => {
    const value1 = isNaN(value) ? moneyToNumber(value) : value;
    let value2 = 0;
    if (typeof records2[key] !== "undefined") {
      value2 = isNaN(records2[key])
        ? moneyToNumber(records2[key])
        : records2[key];
    }
    return +value1 + +value2;
  });
  return mergedData;
};

// Return the correct values need to roll-up
updateGoalData = (existing, coming) => {
  if (existing !== null) {
    existing.map((value, key) => {
      if (typeof coming[key] !== "undefined") {
        value = isNaN(value) ? moneyToNumber(value) : value;
        const coming_value = isNaN(coming[key])
          ? moneyToNumber(coming[key])
          : coming[key];
        coming[key] = +coming_value - +value;
      }
    });
  }
  return coming;
};

router.patch("/goal/:id", async function (req, res) {
  const { id } = req.params;
  let goalData = req.body;
  const formattedGoalData = await BusinessPlanSummary.findOne({ where: { id } })
    .then((result) => {
      const request_msf_book_points_goal = [...goalData.msf_book_points_goal];
      const request_msf_bbt_amount_goal = [...goalData.msf_bbt_amount_goal];
      const request_msf_group_amount_goal = [...goalData.msf_group_amount_goal];
      goalData = {
        ...goalData,
        msf_book_points_goal: updateGoalData(
          result.msf_book_points_goal,
          goalData.msf_book_points_goal
        ),
        msf_bbt_amount_goal: updateGoalData(
          result.msf_bbt_amount_goal,
          goalData.msf_bbt_amount_goal
        ),
        msf_group_amount_goal: updateGoalData(
          result.msf_group_amount_goal,
          goalData.msf_group_amount_goal
        ),
      };
      let msf_book_point_goal_merge = [];
      let msf_bbt_amount_goal_merge = [];
      let msf_group_amount_goal_merge = [];

      if (
        result.msf_book_points_goal_total.length >=
        goalData.msf_book_points_goal.length
      ) {
        msf_book_point_goal_merge = mergeMSFRecords(
          result.msf_book_points_goal_total,
          goalData.msf_book_points_goal
        );
        msf_bbt_amount_goal_merge = mergeMSFRecords(
          result.msf_bbt_amount_goal_total,
          goalData.msf_bbt_amount_goal
        );
        msf_group_amount_goal_merge = mergeMSFRecords(
          result.msf_group_amount_goal_total,
          goalData.msf_group_amount_goal
        );
      } else {
        msf_book_point_goal_merge = mergeMSFRecords(
          goalData.msf_book_points_goal,
          result.msf_book_points_goal_total
        );
        msf_bbt_amount_goal_merge = mergeMSFRecords(
          goalData.msf_bbt_amount_goal,
          result.msf_bbt_amount_goal_total
        );
        msf_group_amount_goal_merge = mergeMSFRecords(
          goalData.msf_group_amount_goal,
          result.msf_group_amount_goal_total
        );
      }
      // End

      goalData = {
        ...goalData,
        msf_book_points_goal: getArrToString(request_msf_book_points_goal),
        msf_bbt_amount_goal: getArrToString(request_msf_bbt_amount_goal),
        msf_group_amount_goal: getArrToString(request_msf_group_amount_goal),

        msf_book_points_goal_total: getArrToString(msf_book_point_goal_merge),
        msf_bbt_amount_goal_total: getArrToString(msf_bbt_amount_goal_merge),
        msf_group_amount_goal_total: getArrToString(
          msf_group_amount_goal_merge
        ),

        annual_book_points_goal: getArrayValueSum(request_msf_book_points_goal),
        annual_bbt_amount_goal: getArrayValueSum(request_msf_bbt_amount_goal),
        annual_group_amount_goal: getArrayValueSum(
          request_msf_group_amount_goal
        ),

        annual_book_points_goal_total: getArrayValueSum(
          msf_book_point_goal_merge
        ),
        annual_bbt_amount_goal_total: getArrayValueSum(
          msf_bbt_amount_goal_merge
        ),
        annual_group_amount_goal_total: getArrayValueSum(
          msf_group_amount_goal_merge
        ),
      };
      return goalData;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
  if (!formattedGoalData) {
    return res.status(503).send({ success: 0, message: "Goal not updated!" });
  }
  BusinessPlanSummary.update(formattedGoalData, { where: { id: id } })
    .then(async (result) => {
      const response = await roleUpSankirtanGoal(
        req.body.parent_group_id,
        req.body.year.toString(),
        req.body
      );
      if (!response) {
        return res.status(503).send({
          success: 0,
          message: "Something went wrong in roll-up.",
        });
      } else {
        res.status(200).send({ message: "Goal updated successfully!" });
      }
    })
    .catch((err) => {
      res.status(503).send({ error: err.original });
    });
});

// Update Actual Data of Goal
router.patch("/actual-goal/:id", async function (req, res) {
  const { id } = req.params;
  let goalData = req.body;
  const formattedGoalData = await BusinessPlanSummary.findOne({ where: { id } })
    .then((result) => {
      const request_msf_actual_group_amount = [
        ...goalData.msf_actual_group_amount,
      ];
      goalData = {
        ...goalData,
        msf_actual_group_amount: updateGoalData(
          result.msf_actual_group_amount,
          goalData.msf_actual_group_amount
        ),
      };
      let msf_actual_group_amount_merge = goalData.msf_actual_group_amount;
      if (result.msf_actual_group_amount_total !== null) {
        if (
          result.msf_actual_group_amount_total.length >=
          goalData.msf_actual_group_amount.length
        ) {
          msf_actual_group_amount_merge = mergeMSFRecords(
            result.msf_actual_group_amount_total,
            goalData.msf_actual_group_amount
          );
        } else {
          msf_actual_group_amount_merge = mergeMSFRecords(
            goalData.msf_actual_group_amount,
            result.msf_actual_group_amount_total
          );
        }
      }
      // End

      goalData = {
        ...goalData,
        msf_actual_group_amount: getArrToString(
          request_msf_actual_group_amount
        ),

        msf_actual_group_amount_total: getArrToString(
          msf_actual_group_amount_merge
        ),

        annual_actual_group_amount: getArrayValueSum(
          request_msf_actual_group_amount
        ),

        annual_actual_group_amount_total: getArrayValueSum(
          msf_actual_group_amount_merge
        ),
      };
      return goalData;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
  if (!formattedGoalData) {
    return res.status(503).send({ success: 0, message: "Goal not updated!" });
  }
  BusinessPlanSummary.update(formattedGoalData, { where: { id: id } })
    .then(async (result) => {
      const response = await roleUpSankirtanGoalActual(
        req.body.parent_group_id,
        req.body.year.toString(),
        req.body
      );
      if (!response) {
        return res.status(503).send({
          success: 0,
          message: "Something went wrong in roll-up.",
        });
      } else {
        res.status(200).send({ message: "Goal updated successfully!" });
      }
    })
    .catch((err) => {
      res.status(503).send({ error: err.original });
    });
});

router.get("/goal", async function (req, res) {
  const { group_id, year } = req.query;
  BusinessPlanSummary.findOne({ where: { group_id: group_id, year: year } })
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ success: 0 });
      }
    })
    .catch((err) => {
      res.status(503).send({ error: err.original });
    });
});

// Goal Setting UI
getPeriodTypeData = (val_arr, number) => {
  return !Array.isArray(val_arr) || typeof val_arr[number] === "undefined"
    ? 0
    : val_arr[number];
};

getGoalSettingData = (summary, type, number) => {
  let data = {};
  number = number - 1;
  data["group"] = {};
  data["child"] = {};
  data["total"] = {};
  // Arrange Group Level Data
  data["group"]["goal"] = {
    book_point: getPeriodTypeData(
      type === "Month"
        ? summary.monthly_book_points_goal
        : summary.msf_book_points_goal,
      number
    ),
    amount_collected: getPeriodTypeData(
      type === "Month"
        ? summary.monthly_group_amount_goal
        : summary.msf_group_amount_goal,
      number
    ),
    amount_remitted: getPeriodTypeData(
      type === "Month"
        ? summary.monthly_bbt_amount_goal
        : summary.msf_bbt_amount_goal,
      number
    ),
  };
  data["group"]["actual"] = {
    book_point: getPeriodTypeData(
      type === "Month"
        ? summary.monthly_actual_book_points
        : summary.msf_actual_book_points,
      number
    ),
    amount_collected: getPeriodTypeData(
      type === "Month"
        ? summary.monthly_actual_group_amount
        : summary.msf_actual_group_amount,
      number
    ),
    amount_remitted: getPeriodTypeData(
      type === "Month"
        ? summary.monthly_actual_bbt_amount
        : summary.msf_actual_group_amount,
      number
    ),
  };

  // Arrange Child Rollup Data
  data["child"]["goal"] = {
    book_point: getPeriodTypeData(
      type === "Month"
        ? summary.monthly_book_points_goal_roll_up
        : summary.msf_book_points_goal_roll_up,
      number
    ),
    amount_collected: getPeriodTypeData(
      type === "Month"
        ? summary.monthly_group_amount_goal_roll_up
        : summary.msf_group_amount_goal_roll_up,
      number
    ),
    amount_remitted: getPeriodTypeData(
      type === "Month"
        ? summary.monthly_bbt_amount_goal_roll_up
        : summary.msf_bbt_amount_goal_roll_up,
      number
    ),
  };
  data["child"]["actual"] = {
    book_point: getPeriodTypeData(
      type === "Month"
        ? summary.monthly_actual_book_points_roll_up
        : summary.msf_actual_book_points_roll_up,
      number
    ),
    amount_collected: getPeriodTypeData(
      type === "Month"
        ? summary.monthly_actual_group_amount_roll_up
        : summary.msf_actual_group_amount_roll_up,
      number
    ),
    amount_remitted: getPeriodTypeData(
      type === "Month"
        ? summary.monthly_actual_bbt_amount_roll_up
        : summary.msf_actual_bbt_amount_roll_up,
      number
    ),
  };

  // Arrange Total Data
  data["total"]["goal"] = {
    book_point: getPeriodTypeData(
      type === "Month"
        ? summary.monthly_book_points_goal_total
        : summary.msf_book_points_goal_total,
      number
    ),
    amount_collected: getPeriodTypeData(
      type === "Month"
        ? summary.monthly_group_amount_goal_total
        : summary.msf_group_amount_goal_total,
      number
    ),
    amount_remitted: getPeriodTypeData(
      type === "Month"
        ? summary.monthly_bbt_amount_goal_total
        : summary.msf_bbt_amount_goal_total,
      number
    ),
  };
  data["total"]["actual"] = {
    book_point: getPeriodTypeData(
      type === "Month"
        ? summary.monthly_actual_book_points_total
        : summary.msf_actual_book_points_total,
      number
    ),
    amount_collected: getPeriodTypeData(
      type === "Month"
        ? summary.monthly_actual_group_amount_total
        : summary.msf_actual_group_amount_total,
      number
    ),
    amount_remitted: getPeriodTypeData(
      type === "Month"
        ? summary.monthly_actual_bbt_amount_total
        : summary.msf_actual_bbt_amount_total,
      number
    ),
  };
  return data;
};

router.get("/goal-setting", async function (req, res) {
  const { group_id, year, distributor_id, period_id } = req.query;
  let _where = {
    group_id: group_id,
    year: year,
  };
  if (distributor_id) {
    _where = { ..._where, distributor_id: distributor_id };
  }
  if (period_id) {
    const period = await Period.findOne({ where: { id: period_id } });
    const summaryDetails = await BusinessPlanSummary.findOne({
      where: _where,
    });
    let data = await getGoalSettingData(
      summaryDetails,
      period.type,
      period.number
    );
    data = {
      ...data,
      id: summaryDetails.id,
      distributor_id: summaryDetails.distributor_id,
      group_id: summaryDetails.group_id,
      year: summaryDetails.year,
      organization_id: summaryDetails.organization_id,
      created_date: summaryDetails.created_date,
      last_modified_date: summaryDetails.last_modified_date,
      created_by_id: summaryDetails.created_by_id,
      last_modified_by_id: summaryDetails.last_modified_by_id,
    };
    res.status(200).send(data);
  } else {
    BusinessPlanSummary.findOne({ where: { group_id: group_id, year: year } })
      .then((result) => {
        if (result) {
          res.status(200).send(result);
        } else {
          res.status(404).send({ success: 0 });
        }
      })
      .catch((err) => {
        res.status(503).send({ error: err.original });
      });
  }
});

const rollupGoals = async (
  {
    group_id,
    year,
    distributor_id,
    number,
    type,
    created_by_id,
    last_modified_by_id,
    organization_id,
  },
  { book_point_goal, bbt_amount_goal, group_amount_goal },
  existing_data = []
) => {
  let _where = {
    group_id,
    year,
  };
  if (typeof distributor_id !== "undefined" && distributor_id > 0) {
    _where = { ..._where, distributor_id };
  }
  BusinessPlanSummary.findOne({ where: _where }).then(async (result) => {
    if (!result) {
      // Create New Business Summary
      let goal = {
        year: year,
        group_id: group_id,
      };
      if (type === "MSF") {
        goal = {
          ...goal,
          msf_book_points_goal_roll_up: getArrToString(book_point_goal),
          msf_bbt_amount_goal_roll_up: getArrToString(bbt_amount_goal),
          msf_group_amount_goal_roll_up: getArrToString(group_amount_goal),
          msf_book_points_goal_total: getArrToString(book_point_goal),
          msf_bbt_amount_goal_total: getArrToString(bbt_amount_goal),
          msf_group_amount_goal_total: getArrToString(group_amount_goal),
        };
      } else {
        goal = {
          ...goal,
          monthly_book_points_goal_roll_up: getArrToString(book_point_goal),
          monthly_bbt_amount_goal_roll_up: getArrToString(bbt_amount_goal),
          monthly_group_amount_goal_roll_up: getArrToString(group_amount_goal),
          monthly_book_points_goal_total: getArrToString(book_point_goal),
          monthly_bbt_amount_goal_total: getArrToString(bbt_amount_goal),
          monthly_group_amount_goal_total: getArrToString(group_amount_goal),
        };
      }
      goal = {
        ...goal,
        annual_book_points_goal_roll_up: getArrayValueSum(book_point_goal),
        annual_bbt_amount_goal_roll_up: getArrayValueSum(bbt_amount_goal),
        annual_group_amount_goal_roll_up: getArrayValueSum(group_amount_goal),
        annual_book_points_goal: getArrayValueSum(book_point_goal),
        annual_bbt_amount_goal: getArrayValueSum(bbt_amount_goal),
        annual_group_amount_goal: getArrayValueSum(group_amount_goal),
        annual_book_points_goal_total: getArrayValueSum(book_point_goal),
        annual_bbt_amount_goal_total: getArrayValueSum(bbt_amount_goal),
        annual_group_amount_goal_total: getArrayValueSum(group_amount_goal),
        created_by_id: created_by_id,
        last_modified_by_id: created_by_id,
        organization_id: organization_id,
      };
      if (typeof distributor_id !== "undefined" && distributor_id > 0) {
        goal = { ...goal, distributor_id };
      }
      await BusinessPlanSummary.create(goal);
      const getParent = await Group.findOne({ where: { id: group_id } });
      if (
        typeof getParent.parent_group !== "undefined" &&
        getParent.parent_group !== null
      ) {
        rollupGoals(
          {
            group_id: getParent.parent_group,
            year,
            distributor_id,
            number,
            type,
            created_by_id,
            last_modified_by_id,
            organization_id,
          },
          {
            book_point_goal,
            bbt_amount_goal,
            group_amount_goal,
          }
        );
      } else {
        console.log("No More Parent Group Found!");
      }
    } else {
      // Update Existing Business Summary
      let goal = {};
      if (type === "MSF") {
        goal = {
          msf_book_points_goal_roll_up: getArrToString(
            adjustExistingGoal(
              result.msf_book_points_goal_roll_up,
              book_point_goal,
              existing_data.old_book_point_goal
                ? existing_data.old_book_point_goal
                : [0],
              number
            )
          ),
          msf_bbt_amount_goal_roll_up: getArrToString(
            adjustExistingGoal(
              result.msf_bbt_amount_goal_roll_up,
              bbt_amount_goal,
              existing_data.old_bbt_amount_goal
                ? existing_data.old_bbt_amount_goal
                : [0],
              number
            )
          ),
          msf_group_amount_goal_roll_up: getArrToString(
            adjustExistingGoal(
              result.msf_group_amount_goal_roll_up,
              group_amount_goal,
              existing_data.old_group_amount_goal
                ? existing_data.old_group_amount_goal
                : [0],
              number
            )
          ),
          msf_book_points_goal_total: getArrToString(
            adjustExistingGoal(
              result.msf_book_points_goal_total,
              book_point_goal,
              existing_data.old_book_point_goal
                ? existing_data.old_book_point_goal
                : [0],
              number
            )
          ),
          msf_bbt_amount_goal_total: getArrToString(
            adjustExistingGoal(
              result.msf_bbt_amount_goal_total,
              bbt_amount_goal,
              existing_data.old_bbt_amount_goal
                ? existing_data.old_bbt_amount_goal
                : [0],
              number
            )
          ),
          msf_group_amount_goal_total: getArrToString(
            adjustExistingGoal(
              result.msf_group_amount_goal_total,
              group_amount_goal,
              existing_data.old_group_amount_goal
                ? existing_data.old_group_amount_goal
                : [0],
              number
            )
          ),
          annual_book_points_goal_roll_up: getArrayValueSum(
            adjustExistingGoal(
              result.msf_book_points_goal_roll_up,
              book_point_goal,
              existing_data.old_book_point_goal
                ? existing_data.old_book_point_goal
                : [0],
              number
            )
          ),
          annual_bbt_amount_goal_roll_up: getArrayValueSum(
            adjustExistingGoal(
              result.msf_bbt_amount_goal_roll_up,
              bbt_amount_goal,
              existing_data.old_bbt_amount_goal
                ? existing_data.old_bbt_amount_goal
                : [0],
              number
            )
          ),
          annual_group_amount_goal_roll_up: getArrayValueSum(
            adjustExistingGoal(
              result.msf_group_amount_goal_roll_up,
              group_amount_goal,
              existing_data.old_group_amount_goal
                ? existing_data.old_group_amount_goal
                : [0],
              number
            )
          ),
          annual_book_points_goal_total: getArrayValueSum(
            adjustExistingGoal(
              result.msf_book_points_goal_total,
              book_point_goal,
              existing_data.old_book_point_goal
                ? existing_data.old_book_point_goal
                : [0],
              number
            )
          ),
          annual_bbt_amount_goal_total: getArrayValueSum(
            adjustExistingGoal(
              result.msf_bbt_amount_goal_total,
              bbt_amount_goal,
              existing_data.old_bbt_amount_goal
                ? existing_data.old_bbt_amount_goal
                : [0],
              number
            )
          ),
          annual_group_amount_goal_total: getArrayValueSum(
            adjustExistingGoal(
              result.msf_group_amount_goal_total,
              group_amount_goal,
              existing_data.old_group_amount_goal
                ? existing_data.old_group_amount_goal
                : [0],
              number
            )
          ),
        };
      } else {
        goal = {
          monthly_book_points_goal_roll_up: getArrToString(
            adjustExistingGoal(
              result.monthly_book_points_goal_roll_up,
              book_point_goal,
              existing_data.old_book_point_goal
                ? existing_data.old_book_point_goal
                : [0],
              number
            )
          ),
          monthly_bbt_amount_goal_roll_up: getArrToString(
            adjustExistingGoal(
              result.monthly_bbt_amount_goal_roll_up,
              bbt_amount_goal,
              existing_data.old_bbt_amount_goal
                ? existing_data.old_bbt_amount_goal
                : [0],
              number
            )
          ),
          monthly_group_amount_goal_roll_up: getArrToString(
            adjustExistingGoal(
              result.monthly_group_amount_goal_roll_up,
              group_amount_goal,
              existing_data.old_group_amount_goal
                ? existing_data.old_group_amount_goal
                : [0],
              number
            )
          ),
          monthly_book_points_goal_total: getArrToString(
            adjustExistingGoal(
              result.monthly_book_points_goal_total,
              book_point_goal,
              existing_data.old_book_point_goal
                ? existing_data.old_book_point_goal
                : [0],
              number
            )
          ),
          monthly_bbt_amount_goal_total: getArrToString(
            adjustExistingGoal(
              result.monthly_bbt_amount_goal_total,
              bbt_amount_goal,
              existing_data.old_bbt_amount_goal
                ? existing_data.old_bbt_amount_goal
                : [0],
              number
            )
          ),
          monthly_group_amount_goal_total: getArrToString(
            adjustExistingGoal(
              result.monthly_group_amount_goal_total,
              group_amount_goal,
              existing_data.old_group_amount_goal
                ? existing_data.old_group_amount_goal
                : [0],
              number
            )
          ),
          annual_book_points_goal_roll_up: getArrayValueSum(
            adjustExistingGoal(
              result.monthly_book_points_goal_roll_up,
              book_point_goal,
              existing_data.old_book_point_goal
                ? existing_data.old_book_point_goal
                : [0],
              number
            )
          ),
          annual_bbt_amount_goal_roll_up: getArrayValueSum(
            adjustExistingGoal(
              result.monthly_bbt_amount_goal_roll_up,
              bbt_amount_goal,
              existing_data.old_bbt_amount_goal
                ? existing_data.old_bbt_amount_goal
                : [0],
              number
            )
          ),
          annual_group_amount_goal_roll_up: getArrayValueSum(
            adjustExistingGoal(
              result.monthly_group_amount_goal_roll_up,
              group_amount_goal,
              existing_data.old_group_amount_goal
                ? existing_data.old_group_amount_goal
                : [0],
              number
            )
          ),
          annual_book_points_goal_total: getArrayValueSum(
            adjustExistingGoal(
              result.monthly_book_points_goal_total,
              book_point_goal,
              existing_data.old_book_point_goal
                ? existing_data.old_book_point_goal
                : [0],
              number
            )
          ),
          annual_bbt_amount_goal_total: getArrayValueSum(
            adjustExistingGoal(
              result.monthly_bbt_amount_goal_total,
              bbt_amount_goal,
              existing_data.old_bbt_amount_goal
                ? existing_data.old_bbt_amount_goal
                : [0],
              number
            )
          ),
          annual_group_amount_goal_total: getArrayValueSum(
            adjustExistingGoal(
              result.monthly_group_amount_goal_total,
              group_amount_goal,
              existing_data.old_group_amount_goal
                ? existing_data.old_group_amount_goal
                : [0],
              number
            )
          ),
        };
      }
      goal = {
        ...goal,
        last_modified_by_id: created_by_id,
        organization_id: organization_id,
      };
      if (typeof distributor_id !== "undefined" && distributor_id > 0) {
        goal = { ...goal, distributor_id: distributor_id };
      }
      await BusinessPlanSummary.update(goal, { where: { id: result.id } });
      const getParent = await Group.findOne({ where: { id: group_id } });
      if (
        typeof getParent.parent_group !== "undefined" &&
        getParent.parent_group !== null
      ) {
        rollupGoals(
          {
            group_id: getParent.parent_group,
            year,
            distributor_id,
            number,
            type,
            created_by_id,
            last_modified_by_id,
            organization_id,
          },
          {
            book_point_goal,
            bbt_amount_goal,
            group_amount_goal,
          },
          existing_data
        );
      } else {
        console.log("No More Parent Group Found!");
      }
    }
  });
  return true;
};

router.post("/goal-setting", async function (req, res) {
  let goalData = req.body;
  if (typeof goalData.period_id !== "undefined") {
    const book_point_goal = [];
    const bbt_amount_goal = [];
    const group_amount_goal = [];

    const period = await Period.findOne({ where: { id: goalData.period_id } });
    for (let i = 0; i < period.number; i++) {
      if (i === period.number - 1) {
        book_point_goal.push(+goalData.goal_book_points);
        bbt_amount_goal.push(+goalData.goal_amount_remitted_bbt);
        group_amount_goal.push(+goalData.goal_amount_collected);
      } else {
        book_point_goal.push(0);
        bbt_amount_goal.push(0);
        group_amount_goal.push(0);
      }
    }
    let goal = {
      year: goalData.year,
      group_id: goalData.group_id,
    };
    if (period.type === "MSF") {
      goal = {
        ...goal,
        msf_book_points_goal: getArrToString(book_point_goal),
        msf_bbt_amount_goal: getArrToString(bbt_amount_goal),
        msf_group_amount_goal: getArrToString(group_amount_goal),
        // msf_book_points_goal_roll_up: getArrToString(book_point_goal),
        // msf_bbt_amount_goal_roll_up: getArrToString(bbt_amount_goal),
        // msf_group_amount_goal_roll_up: getArrToString(group_amount_goal),
        msf_book_points_goal_total: getArrToString(book_point_goal),
        msf_bbt_amount_goal_total: getArrToString(bbt_amount_goal),
        msf_group_amount_goal_total: getArrToString(group_amount_goal),
      };
    } else {
      goal = {
        ...goal,
        monthly_book_points_goal: getArrToString(book_point_goal),
        monthly_bbt_amount_goal: getArrToString(bbt_amount_goal),
        monthly_group_amount_goal: getArrToString(group_amount_goal),
        // monthly_book_points_goal_roll_up: getArrToString(book_point_goal),
        // monthly_bbt_amount_goal_roll_up: getArrToString(bbt_amount_goal),
        // monthly_group_amount_goal_roll_up: getArrToString(group_amount_goal),
        monthly_book_points_goal_total: getArrToString(book_point_goal),
        monthly_bbt_amount_goal_total: getArrToString(bbt_amount_goal),
        monthly_group_amount_goal_total: getArrToString(group_amount_goal),
      };
    }
    goal = {
      ...goal,
      // annual_book_points_goal_roll_up: getArrayValueSum(book_point_goal),
      // annual_bbt_amount_goal_roll_up: getArrayValueSum(bbt_amount_goal),
      // annual_group_amount_goal_roll_up: getArrayValueSum(group_amount_goal),
      annual_book_points_goal: getArrayValueSum(book_point_goal),
      annual_bbt_amount_goal: getArrayValueSum(bbt_amount_goal),
      annual_group_amount_goal: getArrayValueSum(group_amount_goal),
      annual_book_points_goal_total: getArrayValueSum(book_point_goal),
      annual_bbt_amount_goal_total: getArrayValueSum(bbt_amount_goal),
      annual_group_amount_goal_total: getArrayValueSum(group_amount_goal),
      created_by_id: goalData.created_by_id,
      last_modified_by_id: goalData.created_by_id,
      organization_id: goalData.organization_id,
    };
    if (
      typeof goalData.distributor_id !== "undefined" &&
      goalData.distributor_id > 0
    ) {
      goal = { ...goal, distributor_id: goalData.distributor_id };
    }
    await BusinessPlanSummary.create(goal);
    const getParent = await Group.findOne({ where: { id: goalData.group_id } });
    if (
      typeof getParent.parent_group !== "undefined" &&
      getParent.parent_group !== null
    ) {
      rollupGoals(
        {
          group_id: getParent.parent_group,
          year: goalData.year.toString(),
          distributor_id: goalData.distributor_id,
          number: period.number,
          type: period.type,
          created_by_id: goalData.created_by_id,
          last_modified_by_id: goalData.created_by_id,
          organization_id: goalData.organization_id,
        },
        {
          book_point_goal,
          bbt_amount_goal,
          group_amount_goal,
        }
      );
    }
    return res.send(goal);
  }
});

const adjustExistingGoal = (current, coming, old, number) => {
  if (current) {
    const _thisData = [];
    if (coming.length >= current.length) {
      for (let i = 0; i < coming.length; i++) {
        const cur_val = current[i]
          ? isNaN(current[i])
            ? moneyToNumber(current[i])
            : current[i]
          : 0;
        if (i === number - 1) {
          const com_val = coming[i]
            ? isNaN(coming[i])
              ? moneyToNumber(coming[i])
              : coming[i]
            : 0;
          const old_val =
            old && old[i]
              ? isNaN(old[i])
                ? moneyToNumber(old[i])
                : old[i]
              : 0;
          _thisData.push(+cur_val - old_val + com_val);
        } else {
          _thisData.push(+cur_val);
        }
      }
    } else {
      for (let i = 0; i < current.length; i++) {
        const cur_val = current[i]
          ? isNaN(current[i])
            ? moneyToNumber(current[i])
            : current[i]
          : 0;
        if (i === number - 1) {
          const com_val = coming[i]
            ? isNaN(coming[i])
              ? moneyToNumber(coming[i])
              : coming[i]
            : 0;
          const old_val =
            old && old[i]
              ? isNaN(old[i])
                ? moneyToNumber(old[i])
                : old[i]
              : 0;
          _thisData.push(+cur_val - old_val + com_val);
        } else {
          _thisData.push(+cur_val);
        }
      }
    }
    return _thisData;
  } else {
    return coming;
  }
};
const setPeriodValueInExistingArray = (
  existing,
  number,
  { goal_book_points, goal_amount_remitted_bbt, goal_amount_collected }
) => {
  let limit = 0;
  if (existing.old_book_point_goal) {
    limit =
      existing.old_book_point_goal.length > number
        ? existing.old_book_point_goal.length
        : number;
  } else {
    limit = number;
  }
  const book_point_goal = [];
  const bbt_amount_goal = [];
  const group_amount_goal = [];
  for (let i = 0; i < limit; i++) {
    if (i === number - 1) {
      book_point_goal.push(+goal_book_points);
      bbt_amount_goal.push(+goal_amount_remitted_bbt);
      group_amount_goal.push(+goal_amount_collected);
    } else {
      const point =
        existing.old_book_point_goal && existing.old_book_point_goal[i]
          ? isNaN(existing.old_book_point_goal[i])
            ? moneyToNumber(existing.old_book_point_goal[i])
            : existing.old_book_point_goal[i]
          : 0;
      const bbt =
        existing.old_bbt_amount_goal && existing.old_bbt_amount_goal[i]
          ? isNaN(existing.old_bbt_amount_goal[i])
            ? moneyToNumber(existing.old_bbt_amount_goal[i])
            : existing.old_bbt_amount_goal[i]
          : 0;
      const group =
        existing.old_group_amount_goal && existing.old_group_amount_goal[i]
          ? isNaN(existing.old_group_amount_goal[i])
            ? moneyToNumber(existing.old_group_amount_goal[i])
            : existing.old_group_amount_goal[i]
          : 0;
      book_point_goal.push(+point);
      bbt_amount_goal.push(+bbt);
      group_amount_goal.push(+group);
    }
  }
  return { book_point_goal, bbt_amount_goal, group_amount_goal };
};
router.patch("/goal-setting/:id", async function (req, res) {
  const { id } = req.params;
  let goalData = req.body;
  if (typeof goalData.period_id !== "undefined") {
    const period = await Period.findOne({ where: { id: goalData.period_id } });
    const goal_book_points = goalData.goal_book_points;
    const goal_amount_remitted_bbt = isNaN(goalData.goal_amount_remitted_bbt)
      ? moneyToNumber(goalData.goal_amount_remitted_bbt)
      : goalData.goal_amount_remitted_bbt;
    const goal_amount_collected = isNaN(goalData.goal_amount_collected)
      ? moneyToNumber(goalData.goal_amount_collected)
      : goalData.goal_amount_collected;
    BusinessPlanSummary.findOne({ where: { id } }).then(async (result) => {
      let existing_data = {};
      const number = period.number - 1;
      if (period.type === "MSF") {
        existing_data = {
          old_book_point_goal: result.msf_book_points_goal,
          old_bbt_amount_goal: result.msf_bbt_amount_goal,
          old_group_amount_goal: result.msf_group_amount_goal,
        };
      } else {
        existing_data = {
          old_book_point_goal: result.monthly_book_points_goal,
          old_bbt_amount_goal: result.monthly_bbt_amount_goal,
          old_group_amount_goal: result.monthly_group_amount_goal,
        };
      }
      const {
        book_point_goal,
        bbt_amount_goal,
        group_amount_goal,
      } = setPeriodValueInExistingArray(existing_data, period.number, {
        goal_book_points,
        goal_amount_remitted_bbt,
        goal_amount_collected,
      });
      let goal = {};
      if (period.type === "MSF") {
        goal = {
          ...goal,
          msf_book_points_goal: getArrToString(book_point_goal),
          msf_bbt_amount_goal: getArrToString(bbt_amount_goal),
          msf_group_amount_goal: getArrToString(group_amount_goal),
          // msf_book_points_goal_roll_up: getArrToString(
          // 	adjustExistingGoal(
          // 		result.msf_book_points_goal_roll_up,
          // 		book_point_goal,
          // 		existing_data.old_book_point_goal,
          // 		period.number
          // 	)
          // ),
          // msf_bbt_amount_goal_roll_up: getArrToString(
          // 	adjustExistingGoal(
          // 		result.msf_bbt_amount_goal_roll_up,
          // 		bbt_amount_goal,
          // 		existing_data.old_bbt_amount_goal,
          // 		period.number
          // 	)
          // ),
          // msf_group_amount_goal_roll_up: getArrToString(
          // 	adjustExistingGoal(
          // 		result.msf_group_amount_goal_roll_up,
          // 		group_amount_goal,
          // 		existing_data.old_group_amount_goal,
          // 		period.number
          // 	)
          // ),
          msf_book_points_goal_total: getArrToString(
            adjustExistingGoal(
              result.msf_book_points_goal_total,
              book_point_goal,
              existing_data.old_book_point_goal,
              period.number
            )
          ),
          msf_bbt_amount_goal_total: getArrToString(
            adjustExistingGoal(
              result.msf_bbt_amount_goal_total,
              bbt_amount_goal,
              existing_data.old_bbt_amount_goal,
              period.number
            )
          ),
          msf_group_amount_goal_total: getArrToString(
            adjustExistingGoal(
              result.msf_group_amount_goal_total,
              group_amount_goal,
              existing_data.old_group_amount_goal,
              period.number
            )
          ),
          annual_book_points_goal: getArrayValueSum(book_point_goal),
          annual_bbt_amount_goal: getArrayValueSum(bbt_amount_goal),
          annual_group_amount_goal: getArrayValueSum(group_amount_goal),
          // annual_book_points_goal_roll_up: getArrayValueSum(
          // 	adjustExistingGoal(
          // 		result.msf_book_points_goal_roll_up,
          // 		book_point_goal,
          // 		existing_data.old_book_point_goal,
          // 		period.number
          // 	)
          // ),
          // annual_bbt_amount_goal_roll_up: getArrayValueSum(
          // 	adjustExistingGoal(
          // 		result.msf_bbt_amount_goal_roll_up,
          // 		bbt_amount_goal,
          // 		existing_data.old_bbt_amount_goal,
          // 		period.number
          // 	)
          // ),
          // annual_group_amount_goal_roll_up: getArrayValueSum(
          // 	adjustExistingGoal(
          // 		result.msf_group_amount_goal_roll_up,
          // 		group_amount_goal,
          // 		existing_data.old_group_amount_goal,
          // 		period.number
          // 	)
          // ),
          annual_book_points_goal_total: getArrayValueSum(
            adjustExistingGoal(
              result.msf_book_points_goal_total,
              book_point_goal,
              existing_data.old_book_point_goal,
              period.number
            )
          ),
          annual_bbt_amount_goal_total: getArrayValueSum(
            adjustExistingGoal(
              result.msf_bbt_amount_goal_total,
              bbt_amount_goal,
              existing_data.old_bbt_amount_goal,
              period.number
            )
          ),
          annual_group_amount_goal_total: getArrayValueSum(
            adjustExistingGoal(
              result.msf_group_amount_goal_total,
              group_amount_goal,
              existing_data.old_group_amount_goal,
              period.number
            )
          ),
        };
      } else {
        goal = {
          ...goal,
          monthly_book_points_goal: getArrToString(book_point_goal),
          monthly_bbt_amount_goal: getArrToString(bbt_amount_goal),
          monthly_group_amount_goal: getArrToString(group_amount_goal),
          // monthly_book_points_goal_roll_up: getArrToString(
          // 	adjustExistingGoal(
          // 		result.monthly_book_points_goal_roll_up,
          // 		book_point_goal,
          // 		existing_data.old_book_point_goal,
          // 		period.number
          // 	)
          // ),
          // monthly_bbt_amount_goal_roll_up: getArrToString(
          // 	adjustExistingGoal(
          // 		result.monthly_bbt_amount_goal_roll_up,
          // 		bbt_amount_goal,
          // 		existing_data.old_bbt_amount_goal,
          // 		period.number
          // 	)
          // ),
          // monthly_group_amount_goal_roll_up: getArrToString(
          // 	adjustExistingGoal(
          // 		result.monthly_group_amount_goal_roll_up,
          // 		group_amount_goal,
          // 		existing_data.old_group_amount_goal,
          // 		period.number
          // 	)
          // ),
          monthly_book_points_goal_total: getArrToString(
            adjustExistingGoal(
              result.monthly_book_points_goal_total,
              book_point_goal,
              existing_data.old_book_point_goal,
              period.number
            )
          ),
          monthly_bbt_amount_goal_total: getArrToString(
            adjustExistingGoal(
              result.monthly_bbt_amount_goal_total,
              bbt_amount_goal,
              existing_data.old_bbt_amount_goal,
              period.number
            )
          ),
          monthly_group_amount_goal_total: getArrToString(
            adjustExistingGoal(
              result.monthly_group_amount_goal_total,
              group_amount_goal,
              existing_data.old_group_amount_goal,
              period.number
            )
          ),
          annual_book_points_goal: getArrayValueSum(book_point_goal),
          annual_bbt_amount_goal: getArrayValueSum(bbt_amount_goal),
          annual_group_amount_goal: getArrayValueSum(group_amount_goal),
          annual_book_points_goal_roll_up: getArrayValueSum(
            adjustExistingGoal(
              result.monthly_book_points_goal_roll_up,
              book_point_goal,
              existing_data.old_book_point_goal,
              period.number
            )
          ),
          annual_bbt_amount_goal_roll_up: getArrayValueSum(
            adjustExistingGoal(
              result.monthly_bbt_amount_goal_roll_up,
              bbt_amount_goal,
              existing_data.old_bbt_amount_goal,
              period.number
            )
          ),
          annual_group_amount_goal_roll_up: getArrayValueSum(
            adjustExistingGoal(
              result.monthly_group_amount_goal_roll_up,
              group_amount_goal,
              existing_data.old_group_amount_goal,
              period.number
            )
          ),
          annual_book_points_goal_total: getArrayValueSum(
            adjustExistingGoal(
              result.monthly_book_points_goal_total,
              book_point_goal,
              existing_data.old_book_point_goal,
              period.number
            )
          ),
          annual_bbt_amount_goal_total: getArrayValueSum(
            adjustExistingGoal(
              result.monthly_bbt_amount_goal_total,
              bbt_amount_goal,
              existing_data.old_bbt_amount_goal,
              period.number
            )
          ),
          annual_group_amount_goal_total: getArrayValueSum(
            adjustExistingGoal(
              result.monthly_group_amount_goal_total,
              group_amount_goal,
              existing_data.old_group_amount_goal,
              period.number
            )
          ),
        };
      }
      goal = {
        ...goal,
        last_modified_by_id: goalData.created_by_id,
        organization_id: goalData.organization_id,
      };
      if (
        typeof goalData.distributor_id !== "undefined" &&
        goalData.distributor_id > 0
      ) {
        goal = { ...goal, distributor_id: goalData.distributor_id };
      }
      await BusinessPlanSummary.update(goal, { where: { id: id } });
      const getParent = await Group.findOne({
        where: { id: goalData.group_id },
      });
      if (
        typeof getParent.parent_group !== "undefined" &&
        getParent.parent_group !== null
      ) {
        rollupGoals(
          {
            group_id: getParent.parent_group,
            year: goalData.year.toString(),
            distributor_id: goalData.distributor_id,
            number: period.number,
            type: period.type,
            created_by_id: goalData.created_by_id,
            last_modified_by_id: goalData.created_by_id,
            organization_id: goalData.organization_id,
          },
          {
            book_point_goal,
            bbt_amount_goal,
            group_amount_goal,
          },
          existing_data
        );
      }
    });
  }
  return res.send("Done");
});

// RollUp GoalSetting
roleUpGoalSetting = async (group_id, goalData, formattedGoalData) => {
  let year = goalData.year.toString();
  const goalSettingData = formattedGoalData.goalSettingData;
  const goalSettingRequestData = formattedGoalData.goalSettingRequestData;

  const goalRollUpData = await BusinessPlanSummary.findOne({
    where: { group_id, year },
  })
    .then((result) => {
      let goalRollUp;
      if (result) {
        let parent_annual_book_points_goal = isNaN(
          result.annual_book_points_goal
        )
          ? moneyToNumber(result.annual_book_points_goal)
          : result.annual_book_points_goal;
        let parent_annual_bbt_amount_goal = isNaN(result.annual_bbt_amount_goal)
          ? moneyToNumber(result.annual_bbt_amount_goal)
          : result.annual_bbt_amount_goal;
        let parent_annual_group_amount_goal = isNaN(
          result.annual_group_amount_goal
        )
          ? moneyToNumber(result.annual_group_amount_goal)
          : result.annual_group_amount_goal;

        // Book Points
        if (
          goalSettingData.annual_book_points_goal >
          goalSettingRequestData.annual_book_points_goal
        ) {
          var book_points =
            goalSettingData.annual_book_points_goal -
            goalSettingRequestData.annual_book_points_goal;
          parent_annual_book_points_goal =
            parent_annual_book_points_goal + book_points;
        } else if (
          goalSettingData.annual_book_points_goal <
          goalSettingRequestData.annual_book_points_goal
        ) {
          var book_points =
            goalSettingRequestData.annual_book_points_goal -
            goalSettingData.annual_book_points_goal;
          parent_annual_book_points_goal =
            parent_annual_book_points_goal - book_points;
        }

        // BBT Amount
        if (
          goalSettingData.annual_bbt_amount_goal >
          goalSettingRequestData.annual_bbt_amount_goal
        ) {
          var bbt_amount =
            goalSettingData.annual_bbt_amount_goal -
            goalSettingRequestData.annual_bbt_amount_goal;
          parent_annual_bbt_amount_goal =
            parent_annual_bbt_amount_goal + bbt_amount;
        } else if (
          goalSettingData.annual_book_points_goal <
          goalSettingRequestData.annual_book_points_goal
        ) {
          var bbt_amount =
            goalSettingRequestData.annual_bbt_amount_goal -
            goalSettingData.annual_bbt_amount_goal;
          parent_annual_bbt_amount_goal =
            parent_annual_bbt_amount_goal - bbt_amount;
        }

        // Group Amount
        if (
          goalSettingData.annual_group_amount_goal >
          goalSettingRequestData.annual_group_amount_goal
        ) {
          var group_amount =
            goalSettingData.annual_group_amount_goal -
            goalSettingRequestData.annual_group_amount_goal;
          parent_annual_group_amount_goal =
            parent_annual_group_amount_goal + group_amount;
        } else if (
          goalSettingData.annual_group_amount_goal <
          goalSettingRequestData.annual_group_amount_goal
        ) {
          var group_amount =
            goalSettingRequestData.annual_group_amount_goal -
            goalSettingData.annual_group_amount_goal;
          parent_annual_group_amount_goal =
            parent_annual_book_points_goal - group_amount;
        }
        goalRollUp = {
          id: result.id,
          last_modified_by_id: goalData.last_modified_by_id,
          annual_book_points_goal: parent_annual_book_points_goal,
          annual_bbt_amount_goal: parent_annual_bbt_amount_goal,
          annual_group_amount_goal: parent_annual_group_amount_goal,
        };
      }
      return goalRollUp;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
  if (!goalRollUpData) {
    console.log("False1");
    return false;
  }
  let rollupResponse;
  const goal_id = goalRollUpData.id;
  delete goalRollUpData.id;
  // Update roll-up for parent group
  rollupResponse = await BusinessPlanSummary.update(goalRollUpData, {
    where: { id: goal_id },
  })
    .then(async (result) => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });

  if (!rollupResponse) {
    console.log("False2");
    return false;
  }

  // Looking for the parent group of the current group
  const finalResponse = await Group.findOne({ where: { id: group_id } })
    .then((result) => {
      if (result.parent_group) {
        return roleUpGoalSetting(
          result.parent_group,
          goalData,
          formattedGoalData
        );
      } else {
        return true;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });

  return finalResponse;
};

router.get("/all-goal/:id", async function (req, res) {
  const { id } = req.params;
  BusinessPlanSummary.findOne({ where: { id: id } })
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ success: 0 });
      }
    })
    .catch((err) => {
      res.status(503).send({ error: err.original });
    });
});

router.post("/upload/avatar", function (req, res) {
  const upload = multer({ storage: storage, fileFilter: imageFilter }).single(
    "avatar"
  );
  upload(req, res, function (err) {
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }
    // Display uploaded image for user validation
    res.send(`You have uploaded this image: ${req.file.path}`);
  });
});

router.post("/upload/photos", function (req, res) {
  let upload = multer({
    storage: storage,
    fileFilter: imageFilter,
  }).array("multiple_images", 10);

  upload(req, res, function (err) {
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.files) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send({ multer: err });
    } else if (err) {
      return res.send(err);
    }

    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
      result += `"${files[index].path}`;
    }
    res.send(result);
  });
});

router.get("/default-group/:member_id", function (req, res) {
  const { member_id } = req.params;
  People.findOne({ where: { id: member_id } }).then((result) => {
    if (result) {
      let default_group = result.default_group;
      Group.findAll({
        attributes: [
          "id",
          "name",
          "book_distribution_reporting_level",
          "group_type",
          "sankirtan_group_type",
          "favorite_books",
        ],
        where: {
          id: default_group,
        },
      })
        .then((groupRes) => {
          res.status(200).send(groupRes);
        })
        .catch((err) => {
          res.status(404).send({ success: 0 });
        });
    } else {
      GroupMember.findAll({
        where: {
          people: member_id,
        },
      })
        .then((result) => {
          if (result) {
            let group_ids = [];
            result.map((rslt) => {
              group_ids.push(rslt.group);
            });
            Group.findAll({
              attributes: [
                "id",
                "name",
                "book_distribution_reporting_level",
                "group_type",
                "sankirtan_group_type",
                "favorite_books",
              ],
              where: {
                group_type: "Temple",
                id: { [Sq.Op.in]: group_ids },
              },
            })
              .then((groupRes) => {
                res.status(200).send(groupRes);
              })
              .catch((err) => {
                res.status(404).send({ success: 0 });
              });
          } else {
            res.status(404).send({ success: 0 });
          }
        })
        .catch((err) => {
          res.send({ error: err.original });
        });
    }
  });
});

router.get("/group-by-member-id/:member_id", function (req, res) {
  const { member_id } = req.params;
  GroupMember.findAll({
    where: {
      people: member_id,
    },
  })
    .then((result) => {
      if (result) {
        let group_ids = [];
        result.map((rslt) => {
          group_ids.push(rslt.group);
        });
        Group.findAll({
          attributes: [
            "id",
            "name",
            "book_distribution_reporting_level",
            "group_type",
            "sankirtan_group_type",
            "favorite_books",
          ],
          where: {
            group_type: "Temple",
            parent_group: {
              [Sq.Op.ne]: null,
            },
            id: { [Sq.Op.in]: group_ids },
          },
        })
          .then((groupRes) => {
            res.status(200).send(groupRes);
          })
          .catch((err) => {
            res.status(404).send({ success: 0 });
          });
      } else {
        res.status(404).send({ success: 0 });
      }
    })
    .catch((err) => {
      res.send({ error: err.original });
    });
});
// Get favorite books of a particular group
router.get("/group-fav-books", function (req, res) {
  let { book_ids } = req.query;
  Item.findAll({
    attributes: ["id", "name", "cover", "status"],
    where: {
      id: { [Sq.Op.in]: JSON.parse(book_ids) },
    },
  })
    .then((result) => {
     // console.log('res', result);
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ success: 0 });
      }
    })
    .catch((err) => {
      res.status(503).send({ error: err.original });
    });
});

// Search Group
router.get("/search-people", function (req, res) {
  const { q } = req.query;
  People.findAll({
    attributes: ["id", "firstname", "lastname"],
    where: {
      [Sq.Op.or]: {
        firstname: { [Sq.Op.iLike]: `%${q}%` },
        lastname: { [Sq.Op.iLike]: `%${q}%` },
      },
    },
  })
    .then((result) => {
      if (result) {
        let peoples = [];
        result.map((rlt) => {
          peoples.push({
            id: rlt.id,
            name: [rlt.firstname, rlt.lastname].join(" "),
          });
        });
        res.status(200).send(peoples);
      } else {
        res.status(404).send({ success: 0 });
      }
    })
    .catch((err) => {
      res.send({ error: err.original });
    });
});

// Manage Book Distribution
router.get("/book-distribution", function (req, res) {
  const { filter_data, page, limit, sort, order, search } = req.query;
  const query_filter = JSON.parse(filter_data);
  let _where = {};
  if (
    typeof query_filter.start !== "undefined" &&
    query_filter.start !== "" &&
    typeof query_filter.end !== "undefined" &&
    query_filter.end !== ""
  ) {
    _where = {
      ..._where,
      date: {
        [Sq.Op.between]: [query_filter.start, query_filter.end],
      },
    };
  }
  if (
    typeof query_filter.group_id !== "undefined" &&
    query_filter.group_id > 0
  ) {
    _where = { ..._where, transaction_group_id: query_filter.group_id };
  }
  let _people_where = {};
  if (
    typeof query_filter.distributor_id !== "undefined" &&
    query_filter.distributor_id > 0
  ) {
    _people_where = { distributor_id: query_filter.distributor_id };
  }
  /* not working for people and book name together, will filter at end 
	let _book_where = {};
	if (
		typeof search !== 'undefined' &&
		search !=null && search.trim().length > 0
	) {
		_book_where = {
			[Sq.Op.or]: {
				name: { [Sq.Op.iLike]: `%${search}%` } ,
				}
		}
		_people_where = {
			[Sq.Op.or]: {
				firstname: { [Sq.Op.iLike]: `%${search}%` } ,
				}
		}
	}
	Transaction.findAndCountAll({ where: _where })
		.then((total) => {

			if(search !== 'null'){
				_where = {
					where:{
						[Sq.Op.or]: {
							transaction_book_points: { [Sq.Op.iLike]: `%${search}%` },
							transaction_amount: { [Sq.Op.iLike]: `%${search}%` },
						}
					}
				}
				Transaction.findAll({
					include: [
						{
							model: TransactionLineItem,
							attributes: ['id', 'item_id', 'quantity', 'price'],
							include: [
								{
									model: Item,
									where:_book_where,
									attributes: ['name', 'item_type', 'media_type', 'cover'],
								},
							],
						},
						{
							model: TransactionPeople,
							attributes: ['id', 'transaction_id', 'distributor_id'],
							include: [
								{
									model: People,
//not working with this									where:_people_where,
									attributes: [
										'preferred_name',
										'firstname',
										'middle_name',
										'lastname',
										'email',
									],
								},
							],
						},
						{
							model: Group,
							attributes: ['id', 'name'],
						},
					],
					where: _where,
					order: [[sort, order]],
					offset: (page - 1) * limit,
					limit,
				})
				.then((result) => {
					if (result) {
						console.log("result...",result);
						res.status(200).send({ count: total.count, rows: result });
					} else {
						res.status(404).send({ success: 0 });
			}
				})
				.catch((err) => {
					res.send({ error: err.original });
				});
			} else {
*/
  Transaction.findAll({
    include: [
      {
        model: TransactionLineItem,
        attributes: ["id", "item_id", "quantity", "price"],
        include: [
          {
            model: Item,
            attributes: ["name", "item_type", "media_type", "cover"],
          },
        ],
      },
      {
        model: TransactionPeople,
        where: _people_where,
        attributes: ["id", "transaction_id", "distributor_id"],
        include: [
          {
            model: People,
            attributes: [
              "preferred_name",
              "firstname",
              "middle_name",
              "lastname",
              "email",
            ],
          },
        ],
      },
      {
        model: Group,
        attributes: ["id", "name"],
      },
    ],
    where: _where,
  })
    .then((result) => {
      if (result) {
        // adding bookname and groupname to result as direct properties
        result = result.map(function (x) {
          x.dataValues.title = null;
          x.dataValues.group_name = null;
          let data = x.dataValues;
          let lineItem = null;
          if (
            data.transaction_line_items != null &&
            data.transaction_line_items.length > 0 &&
            data.transaction_line_items[0].dataValues.item
          ) {
            lineItem =
              data.transaction_line_items[0].dataValues.item.dataValues;
            x.dataValues.title = lineItem.name;
          }
          let group = null;
          if (data.group != null) {
            group = data.group.dataValues;
            x.dataValues.group_name = group.name;
          }
          return x;
        });
        // filtering now
        if (search !== "null") {
          result = result.filter(function (data) {
            let ok =
              (data != null &&
                data.transaction_book_points != null &&
                data.transaction_book_points.toString().includes(search)) ||
              (data != null &&
                data.people_first_name != null &&
                data.people_first_name
                  .toLowerCase()
                  .includes(search.toLowerCase())) ||
              (data != null &&
                data.dataValues.title != null &&
                data.dataValues.title
                  .toLowerCase()
                  .includes(search.toLowerCase())) ||
              (data != null &&
                data.dataValues.group_name != null &&
                data.dataValues.group_name
                  .toLowerCase()
                  .includes(search.toLowerCase()));
            return ok;
          });
        }
        let totalcount = result.length;
        //sorting tbd
        if (sort) {
          result = result.sort(dynamicSort(sort, order));
        }
        let offset = (page - 1) * limit;
        let retresult = result.slice(
          offset,
          Math.min(result.length, Number(offset) + Number(limit))
        );
        //console.log("sorted result count = ",result.length, offset, limit, retresult.length);
        res.status(200).send({ count: totalcount, rows: retresult });
      } else {
        //console.log("ERROR NO result count = ");
        res.status(200).send({ count: 0, rows: [] });
      }
    })
    .catch((err) => {
      res.send({ error: err.original });
    });
  /*
		})
		.catch((err) => {
			res.send({ error: err.original });
		});
				*/
});

function dynamicSort(property, order = "asc", flag) {
  var sortOrder = 1;
  if (order == "desc") {
    sortOrder = -1;
  }
  return function (a, b) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    var result =
      a.dataValues[property] < b.dataValues[property]
        ? -1
        : a.dataValues[property] > b.dataValues[property]
        ? 1
        : 0;
    return result * sortOrder;
  };
}

router.get("/book-distribution/:id", function (req, res) {
  const { id } = req.params;
  Transaction.findOne({
    where: { id: id },

    include: [
      {
        model: TransactionLineItem,
        attributes: ["id", "item_id", "quantity", "price"],
        include: [
          {
            model: Item,
            attributes: ["name", "item_type", "media_type", "cover"],
          },
        ],
      },
      {
        model: TransactionPeople,
        attributes: ["id", "transaction_id", "distributor_id"],
        include: [
          {
            model: People,
            attributes: [
              "preferred_name",
              "firstname",
              "middle_name",
              "lastname",
              "email",
            ],
          },
        ],
      },
    ],
  })
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ success: 0 });
      }
    })
    .catch((err) => {
      res.send({ error: err.original });
    });
});

router.post("/book-distribution", function (req, res) {
  // console.log('akakak', req.body.)
  const upload = multer({ storage: storage, fileFilter: imageFilter }).array(
    "photos",
    12
  );
  upload(req, res, function (err) {
    if (err) {
      console.log("Error:", err);
    }
    let itemData = JSON.parse(req.body.formFields);
    const transaction_book_points_arr = itemData.bbt_point.map(
      (point, indx) => point * +itemData.quantity[indx]
    );
    const userId = JSON.parse(req.body.userId);
    const transaction_amount = getArrayValueSum(itemData.amount);
    const transaction_book_points = getArrayValueSum(
      transaction_book_points_arr
    );
    itemData = {
      ...itemData,
      transaction_amount,
      transaction_book_points,
      created_by_id: userId,
      last_modified_by_id: userId,
    };
    console.log('data sended', itemData)
    if (typeof req.files !== "undefined") {
      if (req.fileValidationError) {
        return res.send({ success: 0, error: req.fileValidationError });
      } else if (err instanceof multer.MulterError) {
        return res.send({ success: 0, error: err });
      } else if (err) {
        return res.send({ success: 0, error: err });
      }
      let photos = "{";
      req.files.map((file, key) => {
        if (key !== 0) {
          photos += ",";
        }
        photos += file.path;
      });
      photos += "}";
      itemData = { ...itemData, photos: photos };
    }
    Transaction.create(itemData)
    .then((result) => {
      if (result) {
        const transaction_id = result.id;
        // Add People
        let people = {
          firstname: itemData.people_firstname,
          lastname: itemData.people_lastname,
          email: itemData.people_email,
          created_by_id: result.created_by_id,
          last_modified_by_id: result.last_modified_by_id,
          organization_id: result.organization_id,
        };
        if (typeof itemData.people_mobile !== "undefined") {
          people = {
            ...people,
            mobile: itemData.people_mobile,
            phone: itemData.people_mobile,
          };
        }

        if (typeof itemData.people_gender !== "undefined") {
          people = { ...people, gender: itemData.people_gender };
        }
        addPeopleAndUpdateDistributor(people, transaction_id);

        // Add or Update Transaction Line Items
        if (itemData.item.length) {
          const organization_id = result.organization_id;
          itemData.item.map((itm, row) => {
            if (+itemData.quantity[row] > 0) {
              addUpdateTransactionLineItem(
                {
                  transaction_id,
                  item_id: itm,
                  quantity: itemData.quantity[row],
                  price: itemData.amount[row],
                  transaction_book_points: itemData.bbt_point[row],
                  organization_id,
                },
                { transaction_id, item_id: itm }
              );
            }
          });
        }
        // Add or Update Transaction Peoples
        if (
          typeof itemData.distributor_ids !== "undefined" &&
          itemData.distributor_ids.length
        ) {
          itemData.distributor_ids.map((distributor_id) => {
            addUpdateTransactionPeople(
              {
                transaction_id,
                distributor_id,
              },
              { transaction_id, distributor_id }
            );
          });
        }
        res.status(200).send(result);
      } else {
        res.status(404).send({ success: 0 });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(503).send({ error: err.original });
    });
  });
});

router.patch("/book-distribution/:id", async function (req, res) {
  const { id } = req.params;
  const upload = multer({ storage: storage, fileFilter: imageFilter }).array(
    "photos",
    12
  );
  upload(req, res, function (err) {
    if (err) {
      console.log("Error:", err);
    }
    let itemData = JSON.parse(req.body.formFields);
    const transaction_book_points_arr = itemData.bbt_point.map(
      (point, indx) => point * +itemData.quantity[indx]
    );
    const userId = JSON.parse(req.body.userId);
    const transaction_amount = getArrayValueSum(itemData.amount);
    const transaction_book_points = getArrayValueSum(
      transaction_book_points_arr
    );
    itemData = {
      ...itemData,
      transaction_amount,
      transaction_book_points,
      created_by_id: userId,
      last_modified_by_id: userId,
    };
    if (typeof req.files !== "undefined" && req.files.length > 0) {
      if (req.fileValidationError) {
        return res.send({ success: 0, error: req.fileValidationError });
      } else if (err instanceof multer.MulterError) {
        return res.send({ success: 0, error: err });
      } else if (err) {
        return res.send({ success: 0, error: err });
      }
      let photos = "{";
      req.files.map((file, key) => {
        if (key !== 0) {
          photos += ",";
        }
        photos += file.path;
      });
      photos += "}";
      itemData = { ...itemData, photos: photos };
    }
    Transaction.update(itemData, { where: { id: id } })
      .then((result) => {
        if (result) {
          const transaction_id = id;
          // Add People
          let people = {
            firstname: itemData.people_firstname,
            lastname: itemData.people_lastname,
            email: itemData.people_email,
            created_by_id: result.created_by_id,
            last_modified_by_id: result.last_modified_by_id,
            organization_id: result.organization_id,
          };
          if (typeof itemData.people_mobile !== "undefined") {
            people = {
              ...people,
              mobile: itemData.people_mobile,
              phone: itemData.people_mobile,
            };
          }

          if (typeof itemData.people_gender !== "undefined") {
            people = { ...people, gender: itemData.people_gender };
          }
          addPeopleAndUpdateDistributor(people, transaction_id);
          if (
            typeof itemData.old_add_books !== "undefined" &&
            itemData.old_add_books.length > 0
          ) {
            itemData.old_add_books.map((book_id) => {
              if (!itemData.item.includes(book_id)) {
                removeTransactionLineItem(book_id, transaction_id);
              }
            });
          }

          if (
            typeof itemData.old_distributor_ids !== "undefined" &&
            itemData.old_distributor_ids.length > 0
          ) {
            itemData.old_distributor_ids.map((dist_id) => {
              if (!itemData.distributor_ids.includes(dist_id)) {
                removeTransactionPeople(dist_id, transaction_id);
              }
            });
          }

          // Add or Update Transaction Line Items
          if (itemData.item.length) {
            const organization_id = result.organization_id;
            itemData.item.map((itm, row) => {
              if (+itemData.quantity[row] > 0) {
                addUpdateTransactionLineItem(
                  {
                    transaction_id,
                    item_id: itm,
                    quantity: itemData.quantity[row],
                    price: itemData.amount[row],
                    transaction_book_points: itemData.bbt_point[row],
                    organization_id,
                  },
                  { transaction_id, item_id: itm }
                );
              }
            });
          }
          // Add or Update Transaction Peoples
          if (
            typeof itemData.distributor_ids !== "undefined" &&
            itemData.distributor_ids.length
          ) {
            itemData.distributor_ids.map((distributor_id) => {
              addUpdateTransactionPeople(
                {
                  transaction_id,
                  distributor_id,
                },
                { transaction_id, distributor_id }
              );
            });
          }
          res.status(200).send(result);
        } else {
          res.status(404).send({ success: 0 });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(503).send({ error: err.original });
      });
  });
});

router.delete("/book-distribution/:id", async function (req, res) {
  const { id } = req.params;
  await TransactionLineItem.destroy({ where: { transaction_id: id } })
    .then((result) => result)
    .catch((error) => {
      console.log(error);
    });
  await TransactionPeople.destroy({ where: { transaction_id: id } })
    .then((result) => result)
    .catch((error) => {
      console.log(error);
    });
  Transaction.destroy({ where: { id: id } })
    .then((result) => {
      res
        .status(200)
        .send({ message: "Book distribution deleted successfully!" });
    })
    .catch((err) => {
      res.send({ error: err.original });
    });
});

addPeopleAndUpdateDistributor = (people, transaction_id) => {
  People.findOne({ where: { email: people.email } }).then((result) => {
    if (result) {
      const distributor_id = result.id;
      People.update(people, { where: { id: distributor_id } });
      // addUpdateTransactionPeople(
      // 	{ transaction_id, distributor_id },
      // 	{ transaction_id, distributor_id }
      // );
    } else {
      People.create(people)
        .then((result) => {
          if (result) {
            const distributor_id = result.id;
            // addUpdateTransactionPeople(
            // 	{ transaction_id, distributor_id },
            // 	{ transaction_id, distributor_id }
            // );
          }
        })
        .catch((err) => {
          console.log("Error: ", err);
        });
    }
  });
};

addUpdateTransactionLineItem = (value, condition) => {
  TransactionLineItem.findOne({ where: condition }).then((result) => {
    if (result) {
      TransactionLineItem.update(value, { where: { id: result.id } });
    } else {
      TransactionLineItem.create(value);
    }
  });
};

addUpdateTransactionPeople = (value, condition) => {
  TransactionPeople.findOne({ where: condition }).then((result) => {
    if (result) {
      console.log("Already Exists");
      // TransactionLineItem.update(value, { where: condition });
    } else {
      TransactionPeople.create(value);
    }
  });
};

removeTransactionLineItem = (book_id, transaction_id) => {
  TransactionLineItem.destroy({ where: { transaction_id, item_id: book_id } });
};

removeTransactionPeople = (dist_id, transaction_id) => {
  TransactionPeople.destroy({
    where: { transaction_id, distributor_id: dist_id },
  });
};
// End Manage Book Distribution

//  CSV Import Book Distribution
validateRow = async (file_path) => {
  const field_rules = {
    Date: {
      required: true,
    },
    Group: {
      required: true,
    },
    "First Name": {
      required: true,
    },
    "Last Name": {
      required: true,
    },
    "Email Address": {
      required: true,
    },
    "Address Type": {
      is_null: true,
    },
    "Community Type": {
      is_null: true,
    },
    Coverage: {
      is_null: true,
    },
  };
  return new Promise(function (resolve, reject) {
    const bulk_data = [];
    fs.createReadStream(file_path)
      .pipe(csv())
      .on("data", (row) => {
        for (let field in field_rules) {
          const value = row[field];
          if (field_rules[field].required) {
            if (value == null || value.trim() === "") {
              resolve({
                success: 0,
                message: "The field " + field + " is required.",
              });
            }
          }
          if (
            typeof field_rules[field].email !== "undefined" &&
            field_rules[field].email
          ) {
            const is_email = value.match(
              /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
            );
            if (!is_email) {
              resolve({
                success: 0,
                message: "The field " + field + " should be an email.",
              });
            }
          }
          if (field_rules[field].is_null) {
            if (value == null || value.trim() === "") {
              delete row[field];
            }
          }
        }
        bulk_data.push(row);
      })
      .on("end", () => {
        resolve({ success: 1, bulk_data });
      });
  });
};

// this ideally should be setup as a cron job
//reads pending files from batch_upload, generates an error csv file with invalid records and inserts the cporrect records
router.get("/import-book-distribution", function (req, res) {
  const csv_fields_map = {
    Date: "date",
    Quantity: "quantity",
    Amount: "amount",
    Books: "item",
    "Email Address": "people_email",
    "First Name": "people_first_name",
    "Last Name": "people_last_name",
    Mobile: "people_mobile",
    Gender: "people_gender",
    Group: "transaction_group_id",
    Distributors: "distributor_ids",
    "Location Name": "location_name",
    Address: "location_address",
    City: "location_city",
    State: "location_state",
    Zip: "location_zip",
    Country: "location_country",
    "Address Type": "location_address_type",
    "Community Type": "location_community_type",
    Coverage: "location_coverage",
    Comment: "comments",
    GNAB: "gnab",
  };
  const csvData = [];
  var csvHeader = [
    { id: "date", title: "Date" },
    { id: "quantity", title: "Quantity" },
    { id: "amount", title: "Amount" },
    { id: "item", title: "Books" },
    { id: "people_email", title: "Email Address" },
    { id: "people_first_name", title: "First Name" },
    { id: "people_last_name", title: "Last Name" },
    { id: "people_mobile", title: "Mobile" },
    { id: "people_gender", title: "Gender" },
    { id: "transaction_group_id", title: "Group" },
    { id: "distributor_ids", title: "Distributors" },
    { id: "location_name", title: "Location Name" },
    { id: "location_address", title: "Address" },
    { id: "location_city", title: "City" },
    { id: "location_state", title: "State" },
    { id: "location_zip", title: "Zip" },
    { id: "location_country", title: "Country" },
    { id: "location_address_type", title: "Address Type" },
    { id: "location_community_type", title: "Community Type" },
    { id: "location_coverage", title: "Coverage" },
    { id: "comments", title: "Comment" },
    { id: "gnab", title: "GNAB" },
    { id: "error", title: "error" },
  ];
  var csvFaildData = [];
  var csvSuccessData = [];
  var uploadBatchData = {};
  var batch_id = null;
  uploadBatchData.start_time = getCurrentDateTime();
  UploadBatch.findAll({
    where: {
      status: "Pending",
    },
  }).then(async (uploadedBatch) => {
    Item.findAll().then((books) => {
      uploadedBatch.map(async (batchData, batchindex) => {
        // output_filename is the unique filename generated for input csv file
        try {
          let path = `public/CSV/${batchData.output_filename}`;
          if (fs.existsSync(path)) {
            const is_valid = await validateRow(path);
            if (is_valid.success) {
              uploadBatchData.total_records = is_valid.bulk_data.length;

              is_valid.bulk_data.map(async (data, index) => {
                let row = {};
                for (let key in data) {
                  row[csv_fields_map[key]] = data[key];
                }
                row.item = row.item.replace(/,]/g, "]");
                row.quantity = row.quantity.replace(/,]/g, "]");
                row.amount = row.amount.replace(/,]/g, "]");
                row.distributor_ids = row.distributor_ids.replace(/,]/g, "]");
                const item = JSON.parse(row.item);
                const distributors = JSON.parse(row.distributor_ids);
                const quantity = JSON.parse(row.quantity);
                const amount = JSON.parse(row.amount);
                let transaction_book_point = [];
                let isValidBookId = true;
                if (item.length > 0) {
                  item.map((item_id, indx) => {
                    let bookCount = this.getBBTPoints(item_id, books);
                    if (bookCount == -1) {
                      // -1 if no book id
                      isValidBookId = false;
                    } else {
                      bookCount = bookCount * +quantity[indx];
                      transaction_book_point.push(bookCount);
                    }
                  });
                }
                const fieldsToAppend = this.fieldsToAppend(
                  JSON.parse(batchData.user_info)
                );
                const itemData = {
                  ...row,
                  ...fieldsToAppend,
                  transaction_book_points: this.getArrayValueSum(
                    transaction_book_point
                  ),
                  transaction_amount: this.getArrayValueSum(amount),
                  batch_id: batchData.batch_id,
                };

                var emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                var phoneReg = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/;
                var quantityReg = /^\[\d+(?:,\d+)*]$/;
                var onlyNumberValue = /^\d+$/;
                var checkPercent = /[0-9]*\.?[0-9]+%/;

                var bulk_error = [];
                var isVaildRecord = true;
                if (!emailReg.test(itemData.people_email)) {
                  let tr_error = "Invalid Email";
                  bulk_error.push(tr_error);
                  isVaildRecord = false;
                }

                if (!checkPercent.test(itemData.location_coverage)) {
                  let tr_error = "Invalid Coverage";
                  bulk_error.push(tr_error);
                  isVaildRecord = false;
                }

                let totalBooks = item.length;
                if (
                  totalBooks != quantity.length ||
                  totalBooks != amount.length
                ) {
                  let tr_error =
                    "Books, Quantity and Amount Fields should be correspondence";
                  bulk_error.push(tr_error);
                  isVaildRecord = false;
                }

                if (itemData.transaction_group_id == 1) {
                  let tr_error =
                    "You can't choose Group ID(1) because this is a global group";
                  bulk_error.push(tr_error);
                  isVaildRecord = false;
                } else if (itemData.transaction_group_id != 1) {
                  await Group.findOne({
                    where: { id: itemData.transaction_group_id },
                  })
                    .then((groupId) => {
                      //console.log("groupId===",groupId);
                      if (groupId == null || groupId == "") {
                        let tr_error = `Invalid group id ${itemData.transaction_group_id}`;
                        bulk_error.push(tr_error);
                        isVaildRecord = false;
                      }
                    })
                    .catch((error) => {
                      let tr_error = `Invalid group id ${itemData.transaction_group_id}`;
                      bulk_error.push(tr_error);
                      isVaildRecord = false;
                    });
                }

                await People.findAll({
                  where: {
                    id: {
                      [Sq.Op.in]: distributors,
                    },
                  },
                })
                  .then((distributor) => {
                    //console.log("distributor====",distributor.length);
                    if (
                      distributor.length == 0 ||
                      distributor.length != distributors.length
                    ) {
                      let tr_error = `Invalid Distributor ids `;
                      bulk_error.push(tr_error);
                      isVaildRecord = false;
                    }
                  })
                  .catch((error) => {
                    let tr_error = `Invalid Distributor id ${distributor_id}`;
                    bulk_error.push(tr_error);
                    isVaildRecord = false;
                  });

                if (!phoneReg.test(itemData.people_mobile)) {
                  let tr_error = "Invalid phone";
                  bulk_error.push(tr_error);
                  isVaildRecord = false;
                }

                if (!onlyNumberValue.test(itemData.location_zip)) {
                  let tr_error = "Invalid Zip code";
                  bulk_error.push(tr_error);
                  isVaildRecord = false;
                }

                if (!quantityReg.test(itemData.quantity)) {
                  let tr_error = "Invalid quantity";
                  bulk_error.push(tr_error);
                  isVaildRecord = false;
                }

                if (moment(itemData.date, "M/D/YYYY", true).isValid() == true) {
                  itemData.date = moment(itemData.date, "M/D/YYYY").format(
                    "YYYY-MM-DD"
                  );
                } else if (
                  moment(itemData.date, "M-D-YYYY", true).isValid() == true
                ) {
                  itemData.date = moment(itemData.date, "M-D-YYYY").format(
                    "YYYY-MM-DD"
                  );
                } else if (
                  moment(itemData.date, "D-M-YYYY", true).isValid() == true
                ) {
                  itemData.date = moment(itemData.date, "D-M-YYYY").format(
                    "YYYY-MM-DD"
                  );
                } else if (
                  moment(itemData.date, "D/M/YYYY", true).isValid() == true
                ) {
                  itemData.date = moment(itemData.date, "D/M/YYYY").format(
                    "YYYY-MM-DD"
                  );
                } else if (
                  moment(itemData.date, "YYYY/MM/DD", true).isValid() == true
                ) {
                  itemData.date = moment(itemData.date, "YYYY/MM/DD").format(
                    "YYYY-MM-DD"
                  );
                } else if (
                  moment(itemData.date, "YYYY-MM-DD", true).isValid() == true
                ) {
                  itemData.date = moment(itemData.date, "YYYY-MM-DD").format(
                    "YYYY-MM-DD"
                  );
                } else {
                  let tr_error = "Invalid Date";
                  bulk_error.push(tr_error);
                  isVaildRecord = false;
                }

                if (
                  itemData.people_first_name == null ||
                  itemData.people_first_name == ""
                ) {
                  let tr_error = "First is required";
                  bulk_error.push(tr_error);
                  isVaildRecord = false;
                }

                if (
                  itemData.people_email == null ||
                  itemData.people_email == ""
                ) {
                  let tr_error = "Email is required";
                  bulk_error.push(tr_error);
                  isVaildRecord = false;
                }

                let tr_item = itemData.item;
                if (
                  (tr_item.includes("[") && tr_item.includes("]")) == false ||
                  tr_item == "" ||
                  !isValidBookId
                ) {
                  let tr_error = "Invalid Book ID";
                  bulk_error.push(tr_error);
                  isVaildRecord = false;
                }
                let tr_quantity = itemData.quantity;

                if (
                  (tr_quantity.includes("[") && tr_quantity.includes("]")) ==
                    false ||
                  tr_quantity == ""
                ) {
                  let tr_error = "Invalid quantity";
                  bulk_error.push(tr_error);
                  isVaildRecord = false;
                }

                let tr_distributor_ids = itemData.distributor_ids;
                if (
                  (tr_distributor_ids.includes("[") &&
                    tr_distributor_ids.includes("]")) == false ||
                  tr_distributor_ids == ""
                ) {
                  let tr_error = "Invalid distributors";
                  bulk_error.push(tr_error);
                  isVaildRecord = false;
                }

                if (bulk_error && isVaildRecord == false) {
                  let csvErrors = "";
                  csvErrors = bulk_error.toString();
                  itemData.error = csvErrors;
                  csvFaildData.push(itemData);
                }

                // Add Transaction Here
                if (itemData.transaction_group_id > 1 && isVaildRecord) {
                  update_upload_batch(batchData.batch_id, "In Progress");
                  itemData.transasction_status = "Pending";
                  await Transaction.create(itemData)
                    .then(async (result) => {
                      if (result) {
                        csvSuccessData.push(itemData);
                        const transaction_id = result.id;
                        // Add People
                        let people = {
                          firstname: itemData.people_first_name,
                          lastname: itemData.people_last_name,
                          email: itemData.people_email,
                          created_by_id: result.created_by_id,
                          last_modified_by_id: result.last_modified_by_id,
                          organization_id: result.organization_id,
                        };
                        if (typeof itemData.people_mobile !== "undefined") {
                          people = {
                            ...people,
                            mobile: itemData.people_mobile,
                            phone: itemData.people_mobile,
                          };
                        }

                        if (typeof itemData.people_gender !== "undefined") {
                          people = {
                            ...people,
                            gender: itemData.people_gender,
                          };
                        }
                        if (people.organization_id != 1) {
                          this.addPeopleAndUpdateDistributor(
                            people,
                            transaction_id
                          );
                        }

                        // Add or Update Transaction Line Items
                        if (item.length > 0) {
                          const organization_id = result.organization_id;
                          item.map((item_id, key) => {
                            if (+quantity[key] > 0) {
                              // Add Transaction Line Item Here
                              this.addUpdateTransactionLineItem(
                                {
                                  transaction_id,
                                  item_id,
                                  quantity: quantity[key],
                                  price: amount[key],
                                  net_amount: quantity[key] * amount[key],
                                  transaction_book_points: this.getBBTPoints(
                                    item_id,
                                    books
                                  ),
                                  organization_id,
                                },
                                { transaction_id, item_id }
                              );
                            }
                          });
                        }
                        // Add or Update Transaction Peoples
                        const distributor_ids = JSON.parse(row.distributor_ids);
                        if (distributor_ids.length > 0) {
                          distributor_ids.map((distributor_id) => {
                            this.addUpdateTransactionPeople(
                              {
                                transaction_id,
                                distributor_id,
                              },
                              { transaction_id, distributor_id }
                            );
                          });
                        }
                      } else {
                        csvFaildData.push(itemData);
                      }
                    })
                    .catch((err) => {
                      //csvFaildData.push(itemData);
                      console.log("error", err);
                    });
                }
                if (uploadBatchData.total_records == index + 1) {
                  update_upload_batch(batchData.batch_id, "Completed");
                }
              });
            } else {
              update_upload_batch(
                batchData.batch_id,
                `Failed`,
                is_valid.message
              );
            }
          } //file exists
          else {
            update_upload_batch(batchData.batch_id, "File not found");
          }
        } catch (err) {
          console.error(err);
          update_upload_batch(batchData.batch_id, "File not found");
        }
      });
    });
  });
  const update_upload_batch = function (batch_id, status, errorMsg = null) {
    //console.log("forupdate==",batch_id,status,csvFaildData.length,csvSuccessData.length);

    if (uploadBatchData.total_records) {
      uploadBatchData.success_records =
        uploadBatchData.total_records - csvFaildData.length;
      uploadBatchData.failed_records = csvFaildData.length;
    } else {
      uploadBatchData.failed_records = null;
      uploadBatchData.success_records = null;
    }

    uploadBatchData.end_time = getCurrentDateTime();
    uploadBatchData.status = status;
    uploadBatchData.errormsg = errorMsg;
    if (batch_id != null) {
      UploadBatch.update(uploadBatchData, {
        where: { batch_id: batch_id },
      })
        .then(async (result) => {
          if (result) {
            if (csvFaildData && csvFaildData.length && status == "Completed") {
              let csvFailedFileWriter = createCsvWriter({
                path: `public/CSV/bulk-${batch_id}-result.csv`,
                header: csvHeader,
              });
              csvFailedFileWriter
                .writeRecords(csvFaildData)
                .then(() =>
                  console.log("The CSV file was written successfully")
                );
            }
            return true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  //to be uncommented when added to cron
  //	return res.send('cron run successfully done!');
});

router.get("/import-uploaded-batchs", function (req, res) {
  const { page, limit, id } = req.query;
  if (page && limit && id) {
    UploadBatch.findAll({
      order: [["batch_id", "DESC"]],
    })
      .then((result) => {
        var batchResult = [];
        result.map((batch) => {
          let user_info = JSON.parse(batch.user_info);
          if (id == user_info.user_id) {
            batchResult.push(batch);
          }
        });
        let offset = (page - 1) * limit;
        let retresult = batchResult.slice(
          offset,
          Math.min(batchResult.length, Number(offset) + Number(limit))
        );
        res.status(200).send({ count: batchResult.length, rows: retresult });
      })
      .catch((err) => {
        res.status(503).send({ error: err.original });
      });
  } else {
    res.status(404).send({ success: 0 });
  }
});

router.post("/bulk-book-distribution", function (req, res) {
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/CSV/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  const upload = multer({ storage: storage }).single("csv_file");
  upload(req, res, async function (err) {
    if (err) {
      console.log("bulk-book-distribution Error IN UPLOADING FILE:", err);
    }

    if (typeof req.file !== "undefined") {
      if (req.fileValidationError) {
        return res.send({ success: 0, error: req.fileValidationError });
      } else if (err instanceof multer.MulterError) {
        return res.send({ success: 0, error: err });
      } else if (err) {
        return res.send({ success: 0, error: err });
      }
    }
    const user_info = JSON.parse(req.body.user_info);
    //const books = JSON.parse(req.body.books);
    //console.log("books====",books);
    if (
      req.file.path != undefined &&
      req.file.filename != undefined &&
      req.file.originalname != undefined
    ) {
      var uploadBatchData = {};
      uploadBatchData.input_filename = Date.now() + "-" + req.file.originalname;
      uploadBatchData.output_filename = req.file.filename;
      uploadBatchData.batch_date = getCurrentDateTime();
      uploadBatchData.status = "Pending";
      uploadBatchData.user_info = JSON.stringify(user_info);
      UploadBatch.create(uploadBatchData).then(async (uploadbatchSuccess) => {
        if (uploadbatchSuccess) {
          res
            .status(200)
            .send({ success: 1, message: "CSV uploaded successfully!" });
        } else {
          res.status(404).send({ success: 0 });
        }
      });
    } else {
      res.status(404).send({ success: 0 });
    }
  });
});

formatCollection = (collectionData) => {
  let finalData = {};
  let success = 0;
  let laxmi_progress = 0;
  let point_progress = 0;
  if (collectionData.total_annual_book_points_goal !== null) {
    finalData = {
      ...finalData,
      total_annual_book_points_goal:
        collectionData.total_annual_book_points_goal,
    };
    success = 1;
  }
  if (collectionData.total_annual_bbt_amount_goal !== null) {
    finalData = {
      ...finalData,
      total_annual_bbt_amount_goal: collectionData.total_annual_bbt_amount_goal,
    };
    success = 1;
  }
  if (collectionData.total_annual_actual_book_points !== null) {
    finalData = {
      ...finalData,
      total_annual_actual_book_points:
        collectionData.total_annual_actual_book_points,
    };
    point_progress =
      typeof finalData.total_annual_book_points_goal === "undefined"
        ? 0
        : (collectionData.total_annual_actual_book_points * 100) /
          finalData.total_annual_book_points_goal;
    success = 1;
  }

  if (collectionData.total_annual_actual_bbt_amount !== null) {
    finalData = {
      ...finalData,
      total_annual_actual_bbt_amount:
        collectionData.total_annual_actual_bbt_amount,
    };
    success = 1;
    console.log(
      moneyToNumber(collectionData.total_annual_actual_bbt_amount),
      moneyToNumber(finalData.total_annual_bbt_amount_goal)
    );
    laxmi_progress =
      typeof finalData.total_annual_bbt_amount_goal === "undefined"
        ? 0
        : (moneyToNumber(collectionData.total_annual_actual_bbt_amount) * 100) /
          moneyToNumber(finalData.total_annual_bbt_amount_goal);
  }
  return {
    collection: {
      ...finalData,
      laxmi_progress: `${laxmi_progress}%`,
      point_progress: `${point_progress}%`,
    },
    success,
  };
};
router.get("/collection-by-param", async function (req, res) {
  let query_param = req.query;
  const is_dashboard = query_param.is_dashboard;
  delete query_param.is_dashboard;
  let collection_for = {
    name: "ISKCON Global",
    picture: "img/iskcon-global.png",
  };
  if (query_param.group_id && query_param.group_id === "iskconGlobal") {
    const group = await Group.findOne({ where: { parent_group: null } })
      .then((result) => result)
      .catch((error) => {
        console.log(error);
        return [];
      });
    query_param.group_id = group.id;
    // delete query_param.group_id;
  } else if (query_param.group_id) {
    const group = await Group.findOne({
      attributes: ["name", "picture_url"],
      where: { id: query_param.group_id },
    })
      .then((result) => result)
      .catch((error) => []);
    collection_for = {
      ...collection_for,
      name: group.name,
      picture:
        group.picture_url === null ? "img/group_icon.png" : group.picture_url,
    };
  } else if (query_param.distributor_id) {
    const people = await People.findOne({
      attributes: ["firstname", "lastname", "picture_url"],
      where: { id: query_param.distributor_id },
    })
      .then((result) => result)
      .catch((error) => []);
    collection_for = {
      ...collection_for,
      name: [people.firstname, people.lastname].join(" "),
      picture:
        people.picture_url === null ? "img/user_icons.png" : people.picture_url,
    };
  }
  let growth = {};
  if (JSON.parse(is_dashboard)) {
    const thisYearGrowth = await getDashboardGrowth(query_param);
    growth = {
      ...growth,
      thisYearGrowth: {
        year: parseInt(query_param.year),
        data: thisYearGrowth,
      },
    };
    const lastYear = parseInt(query_param.year) - 1;
    const lastYearGrowth = await getDashboardGrowth({
      ...query_param,
      year: lastYear.toString(),
    });
    growth = {
      ...growth,
      lastYearGrowth: {
        year: lastYear,
        data: lastYearGrowth,
      },
    };
  }
  BusinessPlanSummary.findAll({
    where: query_param,
    attributes: [
      [
        Sq.fn("sum", Sq.col("annual_book_points_goal_total")),
        "total_annual_book_points_goal",
      ],
      [
        Sq.fn("sum", Sq.col("annual_bbt_amount_goal_total")),
        "total_annual_bbt_amount_goal",
      ],
      [
        Sq.fn("sum", Sq.col("annual_actual_book_points_total")),
        "total_annual_actual_book_points",
      ],
      [
        Sq.fn("sum", Sq.col("annual_actual_bbt_amount_total")),
        "total_annual_actual_bbt_amount",
      ],
    ],
  })
    .then((result) => {
      if (result) {
        res.status(200).send({
          ...formatCollection(result[0].dataValues),
          collection_for,
          growth,
        });
      } else {
        res.status(400).send({ success: 0 });
      }
    })
    .catch((err) => {
      console.log("Error", err);
      res.status(503).send({ error: err.original });
    });
});

router.post("/old-bulk-book-distribution", function (req, res) {
  const csv_fields_map = {
    Date: "date",
    Quantity: "quantity",
    Amount: "amount",
    Books: "item",
    "Email Address": "people_email",
    "First Name": "people_first_name",
    "Last Name": "people_last_name",
    Mobile: "people_mobile",
    Gender: "people_gender",
    Group: "transaction_group_id",
    Distributors: "distributor_ids",
    "Location Name": "location_name",
    Address: "location_address",
    City: "location_city",
    State: "location_state",
    Zip: "location_zip",
    Country: "location_country",
    "Address Type": "location_address_type",
    "Community Type": "location_community_type",
    Coverage: "location_coverage",
    Status: "transasction_status",
    Comment: "comments",
    GNAB: "gnab",
  };
  const upload = multer({ dest: "tmp/csv/" }).single("csv_file");
  upload(req, res, async function (err) {
    if (err) {
      console.log("Error:", err);
    }

    if (typeof req.file !== "undefined") {
      if (req.fileValidationError) {
        return res.send({ success: 0, error: req.fileValidationError });
      } else if (err instanceof multer.MulterError) {
        return res.send({ success: 0, error: err });
      } else if (err) {
        return res.send({ success: 0, error: err });
      }
    }
    const user_info = JSON.parse(req.body.user_info);
    const books = JSON.parse(req.body.books);
    const is_valid = await validateRow(req.file.path);
    if (is_valid.success) {
      is_valid.bulk_data.map((data) => {
        let row = {};
        for (let key in data) {
          row[csv_fields_map[key]] = data[key];
        }
        const item = JSON.parse(row.item);
        const quantity = JSON.parse(row.quantity);
        const amount = JSON.parse(row.amount);
        let transaction_book_point = [];
        if (item.length > 0) {
          item.map((item_id) => {
            transaction_book_point.push(this.getBBTPoints(item_id, books));
          });
        }
        // getArrayValueSum
        const fieldsToAppend = this.fieldsToAppend(user_info);
        const itemData = {
          ...row,
          ...fieldsToAppend,
          transaction_book_points: this.getArrayValueSum(
            transaction_book_point
          ),
          transaction_amount: this.getArrayValueSum(amount),
        };
        // Add Transaction Here
        Transaction.create(itemData)
          .then((result) => {
            if (result) {
              const transaction_id = result.id;
              // Add People
              let people = {
                firstname: itemData.people_first_name,
                lastname: itemData.people_last_name,
                email: itemData.people_email,
                created_by_id: result.created_by_id,
                last_modified_by_id: result.last_modified_by_id,
                organization_id: result.organization_id,
              };
              if (typeof itemData.people_mobile !== "undefined") {
                people = {
                  ...people,
                  mobile: itemData.people_mobile,
                  phone: itemData.people_mobile,
                };
              }

              if (typeof itemData.people_gender !== "undefined") {
                people = { ...people, gender: itemData.people_gender };
              }
              this.addPeopleAndUpdateDistributor(people, transaction_id);

              // Add or Update Transaction Line Items
              if (item.length > 0) {
                const organization_id = result.organization_id;
                item.map((item_id, key) => {
                  if (+quantity[key] > 0) {
                    // Add Transaction Line Item Here
                    this.addUpdateTransactionLineItem(
                      {
                        transaction_id,
                        item_id,
                        quantity: quantity[key],
                        price: amount[key],
                        net_amount: quantity[key] * amount[key],
                        transaction_book_points: this.getBBTPoints(
                          item_id,
                          books
                        ),
                        organization_id,
                      },
                      { transaction_id, item_id }
                    );
                  }
                });
              }
              // Add or Update Transaction Peoples
              const distributor_ids = JSON.parse(row.distributor_ids);
              if (distributor_ids.length > 0) {
                distributor_ids.map((distributor_id) => {
                  this.addUpdateTransactionPeople(
                    {
                      transaction_id,
                      distributor_id,
                    },
                    { transaction_id, distributor_id }
                  );
                });
              }
            } else {
              res.status(404).send({ success: 0 });
            }
          })
          .catch((err) => {
            console.log(err);
            // res.status(503).send({ error: err.original });
          });
      });
      res
        .status(200)
        .send({ success: 1, message: "CSV imported successfully!" });
    } else {
      res.status(200).send(is_valid);
    }
  });
});

formatCollection = (collectionData) => {
  let finalData = {};
  let success = 0;
  let laxmi_progress = 0;
  let point_progress = 0;
  if (collectionData.total_annual_book_points_goal !== null) {
    finalData = {
      ...finalData,
      total_annual_book_points_goal:
        collectionData.total_annual_book_points_goal,
    };
    success = 1;
  }
  if (collectionData.total_annual_bbt_amount_goal !== null) {
    finalData = {
      ...finalData,
      total_annual_bbt_amount_goal: collectionData.total_annual_bbt_amount_goal,
    };
    success = 1;
  }
  if (collectionData.total_annual_actual_book_points !== null) {
    finalData = {
      ...finalData,
      total_annual_actual_book_points:
        collectionData.total_annual_actual_book_points,
    };
    point_progress =
      typeof finalData.total_annual_book_points_goal === "undefined"
        ? 0
        : (collectionData.total_annual_actual_book_points * 100) /
          finalData.total_annual_book_points_goal;
    success = 1;
  }

  if (collectionData.total_annual_actual_bbt_amount !== null) {
    finalData = {
      ...finalData,
      total_annual_actual_bbt_amount:
        collectionData.total_annual_actual_bbt_amount,
    };
    success = 1;
    console.log(
      moneyToNumber(collectionData.total_annual_actual_bbt_amount),
      moneyToNumber(finalData.total_annual_bbt_amount_goal)
    );
    laxmi_progress =
      typeof finalData.total_annual_bbt_amount_goal === "undefined"
        ? 0
        : (moneyToNumber(collectionData.total_annual_actual_bbt_amount) * 100) /
          moneyToNumber(finalData.total_annual_bbt_amount_goal);
  }
  return {
    collection: {
      ...finalData,
      laxmi_progress: `${laxmi_progress}%`,
      point_progress: `${point_progress}%`,
    },
    success,
  };
};
router.get("/collection-by-param", async function (req, res) {
  let query_param = req.query;
  const is_dashboard = query_param.is_dashboard;
  delete query_param.is_dashboard;
  let collection_for = {
    name: "ISKCON Global",
    picture: "img/iskcon-global.png",
  };
  if (query_param.group_id && query_param.group_id === "iskconGlobal") {
    const group = await Group.findOne({ where: { parent_group: null } })
      .then((result) => result)
      .catch((error) => {
        console.log(error);
        return [];
      });
    query_param.group_id = group.id;
    // delete query_param.group_id;
  } else if (query_param.group_id) {
    const group = await Group.findOne({
      attributes: ["name", "picture_url"],
      where: { id: query_param.group_id },
    })
      .then((result) => result)
      .catch((error) => []);
    collection_for = {
      ...collection_for,
      name: group.name,
      picture:
        group.picture_url === null ? "img/group_icon.png" : group.picture_url,
    };
  } else if (query_param.distributor_id) {
    const people = await People.findOne({
      attributes: ["firstname", "lastname", "picture_url"],
      where: { id: query_param.distributor_id },
    })
      .then((result) => result)
      .catch((error) => []);
    collection_for = {
      ...collection_for,
      name: [people.firstname, people.lastname].join(" "),
      picture:
        people.picture_url === null ? "img/user_icons.png" : people.picture_url,
    };
  }
  let growth = {};
  if (JSON.parse(is_dashboard)) {
    const thisYearGrowth = await getDashboardGrowth(query_param);
    growth = {
      ...growth,
      thisYearGrowth: {
        year: parseInt(query_param.year),
        data: thisYearGrowth,
      },
    };
    const lastYear = parseInt(query_param.year) - 1;
    const lastYearGrowth = await getDashboardGrowth({
      ...query_param,
      year: lastYear.toString(),
    });
    growth = {
      ...growth,
      lastYearGrowth: {
        year: lastYear,
        data: lastYearGrowth,
      },
    };
  }
  BusinessPlanSummary.findAll({
    where: query_param,
    attributes: [
      [
        Sq.fn("sum", Sq.col("annual_book_points_goal_total")),
        "total_annual_book_points_goal",
      ],
      [
        Sq.fn("sum", Sq.col("annual_bbt_amount_goal_total")),
        "total_annual_bbt_amount_goal",
      ],
      [
        Sq.fn("sum", Sq.col("annual_actual_book_points_total")),
        "total_annual_actual_book_points",
      ],
      [
        Sq.fn("sum", Sq.col("annual_actual_bbt_amount_total")),
        "total_annual_actual_bbt_amount",
      ],
    ],
  })
    .then((result) => {
      if (result) {
        res.status(200).send({
          ...formatCollection(result[0].dataValues),
          collection_for,
          growth,
        });
      } else {
        res.status(400).send({ success: 0 });
      }
    })
    .catch((err) => {
      console.log("Error", err);
      res.status(503).send({ error: err.original });
    });
});

getBBTPoints = (book_id, all_books) => {
  const matched = all_books.filter((albk) => albk.id === book_id);
  if (matched.length == 0) return -1;
  return typeof matched[0] !== "undefined" ? matched[0].bbt_book_points : 0;
};

fieldsToAppend = (user_info) => {
  return {
    created_by_id: user_info.user_id,
    last_modified_by_id: user_info.user_id,
    people_add_to_group: user_info.people_default_group,
    organization_id: user_info.org_id,
  };
};

getArrayValueSum = (dataArr) => {
  return dataArr.reduce((sum, item) => {
    return sum + item;
  }, 0);
};

// RollUp Sankirtan Goal
roleUpSankirtanGoal = async (group_id, year, goal_data) => {
  delete goal_data.distributor_id;
  const goalRollUpData = await BusinessPlanSummary.findOne({
    where: { group_id, year },
  })
    .then((result) => {
      let goalRollUp;
      if (result) {
        let msf_book_points_goal_roll_up_merge = goal_data.msf_book_points_goal;
        let msf_bbt_amount_goal_roll_up_merge = goal_data.msf_bbt_amount_goal;
        let msf_group_amount_goal_roll_up_merge =
          goal_data.msf_group_amount_goal;
        if (result.msf_book_points_goal_roll_up !== null) {
          if (
            result.msf_book_points_goal_roll_up.length >=
            goal_data.msf_book_points_goal.length
          ) {
            msf_book_points_goal_roll_up_merge = mergeMSFRecords(
              result.msf_book_points_goal_roll_up,
              goal_data.msf_book_points_goal
            );
            msf_bbt_amount_goal_roll_up_merge = mergeMSFRecords(
              result.msf_bbt_amount_goal_roll_up,
              goal_data.msf_bbt_amount_goal
            );
            msf_group_amount_goal_roll_up_merge = mergeMSFRecords(
              result.msf_group_amount_goal_roll_up,
              goal_data.msf_group_amount_goal
            );
          } else {
            msf_book_points_goal_roll_up_merge = mergeMSFRecords(
              goal_data.msf_book_points_goal,
              result.msf_book_points_goal_roll_up
            );
            msf_bbt_amount_goal_roll_up_merge = mergeMSFRecords(
              goal_data.msf_bbt_amount_goal,
              result.msf_bbt_amount_goal_roll_up
            );
            msf_group_amount_goal_roll_up_merge = mergeMSFRecords(
              goal_data.msf_group_amount_goal,
              result.msf_group_amount_goal_roll_up
            );
          }
        }
        // Merged Existing Goal into the total
        let msf_book_points_goal_total_merge = msf_book_points_goal_roll_up_merge;
        let msf_bbt_amount_goal_total_merge = msf_bbt_amount_goal_roll_up_merge;
        let msf_group_amount_goal_total_merge = msf_group_amount_goal_roll_up_merge;
        if (result.msf_book_points_goal !== null) {
          if (
            msf_book_points_goal_roll_up_merge.length >
            result.msf_book_points_goal.length
          ) {
            msf_book_points_goal_total_merge = mergeMSFRecords(
              msf_book_points_goal_roll_up_merge,
              result.msf_book_points_goal
            );
            msf_bbt_amount_goal_total_merge = mergeMSFRecords(
              msf_bbt_amount_goal_roll_up_merge,
              result.msf_bbt_amount_goal
            );
            msf_group_amount_goal_total_merge = mergeMSFRecords(
              msf_group_amount_goal_roll_up_merge,
              result.msf_group_amount_goal
            );
          } else {
            msf_book_points_goal_total_merge = mergeMSFRecords(
              result.msf_book_points_goal,
              msf_book_points_goal_roll_up_merge
            );
            msf_bbt_amount_goal_total_merge = mergeMSFRecords(
              result.msf_bbt_amount_goal,
              msf_bbt_amount_goal_roll_up_merge
            );
            msf_group_amount_goal_total_merge = mergeMSFRecords(
              result.msf_group_amount_goal,
              msf_group_amount_goal_roll_up_merge
            );
          }
        }
        // End

        goalRollUp = {
          id: result.id,
          year: goal_data.year,
          group_id: group_id,
          // distributor_id: goal_data.distributor_id,

          msf_book_points_goal_roll_up: getArrToString(
            msf_book_points_goal_roll_up_merge
          ),
          msf_bbt_amount_goal_roll_up: getArrToString(
            msf_bbt_amount_goal_roll_up_merge
          ),
          msf_group_amount_goal_roll_up: getArrToString(
            msf_group_amount_goal_roll_up_merge
          ),

          msf_book_points_goal_total: getArrToString(
            msf_book_points_goal_total_merge
          ),
          msf_bbt_amount_goal_total: getArrToString(
            msf_bbt_amount_goal_total_merge
          ),
          msf_group_amount_goal_total: getArrToString(
            msf_group_amount_goal_total_merge
          ),

          annual_book_points_goal_roll_up: getArrayValueSum(
            msf_book_points_goal_roll_up_merge
          ),
          annual_bbt_amount_goal_roll_up: getArrayValueSum(
            msf_bbt_amount_goal_roll_up_merge
          ),
          annual_group_amount_goal_roll_up: getArrayValueSum(
            msf_group_amount_goal_roll_up_merge
          ),

          annual_book_points_goal_total: getArrayValueSum(
            msf_book_points_goal_total_merge
          ),
          annual_bbt_amount_goal_total: getArrayValueSum(
            msf_bbt_amount_goal_total_merge
          ),
          annual_group_amount_goal_total: getArrayValueSum(
            msf_group_amount_goal_total_merge
          ),

          organization_id: goal_data.organization_id,
          created_by_id: goal_data.created_by_id,
          last_modified_by_id: goal_data.last_modified_by_id,
        };
      } else {
        goalRollUp = {
          year: goal_data.year,
          group_id: group_id,
          // distributor_id: goal_data.distributor_id,

          msf_book_points_goal_roll_up: getArrToString(
            goal_data.msf_book_points_goal
          ),
          msf_bbt_amount_goal_roll_up: getArrToString(
            goal_data.msf_bbt_amount_goal
          ),
          msf_group_amount_goal_roll_up: getArrToString(
            goal_data.msf_group_amount_goal
          ),

          msf_book_points_goal_total: getArrToString(
            goal_data.msf_book_points_goal
          ),
          msf_bbt_amount_goal_total: getArrToString(
            goal_data.msf_bbt_amount_goal
          ),
          msf_group_amount_goal_total: getArrToString(
            goal_data.msf_group_amount_goal
          ),

          annual_book_points_goal_roll_up: getArrayValueSum(
            goal_data.msf_book_points_goal
          ),
          annual_bbt_amount_goal_roll_up: getArrayValueSum(
            goal_data.msf_bbt_amount_goal
          ),
          annual_group_amount_goal_roll_up: getArrayValueSum(
            goal_data.msf_group_amount_goal
          ),

          annual_book_points_goal_total: getArrayValueSum(
            goal_data.msf_book_points_goal
          ),
          annual_bbt_amount_goal_total: getArrayValueSum(
            goal_data.msf_bbt_amount_goal
          ),
          annual_group_amount_goal_total: getArrayValueSum(
            goal_data.msf_group_amount_goal
          ),

          organization_id: goal_data.organization_id,
          created_by_id: goal_data.created_by_id,
          last_modified_by_id: goal_data.last_modified_by_id,
        };
      }
      return goalRollUp;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
  if (!goalRollUpData) {
    console.log("False1");
    return false;
  }
  let rollupResponse;
  if (typeof goalRollUpData.id === "undefined") {
    // Create roll-up for parent group
    rollupResponse = await BusinessPlanSummary.create(goalRollUpData)
      .then(async (result) => {
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  } else {
    const goal_id = goalRollUpData.id;
    delete goalRollUpData.id;
    // Update roll-up for parent group
    rollupResponse = await BusinessPlanSummary.update(goalRollUpData, {
      where: { id: goal_id },
    })
      .then(async (result) => {
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }

  if (!rollupResponse) {
    console.log("False2");
    return false;
  }

  // Looking for the parent group of the current group
  const finalResponse = await Group.findOne({ where: { id: group_id } })
    .then((result) => {
      if (result.parent_group) {
        return roleUpSankirtanGoal(result.parent_group, year, goal_data);
      } else {
        return true;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });

  return finalResponse;
};

roleUpSankirtanGoalActual = async (group_id, year, goal_data) => {
  const goalRollUpData = await BusinessPlanSummary.findOne({
    where: { group_id, year },
  })
    .then((result) => {
      let goalRollUp;
      if (result) {
        let msf_actual_group_amount_roll_up_merge =
          goal_data.msf_actual_group_amount;
        if (result.msf_actual_group_amount_roll_up !== null) {
          if (
            result.msf_actual_group_amount_roll_up.length >=
            goal_data.msf_actual_group_amount.length
          ) {
            msf_actual_group_amount_roll_up_merge = mergeMSFRecords(
              result.msf_actual_group_amount_roll_up,
              goal_data.msf_actual_group_amount
            );
          } else {
            msf_actual_group_amount_roll_up_merge = mergeMSFRecords(
              goal_data.msf_actual_group_amount,
              result.msf_actual_group_amount_roll_up
            );
          }
        }
        // Merged Existing Goal into the total
        let msf_actual_group_amount_total_merge = msf_actual_group_amount_roll_up_merge;
        if (result.msf_actual_group_amount !== null) {
          if (
            msf_actual_group_amount_roll_up_merge.length >
            result.msf_actual_group_amount.length
          ) {
            msf_actual_group_amount_total_merge = mergeMSFRecords(
              msf_actual_group_amount_roll_up_merge,
              result.msf_actual_group_amount
            );
          } else {
            msf_actual_group_amount_total_merge = mergeMSFRecords(
              result.msf_actual_group_amount,
              msf_actual_group_amount_roll_up_merge
            );
          }
        }
        // End
        goalRollUp = {
          id: result.id,
          year: goal_data.year,
          group_id: group_id,
          // distributor_id: goal_data.distributor_id,

          msf_actual_group_amount_roll_up: getArrToString(
            msf_actual_group_amount_roll_up_merge
          ),

          msf_actual_group_amount_total: getArrToString(
            msf_actual_group_amount_total_merge
          ),

          annual_actual_group_amount_roll_up: getArrayValueSum(
            msf_actual_group_amount_roll_up_merge
          ),

          annual_actual_group_amount_total: getArrayValueSum(
            msf_actual_group_amount_total_merge
          ),

          organization_id: goal_data.organization_id,
          last_modified_by_id: goal_data.last_modified_by_id,
        };
      }
      return goalRollUp;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
  if (!goalRollUpData) {
    console.log("False1");
    return false;
  }

  const goal_id = goalRollUpData.id;
  delete goalRollUpData.id;
  // Update roll-up for parent group
  const rollupResponse = await BusinessPlanSummary.update(goalRollUpData, {
    where: { id: goal_id },
  })
    .then(async (result) => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });

  if (!rollupResponse) {
    console.log("False2");
    return false;
  }

  // Looking for the parent group of the current group
  const finalResponse = await Group.findOne({ where: { id: group_id } })
    .then((result) => {
      if (result.parent_group) {
        return roleUpSankirtanGoalActual(result.parent_group, year, goal_data);
      } else {
        return true;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });

  return finalResponse;
};

// Roll-Up Transactions
addNewTransaction = (field_name, current_data, previous_summary) => {
  if (previous_summary[field_name] === null) {
    return current_data;
  } else {
    if (previous_summary[field_name].length > current_data.length) {
      if (
        [
          "msf_actual_book_points_book_type_total",
          "monthly_actual_book_points_book_type_total",
        ].includes(field_name)
      ) {
        return sumWithExistingBookType(
          previous_summary[field_name],
          current_data
        );
      } else {
        return sumWithExisting(previous_summary[field_name], current_data);
      }
    } else {
      if (
        [
          "msf_actual_book_points_book_type_total",
          "monthly_actual_book_points_book_type_total",
        ].includes(field_name)
      ) {
        return sumWithExistingBookType(
          current_data,
          previous_summary[field_name]
        );
      } else {
        return sumWithExisting(current_data, previous_summary[field_name]);
      }
    }
  }
};

const getCurrentDateTime = function () {
  var dt = new Date();
  let current_date = `${dt.getFullYear().toString().padStart(4, "0")}-${(
    dt.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${dt
    .getDate()
    .toString()
    .padStart(2, "0")} ${dt
    .getHours()
    .toString()
    .padStart(2, "0")}:${dt
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${dt.getSeconds().toString().padStart(2, "0")}`;
  return current_date;
};

bookTypePoints = (transactionLineItems) => {
  let book_type_points = {
    "M-Big": 0,
    Big: 0,
    Full: 0,
    Medium: 0,
    Small: 0,
    BTG: 0,
    Magazines: 0,
  };
  let transaction_book_points = 0;
  transactionLineItems.map((item) => {
    const book_type =
      item.item.book_type === "Set" ? "Full" : item.item.book_type;
    if (typeof book_type_points[book_type] !== "undefined") {
      const total_points =
        item.transaction_book_points * parseInt(item.quantity);
      transaction_book_points += total_points;
      book_type_points[book_type] = total_points;
    }
  });
  return { book_type_points, transaction_book_points };
};

getArrOfBookTypeTotal = (bookTypePoints) => {
  let sum = [0, 0, 0, 0, 0, 0, 0];
  bookTypePoints.map((arr) => {
    sum = arr.map((num, indx) => num + sum[indx]);
  });
  return getArrToString(sum);
};

router.get("/transaction-rollup", async function (req, res) {
  // Get the list of all transactions which need to roll-up
  var updated_count = 0;
  var success_count = 0;
  var failed_count = 0;
  const start_time = getCurrentDateTime();
  const transactions = await Transaction.findAll({
    where: {
      transasction_status: "Pending",
      "completed_summary_roll-ups": false,
    },
    attributes: [
      "id",
      "date",
      "transaction_group_id",
      "transaction_amount",
      "transaction_book_points",
    ],
    include: [
      {
        model: TransactionLineItem,
        attributes: ["transaction_book_points", "quantity"],
        include: [
          {
            model: Item,
            attributes: ["book_type"],
          },
        ],
      },
    ],
    order: [
      ["transaction_group_id", "ASC"],
      ["date", "ASC"],
    ],
  })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });

  if (transactions && transactions.length > 0) {
    updated_count = transactions.length;
    const periods = await Period.findAll({
      where: { status: "Open", type: "MSF" },
      order: [["number", "ASC"]],
    })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    if (periods && periods.length > 0) {
      let transaction = {};
      var tran_ids = [];
      transactions.map((trans) => {
        const group_id = trans.transaction_group_id;
        if (typeof transaction[group_id] === "undefined") {
          transaction[group_id] = {};
          transaction[group_id]["msf"] = {};
          transaction[group_id]["month"] = {};
        }
        // Arrange Data Monthly
        const _this_month = new Date(trans.date).getMonth();
        if (
          typeof transaction[group_id]["month"][_this_month] === "undefined"
        ) {
          transaction[group_id]["month"][_this_month] = [];
        }

        // Arrange Data MSF
        const _msf = getMSFPeriod(periods, trans);
        if (_msf !== 99) {
          if (typeof transaction[group_id]["msf"][_msf] === "undefined") {
            transaction[group_id]["msf"][_msf] = [];
          }
          trans = {
            ...JSON.parse(JSON.stringify(trans)),
            ...bookTypePoints(trans.transaction_line_items),
          };
          delete trans.transaction_line_items;
          transaction[group_id]["msf"][_msf].push(trans);
          transaction[group_id]["month"][_this_month].push(trans);
        } else {
          tran_ids.push(trans.id);
        }
      });
      //console.log("transaction===",transaction);
      //console.log("transactioncount===",Object.keys(transaction).length);
      //updated_count = Object.keys(transaction).length;
      for (let group_id in transaction) {
        var length = 0;
        const goal_summary = await BusinessPlanSummary.findOne({
          where: { group_id },
        })
          .then((result) => {
            //console.log("result==",result);
            if (result) {
              return result;
            } else {
              return false;
            }
          })
          .catch((error) => {
            console.log(error);
            return false;
          });
        if (goal_summary) {
          const {
            msf_actual_book_points,
            msf_actual_bbt_amount,
            msf_book_type_book_points,
          } = combineCollections(transaction[group_id]["msf"], "msf");
          const {
            monthly_actual_book_points,
            monthly_actual_bbt_amount,
            monthly_book_type_book_points,
          } = combineCollections(transaction[group_id]["month"], "monthly");
          let rollup_data = {
            group_id,
            msf_actual_book_points: addNewTransaction(
              "msf_actual_book_points",
              msf_actual_book_points,
              goal_summary
            ),
            msf_actual_bbt_amount: addNewTransaction(
              "msf_actual_bbt_amount",
              msf_actual_bbt_amount,
              goal_summary
            ),
            msf_actual_book_points_total: addNewTransaction(
              "msf_actual_book_points_total",
              msf_actual_book_points,
              goal_summary
            ),
            msf_actual_bbt_amount_total: addNewTransaction(
              "msf_actual_bbt_amount_total",
              msf_actual_bbt_amount,
              goal_summary
            ),
            monthly_actual_book_points: addNewTransaction(
              "monthly_actual_book_points",
              monthly_actual_book_points,
              goal_summary
            ),
            monthly_actual_bbt_amount: addNewTransaction(
              "monthly_actual_bbt_amount",
              monthly_actual_bbt_amount,
              goal_summary
            ),
            monthly_actual_book_points_total: addNewTransaction(
              "monthly_actual_book_points_total",
              monthly_actual_book_points,
              goal_summary
            ),
            monthly_actual_bbt_amount_total: addNewTransaction(
              "monthly_actual_bbt_amount_total",
              monthly_actual_bbt_amount,
              goal_summary
            ),
            msf_actual_book_points_book_type_total: addNewTransaction(
              "msf_actual_book_points_book_type_total",
              msf_book_type_book_points,
              goal_summary
            ),
            monthly_actual_book_points_book_type_total: addNewTransaction(
              "monthly_actual_book_points_book_type_total",
              monthly_book_type_book_points,
              goal_summary
            ),
          };
          rollup_data = {
            ...rollup_data,
            msf_actual_book_points: getArrToString(
              rollup_data.msf_actual_book_points
            ),
            msf_actual_bbt_amount: getArrToString(
              rollup_data.msf_actual_bbt_amount
            ),
            msf_actual_book_points_total: getArrToString(
              rollup_data.msf_actual_book_points_total
            ),
            msf_actual_bbt_amount_total: getArrToString(
              rollup_data.msf_actual_bbt_amount_total
            ),
            monthly_actual_book_points: getArrToString(
              rollup_data.monthly_actual_book_points
            ),
            monthly_actual_bbt_amount: getArrToString(
              rollup_data.monthly_actual_bbt_amount
            ),
            monthly_actual_book_points_total: getArrToString(
              rollup_data.monthly_actual_book_points_total
            ),
            monthly_actual_bbt_amount_total: getArrToString(
              rollup_data.monthly_actual_bbt_amount_total
            ),
            annual_actual_book_points: getArrayValueSum(
              rollup_data.msf_actual_book_points
            ),
            annual_actual_bbt_amount: getArrayValueSum(
              rollup_data.msf_actual_bbt_amount
            ),
            annual_actual_book_points_total: getArrayValueSum(
              rollup_data.msf_actual_book_points_total
            ),
            annual_actual_bbt_amount_total: getArrayValueSum(
              rollup_data.msf_actual_bbt_amount_total
            ),
            msf_actual_book_points_book_type_total: getArrOfArrToString(
              rollup_data.msf_actual_book_points_book_type_total
            ),
            monthly_actual_book_points_book_type_total: getArrOfArrToString(
              rollup_data.monthly_actual_book_points_book_type_total
            ),
            annual_actual_book_points_book_type_total: getArrOfBookTypeTotal(
              rollup_data.msf_actual_book_points_book_type_total
            ),
          };
          await BusinessPlanSummary.update(rollup_data, {
            where: { id: goal_summary.id },
          });

          const has_parent = await Group.findOne({ where: { id: group_id } })
            .then((result) => {
              return result;
            })
            .catch((err) => {
              console.log(err);
              return false;
            });
          // No parent found!
          if (!has_parent) {
            // return res.status(503).send('Something went wrong!');
            console.log("Something went wrong!");
          }
          if (typeof has_parent.parent_group === "undefined") {
            console.log("No more parent to roll-up", group_id);
          }

          await roleUpActualTransaction(has_parent.parent_group, {
            msf_actual_book_points,
            msf_actual_bbt_amount,
            msf_book_type_book_points,
            monthly_actual_book_points,
            monthly_actual_bbt_amount,
            monthly_book_type_book_points,
          });

          var trsanaction_id = getTransactionIds(transaction[group_id]["msf"]);

          var c = trsanaction_id.concat(tran_ids);
          var trsanaction_ids = c.filter(
            (item, pos) => c.indexOf(item) === pos
          );

          if (trsanaction_ids.length) {
            let transaction_reports = await Transaction.update(
              {
                "completed_summary_roll-ups": true,
                transasction_status: "Active",
              },
              { where: { id: { [Sq.Op.in]: trsanaction_ids } } }
            ).then(async (result) => {
              success_count = result.toString();
              const transactionByIds = await Transaction.findAll({
                where: {
                  id: {
                    [Sq.Op.in]: trsanaction_ids,
                  },
                },
                attributes: ["id", "date", "completed_summary_roll-ups"],
              }).then(async (results) => {
                if (results && results.length) {
                  results.forEach(async function (item, index) {
                    console.log(
                      "item.dataValues.transasction_status==",
                      item.dataValues.transasction_status
                    );
                    if (
                      item.dataValues != undefined &&
                      item.dataValues.transasction_status == "Pending"
                    ) {
                      failed_count = index + 1;
                      let transaction_reports = await Transaction.update(
                        { transasction_status: "Cancelled" },
                        { where: { id: item.dataValues.id } }
                      );
                    }
                  });
                }
              });
            });
          }
        }
      }
      success_count = updated_count - failed_count;
      let end_time = getCurrentDateTime();
      let transaction_found_reports = {
        updated_count: updated_count,
        start_time: start_time,
        end_time: end_time,
        success_count: success_count,
        failed_count: failed_count,
        batch_date: start_time,
      };
      RollupReports.create(transaction_found_reports)
        .then((insterted) => {
          return true;
        })
        .catch((err) => {
          console.log("err===", err);
          return false;
        });
      return res.send("Roll-up successfully done!");
    }

    return res.send("Unable to find any open period where we can roll-up!");
  } else {
    return res.send("Either got some error or no record found!");
  }
});
/*
router.get('/transaction-rollup', async function (req, res) {
	let updated_count=0;
	let success_count=0;
	let failed_count=0;

	// Get the list of all transactions which need to roll-up 
	const start_time = getCurrentDateTime();
	const transactions = await Transaction.findAll({
		where: {
			transasction_status: 'Active',
			'completed_summary_roll-ups': false,
		},
		attributes: [
			'id',
			'date',
			'transaction_group_id',
			'transaction_amount',
			'transaction_book_points',
		],
		include: [
			{
				model: TransactionLineItem,
				attributes: ['transaction_book_points', 'quantity'],
				include: [
					{
						model: Item,
						attributes: ['book_type'],
					},
				],
			},
		],
		order: [
			['transaction_group_id', 'ASC'],
			['date', 'ASC'],
		],
	})
		.then((result) => {
			return result;
		})
		.catch((err) => {
			console.log(err);
			return false;
		});
	if (typeof transactions !== 'undefined' && transactions  && transactions.length > 0) {
		updated_count=transactions.length;
		//console.log(' roll-up transactions to be updted...', updated_count);
		const periods = await Period.findAll({
			where: { status: 'Open', type: 'MSF' },
			order: [['number', 'ASC']],
		})
			.then((result) => {
				return result;
			})
			.catch((err) => {
				console.log(err);
				return false;
			});
		if (periods && periods.length > 0) {
			let transaction = {};
			transactions.map((trans) => {
				const group_id = trans.transaction_group_id;
				if (typeof transaction[group_id] === 'undefined') {
					transaction[group_id] = {};
					transaction[group_id]['msf'] = {};
					transaction[group_id]['month'] = {};
				}
				// Arrange Data Monthly
				const _this_month = new Date(trans.date).getMonth();
				if (
					typeof transaction[group_id]['month'][_this_month] === 'undefined'
				) {
					transaction[group_id]['month'][_this_month] = [];
				}

				// Arrange Data MSF
				const _msf = getMSFPeriod(periods, trans);
				if (_msf !== 99) {
					// Return 99 in case no period availabe for the transaction date
					if (typeof transaction[group_id]['msf'][_msf] === 'undefined') {
						transaction[group_id]['msf'][_msf] = [];
					}
					trans = {...JSON.parse(JSON.stringify(trans)), ...bookTypePoints(trans.transaction_line_items)}
					delete trans.transaction_line_items;
					transaction[group_id]['msf'][_msf].push(trans);
					transaction[group_id]['month'][_this_month].push(trans);
				}
			});
			for (let group_id in transaction) {
				const goal_summary = await BusinessPlanSummary.findOne({
					where: { group_id },
				})
					.then((result) => {
						if (result) {
							return result;
						} else {
							return false;
						}
					})
					.catch((error) => {
						console.log(error);
						return false;
					});
				if (goal_summary) {
					const {
						msf_actual_book_points,
						msf_actual_bbt_amount,
						msf_book_type_book_points,
					} = combineCollections(transaction[group_id]['msf'], 'msf');
					const {
						monthly_actual_book_points,
						monthly_actual_bbt_amount,
						monthly_book_type_book_points,
					} = combineCollections(transaction[group_id]['month'], 'monthly');
					let rollup_data = {
						group_id,
						msf_actual_book_points: addNewTransaction(
							'msf_actual_book_points',
							msf_actual_book_points,
							goal_summary
						),
						msf_actual_bbt_amount: addNewTransaction(
							'msf_actual_bbt_amount',
							msf_actual_bbt_amount,
							goal_summary
						),
						msf_actual_book_points_total: addNewTransaction(
							'msf_actual_book_points_total',
							msf_actual_book_points,
							goal_summary
						),
						msf_actual_bbt_amount_total: addNewTransaction(
							'msf_actual_bbt_amount_total',
							msf_actual_bbt_amount,
							goal_summary
						),
						monthly_actual_book_points: addNewTransaction(
							'monthly_actual_book_points',
							monthly_actual_book_points,
							goal_summary
						),
						monthly_actual_bbt_amount: addNewTransaction(
							'monthly_actual_bbt_amount',
							monthly_actual_bbt_amount,
							goal_summary
						),
						monthly_actual_book_points_total: addNewTransaction(
							'monthly_actual_book_points_total',
							monthly_actual_book_points,
							goal_summary
						),
						monthly_actual_bbt_amount_total: addNewTransaction(
							'monthly_actual_bbt_amount_total',
							monthly_actual_bbt_amount,
							goal_summary
						),
						msf_actual_book_points_book_type_total: addNewTransaction(
							'msf_actual_book_points_book_type_total',
							msf_book_type_book_points,
							goal_summary
						),
						monthly_actual_book_points_book_type_total: addNewTransaction(
							'monthly_actual_book_points_book_type_total',
							monthly_book_type_book_points,
							goal_summary
						), 
					};
					rollup_data = {
						...rollup_data,
						msf_actual_book_points: getArrToString(
							rollup_data.msf_actual_book_points
						),
						msf_actual_bbt_amount: getArrToString(
							rollup_data.msf_actual_bbt_amount
						),
						msf_actual_book_points_total: getArrToString(
							rollup_data.msf_actual_book_points_total
						),
						msf_actual_bbt_amount_total: getArrToString(
							rollup_data.msf_actual_bbt_amount_total
						),
						monthly_actual_book_points: getArrToString(
							rollup_data.monthly_actual_book_points
						),
						monthly_actual_bbt_amount: getArrToString(
							rollup_data.monthly_actual_bbt_amount
						),
						monthly_actual_book_points_total: getArrToString(
							rollup_data.monthly_actual_book_points_total
						),
						monthly_actual_bbt_amount_total: getArrToString(
							rollup_data.monthly_actual_bbt_amount_total
						),
						annual_actual_book_points: getArrayValueSum(
							rollup_data.msf_actual_book_points
						),
						annual_actual_bbt_amount: getArrayValueSum(
							rollup_data.msf_actual_bbt_amount
						),
						annual_actual_book_points_total: getArrayValueSum(
							rollup_data.msf_actual_book_points_total
						),
						annual_actual_bbt_amount_total: getArrayValueSum(
							rollup_data.msf_actual_bbt_amount_total
						),
						msf_actual_book_points_book_type_total: getArrOfArrToString(rollup_data.msf_actual_book_points_book_type_total),
						monthly_actual_book_points_book_type_total: getArrOfArrToString(rollup_data.monthly_actual_book_points_book_type_total),
						annual_actual_book_points_book_type_total: getArrOfBookTypeTotal(rollup_data.msf_actual_book_points_book_type_total),
					};
					await BusinessPlanSummary.update(rollup_data, {
						where: { id: goal_summary.id },
					});
					success_count++;
		//console.log(' roll-up transactions success_count=.',success_count);
					const has_parent = await Group.findOne({ where: { id: group_id } })
						.then((result) => {
							return result;
						})
						.catch((err) => {
							console.log(err);
							return false;
						});
					// No parent found!
					if (!has_parent) {
						// return res.status(503).send('Something went wrong!');
						console.log('Something went wrong!');
					}
					if (typeof has_parent.parent_group === 'undefined') {
						// return res.status(200).send('No more parent to roll-up');
					//	console.log('No more parent to roll-up', group_id);
					}

					await roleUpActualTransaction(has_parent.parent_group, {
						msf_actual_book_points,
						msf_actual_bbt_amount,
						msf_book_type_book_points,
						monthly_actual_book_points,
						monthly_actual_bbt_amount,
						monthly_book_type_book_points
					});
				} //endif goal summary
			} //end groupid loop of transaction
			//console.log("success_count====",success_count);
			//console.log("failed_count====",failed_count);
			//console.log("updated_count====",updated_count);
			failed_count = updated_count - success_count ;
										const end_time = getCurrentDateTime();
										let transaction_reports = {
											updated_count:updated_count,
											start_time:start_time,
											end_time:end_time,
											success_count:success_count,
											failed_count:failed_count,
											batch_date:start_time,
										};
									RollupReports.create(transaction_reports)
										.then((inerted) => {
											//console.log("result==",inerted);
											return true;
										})
										.catch((err) => {
											//console.log("result==",err);
											return false;
										});
			return res.send('Roll-up successfully done!');
		} //end of periods exist
		return res.send('Unable to find any open period where we can roll-up!');
	}
	return res.send('Either got some error or no record found!');
});*/

sumWithExisting = (existing, coming) => {
  let sum = [];
  if (existing !== null) {
    existing.map((value, key) => {
      value = isNaN(value) ? moneyToNumber(value) : value;
      let coming_value = 0;
      if (typeof coming[key] !== "undefined") {
        coming_value = isNaN(coming[key])
          ? moneyToNumber(coming[key])
          : coming[key];
      }
      sum[key] = +coming_value + +value;
    });
  }
  return sum;
};

sumWithExistingBookType = (existing, coming) => {
  let sum = [];
  if (existing !== null) {
    existing.map((value, key) => {
      if (typeof coming[key] !== "undefined") {
        value = value.map(
          (num, indx) => num + (coming[key][indx] ? coming[key][indx] : 0)
        );
      }
      sum[key] = value;
    });
  }
  return sum;
};

getMergeMSFRecord = (existing_record, current_record) => {
  return existing_record === null
    ? current_record
    : existing_record.length > current_record.length
    ? mergeMSFRecords(existing_record, current_record)
    : mergeMSFRecords(current_record, existing_record);
};

combineCollections = (arr_data, period_type) => {
  const keys_arr = Object.keys(arr_data);
  const last_indx = keys_arr[keys_arr.length - 1];
  let msf_actual_book_points = [];
  let msf_actual_bbt_amount = [];
  let msf_book_type_book_points = [];
  let amount, point;
  let book_type_points = {};
  for (let i = 0; i <= last_indx; i++) {
    amount = 0;
    point = 0;
    book_type_points = {
      "M-Big": 0,
      Big: 0,
      Full: 0,
      Medium: 0,
      Small: 0,
      BTG: 0,
      Magazines: 0,
    };
    if (typeof arr_data[i] !== "undefined") {
      arr_data[i].map((arr) => {
        amount += +moneyToNumber(arr.transaction_amount);
        point += +arr.transaction_book_points;
        for (key in arr.book_type_points) {
          book_type_points[key] += arr.book_type_points[key];
        }
      });
    }
    msf_book_type_book_points.push(Object.values(book_type_points));
    msf_actual_book_points.push(point);
    msf_actual_bbt_amount.push(amount);
  }
  if (period_type === "msf") {
    return {
      msf_actual_book_points: msf_actual_book_points,
      msf_actual_bbt_amount: msf_actual_bbt_amount,
      msf_book_type_book_points: msf_book_type_book_points,
    };
  } else {
    return {
      monthly_actual_book_points: msf_actual_book_points,
      monthly_actual_bbt_amount: msf_actual_bbt_amount,
      monthly_book_type_book_points: msf_book_type_book_points,
    };
  }
};

getTransactionIds = (arr_data) => {
  let transaction_ids = [];
  for (let period in arr_data) {
    arr_data[period].map((arr) => {
      transaction_ids.push(arr.id);
    });
  }
  return transaction_ids;
};

getMSFPeriod = (periods, transaction) => {
  let _number = 100;
  periods.map((period) => {
    const period_start = new Date(period.start);
    const period_end = new Date(period.end);
    const transaction_date = new Date(transaction.date);

    if (
      period_start.getTime() <= transaction_date.getTime() &&
      transaction_date.getTime() <= period_end.getTime()
    ) {
      _number = period.number;
    }
  });
  return _number - 1;
};

// RollUp Actual Transactions
roleUpActualTransaction = async (group_id, goal_data, year = "2020") => {
  const {
    msf_actual_book_points,
    msf_actual_bbt_amount,
    msf_book_type_book_points,
    monthly_actual_book_points,
    monthly_actual_bbt_amount,
    monthly_book_type_book_points,
  } = goal_data;
  const goalRollUpData = await BusinessPlanSummary.findOne({
    where: { group_id, year },
  })
    .then((result) => {
      if (result) {
        let rollup_data = {
          id: result.id,
          msf_actual_book_points_roll_up: addNewTransaction(
            "msf_actual_book_points_roll_up",
            msf_actual_book_points,
            result
          ),
          msf_actual_bbt_amount_roll_up: addNewTransaction(
            "msf_actual_bbt_amount_roll_up",
            msf_actual_bbt_amount,
            result
          ),
          monthly_actual_book_points_roll_up: addNewTransaction(
            "monthly_actual_book_points_roll_up",
            monthly_actual_book_points,
            result
          ),
          monthly_actual_bbt_amount_roll_up: addNewTransaction(
            "monthly_actual_bbt_amount_roll_up",
            monthly_actual_bbt_amount,
            result
          ),

          msf_actual_book_points_total: addNewTransaction(
            "msf_actual_book_points_total",
            msf_actual_book_points,
            result
          ),
          msf_actual_bbt_amount_total: addNewTransaction(
            "msf_actual_bbt_amount_total",
            msf_actual_bbt_amount,
            result
          ),
          monthly_actual_book_points_total: addNewTransaction(
            "monthly_actual_book_points_total",
            monthly_actual_book_points,
            result
          ),
          monthly_actual_bbt_amount_total: addNewTransaction(
            "monthly_actual_bbt_amount_total",
            monthly_actual_bbt_amount,
            result
          ),
          msf_actual_book_points_book_type_total: addNewTransaction(
            "msf_actual_book_points_book_type_total",
            msf_book_type_book_points,
            result
          ),
          monthly_actual_book_points_book_type_total: addNewTransaction(
            "monthly_actual_book_points_book_type_total",
            monthly_book_type_book_points,
            result
          ),
        };
        rollup_data = {
          ...rollup_data,
          msf_actual_book_points_roll_up: getArrToString(
            rollup_data.msf_actual_book_points_roll_up
          ),
          msf_actual_bbt_amount_roll_up: getArrToString(
            rollup_data.msf_actual_bbt_amount_roll_up
          ),
          monthly_actual_book_points_roll_up: getArrToString(
            rollup_data.monthly_actual_book_points_roll_up
          ),
          monthly_actual_bbt_amount_roll_up: getArrToString(
            rollup_data.monthly_actual_bbt_amount_roll_up
          ),
          msf_actual_book_points_total: getArrToString(
            rollup_data.msf_actual_book_points_total
          ),
          msf_actual_bbt_amount_total: getArrToString(
            rollup_data.msf_actual_bbt_amount_total
          ),
          monthly_actual_book_points_total: getArrToString(
            rollup_data.monthly_actual_book_points_total
          ),
          monthly_actual_bbt_amount_total: getArrToString(
            rollup_data.monthly_actual_bbt_amount_total
          ),
          annual_actual_book_points_roll_up: getArrayValueSum(
            rollup_data.msf_actual_book_points_roll_up
          ),
          annual_actual_bbt_amount_roll_up: getArrayValueSum(
            rollup_data.msf_actual_bbt_amount_roll_up
          ),
          annual_actual_book_points_total: getArrayValueSum(
            rollup_data.msf_actual_book_points_total
          ),
          annual_actual_bbt_amount_total: getArrayValueSum(
            rollup_data.msf_actual_bbt_amount_total
          ),

          msf_actual_book_points_book_type_total: getArrOfArrToString(
            rollup_data.msf_actual_book_points_book_type_total
          ),
          monthly_actual_book_points_book_type_total: getArrOfArrToString(
            rollup_data.monthly_actual_book_points_book_type_total
          ),
          annual_actual_book_points_book_type_total: getArrOfBookTypeTotal(
            rollup_data.msf_actual_book_points_book_type_total
          ),
        };
        return rollup_data;
      } else {
        console.log("No recored found!");
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
  if (!goalRollUpData) {
    //console.log('False1');
    return false;
  }

  const goal_id = goalRollUpData.id;
  delete goalRollUpData.id;
  // Update roll-up for parent group
  const rollupResponse = await BusinessPlanSummary.update(goalRollUpData, {
    where: { id: goal_id },
  })
    .then((result) => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });

  if (!rollupResponse) {
    //console.log('False2');
    return false;
  }

  // Looking for the parent group of the current group
  const finalResponse = await Group.findOne({ where: { id: group_id } })
    .then((result) => {
      if (result.parent_group) {
        return roleUpActualTransaction(result.parent_group, goal_data, year);
      } else {
        return true;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
  return finalResponse;
};

router.get("/rollup-status", function (req, res) {
  BusinessPlanSummary.update(
    {
      msf_actual_book_points: null,
      msf_actual_bbt_amount: null,
      monthly_actual_book_points: null,
      monthly_actual_bbt_amount: null,
      msf_actual_book_points_roll_up: null,
      msf_actual_bbt_amount_roll_up: null,
      monthly_actual_book_points_roll_up: null,
      monthly_actual_bbt_amount_roll_up: null,
      msf_actual_book_points_total: null,
      msf_actual_bbt_amount_total: null,
      monthly_actual_book_points_total: null,
      monthly_actual_bbt_amount_total: null,
      // annual_book_points_goal_roll_up: null,
      // annual_bbt_amount_goal_roll_up: null,
      annual_actual_book_points_roll_up: null,
      annual_actual_bbt_amount_roll_up: null,
      annual_actual_book_points: null,
      annual_actual_bbt_amount: null,
      // annual_book_points_goal_total: null,
      // annual_bbt_amount_goal_total: null,
      annual_actual_book_points_total: null,
      annual_actual_bbt_amount_total: null,
      msf_actual_book_points_book_type_total: null,
      monthly_actual_book_points_book_type_total: null,
      annual_actual_book_points_book_type_total: null,
    },
    { where: {} }
  );
  Transaction.update(
    { "completed_summary_roll-ups": false },
    { where: { "completed_summary_roll-ups": true } }
  );
  res.send("Updated!");
});
router.get("/list-transactions", function (req, res) {
  Transaction.findAll().then((result) => res.send(result));
});
router.get("/summary-by-id", function (req, res) {
  BusinessPlanSummary.findOne({ where: req.query }).then((result) =>
    res.send(result)
  );
});

// Existing Group And People
router.get("/old-group", function (req, res) {
  Group_1.findAll({
    order: [["name", "ASC"]],
  })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(503).send({ error: err.original });
    });
});

transactionItemFormat = (item, dates) => {
  let book_type_points = {
    mbig: 0,
    big: 0,
    large: 0,
    medium: 0,
    small: 0,
    btg: 0,
    full: 0,
    magazines: 0,
  };
  let collection_between_dates = 0;
  item.map((itm) => {
    itm.transaction_line_items.map((line_item) => {
      const old_book_type_points = { ...book_type_points };
      const points = +line_item.quantity * +line_item.item.bbt_book_points;
      if (dates) {
        const item_date = new Date(itm.date);
        if (
          item_date.getTime() >= dates.start.getTime() &&
          item_date.getTime() <= dates.end.getTime()
        ) {
          collection_between_dates += points;
        }
      }
      switch (line_item.item.book_type) {
        case "Large":
          book_type_points.large = old_book_type_points.large + points;
          break;

        case "Medium":
          book_type_points.medium = old_book_type_points.medium + points;
          break;

        case "Small":
          book_type_points.small = old_book_type_points.small + points;
          break;

        case "M-Big":
          book_type_points.mbig = old_book_type_points.mbig + points;
          break;

        case "BTG":
          book_type_points.btg = old_book_type_points.btg + points;
          break;

        case "Big":
          book_type_points.big = old_book_type_points.big + points;
          break;

        case "Full":
        case "Set":
          book_type_points.full = old_book_type_points.full + points;
          break;
        case "Magazines":
          book_type_points.magazines = old_book_type_points.magazines + points;
          break;
      }
    });
  });
  if (dates) {
    return { book_type_points, collection_between_dates };
  }
  return book_type_points;
};

// Dashboard Stats
transactionItems = async (
  transaction_group_id,
  transaction_where,
  distributor_id
) => {
  delete transaction_where.transaction_group_id;
  transaction_where = {
    ...transaction_where,
    transaction_group_id: transaction_group_id,
  };
  const item = await Transaction.findAll({
    where: transaction_where,
    attributes: [],
    include: [
      {
        model: TransactionLineItem,
        attributes: ["id", "item_id", "quantity", "price"],
        include: [
          {
            model: Item,
            attributes: ["name", "book_type", "bbt_book_points"],
          },
        ],
      },
    ],
  })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(error);
    });

  return transactionItemFormat(item);
};
getBookTypeWisePoints = (book_points) => {
  let book_types = [
    "mbig",
    "big",
    "full",
    "medium",
    "small",
    "btg",
    "magazines",
  ];
  let type_points = {};
  book_types.map((type, indx) => {
    type_points[type] =
      book_points && book_points[indx] ? book_points[indx] : 0;
  });
  return type_points;
};
// Top ten book points groups
router.get("/top-ten-group", async function (req, res) {
  const {
    sort_by,
    continent,
    country,
    year,
    group_id,
    distributor_id,
    start,
    end,
  } = req.query;
  let _where = {
    group_type: "Temple",
    parent_group: {
      [Sq.Op.ne]: null,
    },
  };
  // if (group_id) {
  // 	_where = { ..._where, id: group_id };
  // }
  let _whereYear = {};
  if (year) {
    _whereYear = {
      where: {
        year,
      },
    };
  }
  var pageRecordLimt;
  if (group_id == null || group_id == undefined) {
    pageRecordLimt = {
      offset: 0,
      limit: 10,
    };
  }

  if (continent) {
    _where = { ..._where, sankirtan_group_continent: continent };
  } else if (country) {
    _where = { ..._where, sankirtan_group_country: country };
  }
  const sort_match = {
    book_point: "annual_actual_book_points_total",
    bbt_amount: "annual_actual_bbt_amount_total",
  };
  let topTenRecords = await BusinessPlanSummary.findAll({
    ..._whereYear,
    attributes: [
      "id",
      "year",
      "group_id",
      "annual_actual_book_points_book_type_total",
      "annual_actual_book_points_total",
      "annual_actual_bbt_amount_total",
    ],
    include: [
      {
        model: Group,
        where: _where,
        attributes: [
          "id",
          "name",
          "meeting_city",
          "meeting_state",
          "meeting_country",
          "picture_url",
        ],
      },
    ],
    order: [[sort_match[sort_by], "DESC"]],
    ...pageRecordLimt,
  });
  topTenRecords = JSON.parse(JSON.stringify(topTenRecords));
  const formattedResult = [];
  topTenRecords.map((record) => {
    formattedResult.push({
      title: record.group.name,
      address: [record.group.meeting_state, record.group.meeting_country].join(
        ", "
      ),
      picture: record.group.picture_url,
      group_id: record.group_id,
      book_point:
        record.annual_actual_book_points_total !== null
          ? record.annual_actual_book_points_total
          : 0,
      bbt_amount:
        record.annual_actual_bbt_amount_total !== null
          ? record.annual_actual_bbt_amount_total
          : 0,
      ...getBookTypeWisePoints(
        record.annual_actual_book_points_book_type_total
      ),
    });
  });
  return res.send(formattedResult);
});

getMonthlyContinent = async (year, period) => {
  const monthlyContinentSummary = await BusinessPlanSummary.findAll({
    where: {
      year: year.toString(),
    },
    attributes: [
      "id",
      "year",
      "group_id",
      "msf_actual_book_points_book_type_total",
      "monthly_actual_book_points_book_type_total",
    ],
    include: [
      {
        model: Group,
        attributes: [
          "id",
          "name",
          "meeting_city",
          "meeting_state",
          "meeting_country",
          "picture_url",
          "continent",
        ],
        where: {
          parent_group: {
            [Sq.Op.ne]: null,
          },
        },
      },
    ],
    order: [[{ model: Group }, "continent", "ASC"]],
  });
  let groupByContinent = {};
  monthlyContinentSummary.map((summary) => {
    summary = JSON.parse(JSON.stringify(summary));
    if (typeof groupByContinent[summary.group.continent] === "undefined") {
      groupByContinent[summary.group.continent] = {
        title: summary.group.continent,
        points: [],
      };
    }
    if (period.type === "Month") {
      pointsByBookType =
        summary.monthly_actual_book_points_book_type_total !== null &&
        typeof summary.monthly_actual_book_points_book_type_total[
          period.number
        ] !== "undefined"
          ? summary.monthly_actual_book_points_book_type_total[period.number]
          : [];
    } else {
      pointsByBookType =
        summary.msf_actual_book_points_book_type_total !== null &&
        typeof summary.msf_actual_book_points_book_type_total[period.number] !==
          "undefined"
          ? summary.msf_actual_book_points_book_type_total[period.number]
          : [];
    }
    groupByContinent[summary.group.continent].points.push(pointsByBookType);
  });
  return groupByContinent;
};

arrangeArrayIntoBookTypes = (pointsArr) => {
  let pointsByBookType = [0, 0, 0, 0, 0, 0, 0];
  pointsArr.map((points) => {
    if (points && points.length) {
      pointsByBookType = points.map((point, indx) => {
        return point + pointsByBookType[indx];
      });
    }
  });
  let continent_data = { points: getArrayValueSum(pointsByBookType) };
  NEWSLETTER_BOOK_TYPES.map((type, indx) => {
    continent_data[type] = pointsByBookType[indx] ? pointsByBookType[indx] : 0;
  });
  return continent_data;
};

router.get("/newsletter-monthly-continent", async function (req, res) {
  const { year = new Date().getFullYear(), period_id } = req.query;
  const period = await Period.findOne({ where: { id: period_id } });
  const thisYearData = await getMonthlyContinent(year, period);
  const thisYearContinentData = [];
  for (let continent in thisYearData) {
    thisYearContinentData.push({
      title: continent + " (" + thisYearData[continent].points.length + ")",
      continent,
      ...arrangeArrayIntoBookTypes(thisYearData[continent].points),
    });
  }
  const lastYearData = await getMonthlyContinent(parseInt(year) - 1, period);
  const lastYearContinentData = [];
  for (let continent in lastYearData) {
    lastYearContinentData.push({
      title: continent + " (" + lastYearData[continent].points.length + ")",
      continent,
      ...arrangeArrayIntoBookTypes(lastYearData[continent].points),
    });
  }
  const formattedResult = [];
  thisYearContinentData.map((data) => {
    const lastYearPoints =
      lastYearContinentData.length > 0
        ? lastYearContinentData.filter(
            (last_data) => last_data.continent === data.continent
          )
        : [{ points: 0 }];
    delete data.continent;
    formattedResult.push({
      ...data,
      change:
        (lastYearPoints[0].points !== 0
          ? ((data.points - lastYearPoints[0].points) * 100) /
            lastYearPoints[0].points
          : 0) + "%",
    });
  });
  return res.status(200).send(formattedResult);
});
getPointsByBookType = (points) => {
  let pointsByType = {};
  NEWSLETTER_BOOK_TYPES.map((type, indx) => {
    pointsByType[type] = points[indx] ? points[indx] : 0;
  });
  pointsByType["total"] = getArrayValueSum(points);
  return pointsByType;
};

topTempleByContinent = async (year) => {
  const templeByContinent = await BusinessPlanSummary.findAll({
    where: {
      year: year.toString(),
    },
    attributes: [
      "id",
      "year",
      "group_id",
      "annual_actual_book_points_book_type_total",
    ],
    include: [
      {
        model: Group,
        attributes: [
          "id",
          "name",
          "meeting_city",
          "meeting_state",
          "meeting_country",
          "picture_url",
          "continent",
          "group_type",
        ],
        where: {
          parent_group: {
            [Sq.Op.ne]: null,
          },
        },
      },
    ],
    order: [[{ model: Group }, "continent", "ASC"]],
  });
  let dataByContinent = {};
  templeByContinent.map((templeData) => {
    if (typeof dataByContinent[templeData.group.continent] === "undefined") {
      dataByContinent[templeData.group.continent] = [];
    }
    if (templeData.group.group_type == "Temple") {
      dataByContinent[templeData.group.continent].push({
        id: templeData.group.id,
        name: templeData.group.name,
        country: templeData.group.meeting_country,
        address: [
          templeData.group.meeting_state,
          templeData.group.meeting_country,
        ].join(" "),
        picture_url: templeData.group.picture_url,
        ...getPointsByBookType(
          templeData.annual_actual_book_points_book_type_total
        ),
      });
    }
  });
  return dataByContinent;
};

router.get("/topten-temple-by-continent", async function (req, res) {
  const { year = new Date().getFullYear() } = req.query;
  let thisYearData = await topTempleByContinent(year);
  for (let continent in thisYearData) {
    thisYearData[continent] = thisYearData[continent].sort(
      (a, b) => b.total - a.total
    );
  }
  const lastYearData = await topTempleByContinent(parseInt(year) - 1);
  const formattedResult = {};
  for (let continent in thisYearData) {
    if (typeof formattedResult[continent] === "undefined") {
      formattedResult[continent] = [];
    }
    thisYearData[continent].map((temple) => {
      if (formattedResult[continent].length < 10) {
        // Set Limit here, Default it 10
        let change = 0;
        if (typeof lastYearData[continent] !== "undefined") {
          const lastYear = lastYearData[continent].filter(
            (last) => last.id === temple.id
          );
          const lastTotal =
            typeof lastYear[0] !== "undefined" ? lastYear[0].total : 0;
          if (lastTotal > 0) {
            change = ((temple.total - lastTotal) * 100) / lastTotal;
          }
        }
        formattedResult[continent].push({
          ...temple,
          change: change + "%",
        });
      }
    });
  }
  const formattedData = [];
  for (let continent in formattedResult) {
    formattedData.push({
      continent,
      temples: formattedResult[continent],
    });
  }
  return res.status(200).send(formattedData);
});

// Books Points by Year

router.get("/newsletter-book-points-byyear", async function (req, res) {
  const booksByYears = await BusinessPlanSummary.findAll({
    attributes: [
      "id",
      "year",
      "group_id",
      "annual_actual_book_points_book_type_total",
    ],
    include: [
      {
        model: Group,
        attributes: ["id", "name", "group_type"],
        where: {
          parent_group: null,
        },
      },
    ],
    order: [["year", "ASC"]],
  });

  const dataByYears = [];
  booksByYears.map((bookData) => {
    let pointsByBookType =
      bookData.annual_actual_book_points_book_type_total !== null
        ? bookData.annual_actual_book_points_book_type_total
        : [];
    dataByYears.push({
      title: bookData.year,
      points: getArrayValueSum(pointsByBookType),
    });
  });
  return res.status(200).send(dataByYears);
});

getAllCountriesMonthly = async (year, period) => {
  const allCountriesSummary = await BusinessPlanSummary.findAll({
    where: {
      year: year.toString(),
    },
    attributes: [
      "id",
      "year",
      "group_id",
      "msf_actual_book_points_book_type_total",
      "monthly_actual_book_points_book_type_total",
    ],
    include: [
      {
        model: Group,
        attributes: [
          "id",
          "name",
          "meeting_city",
          "meeting_state",
          "meeting_country",
          "picture_url",
          "group_type",
        ],
        where: {
          group_type: { [Sq.Op.in]: ["Country", "Temple"] },
          parent_group: {
            [Sq.Op.ne]: null,
          },
        },
      },
    ],
    order: [[{ model: Group }, "meeting_country", "ASC"]],
  });
  let groupByCountry = {};
  allCountriesSummary.map((summary) => {
    summary = JSON.parse(JSON.stringify(summary));
    if (typeof groupByCountry[summary.group.meeting_country] === "undefined") {
      groupByCountry[summary.group.meeting_country] = {
        title: summary.group.meeting_country,
        points: [],
      };
    }
    if (period.type === "Month") {
      pointsByBookType =
        summary.monthly_actual_book_points_book_type_total !== null &&
        typeof summary.monthly_actual_book_points_book_type_total[
          period.number
        ] !== "undefined"
          ? summary.monthly_actual_book_points_book_type_total[period.number]
          : [];
    } else {
      pointsByBookType =
        summary.msf_actual_book_points_book_type_total !== null &&
        typeof summary.msf_actual_book_points_book_type_total[period.number] !==
          "undefined"
          ? summary.msf_actual_book_points_book_type_total[period.number]
          : [];
    }
    if (summary.group.group_type == "Temple") {
      groupByCountry[summary.group.meeting_country].points.push(
        pointsByBookType
      );
    }
  });
  return groupByCountry;
};

router.get("/newsletter-all-countries-monthly", async function (req, res) {
  const { year = new Date().getFullYear(), period_id } = req.query;
  const period = await Period.findOne({ where: { id: period_id } });
  const thisYearData = await getAllCountriesMonthly(year, period);
  const thisYearCountryData = [];
  for (let country in thisYearData) {
    thisYearCountryData.push({
      title: country + " (" + thisYearData[country].points.length + ")",
      country,
      ...arrangeArrayIntoBookTypes(thisYearData[country].points),
    });
  }
  const lastYearData = await getAllCountriesMonthly(parseInt(year) - 1, period);
  const lastYearCountryData = [];
  for (let country in lastYearData) {
    lastYearCountryData.push({
      title: country + " (" + lastYearData[country].points.length + ")",
      country,
      ...arrangeArrayIntoBookTypes(lastYearData[country].points),
    });
  }
  let formattedResult = [];
  thisYearCountryData.map((data) => {
    const lastYearPoints =
      lastYearCountryData.length > 0
        ? lastYearCountryData.filter(
            (last_data) => last_data.country === data.country
          )
        : [{ points: 0 }];
    delete data.country;
    formattedResult.push({
      ...data,
      change:
        (lastYearPoints[0].points !== 0
          ? ((data.points - lastYearPoints[0].points) * 100) /
            lastYearPoints[0].points
          : 0) + "%",
    });
  });
  formattedResult = formattedResult.sort((a, b) => b.points - a.points);
  return res.status(200).send(formattedResult);
});

// Get Top Ten Countries Cumulative
pointsByPeriod = (periods, msf_points, month_points) => {
  let allPoints = [0, 0, 0, 0, 0, 0, 0];
  periods.map((period) => {
    if (period.type === "MSF") {
      const points =
        typeof msf_points[period.number] !== "undefined"
          ? msf_points[period.number]
          : [];
      allPoints = points.map((point, indx) => {
        return point + allPoints[indx];
      });
    } else {
      const points =
        typeof month_points[period.number] !== "undefined"
          ? month_points[period.number]
          : [];
      allPoints = points.map((point, indx) => {
        return point + allPoints[indx];
      });
    }
  });
  return allPoints;
};

getTopTenCountriesCumulative = async (year, period) => {
  const periodsData = await Period.findAll({
    where: {
      year: year.toString(),
      end: {
        [Sq.Op.lte]: new Date(period.end),
      },
      type: period.type,
    },
    order: [["start", "asc"]],
  });
  const allCountriesSummary = await BusinessPlanSummary.findAll({
    where: {
      year: year.toString(),
    },
    attributes: [
      "id",
      "year",
      "group_id",
      "msf_actual_book_points_book_type_total",
      "monthly_actual_book_points_book_type_total",
    ],
    include: [
      {
        model: Group,
        attributes: [
          "id",
          "name",
          "meeting_city",
          "meeting_state",
          "meeting_country",
          "picture_url",
          "group_type",
        ],
        where: {
          group_type: { [Sq.Op.in]: ["Country", "Temple"] },
          parent_group: {
            [Sq.Op.ne]: null,
          },
        },
      },
    ],
    order: [[{ model: Group }, "meeting_country", "ASC"]],
  });
  let groupByCountry = {};
  allCountriesSummary.map((summary) => {
    summary = JSON.parse(JSON.stringify(summary));
    if (typeof groupByCountry[summary.group.meeting_country] === "undefined") {
      groupByCountry[summary.group.meeting_country] = [];
    }
    groupByCountry[summary.group.meeting_country].push(
      pointsByPeriod(
        periodsData,
        summary.msf_actual_book_points_book_type_total,
        summary.monthly_actual_book_points_book_type_total
      )
    );
  });
  const formattedData = [];
  for (let country in groupByCountry) {
    formattedData.push({
      title: country + "(" + groupByCountry[country].length + ")",
      country,
      ...arrangeArrayIntoBookTypes(groupByCountry[country]),
    });
  }
  return formattedData;
};

router.get("/newsletter-topten-countries-cumulative", async function (
  req,
  res
) {
  const { year = new Date().getFullYear(), period_id } = req.query;
  const period = await Period.findOne({ where: { id: period_id } });
  let thisYearData = await getTopTenCountriesCumulative(year, period);
  thisYearData = thisYearData.sort((a, b) => b.points - a.points);
  const lastYearData = await getTopTenCountriesCumulative(
    parseInt(year) - 1,
    period
  );
  const formattedResult = [];
  thisYearData.map((data) => {
    if (formattedResult.length <= 10) {
      const lastYearPoints = lastYearData.filter(
        (last) => last.country === data.country
      );
      const lastPoints =
        typeof lastYearPoints[0] === "undefined" ? 0 : lastYearPoints[0].points;
      delete data.country;
      formattedResult.push({
        ...data,
        change:
          lastPoints > 0
            ? ((data.points - lastPoints) * 100) / lastPoints + "%"
            : "0%",
      });
    }
  });
  return res.status(200).send(formattedResult);
});

//update Access Permissions by shekhar
//shekhar
router.patch("/access-permissions", async function (req, res) {
let role = req.body.role;
if(req.body.role == "SuperAdmin"){
  role = "Super Admin"
}
else if(req.body.role == "GroupLeaders"){
  role = "Group Leaders"
}
console.log('permissions are', req.body.permissions)
for (const property in req.body.permissions) {
  let permission = {
    create : req.body.permissions[property].create,
    read : req.body.permissions[property].read,
    edit : req.body.permissions[property].update,
    delete : req.body.permissions[property].delete
  };
 // console.log(permission);
  AccessPermission.update(permission,{ where: { [Sq.Op.and]: {
        roles: role,
        screen: property
      },
    }, })
    .then((result) => {
      if (result) {
        console.log('resss', result);
       // console.log(result);
        
      } else {
        //res.status(404).send({ success: 0 });
      }
    })
    .catch((err) => {
      console.log('errrr', err)
      //res.status(503).send({ error: err.original });
    });
    
  }
  setTimeout(function () {
  AccessPermission.findAll({
    attributes: ["screen", "create", "read", "edit", "delete"],
    where: {
      roles: role
    },
  })
  .then((array) => {
    res.status(200).send({permissions : commonPermissionsObject(array), message: "Permissions updated successfully!", role : req.body.role });
  })
  .catch((err) => {
    console.log('eeeee', err)
  });
}, 500)
  
});

// shekhar
router.post("/role-access-permission", function (req, res) {
  // console.log('reachedddd', req.body.role)
  AccessPermission.findAll({
    attributes: ["screen", "create", "read", "edit", "delete"],
    where: {
      roles: req.body.role
    },
  })
  .then((array) => {
    res.status(200).send({permissions : commonPermissionsObject(array)});
  })
  .catch((err) => {
    console.log('eeeee', err)
  });
  })



// Get all temples

getAllTemples = async (year, period) => {
  const allTemplesSummary = await BusinessPlanSummary.findAll({
    where: {
      year: year.toString(),
    },
    attributes: [
      "id",
      "year",
      "group_id",
      "msf_actual_book_points_book_type_total",
      "monthly_actual_book_points_book_type_total",
    ],
    include: [
      {
        model: Group,
        attributes: [
          "id",
          "name",
          "meeting_city",
          "meeting_state",
          "meeting_country",
          "picture_url",
          "group_type",
        ],
        where: {
          group_type: "Temple",
          parent_group: {
            [Sq.Op.ne]: null,
          },
        },
      },
    ],
    order: [[{ model: Group }, "name", "ASC"]],
  });
  let groupByTemple = {};
  allTemplesSummary.map((summary) => {
    summary = JSON.parse(JSON.stringify(summary));
    if (typeof groupByTemple[summary.group.name] === "undefined") {
      groupByTemple[summary.group.name] = {
        title: summary.group.name,
        country: summary.group.meeting_country,
        picture: summary.group.picture_url,
        points: [],
      };
    }
    if (period.type === "Month") {
      pointsByBookType =
        summary.monthly_actual_book_points_book_type_total !== null &&
        typeof summary.monthly_actual_book_points_book_type_total[
          period.number
        ] !== "undefined"
          ? summary.monthly_actual_book_points_book_type_total[period.number]
          : [];
    } else {
      pointsByBookType =
        summary.msf_actual_book_points_book_type_total !== null &&
        typeof summary.msf_actual_book_points_book_type_total[period.number] !==
          "undefined"
          ? summary.msf_actual_book_points_book_type_total[period.number]
          : [];
    }
    groupByTemple[summary.group.name].points.push(pointsByBookType);
  });
  return groupByTemple;
};

router.get("/newsletter-all-temples", async function (req, res) {
  const { year = new Date().getFullYear(), period_id } = req.query;
  const period = await Period.findOne({ where: { id: period_id } });
  const thisYearData = await getAllTemples(year, period);
  const thisYearCountryData = [];
  for (let temple in thisYearData) {
    thisYearCountryData.push({
      title: thisYearData[temple].title,
      country: thisYearData[temple].country,
      picture: thisYearData[temple].picture,
      temple,
      ...arrangeArrayIntoBookTypes(thisYearData[temple].points),
    });
  }
  const lastYearData = await getAllTemples(parseInt(year) - 1, period);
  const lastYearCountryData = [];
  for (let temple in lastYearData) {
    lastYearCountryData.push({
      title: thisYearData[temple].title,
      country: thisYearData[temple].country,
      picture: thisYearData[temple].picture,
      temple,
      ...arrangeArrayIntoBookTypes(lastYearData[temple].points),
    });
  }
  let formattedResult = [];
  thisYearCountryData.map((data) => {
    const lastYearPoints =
      lastYearCountryData.length > 0
        ? lastYearCountryData.filter(
            (last_data) => last_data.temple === data.temple
          )
        : [{ points: 0 }];
    delete data.temple;
    formattedResult.push({
      ...data,
      change:
        (lastYearPoints[0].points !== 0
          ? ((data.points - lastYearPoints[0].points) * 100) /
            lastYearPoints[0].points
          : 0) + "%",
    });
  });
  formattedResult = formattedResult.sort((a, b) => b.points - a.points);
  return res.status(200).send(formattedResult);
});

// get congregational preachings
getCongregationalPreaching = async (year, period_id) => {
  if (year < 1975) {
    return null;
  }
  const congregationalSummary = await BusinessPlanSummary.findAll({
    where: {
      year: year.toString(),
    },
    attributes: [
      "id",
      "year",
      "group_id",
      "annual_actual_book_points_book_type_total",
      "msf_actual_book_points_book_type_total",
      "monthly_actual_book_points_book_type_total",
      "annual_actual_book_points_total",
    ],
    include: [
      {
        model: Group,
        attributes: [
          "id",
          "name",
          "meeting_city",
          "meeting_state",
          "meeting_country",
          "picture_url",
        ],
        where: {
          parent_group: {
            [Sq.Op.ne]: null,
          },
        },
      },
    ],
    order: [["annual_actual_book_points_total", "DESC"]],
  });
  let period;
  if (period_id) {
    period = await Period.findOne({ where: { id: period_id } });
  }
  const formattedResult = [];
  congregationalSummary.map((group) => {
    let group_data = {};
    let pointsByBookType =
      group.annual_actual_book_points_book_type_total !== null
        ? group.annual_actual_book_points_book_type_total
        : [];
    if (period_id) {
      if (period.type === "Month") {
        pointsByBookType =
          group.monthly_actual_book_points_book_type_total !== null &&
          typeof group.monthly_actual_book_points_book_type_total[
            period.number
          ] !== "undefined"
            ? group.monthly_actual_book_points_book_type_total[period.number]
            : [];
      } else {
        pointsByBookType =
          group.msf_actual_book_points_book_type_total !== null &&
          typeof group.msf_actual_book_points_book_type_total[period.number] !==
            "undefined"
            ? group.msf_actual_book_points_book_type_total[period.number]
            : [];
      }
    }
    NEWSLETTER_BOOK_TYPES.map((type, indx) => {
      group_data[type] = pointsByBookType[indx] ? pointsByBookType[indx] : 0;
    });
    formattedResult.push({
      id: group.group.id,
      title: group.group.name,
      picture: group.group.picture_url,
      ...group_data,
      points: getArrayValueSum(pointsByBookType),
    });
  });
  return formattedResult;
};

router.get("/newsletter-congregational-preaching", async function (req, res) {
  const { year = new Date().getFullYear(), period_id } = req.query;
  const thisYear = await getCongregationalPreaching(year, period_id);
  const lastYear = await getCongregationalPreaching(
    parseInt(year) - 1,
    period_id
  );
  let formattedResult = [];
  thisYear.map((data) => {
    const lastYearPoints =
      lastYear !== null
        ? lastYear.filter((last_data) => last_data.id === data.id)
        : [{ points: 0 }];
    delete data.id;
    formattedResult.push({
      ...data,
      change:
        lastYearPoints.length > 0
          ? (lastYearPoints[0].points !== 0
              ? ((data.points - lastYearPoints[0].points) * 100) /
                lastYearPoints[0].points
              : 0) + "%"
          : 0 + "%",
    });
  });
  formattedResult = formattedResult.sort((a, b) => b.points - a.points);
  return res.status(200).send(formattedResult);
});

newsletterTransactionItems = async (
  transaction_where,
  start_date,
  end_date
) => {
  const transactions = await Transaction.findAll({
    where: transaction_where,
    attributes: ["id", "date"],
    include: [
      {
        model: TransactionLineItem,
        attributes: ["id", "item_id", "quantity", "price"],
        include: [
          {
            model: Item,
            attributes: ["name", "book_type", "bbt_book_points"],
          },
        ],
      },
    ],
  })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(error);
    });

  var date = new Date();
  const start = start_date
    ? new Date(start_date)
    : new Date(date.getFullYear(), date.getMonth(), 1);
  const end = end_date
    ? new Date(end_date)
    : new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return transactionItemFormat(transactions, {
    start,
    end,
  });
};

router.get("/newsletter-book-types", async function (req, res) {
  const { year = 2020, period_id } = req.query;
  let summaryBookTypeWise = await BusinessPlanSummary.findOne({
    where: {
      year,
    },
    attributes: [
      "id",
      "year",
      "group_id",
      "annual_actual_book_points_total",
      "annual_actual_book_points_book_type_total",
      "msf_actual_book_points_book_type_total",
      "monthly_actual_book_points_book_type_total",
    ],
    include: [
      {
        model: Group,
        where: {
          parent_group: null,
        },
        attributes: [
          "id",
          "name",
          "meeting_city",
          "meeting_state",
          "meeting_country",
          "picture_url",
        ],
      },
    ],
  });
  let formattedResult = {};
  NEWSLETTER_BOOK_TYPES.map((type, indx) => {
    if (
      summaryBookTypeWise.annual_actual_book_points_book_type_total &&
      summaryBookTypeWise.annual_actual_book_points_book_type_total !== null
    ) {
      formattedResult[type] = summaryBookTypeWise
        .annual_actual_book_points_book_type_total[indx]
        ? summaryBookTypeWise.annual_actual_book_points_book_type_total[indx]
        : 0;
    } else {
      formattedResult[type] = 0;
    }
  });
  let period_number = new Date().getMonth(); // Default is current month
  let period_type = "Month";
  let period_start_month = period_number;
  let period_end_month = period_number;
  if (period_id) {
    const period = await Period.findOne({ where: { id: period_id } });
    period_number = period.number - 1;
    period_type = period.type;
    period_start_month = new Date(period.start).getMonth();
    period_end_month = new Date(period.end).getMonth();
  }
  let month_points = 0;
  if (period_type === "Month") {
    if (
      summaryBookTypeWise.monthly_actual_book_points_book_type_total !== null
    ) {
      month_points = summaryBookTypeWise
        .monthly_actual_book_points_book_type_total[period_number]
        ? getArrayValueSum(
            summaryBookTypeWise.monthly_actual_book_points_book_type_total[
              period_number
            ]
          )
        : 0;
    }
  } else {
    // MSF
    if (summaryBookTypeWise.msf_actual_book_points_book_type_total !== null) {
      month_points = summaryBookTypeWise.msf_actual_book_points_book_type_total[
        period_number
      ]
        ? getArrayValueSum(
            summaryBookTypeWise.msf_actual_book_points_book_type_total[
              period_number
            ]
          )
        : 0;
    }
  }
  const year_points =
    summaryBookTypeWise.annual_actual_book_points_total !== null
      ? summaryBookTypeWise.annual_actual_book_points_total
      : 0;
  const month_name =
    period_start_month === period_end_month
      ? MONTHS[period_start_month]
      : MONTHS[period_start_month] + " - " + MONTHS[period_end_month];
  formattedResult = {
    ...formattedResult,
    month: {
      name: month_name,
      points: month_points,
    },
    year: {
      name: year,
      points: year_points,
    },
    lifetime_points: 4999640 + year_points,
  };
  return res.status(200).send(formattedResult);
});




// NewsLetter Top 50 INDIVIDUALS
getTopIndividuals = async (_where) => {
  const transactions = await Transaction.findAll({
    where: _where,
    attributes: [
      "id",
      "date",
      "transaction_amount",
      "transaction_book_points",
      "transaction_group_id",
      "transasction_status",
    ],
    include: [
      {
        model: TransactionLineItem,
        attributes: ["id", "item_id", "quantity"],
        include: [
          {
            model: Item,
            attributes: ["id", "name", "book_type", "bbt_book_points"],
          },
        ],
      },
      {
        model: TransactionPeople,
        attributes: ["id", "transaction_id", "distributor_id"],
        include: [
          {
            model: People,
            attributes: [
              "id",
              "preferred_name",
              "firstname",
              "middle_name",
              "lastname",
            ],
          },
        ],
      },
      {
        model: Group,
        attributes: ["id", "name", "picture_url"],
      },
    ],
  }).then((result) => result);

  let people_transaction = {};
  transactions.map((trans) => {
    const typepoints = transactionItemFormat([trans]);
    trans.transaction_people.map((people) => {
      if (typeof people_transaction[people.distributor_id] === "undefined") {
        people_transaction[people.distributor_id] = {
          name: [people.person.firstname, people.person.lastname].join(" "),
          points: { ...typepoints },
        };
      } else {
        const old_points = {
          ...people_transaction[people.distributor_id].points,
        };
        people_transaction[people.distributor_id].points.mbig =
          old_points.mbig + typepoints.mbig;
        people_transaction[people.distributor_id].points.big =
          old_points.big + typepoints.big;
        people_transaction[people.distributor_id].points.large =
          old_points.large + typepoints.large;
        people_transaction[people.distributor_id].points.medium =
          old_points.medium + typepoints.medium;
        people_transaction[people.distributor_id].points.small =
          old_points.small + typepoints.small;
        people_transaction[people.distributor_id].points.btg =
          old_points.btg + typepoints.btg;
        people_transaction[people.distributor_id].points.full =
          old_points.full + typepoints.full;
      }
    });
  });
  return people_transaction;
};

router.get("/newsletter-top-individuals", async function (req, res) {
  const { year = new Date().getFullYear(), start_date, end_date } = req.query;
  const start = start_date
    ? new Date(start_date)
    : new Date(year, 0, 1, 23, 59, 59);
  const end = end_date
    ? new Date(end_date)
    : new Date(year, 11, 31, 23, 59, 59);
  let transaction_where = {};
  transaction_where = {
    date: {
      [Sq.Op.between]: [start, end],
    },
  };
  const people_transaction = await getTopIndividuals(transaction_where);

  // Get Last Year
  var last_start = start_date
    ? new Date(start_date)
    : new Date(year, 0, 1, 23, 59, 59);
  var pastYear = last_start.getFullYear() - 1;
  last_start.setFullYear(pastYear);
  var last_end = end_date
    ? new Date(end_date)
    : new Date(year, 11, 31, 23, 59, 59);
  var pastEndYear = last_end.getFullYear() - 1;
  last_end.setFullYear(pastEndYear);

  transaction_where = {
    date: {
      [Sq.Op.between]: [last_start, last_end],
    },
  };
  const last_year_people_transaction = await getTopIndividuals(
    transaction_where
  );

  let people_transaction_arr = [];
  for (let distributor_id in people_transaction) {
    const points = getArrayValueSum(
      Object.values(people_transaction[distributor_id].points)
    );
    const last_year_points = last_year_people_transaction[distributor_id]
      ? getArrayValueSum(
          Object.values(last_year_people_transaction[distributor_id].points)
        )
      : 0;
    people_transaction_arr.push({
      title: people_transaction[distributor_id].name,
      change:
        last_year_points === 0
          ? "0%"
          : (((points - last_year_points) * 100) / last_year_points).toFixed(
              2
            ) + "%",
      ...people_transaction[distributor_id].points,
      points,
    });
  }
  people_transaction_arr = people_transaction_arr.sort(
    (a, b) => b.points - a.points
  );
  const top_fifty_individual = people_transaction_arr.slice(0, 50);
  return res.status(200).send(top_fifty_individual);
});

router.get("/search-period", function (req, res) {
  const { q, year = "2020" } = req.query;
  Period.findAll({
    attributes: ["id", "name", "year", "number", "start", "end", "type"],
    where: {
      year,
      name: { [Sq.Op.iLike]: `%${q}%` },
    },
  })
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ success: 0 });
      }
    })
    .catch((err) => {
      res.send({ error: err.original });
    });
});

router.get("/settings", function (req, res){
  Setting.findAll({
    attributes: ["key", "value"]
  })
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ success: 0 });
      }
    })
    .catch((err) => {
      res.send({ error: err.original });
    });
  
})

commonPermissionsObject = (array) => {
  var formarray = {}
  for (i in array){
formarray[array[i].screen] = {
"create" : array[i].create,
"read" :array[i].read,
"update" : array[i].edit,
"delete" :array[i].delete
}
}
return formarray
}


const getDashboardGrowth = async (_where) => {
   console.log('m working', _where.year)
  let growth = [];
  if (parseInt(_where.year) >= 2019) {
    growth = await BusinessPlanSummary.findAll({
      where: _where,
      attributes: [
        [
          Sq.fn("sum", Sq.col("annual_actual_book_points_total")),
          "total_annual_actual_book_points",
        ],
        [
          Sq.fn("sum", Sq.col("annual_actual_bbt_amount_total")),
          "total_annual_actual_bbt_amount",
        ],
      ],
    });
    console.log('growth is', growth)
  } else {
   
    growth = [
      {
        total_annual_actual_book_points: null,
        total_annual_actual_bbt_amount: null,
      },
    ];
  }
  return growth;
};

module.exports = router;
