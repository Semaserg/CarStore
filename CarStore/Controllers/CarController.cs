using CarStore.Models;
using CarStore.Repositories;
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
        
        [HttpGet]
        public IEnumerable<Car> GetCars(string searchText = "")
        {
           
            var repo = new CarRepository();

            if (string.IsNullOrEmpty(searchText))
                return repo.GetAll();

            return repo.GetByTitleContains(searchText);
        }


    }
}
