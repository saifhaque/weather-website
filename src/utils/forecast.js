const request=require('request')

const forecast=(lat, long,  callback)=>{
    const url='https://api.darksky.net/forecast/a4ff7afd099db63f41b3e29975e25ef8/' + lat + ',' + long 
    request({url, json: true}, (error, {body})=>{
            if(error){
                callback('Unable to connect to api!', undefined)
            }
            else if(body.error){
                callback('Invalid input!', undefined)
            }
            else{
                callback(undefined, body.hourly.summary + ' Current temperature is ' + 
                body.currently.temperature + ' degrees Fahrenheit. There is a ' + 
                (body.currently.precipProbability)*100 + ' % chance of rain.')
            }
            
        })
}

module.exports=forecast