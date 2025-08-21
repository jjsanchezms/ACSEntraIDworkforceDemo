# Azure Communication Services - Cross-Tenant Authentication Demo Output

This file contains the complete console output from running the Azure Communication Services Cross-Tenant Authentication Demo application.

```
PS C:\acsworkspace\AzureCommunication\ACSEntraIDworkforceDemo\ACSEntraIDCrosstenantConsoleDemo> dotnet run
=== Azure Communication Services - Cross-Tenant Authentication Demo ===
This demo will automatically authenticate with both Contoso and Fabrikam tenants
Loading configuration and starting authentication process...

🔧 STEP 1: Loading tenant configuration from tenant-config.json
   📁 Reading tenant-config.json file...
   📄 File size: 1448 characters
   🔍 Validating configuration...
   🔍 Checking tenant 'contoso':
      - TenantId: '8c7f97d6-f873-4732-a074-8d2ab93da886' (Empty: False)
      - ClientId: '01ac8a89-c519-4761-a0d6-bdeeaca13c3d' (Empty: False)
   🔍 Checking tenant 'fabrikam':
      - TenantId: '307083d3-52ba-4934-a29a-97cefcedc6a6' (Empty: False)
      - ClientId: '' (Empty: True)
   ✅ Configuration validation passed
✅ Configuration loaded successfully
   - Found 2 tenants: contoso, fabrikam
   - ACS Endpoint: https://acsresourcecontoso.unitedstates.communication.azure.com/

🏢======================================================================
🔐 STEP 2A: Authenticating CONTOSO USERS with Contoso (Host Tenant)
👤 Required: Sign in with @contoso.com credentials
🏢======================================================================
   - Tenant ID: 8c7f97d6-f873-4732-a074-8d2ab93da886
   - Client ID: 01ac8a89-c519-4761-a0d6-bdeeaca13c3d
   - Using Device Code Flow (no browser popup required)

   🖥️ Starting console-based device code authentication...
   🔧 Creating DeviceCodeCredential...
   ✅ DeviceCodeCredential created successfully
   🎫 Setting up Communication Token Credential with EntraCommunicationTokenCredentialOptions...
   ✅ Communication Token Credential created successfully
   ⏳ Obtaining Communication Services access token...
   💡 This will trigger device code authentication for Communication Services...
   🔄 Requesting ACS token (device code authentication will appear above)...

🔐 AUTHENTICATION REQUIRED
==========================
🏢 TENANT: Contoso (Host Tenant)
🆔 TENANT ID: 8c7f97d6-f873-4732-a074-8d2ab93da886

📱 Please open a web browser and navigate to: https://microsoft.com/devicelogin
🔑 Enter the following device code: BHJRLF3BF

💡 Instructions:
   1. Open your web browser
   2. Go to: https://microsoft.com/devicelogin
   3. Enter device code: BHJRLF3BF
   4. 🏢 Sign in with your CONTOSO credentials (@contoso.com)
   5. Return to this console window

⏳ Waiting for authentication to complete (expires: 23:30:28)...
   🎯 IMPORTANT: Use credentials for CONTOSO (HOST TENANT)!

   ✅ ACS Token obtained successfully!
   📋 Token Length: 917 characters
   ⏰ Token Expires: 8/22/2025 12:16:14 AM +00:00
✅ CONTOSO user authentication completed successfully!
   📋 Token Length: 917 characters
   ⏰ Token Expires: 8/22/2025 12:16:14 AM +00:00

🎫 CONTOSO TOKEN PAYLOAD:
================================================================================
📄 RAW TOKEN:

eyJhbGciOiJSUzI1NiIsImtpZCI6IjZDODBDMjc5MUZBMEVCODczMDI2NzlFRDhFQzFDRTE5OTNEQTAw
MjMiLCJ4NXQiOiJiSURDZVItZzY0Y3dKbm50anNIT0daUGFBQ00iLCJ0eXAiOiJKV1QifQ.eyJza3lwZ
WlkIjoiYWNzOmQ2ZGUyZWM2LThlN2UtNGJlNC1hYWU0LTZlZTQ1YzRmZWJjM193Zl84YzdmOTdkNi1mO
DczLTQ3MzItYTA3NC04ZDJhYjkzZGE4ODZfYmY2NjFjYWItMTQzMC00ZjI0LWE4OTktNDFhODkyNTQ2Y
jE5Iiwic2NwIjoxNzkyLCJjc2kiOiIxNzU1ODE4MTc0IiwiZXhwIjoxNzU1ODIxNzc0LCJyZ24iOiJhb
WVyIiwiYWNzU2NvcGUiOiJjaGF0LHZvaXAiLCJyZXNvdXJjZUlkIjoiZDZkZTJlYzYtOGU3ZS00YmU0L
WFhZTQtNmVlNDVjNGZlYmMzIiwicmVzb3VyY2VMb2NhdGlvbiI6InVuaXRlZHN0YXRlcyIsImlhdCI6M
Tc1NTgxODE3NH0.HHrEJOQC3JIwjGcQocxYAb30W_QNv_PbkVw3HacYcjCiAid_687pziCak7I-TXIXY
mT8RuFD9QMhu14E9nzYWYZeXBABdZ5qTzzsADT5TFH2nwB-LOE5cZ34Ya9m1UOht9cHJV2ndzKmRGr3_
19_JvwDhTXFO63oq8866-QDgRL_NdO8YCkVJSp5KfL3giyq5mf7HlTb4NeAsMhu4bxUlJTqF5wT07yms
i31H6YXGh15b-_1ZoVB864cLzH0EgFEMmdbGG2vUX4G2SZGmBcX8Dk-lUi4fK-PqNmdDaMDlyFGzAFof
z20LnSWyQyMDp0PTz9m-E65FKiZ_eo6hNdJVw

🔍 JWT TOKEN ANALYSIS:
📋 HEADER: {"alg":"RS256","kid":"6C80C2791FA0EB87302679ED8EC1CE1993DA0023","x5t":"bIDCeR-g64cwJnntjsHOGZPaACM","typ":"JWT"}
📦 PAYLOAD:
   {
     "skypeid": "acs:d6de2ec6-8e7e-4be4-aae4-6ee45c4febc3_wf_8c7f97d6-f873-4732-a074-8d2ab93da886_bf661cab-1430-4f24-a899-41a892546b19",
     "scp": 1792,
     "csi": "1755818174",
     "exp": 1755821774,
     "rgn": "amer",
     "acsScope": "chat,voip",
     "resourceId": "d6de2ec6-8e7e-4be4-aae4-6ee45c4febc3",
     "resourceLocation": "unitedstates",
     "iat": 1755818174
   }
🔐 SIGNATURE: HHrEJOQC3JIwjGcQocxY... (342 characters)
================================================================================

🏢======================================================================
🔐 STEP 2B: Authenticating FABRIKAM USERS with Fabrikam (External Tenant)
👤 Required: Sign in with @fabrikam.com credentials
🏢======================================================================
   - Tenant ID: 307083d3-52ba-4934-a29a-97cefcedc6a6
   - Client ID: 01ac8a89-c519-4761-a0d6-bdeeaca13c3d (from host tenant)
   - Using Device Code Flow (no browser popup required)

   🖥️ Starting console-based device code authentication...
   🔧 Creating DeviceCodeCredential...
   ✅ DeviceCodeCredential created successfully
   🎫 Setting up Communication Token Credential with EntraCommunicationTokenCredentialOptions...
   ✅ Communication Token Credential created successfully
   ⏳ Obtaining Communication Services access token...
   💡 This will trigger device code authentication for Communication Services...
   🔄 Requesting ACS token (device code authentication will appear above)...

🔐 AUTHENTICATION REQUIRED
==========================
🏢 TENANT: Fabrikam (External Tenant)
🆔 TENANT ID: 307083d3-52ba-4934-a29a-97cefcedc6a6

📱 Please open a web browser and navigate to: https://microsoft.com/devicelogin
🔑 Enter the following device code: BLMAFUF9S

💡 Instructions:
   1. Open your web browser
   2. Go to: https://microsoft.com/devicelogin
   3. Enter device code: BLMAFUF9S
   4. 🏢 Sign in with your FABRIKAM credentials (@fabrikam.com)
   5. Return to this console window

⏳ Waiting for authentication to complete (expires: 23:31:10)...
   🎯 IMPORTANT: Use credentials for FABRIKAM (EXTERNAL TENANT)!

   ✅ ACS Token obtained successfully!
   📋 Token Length: 917 characters
   ⏰ Token Expires: 8/22/2025 12:17:21 AM +00:00
✅ FABRIKAM user authentication completed successfully!
   📋 Token Length: 917 characters
   ⏰ Token Expires: 8/22/2025 12:17:21 AM +00:00

🎫 FABRIKAM TOKEN PAYLOAD:
================================================================================
📄 RAW TOKEN:

eyJhbGciOiJSUzI1NiIsImtpZCI6IjZDODBDMjc5MUZBMEVCODczMDI2NzlFRDhFQzFDRTE5OTNEQTAw
MjMiLCJ4NXQiOiJiSURDZVItZzY0Y3dKbm50anNIT0daUGFBQ00iLCJ0eXAiOiJKV1QifQ.eyJza3lwZ
WlkIjoiYWNzOmQ2ZGUyZWM2LThlN2UtNGJlNC1hYWU0LTZlZTQ1YzRmZWJjM193Zl8zMDcwODNkMy01M
mJhLTQ5MzQtYTI5YS05N2NlZmNlZGM2YTZfMzgzOTlmZjgtY2FhZC00MjhhLWJjN2EtZGIxNDczY2EzN
DFjIiwic2NwIjoxNzkyLCJjc2kiOiIxNzU1ODE4MjQxIiwiZXhwIjoxNzU1ODIxODQxLCJyZ24iOiJhb
WVyIiwiYWNzU2NvcGUiOiJjaGF0LHZvaXAiLCJyZXNvdXJjZUlkIjoiZDZkZTJlYzYtOGU3ZS00YmU0L
WFhZTQtNmVlNDVjNGZlYmMzIiwicmVzb3VyY2VMb2NhdGlvbiI6InVuaXRlZHN0YXRlcyIsImlhdCI6M
Tc1NTgxODI0MX0.hXAKFAa-rZFKiRB6z60r3UdTqNBT-5B7QVCzThULTqlw4u7-AlPmWAgoalGVpuuEe
6Za7uYf75x29kCzeTcfKouZ5l4HaaHvdH4T-MUSjF0y1T5RBMX3boMHC8hKHDmZjxC6PXMX3Jd9KOx2x
8ghQj2qDaYChe6CJu_MJcFu9FdsYzCjMs9fxc7LNUcYTNgaqOIzsve2R4Kt0Hie27nEVFhFuxCMAWNUJ
K0ISCdjILAHgnHENkt1M9OyvTjvEKawuZYWCQGkIxBverS1AfeEDyt1xthn1cyqtM7XZD6xHhCqla_HH
U1T-V_CtfreInRMHCCsTl1bMGihXCf3AIxeag

🔍 JWT TOKEN ANALYSIS:
📋 HEADER: {"alg":"RS256","kid":"6C80C2791FA0EB87302679ED8EC1CE1993DA0023","x5t":"bIDCeR-g64cwJnntjsHOGZPaACM","typ":"JWT"}
📦 PAYLOAD:
   {
     "skypeid": "acs:d6de2ec6-8e7e-4be4-aae4-6ee45c4febc3_wf_307083d3-52ba-4934-a29a-97cefcedc6a6_38399ff8-caad-428a-bc7a-db1473ca341c",
     "scp": 1792,
     "csi": "1755818241",
     "exp": 1755821841,
     "rgn": "amer",
     "acsScope": "chat,voip",
     "resourceId": "d6de2ec6-8e7e-4be4-6ee45c4febc3",
     "resourceLocation": "unitedstates",
     "iat": 1755818241
   }
🔐 SIGNATURE: hXAKFAa-rZFKiRB6z60r... (342 characters)
================================================================================


🎉 CROSS-TENANT AUTHENTICATION DEMO COMPLETED!

================================================================================
🏆 FINAL RESULTS - ALL TENANTS
================================================================================

🏢 TENANT 1: Contoso (Host Tenant) (CONTOSO)
   📋 Token Length: 917 characters
   ⏰ Token Expires: 8/22/2025 12:16:14 AM +00:00
   ✅ Status: Successfully authenticated

🏢 TENANT 2: Fabrikam (External Tenant) (FABRIKAM)
   📋 Token Length: 917 characters
   ⏰ Token Expires: 8/22/2025 12:17:21 AM +00:00
   ✅ Status: Successfully authenticated

================================================================================
📊 Summary: 2 out of 2 tenants authenticated successfully
================================================================================

Press any key to exit...
PS C:\acsworkspace\AzureCommunication\ACSEntraIDworkforceDemo\ACSEntraIDCrosstenantConsoleDemo> 
```

## Summary

This output demonstrates a successful cross-tenant authentication demo for Azure Communication Services. The application:

1. **Loaded configuration** from `tenant-config.json` containing settings for two tenants (Contoso and Fabrikam)
2. **Authenticated with Contoso tenant** (host tenant) using device code flow
3. **Authenticated with Fabrikam tenant** (external tenant) using the same device code flow but different tenant credentials
4. **Generated JWT tokens** for both tenants with detailed analysis showing the token structure and payload
5. **Successfully completed** authentication for both tenants

Key observations from the output:
- Both tenants used the same ACS resource ID (`d6de2ec6-8e7e-4be4-aae4-6ee45c4febc3`)
- Each tenant has a unique identifier in the `skypeid` field of the JWT payload
- Tokens were valid for approximately 1 hour from issuance
- The demo supports both chat and VoIP scopes (`acsScope`: "chat,voip")