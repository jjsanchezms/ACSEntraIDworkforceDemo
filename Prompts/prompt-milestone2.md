# Azure Communication Services + Microsoft Entra ID Demo - Milestone 2

**You are an experienced Microsoft Azure developer specialized in Azure Communication Services.**

---

## 🌐 Milestone 2: Cross-Tenant Web Authentication with ACS Token Display

**Prompt:**

> Create a complete ASP.NET Core web application that replicates the cross-tenant authentication functionality from Milestone 1, but adapted for web browsers using Authorization Code Flow instead of Device Code Flow.
> 
> The application must demonstrate the same cross-tenant pattern: authenticate users from both Contoso (host tenant) and Fabrikam (external tenant) organizations, generating ACS access tokens for each tenant while using the same ACS resource and configuration.

---

## 📋 Required Implementation

### Project Structure
```
ACSEntraIDWebDemo/
├── Controllers/
│   ├── HomeController.cs            # Main page controller
│   └── AuthController.cs            # Authentication endpoints
├── Models/
│   ├── TenantConfig.cs              # Same config models from Milestone 1
│   └── AuthenticationViewModel.cs   # View models for UI
├── Views/
│   ├── Home/
│   │   └── Index.cshtml             # Main page with login buttons
│   └── Shared/
│       └── _Layout.cshtml           # Layout following ACS design
├── wwwroot/
│   ├── css/                         # ACS UI Library compliant styles
│   └── js/
│       └── auth-debug.js            # Client-side debugging
├── Services/
│   └── ACSTokenService.cs           # ACS token generation service
├── tenant-config.json               # Same config from Milestone 1
├── appsettings.json
├── Program.cs
└── ACSEntraIDWebDemo.csproj
```

### Technology Stack
- **ASP.NET Core 8.0** with MVC pattern
- **Microsoft.Identity.Web** for Azure AD integration
- **Azure.Communication.Common** and **Azure.Identity** (same versions as Milestone 1)
- **Bootstrap** styled to match ACS UI Library guidelines
- **Client-side JavaScript** for debugging and token display

### Authentication Flow Requirements
1. **Authorization Code Flow**: Use `Microsoft.Identity.Web` with redirect-based authentication
2. **Cross-Tenant Support**: Same pattern as Milestone 1 - Fabrikam users authenticate using Contoso's app registration
3. **Tenant-Specific Buttons**: Two distinct login buttons with tenant-specific styling and behavior
4. **Configuration Reuse**: Use the exact same `tenant-config.json` format from Milestone 1
5. **ACS Token Generation**: Server-side token generation using the same `CommunicationTokenCredential` pattern

### UI/UX Requirements
```html
<!-- Main page layout following ACS Design Kit -->
<div class="container acs-container">
  <h1 class="acs-header">Cross-Tenant Azure Communication Services Demo</h1>
  
  <div class="tenant-auth-section">
    <div class="tenant-card contoso-card">
      <h3>Contoso Corporation</h3>
      <p>Host Tenant Authentication</p>
      <button class="btn-acs-primary" onclick="loginContoso()">
        🏢 Login with Contoso
      </button>
    </div>
    
    <div class="tenant-card fabrikam-card">  
      <h3>Fabrikam Inc.</h3>
      <p>External Tenant Authentication</p>
      <button class="btn-acs-secondary" onclick="loginFabrikam()">
        🏢 Login with Fabrikam
      </button>
    </div>
  </div>
  
  <!-- Token display area (shown after authentication) -->
  <div id="token-results" class="token-display-section" style="display:none;">
    <h2>Authentication Results</h2>
    <div class="token-analysis">
      <!-- Same JWT analysis as Milestone 1 -->
    </div>
  </div>
</div>
```

### Debug Output Specifications
The application must provide comprehensive logging both server-side and client-side:

**Server-Side Logging:**
- ✅ Configuration loading and validation (same as Milestone 1)
- ✅ Authentication request processing for each tenant
- ✅ ACS token generation with detailed debugging
- ✅ JWT token analysis and payload decoding

**Client-Side Logging (Browser Console):**
- ✅ Button click events with tenant identification
- ✅ Authentication redirect flow tracking
- ✅ Token reception and display
- ✅ JWT payload analysis (same format as Milestone 1)

### Expected Packages
```xml
<PackageReference Include="Microsoft.Identity.Web" Version="2.16.0" />
<PackageReference Include="Microsoft.Identity.Web.UI" Version="2.16.0" />
<PackageReference Include="Azure.Communication.Common" Version="1.4.0" />
<PackageReference Include="Azure.Identity" Version="1.14.0" />
<PackageReference Include="Newtonsoft.Json" Version="13.0.3" />
```

---

## ✅ Success Criteria

### Technical Requirements
- [x] Authorization Code Flow authentication working for both tenants
- [x] Cross-tenant authentication (Fabrikam users with Contoso app registration)
- [x] Same `tenant-config.json` configuration from Milestone 1
- [x] ACS token generation for both tenant users via web interface
- [x] JWT token payload analysis and display (same format as Milestone 1)
- [x] Comprehensive error handling with troubleshooting guidance

### UI/UX Requirements
- [x] ACS UI Library compliant design and styling
- [x] Tenant-specific login buttons with clear visual distinction
- [x] Real-time token display with formatted JWT analysis
- [x] Responsive design following ACS Design Kit guidelines
- [x] Debug information displayed in browser console

### Output Requirements
- [x] Web page shows authentication progress for each tenant
- [x] Same JWT token analysis as Milestone 1 (raw token + decoded payload)
- [x] Browser console shows detailed authentication flow debugging
- [x] Token payload displays `skypeid` with tenant identifiers
- [x] Error handling with user-friendly messages and technical details

### Code Quality
- [x] Production-ready ASP.NET Core application
- [x] Same configuration validation and security practices as Milestone 1
- [x] Extensive server and client-side logging
- [x] Clean separation of concerns (Controllers, Services, Models)
- [x] Security-conscious (tenant-config.json in .gitignore)

---

## 🔍 Implementation Notes

**Authentication Pattern**: Maintain the same cross-tenant approach from Milestone 1 - external tenants (Fabrikam) use the host tenant's (Contoso) app registration but authenticate with their own tenant credentials.

**Configuration Reuse**: Use the exact same `tenant-config.json` file from Milestone 1 with redirect URIs added to the app registration configuration.

**Token Analysis**: Display the same comprehensive JWT token analysis from Milestone 1, but in a web-friendly format with proper HTML formatting and client-side JavaScript.

**User Experience**: Provide clear visual distinction between tenants while maintaining the ACS UI Library design standards for professional appearance.

**Error Handling**: Include the same detailed error handling and troubleshooting guidance from Milestone 1, but adapted for web display.

---

## 🔄 Migration from Milestone 1

**Similarities to Maintain:**
- Same configuration file and structure
- Same ACS token generation logic
- Same JWT token analysis and display
- Same cross-tenant authentication pattern
- Same comprehensive debugging approach

**Changes for Web Environment:**
- Device Code Flow → Authorization Code Flow
- Console output → Web page display
- Terminal debugging → Browser console logging
- Command-line interaction → Web UI interaction

---

## 📄 Deliverables

1. **Complete ASP.NET Core web application**
2. **Same configuration file** from Milestone 1 (with redirect URIs added)
3. **Screenshot documentation** showing successful authentication for both tenants
4. **README.md** with setup instructions and differences from Milestone 1
5. **Browser console output samples** showing the debugging information