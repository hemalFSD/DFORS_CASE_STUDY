using System.Collections.Generic;
using System.IO;
using System.Linq;
using BasicInfoApi.Models;

namespace BasicInfoApi.Services
{
    public class CsvService
    {
        private readonly string _filePath;

        public CsvService(string filePath)
        {
            _filePath = filePath;
        }

        public List<BasicInfo> ReadAll()
        {
            var list = new List<BasicInfo>();
            if (!File.Exists(_filePath)) return list;
            var lines = File.ReadAllLines(_filePath);
            foreach (var line in lines.Skip(1)) // skip header
            {
                var parts = line.Split(',');
                if (parts.Length == 4)
                {
                    list.Add(new BasicInfo
                    {
                        Id = int.Parse(parts[0]),
                        Name = parts[1],
                        DateOfBirth = parts[2],
                        Location = parts[3]
                    });
                }
            }
            return list;
        }

        public void WriteAll(List<BasicInfo> infos)
        {
            var lines = new List<string>
            {
                "Id,Name,DateOfBirth,Location"
            };
            lines.AddRange(infos.Select(i => $"{i.Id},{i.Name},{i.DateOfBirth},{i.Location}"));
            File.WriteAllLines(_filePath, lines);
        }

        public void Append(BasicInfo info)
        {
            var line = $"{info.Id},{info.Name},{info.DateOfBirth},{info.Location}";
            if (!File.Exists(_filePath))
            {
                File.WriteAllText(_filePath, "Id,Name,DateOfBirth,Location\n" + line + "\n");
            }
            else
            {
                File.AppendAllText(_filePath, line + "\n");
            }
        }

        public BasicInfo UpdateById(int id, BasicInfo updatedInfo)
        {
            var list = ReadAll();
            var idx = list.FindIndex(x => x.Id == id);
            if (idx == -1) return null;
            // Update fields
            list[idx].Name = updatedInfo.Name;
            list[idx].DateOfBirth = updatedInfo.DateOfBirth;
            list[idx].Location = updatedInfo.Location;
            WriteAll(list);
            return list[idx];
        }
    }
}
