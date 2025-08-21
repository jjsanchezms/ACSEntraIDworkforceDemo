# Azure Communication Services + Microsoft Entra ID Demo - Milestone 1

**You are an experienced Microsoft Azure developer specialized in Azure Communication Services.**

---

## 🔧 Milestone 1: Cross-Tenant Authentication with ACS Token Generation

**Prompt:**

> Create a complete .NET 8.0 console application that demonstrates cross-tenant Azure Communication Services authentication based on this official sample:  
> https://github.com/Azure-Samples/communication-services-dotnet-quickstarts/tree/main/EntraIdUsersSupportQuickstart  
> 
> The application must authenticate users from both Contoso (host tenant) and Fabrikam (external tenant) organizations, generating ACS access tokens for each tenant while using a single ACS resource.

---

## 📋 Required Implementation

### Project Structure
```
ACSEntraIDCrosstenantConsoleDemo/
├── Models/
│   └── TenantConfig.cs              # Configuration data models
├── ManageEntraUserAccess.cs         # Copy from quickstart (unchanged)
├── Program.cs                       # Main authentication logic
├── tenant-config.json               # Configuration file
├── ACSEntraIDCrosstenantConsoleDemo.csproj
└── README.md
```

### Configuration Format
The `tenant-config.json` must include:
```json
{
  "tenants": {
    "contoso": {
      "name": "Contoso (Host Tenant)",
      "tenantId": "GUID",
      "appRegistration": {
        "clientId": "GUID",
        "clientSecret": "SECRET"
      }
    },
    "fabrikam": {
      "name": "Fabrikam (External Tenant)",
      "tenantId": "GUID"
    }
  },
  "azureCommunicationServices": {
    "connectionString": "endpoint=...",
    "endpointUrl": "https://...",
    "resourceId": "/subscriptions/..."
  }
}
```

### Authentication Flow Requirements
1. **Device Code Authentication**: Use `DeviceCodeCredential` for console-based authentication (no browser popups)
2. **Cross-Tenant Pattern**: Fabrikam users authenticate using Contoso's client ID but with their own tenant credentials
3. **Automatic Processing**: Loop through both tenants automatically, not requiring user selection
4. **Token Generation**: Use `CommunicationTokenCredential` with `EntraCommunicationTokenCredentialOptions`

### Debug Output Specifications
The console output must include:
- ✅ Configuration loading with validation details
- ✅ Step-by-step authentication progress for each tenant
- ✅ Device code instructions with tenant-specific guidance
- ✅ Raw JWT token display (chunked for readability)
- ✅ Decoded JWT header and payload analysis
- ✅ Token expiration and scope information
- ✅ Final summary with success/failure counts

### Expected Packages
```xml
<PackageReference Include="Azure.Communication.Common" Version="1.4.0" />
<PackageReference Include="Azure.Identity" Version="1.14.0" />
<PackageReference Include="Newtonsoft.Json" Version="13.0.3" />
```

---

## ✅ Success Criteria

### Technical Requirements
- [x] Device code authentication working for both tenants
- [x] Cross-tenant authentication (Fabrikam users with Contoso client ID)
- [x] ACS token generation for both tenant users
- [x] JWT token payload analysis and display
- [x] Comprehensive error handling with troubleshooting guidance

### Output Requirements  
- [x] Console shows authentication progress for each tenant
- [x] Raw JWT tokens displayed in readable chunks
- [x] Decoded token payloads showing `skypeid` with tenant identifiers
- [x] Final summary with authentication results
- [x] Clear instructions for device code authentication

### Code Quality
- [x] Based on official Azure quickstart sample
- [x] Proper configuration validation
- [x] Extensive debug logging
- [x] Production-ready error handling
- [x] Security-conscious (tenant-config.json in .gitignore)

---

## 🔍 Implementation Notes

**Authentication Pattern**: External tenants (Fabrikam) use the host tenant's (Contoso) app registration but authenticate with their own tenant credentials. This enables cross-tenant access to the same ACS resource.

**Token Analysis**: The generated JWT tokens should contain `skypeid` values that include the tenant GUID, demonstrating successful cross-tenant authentication.

**Error Handling**: Include specific guidance for common issues like 403 Forbidden errors, token timeouts, and app registration configuration problems.

**User Experience**: Provide clear instructions for device code authentication, specifying which tenant credentials to use for each authentication step.

---

## 📄 Deliverables

1. **Complete working console application**
2. **Sample output file** showing successful authentication for both tenants
3. **README.md** with setup instructions and troubleshooting
4. **Configuration template** with placeholder values