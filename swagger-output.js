require('dotenv').config();
module.exports = {
  "swagger": "2.0",
  "info": {
    "version": "1.0.0",
    "title": "4조 MINI SWAGGER~",
    "description": "4조 MINI SWAGGER데스"
  },
  "host": process.env.EC2 || "localhost:6060",
  "basePath": "/",
  "tags": [
    {
      "name": "User",
      "description": "Endpoints"
    }
  ],
  "schemes": [
    "http"
  ],
  "securityDefinitions": {
    "apiKeyAuth": {
      "type": "apiKey",
      "in": "cookie",
      "name": "HangHae99",
      "description": "any description..."
    }
  },
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json"
  ],
  "paths": {
    "/": {
      "get": {
        "description": "",
        "parameters": [],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/star/posts/": {
      "get": {
        "description": "",
        "parameters": [],
        "responses": {}
      },
      "post": {
        "description": "",
        "parameters": [],
        "responses": {
          "401": {
            "description": "Unauthorized"
          }
        }
      }
    },
    "/api/star/posts/{postId}": {
      "get": {
        "description": "",
        "parameters": [],
        "responses": {}
      },
      "put": {
        "description": "",
        "parameters": [
          {
            "name": "postId",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "401": {
            "description": "Unauthorized"
          }
        }
      },
      "delete": {
        "description": "",
        "parameters": [
          {
            "name": "postId",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "401": {
            "description": "Unauthorized"
          }
        }
      }
    },
    "/api/star/posts/likes/{postId}": {
      "put": {
        "description": "",
        "parameters": [
          {
            "name": "postId",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "401": {
            "description": "Unauthorized"
          }
        }
      }
    },
    "/api/star/comments/{postId}": {
      "get": {
        "description": "",
        "parameters": [],
        "responses": {}
      },
      "post": {
        "description": "",
        "parameters": [
          {
            "name": "postId",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "401": {
            "description": "Unauthorized"
          }
        }
      }
    },
    "/api/star/comments/{commentId}": {
      "put": {
        "description": "",
        "parameters": [
          {
            "name": "commentId",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "401": {
            "description": "Unauthorized"
          }
        }
      },
      "delete": {
        "description": "",
        "parameters": [
          {
            "name": "commentId",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "401": {
            "description": "Unauthorized"
          }
        }
      }
    },
    "/api/users/": {
      "get": {
        "description": "",
        "parameters": [],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      },
      "post": {
        "description": "",
        "parameters": [],
        "responses": {}
      }
    },
    "/api/users/login": {
      "post": {
        "description": "",
        "parameters": [],
        "responses": {}
      }
    }
  },
  "definitions": {
    "signup": {
      "type": "object",
      "properties": {
        "father": {
          "type": "string",
          "example": "Simon Doe"
        },
        "mother": {
          "type": "string",
          "example": "Marie Doe"
        }
      }
    },
    "User": {
      "type": "object",
      "properties": {
        "userId": {
          "type": "number",
          "example": 1
        },
        "nickname": {
          "type": "string",
          "example": "aaa"
        },
        "password": {
          "type": "string",
          "example": "1111"
        }
      },
      "required": [
        "nickname",
        "password"
      ]
    },
    "AddUser": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "example": "Jhon Doe"
        },
        "age": {
          "type": "number",
          "example": 29
        },
        "about": {
          "type": "string",
          "example": ""
        }
      },
      "required": [
        "name",
        "age"
      ]
    }
  }
}