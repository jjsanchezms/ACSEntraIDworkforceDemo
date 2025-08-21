# Azure Communication Services + Microsoft Entra ID Demo - Milestone 1

This .NET console application demonstrates how to authenticate users from multiple Microsoft Entra ID tenants (Fabrikam and Contoso) and obtain Azure Communication Services access tokens.

## Features

✅ **Multi-tenant Support**: Authenticate users from both Contoso (host) and Fabrikam (external) tenants  
✅ **JSON Configuration**: Uses `tenant-config.json` for all configuration (no environment variables)  
✅ **Console Authentication**: Device code authentication flow (no browser popup required)  
✅ **Extensive Debug Logging**: Step-by-step process visibility  
✅ **ACS Token Generation**: Generates and displays Communication Services access tokens  
✅ **Production Ready**: Uses Azure Communication Services SDK and Azure Identity SDK  

## Prerequisites

1. **Azure Communication Services Resource**: Create an ACS resource in Azure portal
2. **Entra ID App Registrations**: Create app registrations in both tenants
3. **Redirect URI Configuration**: Configure the appropriate redirect URIs in Azure AD app registrations:
   - **Contoso tenant**: `http://localhost:5000`
   - **Fabrikam tenant**: `http://localhost:5001`
2. **Visual Studio or .NET 8.0 SDK**: For building and running the application
3. **Web Browser Access**: Required for device code authentication (user navigates manually to https://microsoft.com/devicelogin)

## Configuration

The application uses `tenant-config.json` for configuration. This file contains:

- **Tenant Information**: Tenant IDs, client IDs, and app registration details for both Contoso and Fabrikam
- **ACS Configuration**: Communication Services connection string and endpoint URL  
- **Key Vault Settings**: Azure Key Vault URI (for future use)

⚠️ **Security Note**: The `tenant-config.json` file is automatically added to `.gitignore` to prevent committing sensitive credentials.

## App Registration Setup

For each tenant (Contoso and Fabrikam), ensure your Azure AD app registration includes:

1. **Platform Configuration**: Add "Mobile and desktop applications" platform
2. **Device Code Flow**: Enable "Allow public client flows" in the app registration authentication settings
3. **API Permissions**: Required permissions for Azure Communication Services
4. **Client Secret**: Generate and copy the client secret (if needed)

**Note**: With device code authentication, redirect URIs are not required since the authentication happens directly with Microsoft's device login page.

## Running the Application

1. **Build the project**:
   ```bash
   dotnet build
   ```

2. **Run the application**:
   ```bash
   dotnet run
   ```

3. **Follow the prompts**:
   - Select a tenant (1 for Contoso, 2 for Fabrikam)
   - Open a web browser and go to https://microsoft.com/devicelogin
   - Enter the device code displayed in the console
   - Sign in with your Azure credentials
   - Return to the console to view the generated ACS access token

## Debug Output

The application provides detailed logging for each step:

- 🔧 Configuration loading and validation
- 🏢 Tenant selection process  
- 🔐 Authentication process details
- 🎫 Token credential creation
- ⏳ ACS token generation
- 🎉 Final results with token and expiration

## Project Structure

```
ACSEntraIDDemo/
├── Models/
│   └── TenantConfig.cs          # Configuration models
├── ManageEntraUserAccess.cs     # ACS user access management (from quickstart)
├── Program.cs                   # Main application logic
├── tenant-config.json           # Configuration file (git-ignored)
├── .gitignore                   # Git ignore rules
└── ACSEntraIDDemo.csproj        # Project file
```

## Dependencies

- **Azure.Communication.Common** (v1.4.0): Core ACS SDK
- **Azure.Identity** (v1.14.0): Azure authentication
- **Newtonsoft.Json** (v13.0.3): JSON serialization

## Error Handling

The application includes comprehensive error handling with:

- Configuration validation
- Network connectivity checks  
- Authentication error details
- Troubleshooting guidance

## Troubleshooting

**Device Code Authentication**: If the device code expires, the application will generate a new one. Each device code is valid for 15 minutes.

**Authentication Failed**: Verify tenant IDs and client IDs are correct in `tenant-config.json`.

**Public Client Flow**: Ensure "Allow public client flows" is enabled in your Azure AD app registration under Authentication settings.

**Token Generation Failed**: Check that the ACS resource endpoint URL is correct and the resource is properly configured.

**Configuration Errors**: Validate that `tenant-config.json` is present and contains all required fields.

## Based on Azure Quickstart

This implementation is based on the official Azure Communication Services quickstart:
https://github.com/Azure-Samples/communication-services-dotnet-quickstarts/tree/main/EntraIdUsersSupportQuickstart

## Next Steps

- **Milestone 2**: Web application with ACS UI components
- **Milestone 3**: Real-time chat and calling features