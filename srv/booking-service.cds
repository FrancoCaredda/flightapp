using { db } from '../db/schema';

define service BookingService {
    @readonly
    define entity FlightClasses as projection on db.FlightClasses;
    define entity Users as projection on db.Users;
    define entity Addresses as projection on db.Addresses;
    define entity Bookings as projection on db.Bookings;
}