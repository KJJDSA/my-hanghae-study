const express = require('express');
const router = express.Router();

const MyPartyController = require('../controllers/myparty');
const myPartyController = new MyPartyController;

// 전체 파티 정보 불러오기
router.get('/', myPartyController.allPartyInfo);

// OTT 정보 수정하기
router.put('/:partyId', myPartyController.changePartyInfo);

module.exports = router;