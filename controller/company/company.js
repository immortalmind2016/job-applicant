var jwt = require("jsonwebtoken");
const Job = require("../../model/Job");
const mongoose = require("mongoose");
const Notification = mongoose.model("Notification");
const Company_profile = require("../../model/Company_profile");
const Applicant_profile = require("../../model/Applicant_profile");
const config = require("../../config");
const Company_applicant = require("../../model/Company_applicant");
const User = require("../../model/user");
const { sendSocketNotification } = require("../../services/notifications");
const moment = require("moment");
const InterviewCode = require("../../model/InterviewCode");
const cuid = require("cuid");
var randomstring = require("randomstring");
const { sendPushNotificationToUser } = require("../../services/fcm");
const { login } = require("../admin/admin");

const getCompanyJobs = async (req, res, err) => {
  try {
    const jobs = await Job.aggregate([
      {
        $match: {
          company: mongoose.Types.ObjectId(req.params.companyid),
        },
      },
      {
        $project: {
          title: 1,
          desc: 1,
          requirements: 1,
          experience: 1,
          level: 1,
          language: 1,
          salary: 1,
          type: 1,
          open: 1,
          draf: 1,
          job_type: 1,
          location: 1,
          city: 1,
          career_level: 1,
          years_of_experience: 1,
          salary_range: 1,
          number_of_vacancies: 1,
          job_role: 1,
          hide_salary: 1,
          quiz_length: { $size: "$quiz" },
          created_date: 1,
          quiz_time: 1,
          company: 1,
          applicantsNo: { $size: "$applicants" },
          rejected: {
            $size: {
              $filter: {
                input: "$applicants",
                cond: { $eq: ["$$this.status", "rejected"] },
              },
            },
          },
          positions: 1,
          languages: 1,
          lang_score: 1,
          accepted: {
            $size: {
              $filter: {
                input: "$applicants",
                cond: { $eq: ["$$this.status", "accepted"] },
              },
            },
          },
          oncontact: {
            $size: {
              $filter: {
                input: "$applicants",
                cond: { $eq: ["$$this.status", "oncontact"] },
              },
            },
          },
          shortlisted: {
            $size: {
              $filter: {
                input: "$applicants",
                cond: { $eq: ["$$this.status", "shortlisted"] },
              },
            },
          },
        },
      },
    ]);
    console.log(err, jobs);
    if (jobs) {
      await Job.populate(jobs, {
        path: "company",
        select: ["image"],
        populate: {
          path: "user",
          model: "User",
          select: "name",
        },
      });
      res.json({ jobs });
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log("EDIT JOB ERROR ", err);

    return res.json({ error: err });
  }
};
const jobApplicants = async (req, res, err) => {
  console.log("JOB APPLICANTS");
  try {
    const company = await Company_profile.findOne({ user: req.user._id });

    if (!company) {
      return res.json({ error: "wrong access" });
    }
    //nested populating
    const job = await (
      await Job.findOne({
        $and: [{ _id: req.params.jobid }, { company: company._id }],
      })
    )
      .populate({
        path: "applicants.applicant",
        select: ["image"],
        populate: {
          path: "user",
          model: "User",
          select: "name",
        },
      })

      .execPopulate();
    res.json({ job });
  } catch (err) {
    return res.json({ error: err });
  }
};

const editApplicantStatus = async (req, res, err) => {
  console.log("EDIT APPLICANT STATUS ", req.params.applicantid);
  try {
    const company = await Company_profile.findOne({ user: req.user._id });
    if (!company) {
      return res.json({ error: "wrong access" });
    }
    let results = await Promise.all([
      Applicant_profile.findOne({
        _id: req.params.applicantid,
      }).populate("user", "FCM_token"),
      Job.findOneAndUpdate(
        {
          $and: [
            { _id: req.params.jobid },
            { company: company._id },
            { "applicants.applicant": req.params.applicantid },
          ],
        },
        { $set: { "applicants.$.status": req.body.data.status } },
        { new: true }
      ),
    ]);
    console.log("SEND NOTIFICATIONM");
    let Noti = await Notification.create({
      user: results[0].user._id,
      notificationType: "job",
      job: results[1]._id,
      to: 0,
      title: `${config.notifications.editApplicantStatus.title} ${results[1].title}`,
      body:
        config.notifications.editApplicantStatus.body +
        " " +
        req.body.data.status,
    });
    sendSocketNotification(Noti);
    sendPushNotificationToUser(
      {
        notification: {
          title: `${config.notifications.editApplicantStatus.title} ${results[1].title}`,
          body:
            config.notifications.editApplicantStatus.body +
            " " +
            req.body.data.status,
        },
        data: {
          type: "job",
        },
      },
      results[0].user.FCM_token
    )
      .then((response) => {
        // Response is a message ID string.
        console.log(
          "sendPushNotification/ Successfully sent message:",
          response
        );
      })
      .catch((error) => {
        console.log("sendPushNotification/ Error sending message:", error);
      });
    res.json({ job: results[1] });
  } catch (err) {
    console.log("CANCEL JOB ERROR ", err);
    return res.json({ error: err.message });
  }
};
const applyForJob = async (req, res, err) => {
  try {
    const applicantProfile = await Applicant_profile.findOne({
      user: req.user._id,
    });
    if (!applicantProfile) {
      return res.json({ error: "wrong access" });
    }
    const applicant = {
      applicant: applicantProfile._id,
      quiz_score: req.body.data.quiz_score,
      answers: req.body.data.answers,
    };
    const job = await Job.findOneAndUpdate(
      { $and: [{ _id: req.params.jobid }] },
      { $push: { applicants: applicant } },
      { new: true }
    );
    try {
      let company = await Company_profile.findOne({
        _id: job.company,
      }).populate("user", "FCM_token");
      console.log("COMPANY USER", company);
      let Noti = await Notification.create({
        user: company.user._id,
        notificationType: "job",

        title: config.notifications.applyForJob.title,
        body: config.notifications.applyForJob.body(job.title, req.user.name),
        job: job._id,
        to: 1,
      });
      sendSocketNotification(Noti);
      sendPushNotificationToUser(
        {
          notification: {
            title: `${config.notifications.editApplicantStatus.title} ${results[1].title}`,
            body:
              config.notifications.editApplicantStatus.body +
              " " +
              req.body.data.status,
          },
          data: {
            type: "job",
          },
        },
        company.user.FCM_token
      )
        .then((response) => {
          // Response is a message ID string.
          console.log(
            "sendPushNotification/ Successfully sent message:",
            response
          );
        })
        .catch((error) => {
          console.log("sendPushNotification/ Error sending message:", error);
        });
    } catch (e) {
      console.log("ERROR APPLY ", e);
    }
    res.sendStatus(200);
  } catch (err) {
    return res.json({ error: err });
  }
};
const cancelJob = async (req, res, err) => {
  try {
    const applicantProfile = await Applicant_profile.findOne({
      user: req.user._id,
    });
    if (!applicantProfile) {
      return res.json({ error: "wrong access" });
    }

    const job = await Job.findOneAndUpdate(
      { $and: [{ _id: req.params.jobid }] },
      { $pull: { applicants: { applicant: applicantProfile._id } } },
      { new: true }
    );
    let company = await Company_profile.findOne({
      _id: job.company,
    }).populate("user", "FCM_token");
    const Noti = await Notification.create({
      user: company.user._id,
      notificationType: "job",
      title: config.notifications.cancelJob.title,
      body: config.notifications.cancelJob.body(job.title, req.user.name),
      job: job._id,
      to: 1,
    });
    sendSocketNotification(Noti);
    sendPushNotificationToUser(
      {
        notification: {
          title: `${config.notifications.editApplicantStatus.title} ${results[1].title}`,
          body:
            config.notifications.editApplicantStatus.body +
            " " +
            req.body.data.status,
        },
        data: {
          type: "job",
        },
      },
      company.user.FCM_token
    )
      .then((response) => {
        // Response is a message ID string.
        console.log(
          "sendPushNotification/ Successfully sent message:",
          response
        );
      })
      .catch((error) => {
        console.log("sendPushNotification/ Error sending message:", error);
      });
    res.sendStatus(200);
  } catch (err) {
    return res.json({ error: err });
  }
};

const openContact = async (req, res, err) => {
  try {
    const forDateCheck = {
      "subscribe.endDate": { $gte: new Date().getTime() },
    };

    //moment(GREATER ONE ).diff(moment(LESS ONE)) must be +ve

    console.log("OPEN CONTACT", forDateCheck);
    const applicant = req.body.data.id;

    const companyProfile = await Company_profile.findOne({
      user: req.user._id,
      "subscribe.count": { $gte: 1 },
    });

    if (companyProfile) {
      console.log(companyProfile);
      console.log(moment(companyProfile.subscribe.endDate).diff(moment())); // 86400000)
      if (companyProfile)
        if (moment(companyProfile.subscribe.endDate).diff(moment()) <= 0) {
          return res.status(404).json({ error: "ERROR NOT FOUND G" });
        }
      new Company_applicant({
        applicant,
        company: req.user._id,
      }).save(() => {
        companyProfile.subscribe.count = companyProfile.subscribe.count - 1;
        companyProfile.save();
        return res.sendStatus(200);
      });
    } else {
      try {
        companyProfile.subscribe.count = companyProfile.subscribe.count + 1;
        companyProfile.save();
      } catch (e) {}
      return res.sendStatus(404).json({ error: "not found s" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
};

const getProfiles = async (req, res, err) => {
  try {
    let size = 25;
    let filters = {};
    let {
      searchText,
      searchBy,
      country,
      city,
      language,
      careerLvl,
      educationLvl,
      job_title,
    } = req.query;
    //  console.log(req.query)
    //"basic_info.live_in"={ $regex: searchText, $options: "i" };
    if (country) {
      filters["basic_info.live_in"] = { $regex: country, $options: "i" };
    }
    if (city) {
      filters["basic_info.live_in"] = { $regex: city, $options: "i" };
    }

    if (careerLvl) {
      filters.current_career_level = careerLvl;
    }
    if (educationLvl) {
      filters.current_education_level = educationLvl;
    }
    if (job_title) {
      filters.job_title = searchText;
    }
    if (searchBy == "jobTitle") {
      filters.job_title = { $regex: searchText, $options: "i" };
      // filters["experience.title"] = { $regex: searchText, $options: "i" };
    }

    if (searchBy == "name") {
      console.log("BY NAME");
      let users = await User.find({
        type: false,
        ...(searchBy == "name" &&
          searchText && {
            name: { $regex: searchText, $options: "i" },
          }),
      });
      if (!users) {
        return res.json({ profiles: [], totalResults: 0 });
      }
      usersIds = users.map((user) => {
        return user._id;
      });
      console.log("CONSOLE", {
        ...(searchBy == "name" && { user: { $in: usersIds } }),
        ...filters,
      });
    }
    console.log("FILTERS ", filters);
    let totalResults;
    skip = req.params.skip * size;
    console.log("FILTER QUERY", {
      ...(searchBy == "name" && { user: { $in: usersIds } }),
      ...filters,
      ...(language && { "languages.title": language }),
    });
    let profiles = await Applicant_profile.find(
      {
        ...(searchBy == "name" && { user: { $in: usersIds } }),
        ...filters,
        ...(language && { "languages.title": language }),
      },
      ["image", "user"],
      (err, data) => {
        //GET TOTALRESULT
        console.log(data);
        totalResults = data.filter((p) => p.user).length;
      }
    )
      .populate({
        path: "user",
        select: ["name", "job_title", "live_in", "age"],
      })
      .limit(size)
      .skip(skip);
    // profiles = profiles.filter((profile) => {
    //     //FILTER IF NAME
    //     if (searchBy == "name" && profile.user && searchText) {
    //         console.log(
    //             profile.user.name.toLowerCase() == searchText.toLowerCase()
    //         );
    //         if (profile.user.name.toLowerCase() == searchText.toLowerCase())
    //             return true;
    //         else false;
    //     } else if (profile.user) {
    //         return true;
    //     }
    // });

    //      const totalResults=await Applicant_profile.find({...filters,...(language&&{"languages.title":language})},["image"]).populate("user",["name","job_title","live_in","age"]).count()

    res.json({ profiles, totalResults });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
};

const getCompanies = async (req, res, err) => {
  try {
    let size = 25;
    let filters = {};
    let { searchText, searchBy } = req.query;
    if (searchBy == "plan") {
      filters["subscribe.type"] = { $regex: searchText };
    }
    //  console.log(req.query)

    console.log("REQ > QUERY ", req.query);

    console.log(filters);
    let totalResults;
    skip = req.params.skip * size;
    let usersIds = [];
    if (searchBy == "name") {
      let users = await User.find({
        type: true,
        ...(searchBy == "name" &&
          searchText && {
            name: { $regex: searchText, $options: "i" },
          }),
      });
      if (!users) {
        return res.json({ profiles: [], totalResults: 0 });
      }
      usersIds = users.map((user) => {
        return user._id;
      });
      console.log({
        ...(searchBy == "name" && { user: { $in: usersIds } }),
        ...filters,
      });
    }

    let profiles = await Company_profile.find(
      {
        ...(searchBy == "name" && { user: { $in: usersIds } }),
        ...filters,
      },
      ["image", "subscribe"],
      (err, data) => {
        //GET TOTALRESULT
        totalResults = data.filter((p) => p.user).length;
      }
    )
      .populate({ path: "user", select: ["name"] })
      .limit(size)
      .skip(skip);
    if (totalResults == 25 || skip != 0) {
      totalResults = await Company_profile.find(
        {
          ...(searchBy == "name" && { user: { $in: usersIds } }),
          ...filters,
        },
        ["image", "subscribe"]
      ).count();
      //GET TOTALRESULT
    }
    profiles = profiles.filter((profile) => {
      //FILTER IF NAME
      return true;
      /*   console.log(profile)
    
        if(searchBy=="name"&&profile.user&&searchText){
            console.log(profile.user.name.toLowerCase()==searchText.toLowerCase())
            if( profile.user.name.toLowerCase()==searchText.toLowerCase())
            return true
            else false
        }
        else if(profile.user){
            return true
        }*/
    });

    //      const totalResults=await Applicant_profile.find({...filters,...(language&&{"languages.title":language})},["image"]).populate("user",["name","job_title","live_in","age"]).count()

    res.json({ profiles, totalResults, size });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
  }
};

const opened = async (req, res, err) => {
  const applicant = req.params.id;
  const companyApp = await Company_applicant.findOne({
    company: req.user._id,
    applicant: req.params.id,
  });
  console.log(applicant, companyApp);
  if (companyApp) {
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
};
const subscribe = async (req, res, err) => {
  const { type, companyProfileId, period } = req.body.data;
  const plans = {
    plat: process.env.PLAT,
    gold: process.env.GOLD,
    silver: process.env.SILVER,
    none: 0,
  };
  console.log("SUBSCRIBE ", plans[type]);

  if (Object.keys(plans).indexOf(type) == -1)
    return res.status(404).json({ err: "Plan not found" });
  try {
    let endDate = moment().add(
      1,
      "M"
      // `${period == 0 ? "month" : "year"}`
    );

    Company_profile.findOneAndUpdate(
      { _id: companyProfileId },
      {
        subscribe: {
          count: plans[type] ? Number(plans[type]) : 0,
          type,
          endDate,
          period,
        },
      },
      { new: true },
      (err, doc) => {
        console.log(doc);
        if (!doc) {
          return res.sendStatus(404);
        } else {
          return res.json({ done: true });
        }
      }
    );
  } catch (err) {
    return res.json({ error: err });
  }
};
const generateInterviewCode = async (req, res, err) => {
  let endDate = moment(new Date()).add(
    process.env.INTERVIEW_CODE_LIEFTIME,
    "hours"
  );
  console.log(
    "🚀 ~ file: company.js ~ line 638 ~ generateInterviewCode ~ endDate",
    endDate
  );
  try {
    const result = await Promise.all([
      InterviewCode.create({
        code: randomstring.generate(9),
        endDate,
      }),
      InterviewCode.findOneAndRemove({ endDate: { $lte: new Date() } }),
    ]);

    res.json({ code: result[0] });
  } catch (e) {
    res.status(501).json({ error: e });
  }
};
const validateInterviewCode = async (req, res, err) => {
  const { code } = req.body;
  try {
    const result = await Promise.all([
      InterviewCode.findOne({
        code,
      }),
      InterviewCode.findOneAndRemove({ endDate: { $lte: new Date() } }),
    ]);
    if (result[0]) return res.sendStatus(200);
    else {
      return res.sendStatus(404);
    }
  } catch (e) {
    res.status(501).json({ error: e });
  }
};
module.exports = {
  getCompanyJobs,
  jobApplicants,
  editApplicantStatus,
  applyForJob,
  cancelJob,
  openContact,
  subscribe,
  opened,
  getProfiles,
  getCompanies,
  generateInterviewCode,
  validateInterviewCode,
};
