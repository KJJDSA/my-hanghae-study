const express = require("express");
const router = express.Router();
const OTTS = [
  {
    Netflix: {
      ottService: "Netflix",
      price: 170000,
      hostCommision: 490,
      memberCommision: 990,
    }
  },
  {
    Wavve: {
      ottService: "Wavve",
      price: 139000,
      hostCommision: 490,
      memberCommision: 990,

    }
  },
  {
    Watcha: {
      ottService: "Watcha",
      price: 129000,
      hostCommision: 490,
      memberCommision: 990,

    }
  },
  {
    Laftel: {
      ottService: "Laftel",
      price: 149000,
      hostCommision: 490,
      memberCommision: 990,
    }
  },
  {
    Tving: {
      ottService: "Tving",
      price: 139000,
      hostCommision: 490,
      memberCommision: 990,

    }
  },
  {
    "Disney+": {
      ottService: "Disney+",
      price: 99000,
      hostCommision: 490,
      memberCommision: 990,

    }
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