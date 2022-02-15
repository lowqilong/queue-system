'use strict';

const BaseCore = require('../../core/base-core');
const BookingComponent = require('../components/booking/booking-component'); 

class Facade extends BaseCore {

    constructor() {
        super();

        // this._accountComponent = new AccountComponent;
        this._bookingComponent = new BookingComponent; 
    }

    // booking
    async updateBooking(id, booking) {
        return this._bookingComponent.updateBooking(id, booking);
    }
    async addBooking(booking) {
        return this._bookingComponent.addBooking(booking);
    }

    async delBooking(id) {
        return this._bookingComponent.delBooking(id);
    }

    async getDetailBooking(id) {
        return this._bookingComponent.getDetailBooking(id);
    }
    async getListBooking() {
        return this._bookingComponent.getListBooking();
    }

}

module.exports = Facade;