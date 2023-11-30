namespace db;

using { cuid } from '@sap/cds/common';

define entity FlightClasses : cuid {
    classCode : String(1) not null; 
}

define entity Users : cuid {
    name        : String(50) not null;
    email       : String;
    phoneNumber : String; 

    address     : Association to one Addresses not null;
    bookings    : Composition of many Bookings on bookings.user = $self;
}

define entity Addresses : cuid {
    street      : String not null;
    postCode    : Integer not null;
    city        : String not null;
    country     : String not null;
}

define entity Bookings {
    key ID        :   Integer not null;
    airlineID     :   String(2) not null;
    flightDate    :   Date default $now;
    class         :   Association to one FlightClasses not null;

    user          :   Association to one Users;
}