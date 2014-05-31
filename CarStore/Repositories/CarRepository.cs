using CarStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;

namespace CarStore.Repositories
{
    public class CarRepository
    {
        Car[] cars = new Car[]
        {
            new Car() { Id = 1, Title = "Fancy car, no damage!", AuthorAdvertCount = 3, AuthorName="Andrew", Cylinders = 4, Description="Toyota's full-frame on/off-roader gets side-curtain airbags, whiplash-thwarting active front headrests, and a positive cutoff switch for its standard VSC system. Choose from V-6 or V-8 power, rear-drive/four-wheel drive, seating for five or seven, and SR5/Sport/Limited trims",
                Fuel="Gas", ImageUrl="../images/car-icon-small.png", SmallImageUrl="../images/car-icon-x-small.png", Location="Location: USA, OH, Clevelend", Make="BMW", Model="750", Odometer="142.194", Price="75k$",
                PublishDate = "1 hour ago", RepairCost="0$", VIN="KJH4568"},
            new Car() { Id = 1, Title = "Old, but really cool", AuthorAdvertCount = 3, AuthorName="Sergii", Cylinders = 4, Description="Toyota's full-frame on/off-roader gets side-curtain airbags, whiplash-thwarting active front headrests, and a positive cutoff switch for its standard VSC system. Choose from V-6 or V-8 power, rear-drive/four-wheel drive, seating for five or seven, and SR5/Sport/Limited trims",
                Fuel="Gas", ImageUrl="../images/car-icon-small.png", SmallImageUrl="../images/car-icon-x-small.png", Location="Location: USA, OH, Clevelend", Make="BMW", Model="750", Odometer="142.194", Price="15k$",
                PublishDate = "5 hours ago", RepairCost="0$", VIN="KJH4568"},
            new Car() { Id = 1, Title = "Small Toyota", AuthorAdvertCount = 3, AuthorName="Andrew", Cylinders = 4, Description="Toyota's full-frame on/off-roader gets side-curtain airbags, whiplash-thwarting active front headrests, and a positive cutoff switch for its standard VSC system. Choose from V-6 or V-8 power, rear-drive/four-wheel drive, seating for five or seven, and SR5/Sport/Limited trims",
                Fuel="Gas", ImageUrl="../images/car-icon-small.png", SmallImageUrl="../images/car-icon-x-small.png",  Location="Location: USA, OH, Clevelend", Make="BMW", Model="750", Odometer="142.194", Price="5k$",
                PublishDate = "Yesterday", RepairCost="0$", VIN="KJH4568"},
            new Car() { Id = 1, Title = "New Hundai", AuthorAdvertCount = 3, AuthorName="Andrew", Cylinders = 4, Description="Toyota's full-frame on/off-roader gets side-curtain airbags, whiplash-thwarting active front headrests, and a positive cutoff switch for its standard VSC system. Choose from V-6 or V-8 power, rear-drive/four-wheel drive, seating for five or seven, and SR5/Sport/Limited trims",
                Fuel="Gas", ImageUrl="../images/car-icon-small.png", SmallImageUrl="../images/car-icon-x-small.png", Location="Location: USA, OH, Clevelend", Make="BMW", Model="750", Odometer="142.194", Price="25k$",
                PublishDate = "Yesterday", RepairCost="0$", VIN="KJH4568"},
            new Car() { Id = 1, Title = "Car of my grandma", AuthorAdvertCount = 3, AuthorName="Andrew", Cylinders = 4, Description="Toyota's full-frame on/off-roader gets side-curtain airbags, whiplash-thwarting active front headrests, and a positive cutoff switch for its standard VSC system. Choose from V-6 or V-8 power, rear-drive/four-wheel drive, seating for five or seven, and SR5/Sport/Limited trims",
                Fuel="Gas", ImageUrl="../images/car-icon-small.png", SmallImageUrl="../images/car-icon-x-small.png", Location="Location: USA, OH, Clevelend", Make="BMW", Model="750", Odometer="142.194", Price="17,1k$",
                PublishDate = "3 days ago", RepairCost="0$", VIN="KJH4568"},
        };

        public IEnumerable<Car> GetAll()
        {
            return cars;
        }

        public IEnumerable<Car> GetByTitleContains(string text)
        {
            Thread.Sleep(5000); // we are searchin
            return cars.Where(x => x.Title.ToLower().Contains(text.ToLower()));
        }
    }
}