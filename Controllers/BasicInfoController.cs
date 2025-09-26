using Microsoft.AspNetCore.Mvc;
using BasicInfoApi.Models;
using BasicInfoApi.Services;
using System.Collections.Generic;
using System.IO;
using System;
using System.Text.RegularExpressions;

namespace BasicInfoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BasicInfoController : ControllerBase
    {
        private readonly CsvService _csvService;
        private static readonly string CsvPath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "basicinfo.csv");

        public BasicInfoController()
        {
            Directory.CreateDirectory(Path.GetDirectoryName(CsvPath));
            _csvService = new CsvService(CsvPath);
        }

        [HttpGet]
        public ActionResult<List<BasicInfo>> Get()
        {
            return _csvService.ReadAll();
        }

        [HttpPost]
        public ActionResult Add([FromBody] BasicInfoCreateDto dto)
        {
            // Validation
            if (string.IsNullOrWhiteSpace(dto.Name) || dto.Name.Length > 30)
                return BadRequest("Name must be provided and <= 30 characters.");
            if (!DateTime.TryParse(dto.DateOfBirth, out _))
                return BadRequest("DateOfBirth must be a valid datetime.");
            if (dto.Location != "CA" && dto.Location != "MS")
                return BadRequest("Location must be either CA or MS.");

            var list = _csvService.ReadAll();
            int nextId = list.Count == 0 ? 1 : list.Max(x => x.Id) + 1;
            var info = new BasicInfo
            {
                Id = nextId,
                Name = dto.Name,
                DateOfBirth = dto.DateOfBirth,
                Location = dto.Location
            };
            list.Add(info);
            _csvService.WriteAll(list);
            return Ok();
        }

        [HttpPut("{userId}")]
        public ActionResult Update(int userId, [FromBody] BasicInfo info)
        {
            // Validation
            if (string.IsNullOrWhiteSpace(info.Name) || info.Name.Length > 30)
                return BadRequest("Name must be provided and <= 30 characters.");
            if (!DateTime.TryParse(info.DateOfBirth, out _))
                return BadRequest("DateOfBirth must be a valid datetime.");
            if (info.Location != "CA" && info.Location != "MS")
                return BadRequest("Location must be either CA or MS.");

            var updated = _csvService.UpdateById(userId, info);
            if (updated == null)
                return NotFound();
            return Ok(updated);
        }

        [HttpDelete]
        public ActionResult Delete([FromQuery] int id)
        {
            var list = _csvService.ReadAll();
            var idx = list.FindIndex(x => x.Id == id);
            if (idx == -1) return NotFound();
            list.RemoveAt(idx);
            _csvService.WriteAll(list);
            return Ok();
        }
    }
}
