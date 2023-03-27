export interface AnswerModel {
  "id": number,
  "value": string,
  "poll": {
    "id": number,
    "token": string,
    "student": {
      "id": number,
      "firstName": string,
      "lastName": string,
      "email": string,
      "matNr": string,
      "group": {
        "name": string,
        "year": string,
        "id": string
      }
    },
    "survey": {
      "id": number,
      "creationDate": string,
      "endDate": string,
      "template": {
        "id": 0,
        "name": string,
        "creationDate": string,
        "markdown": string,
        "description": string
      },
      "status": "CREATED",
      "name": string,
      "description": string,
      "html": string
    }
  }
}
