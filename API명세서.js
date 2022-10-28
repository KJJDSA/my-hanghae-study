const getMypageData = {
  "nickname": "sparta",
  "email": "email@email.com",
  "phone": "010-0000-0000",
  "matching": [
    {
      "ottService": "Netflix",
      "status": true,
      "ID": "spartaNexflix",
      "Password": "1234",
      "teamMates": ["두식이", "석삼이", "너구리"]
    },
    {
      "ottService": "watcha",
      "status": false,
      "ID": "spartaWatcha",
      "Password": "1234",
      "teamMates": ["두식이"]
    }
  ]
}

const getMyBankAccount = [
  {
    "accountId": 1,
    "bank": "IBK",
    "account": "000-000-000-000"
  },
  {
    "accountId": 2,
    "bank": "KB",
    "account": "000-000-000-000"
  }
]

const getMyBankCard = [
  {
    "cardId": 1,
    "bank": "IBK",
    "card": "000-000-000-000"
  },
  {
    "cardId": 2,
    "bank": "KB",
    "card": "000-000-000-000"
  }
]

const postAddpartyHost = {
  "ottService": "Netflix",
  "ottAccount": {
    "ID": "spartaNexflix",
    "Password": "1234",
  },
  "bankAccount": {
    "bank": "IBK",
    "account": "000-000-000-000"
  }
}

const postAddpartyMenber = {
  "ottService": "Netflix",
  "bankCard": {
    "bank": "IBK",
    "card": "0000-0000-0000-0000",
    "MM/YY": "00/00",
    "birth": "123456-1",
    "password": "1234",
  }
}