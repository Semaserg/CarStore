using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Serialization;

namespace CarStore.Models
{
    public class Car
    {
        public int Id { get; set; }
        
        public string Title { get; set; }
        
        public string Description { get; set; }

        public string AuthorName { get; set; }

        public int AuthorAdvertCount { get; set; }

        public string Location { get; set; }

        public string ImageUrl { get; set; }

        public string SmallImageUrl { get; set; }

        public string Price { get; set; }

        public string Make { get; set; }

        public string Model { get; set; }

        public string Fuel { get; set; }

        public int Cylinders { get; set; }
        
        public string Odometer { get; set; }

        public string VIN { get; set; }

        public string RepairCost { get; set; }

        public string PublishDate { get; set; }

    }
}
