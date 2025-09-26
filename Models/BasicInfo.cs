using System;

namespace BasicInfoApi.Models
{
    public class BasicInfo
    {
        public int Id { get; set; }
        public string Name { get; set; } // max 30 chars
        public string DateOfBirth { get; set; } // datetime string
        public string Location { get; set; } // CA or MS
    }
}
