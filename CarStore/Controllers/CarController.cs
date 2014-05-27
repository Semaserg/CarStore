using CarStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;

namespace CarStore.Controllers
{
    public class CarController : ApiController
    {
        Car[] cars = new Car[]
        {
            new Car() { Id = 1, Title = "BMW" },
            new Car() { Id = 2, Title = "Lanos" },
            new Car() { Id = 3, Title = "Toyota" }
        };

        //[HttpGet]
        //public IEnumerable<Car> GetAll()
        //{
        //    return cars;
        //}

        //[HttpGet]
        //public IHttpActionResult GetCars(string searchText = "")
        //{
        //    Thread.Sleep(3);
        //    if (string.IsNullOrEmpty(searchText))
        //        return Ok(cars);

        //    return Ok(cars.Where(x => x.Title.Contains(searchText)).ToList());
        //}

        [HttpGet]
        public IEnumerable<Car> GetCars(string searchText = "")
        {
            Thread.Sleep(3);
            if (string.IsNullOrEmpty(searchText))
                return cars;

            return cars.Where(x => x.Title.Contains(searchText)).ToList();
        }


    }
}
