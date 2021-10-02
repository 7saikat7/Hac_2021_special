const usage = require("../Schema/app-usage");

const add_daily_usage = (data) => {
  try {
    let daily_usage = new usage(data);
    await daily_usage.save();
    console.log("Added to daily usage");
    return { status: "Added to daily usage" };
  } catch (e) {
    console.error("could not add to daily usage");
    return { status: "could not add to daily usage" };
  }
};

module.exports = { Add_Daily: add_daily_usage };
