import url from '../../../assets/gameurls.json';
import Api from '../../../utils/Api';
const GameDataHandler = (function() {
    return{

        getPlanetsApi: function(){
            return new Promise((resolve, reject)=>{
                const route= url.finding_falcone.get_planets;
                Api.get(route)
                .then(response=>{
                    resolve(response.data);
                })
                .catch(error=>{
                    reject(error);
                });
            })
        },
        getVehiclesApi: function(){
            return new Promise((resolve, reject)=>{
                const route= url.finding_falcone.get_vehicles;
                Api.get(route)
                .then(response=>{
                    resolve(response.data);
                })
                .catch(error=>{
                    reject(error);
                })
            })
        },
        getToken: function(){
            return new Promise((resolve, reject)=>{
                const route= url.finding_falcone.get_token;
                Api.post(route,{none: "none"})
                .then(response=>{
                    console.log(response.data);
                    resolve(response.data);
                })
                .catch(error=>{
                    reject(error);
                });
            })
        },
        findFalcone: function(data){
            return new Promise((resolve, reject)=>{
                const route= url.finding_falcone.post_find;
                Api.post(route, data)
                .then(response=>{
                    console.log(response);
                    resolve(response.data);
                })
                .catch(error=>{
                    reject(error);
                });
            })
        },
    }
})()

export default GameDataHandler;