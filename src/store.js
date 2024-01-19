//store.js
import { create } from 'zustand';
import axios from 'axios';

const request = axios.create({
    baseURL: process.env.REACT_APP_baseURL,
    timeout: 1000
});

export const useStore = create((set) => {
    return {
        data: [],
        status: false,
        getData: () => {
            set({ status: false });
            request.get('/')
                .then(res => {
                    set({ data: res.data, status: true });
                })
                .catch((err) => { console.log(err) })
        },
        postData: (f) => {
            set({ status: false });
            request.post('/', f)
                .then(res => {
                    set({ data: res.data, status: true });
                })
                .catch((err) => { console.log(err) })
        },
        putData: (f) => {
            set({ status: false });
            request.put('/', f)
                .then(res => {
                    set({ data: res.data, status: true });
                })
                .catch((err) => { console.log(err) })
        },
        deleteData: (id) => {
            set({ status: false });
            request.delete(`/${id}`)
                .then(res => {
                    set({ data: res.data, status: true });
                })
                .catch((err) => { console.log(err) })
        }
    }
});
