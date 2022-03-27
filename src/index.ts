import bodyParser from 'body-parser'
import express from 'express'

const SubscriptionValidationEvent = 'Microsoft.EventGrid.SubscriptionValidationEvent'
const app = express()

app.use(bodyParser.json())

app.post('/event-grid-subscriber', function (req: any, res: any) {
  var header = req.get("Aeg-Event-Type");
    if(header && header === 'SubscriptionValidation'){
      const event = req.body[0]
      const isValidationEvent = event && event.data && 
                              event.data.validationCode &&
                              event.eventType && event.eventType == SubscriptionValidationEvent
      if(isValidationEvent){
          return res.send({
            "validationResponse": event.data.validationCode
        })
      }
    }

    // Do something on other event types 
    console.log(req.body)
    res.send(req.body)
})

app.get('/', function (req, res) {
  res.json('Hello World!')
})

app.listen(3000)