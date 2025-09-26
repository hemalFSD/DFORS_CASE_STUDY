# Copilot Instructions for AI Coding Agents

This project is a .NET C# ASP.NET Core WebAPI for managing basic information (name, email, address, phone, pincode, city, state, country) with CRUD operations. Data is persisted in a .csv file.

## Architecture
- Main API logic is in `Controllers/BasicInfoController.cs` (to be created).
- Data model is defined in `Models/BasicInfo.cs` (to be created).
- CSV read/write logic should be implemented in a service class, e.g., `Services/CsvService.cs`.

## Developer Workflows
- Build: `dotnet build`
- Run: `dotnet run`
- Test: Add unit tests in `BasicInfoApi.Tests` (if created), run with `dotnet test`.
- API endpoints follow REST conventions: `/api/basicinfo` for CRUD.

## Project-Specific Conventions
- Use PascalCase for C# class and property names.
- Store CSV files in a `Data` directory at the project root.
- All data access (read/write) should go through the service layer.
- Return appropriate HTTP status codes for API responses.

## Integration Points
- No external dependencies required for CSV operations (use `System.IO`).
- No database integration; all data is file-based.

## Key Files/Directories
- `Controllers/BasicInfoController.cs`: API endpoints
- `Models/BasicInfo.cs`: Data model
- `Services/CsvService.cs`: CSV logic
- `Data/basicinfo.csv`: Data storage

## How to Update
- Add new fields to `BasicInfo` model and update CSV logic accordingly.
- Extend controller for new endpoints as needed.

---

**Feedback Requested:**
- Clarify any additional requirements or conventions.
- Point out files or patterns that need documentation.
- Suggest improvements for future iterations.
