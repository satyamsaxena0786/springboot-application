import axios from 'axios';
import { SET_STOCKS_IN_STORE } from './../constants';

export function addStock(data){
    return dispatch => {
        return axios.post('/api/stocks', data);
    }
}

export function setStocksInStore(stocks, sortingKey='id', sortingDirection=1){

    function sortByKey(a, b) {
        var x = a[sortingKey];
        var y = b[sortingKey];
        
        return (sortingDirection>0)?((x < y) ? -1 : ((x > y) ? 1 : 0)):((x > y) ? -1 : ((x < y) ? 1 : 0));
    }

    stocks.sort(sortByKey);


    return {
        type: SET_STOCKS_IN_STORE, 
        payload: stocks
    }
}

export function listAllStocks(sortingKey='id', sortingDirection=1){
    return dispatch => {
        return axios.get('/api/stocks').then(
            res => {
                let stocks = res.data; 
                dispatch(setStocksInStore(stocks, sortingKey, sortingDirection)); 
            }
        );
    }
}

export function listOneStock(id){
    return dispatch => {
        return axios.get('/api/stocks/'+id);
    }
}

export function updateStock(id, data){
    return dispatch => {
        return axios.put('/api/stocks/'+id, data);
    }
}

export function deleteStock(id){
    return dispatch => {
        return axios.delete('/api/stocks/'+id);
    }
}


