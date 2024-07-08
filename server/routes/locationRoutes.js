import express from "express";

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const response = await fetch("http://api.open-notify.org/iss-now.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("fetching ISS location");
    res.status(200).json({ success: true, data: await response.json() });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Fetching ISS location failed, please try again",
    });
  }
});

export default router;
