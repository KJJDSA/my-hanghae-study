const express = require("express");
const router = express.Router();
const OTTS = [
  {
    ottService: "Netflix",
    price: 170000,
    hostCommision: 490,
    memberCommision: 990,
  },
  {
    ottService: "Wavve",
    price: 139000,
    hostCommision: 490,
    memberCommision: 990,
  },
  {
    ottService: "Watcha",
    price: 129000,
    hostCommision: 490,
    memberCommision: 990,
  },
  {
    ottService: "Laftel",
    price: 149000,
    hostCommision: 490,
    memberCommision: 990,
  },
  {
    ottService: "Tving",
    price: 139000,
    hostCommision: 490,
    memberCommision: 990,
  },
  {
    ottService: "Disney+",
    price: 99000,
    hostCommision: 490,
    memberCommision: 990,
  }
]


router.get("/:ottId", (req, res) => {
  try {
    const { ottId } = req.params
    const ott = OTTS[ottId - 1]
    res.status(200).json({ data: ott })
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;