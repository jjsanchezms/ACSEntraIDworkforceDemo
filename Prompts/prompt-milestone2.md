# Azure Communication Services + Microsoft Entra ID Demo - Milestone 2

**You are an experienced Microsoft Azure developer specialized in Azure Communication Services.**

---

## 🌐 Milestone 2: Cross-Tenant Web Authentication with ACS Token Display

**Prompt:**

> Create a completely NEW ASP.NET Core web application called **`ACSEntraIDCrosstenantWebDemo`** that replicates the cross-tenant authentication functionality from Milestone 1, but adapted for web browsers using Authorization Code Flow instead of Device Code Flow.
> 
> ⚠️ **IMPORTANT**: This is a separate, new project. Do NOT modify or touch the existing `ACSEntraIDCrosstenantConsoleDemo` folder or any of its contents. Keep the console project intact.
> 
> The new web application must demonstrate the same cross-tenant pattern: authenticate users from both Contoso (host tenant) and Fabrikam (external tenant) organizations, generating ACS access tokens for each tenant while using the same ACS resource and configuration.

---

## 📋 Required Implementation

### Project Structure
```
ACSEntraIDCrosstenantWebDemo/                # NEW PROJECT - separate from console demo
├── Controllers/
│   ├── HomeController.cs                   # Main page controller
│   └── AuthController.cs                   # Authentication endpoints
├── Models/
│   ├── TenantConfig.cs                     # Copy config models from console project
│   └── AuthenticationViewModel.cs          # View models for UI
├── Views/
│   ├── Home/
│   │   └── Index.cshtml                    # Main page with login buttons
│   └── Shared/
│       └── _Layout.cshtml                  # Layout following ACS design
├── wwwroot/
│   ├── css/                                # ACS UI Library compliant styles
│   └── js/
│       └── auth-debug.js                   # Client-side debugging
├── Services/
│   └── ACSTokenService.cs                  # ACS token generation service
├── tenant-config.json                      # Copy from console project (add redirect URIs)
├── appsettings.json
├── Program.cs
└── ACSEntraIDCrosstenantWebDemo.csproj     # NEW project file
```

**Project Creation Instructions:**
1. Create a new folder `ACSEntraIDCrosstenantWebDemo` at the same level as `ACSEntraIDCrosstenantConsoleDemo`
2. Copy the `tenant-config.json` from the console project to the new web project
3. Copy the `TenantConfig.cs` model from the console project to maintain configuration consistency
4. Do NOT modify anything in the existing `ACSEntraIDCrosstenantConsoleDemo` folder

### Technology Stack
- **ASP.NET Core 8.0** with MVC pattern
- **Microsoft.Identity.Web** for Azure AD integration
- **Azure.Communication.Common** and **Azure.Identity** (same versions as Milestone 1)
- **Exported Figma CSS system** - use the design tokens and styles from `Figma/Export/src/styles/`
- **Client-side JavaScript** for debugging and token display (based on exported components)
- **Component-based architecture** following the exported React component structure

### Authentication Flow Requirements
1. **Authorization Code Flow**: Use `Microsoft.Identity.Web` with redirect-based authentication
2. **Cross-Tenant Support**: Same pattern as Milestone 1 - Fabrikam users authenticate using Contoso's app registration
3. **Tenant-Specific Buttons**: Two distinct login buttons with tenant-specific styling and behavior
4. **Configuration Reuse**: Copy the exact same `tenant-config.json` format from the console project, adding redirect URIs for web authentication
5. **ACS Token Generation**: Server-side token generation using the same `CommunicationTokenCredential` pattern from console project

### UI/UX Requirements
**⚠️ IMPORTANT: Use the exported Figma implementation as the definitive design and code reference.**

The complete UI design and implementation is already finalized and exported from Figma. Use the files in the **`Figma/Export`** folder as your implementation guide:
- **Figma Export Location**: `c:\acsworkspace\AzureCommunication\ACSEntraIDworkforceDemo\Figma\Export\`
- **Reference Components**: Use the exported React components as the design specification
- **Styling System**: Use the exported CSS design tokens and theme system

**Implementation Requirements:**
1. **Study the exported React components** in `Figma/Export/src/components/auth/` to understand the exact UI structure
2. **Use the design tokens** from `Figma/Export/src/styles/globals.css` for consistent styling
3. **Match the component structure** shown in `LoginButtons.tsx` and `AuthResultDisplay.tsx`
4. **Follow the authentication flow** demonstrated in `AuthDemo.tsx`
5. **Use the exact styling approach** from the exported CSS system

**Key Reference Files:**
```
Figma/Export/src/
├── components/
│   ├── AuthDemo.tsx              # Main demo component structure
│   └── auth/
│       ├── LoginButtons.tsx      # Login button implementation
│       ├── AuthResultDisplay.tsx # Token display component
│       ├── DebugPanel.tsx        # Debug logging component
│       └── types.ts              # TypeScript interfaces
├── styles/
│   └── globals.css               # Design tokens and theme system
└── index.css                     # Complete Tailwind CSS implementation
```

**ASP.NET Core Implementation Approach:**
- **Translate React components** to Razor views (.cshtml files)
- **Convert Tailwind classes** to equivalent CSS or use the exported CSS directly
- **Maintain the exact visual hierarchy** shown in the exported components
- **Use the same design tokens** (colors, spacing, typography) from globals.css
- **Follow the component structure** for authentication flow and token display

**Authentication UI Structure** (based on exported components):
1. **LoginButtons Component** - Two buttons in a Card layout with centered alignment
2. **AuthResultDisplay Component** - Collapsible token display with User ID, Access Token, and JSON payload
3. **DebugPanel Component** - Timestamped debug logging with different status levels
4. **Main Layout** - Max-width container with proper spacing and responsive design

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
- [x] Same `tenant-config.json` configuration copied from console project (with redirect URIs added)
- [x] ACS token generation for both tenant users via web interface
- [x] JWT token payload analysis and display (same format as Milestone 1)
- [x] Comprehensive error handling with troubleshooting guidance

### UI/UX Requirements
- [x] **Exact replication** of the exported Figma component structure and styling
- [x] **Design token implementation** using the exact CSS variables from `globals.css`
- [x] **Component hierarchy matching** the exported React component structure
- [x] **Responsive design** following the exported CSS system patterns
- [x] **Interactive states** matching the exported component behavior
- [x] **Accessibility compliance** as implemented in the exported components
- [x] **Debug panel integration** following the exported DebugPanel component structure

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

**Configuration Reuse**: Copy the exact same `tenant-config.json` file from the console project to the new web project, then add redirect URIs to the app registration configuration for web authentication flow.

**Token Analysis**: Display the same comprehensive JWT token analysis from the console project, but in a web-friendly format with proper HTML formatting and client-side JavaScript.

**User Experience**: Follow the exact component structure and user flow demonstrated in the exported React components, ensuring the same professional appearance and interaction patterns.

**Error Handling**: Include the same detailed error handling and troubleshooting guidance from the console project, but adapted for web display.

---

## 🔄 Migration from Console Project (Milestone 1)

**Create New Project Structure:**
- Create a new `ACSEntraIDCrosstenantWebDemo` folder alongside the existing console project
- Copy configuration files and models from the console project
- Do NOT modify any files in the `ACSEntraIDCrosstenantConsoleDemo` folder

**Similarities to Maintain:**
- Same configuration file and structure (copied from console project)
- Same ACS token generation logic (adapted for web environment)
- Same JWT token analysis and display (formatted for web)
- Same cross-tenant authentication pattern
- Same comprehensive debugging approach

**Changes for Web Environment:**
- Device Code Flow → Authorization Code Flow
- Console output → Web page display  
- Terminal debugging → Browser console logging
- Command-line interaction → Web UI interaction

---

## 📄 Deliverables

1. **Complete ASP.NET Core web application** in new `ACSEntraIDCrosstenantWebDemo` folder
2. **Configuration file** copied from console project (with redirect URIs added for web auth)
3. **Component implementation documentation** showing how React components were translated to ASP.NET Core
4. **CSS implementation guide** detailing how design tokens from `globals.css` were applied
5. **README.md** with setup instructions, component mapping, and implementation notes
6. **Browser console output samples** showing the debugging information matching the exported DebugPanel