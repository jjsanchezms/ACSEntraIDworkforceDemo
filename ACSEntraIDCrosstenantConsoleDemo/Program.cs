using Azure.Identity;
using Azure.Communication;
using Azure.Core;
using Newtonsoft.Json;
using System.Linq;
using ACSEntraIDCrosstenantConsoleDemo.Models;

namespace ACSEntraIDCrosstenantConsoleDemo
{
    class Program
    {
        static async Task Main(string[] args)
        {
            Console.WriteLine("=== Azure Communication Services - Cross-Tenant Authentication Demo ===");
            Console.WriteLine("This demo will automatically authenticate with both Contoso and Fabrikam tenants");
            Console.WriteLine("Loading configuration and starting authentication process...\n");

            try
            {
                // Step 1: Load configuration
                Console.WriteLine("🔧 STEP 1: Loading tenant configuration from tenant-config.json");
                var config = LoadConfiguration();
                Console.WriteLine($"✅ Configuration loaded successfully");
                Console.WriteLine($"   - Found {config.Tenants.Count} tenants: {string.Join(", ", config.Tenants.Keys)}");
                Console.WriteLine($"   - ACS Endpoint: {config.AzureCommunicationServices.EndpointUrl}");
                Console.WriteLine();

                var results = new List<(string TenantName, string TenantKey, AccessToken Token)>();

                // Step 2: Authenticate with Contoso (first tenant)
                if (config.Tenants.ContainsKey("contoso"))
                {
                    var contosoTenant = config.Tenants["contoso"];
                    Console.WriteLine("🏢" + new string('=', 70));
                    Console.WriteLine($"🔐 STEP 2A: Authenticating CONTOSO USERS with {contosoTenant.Name}");
                    Console.WriteLine($"👤 Required: Sign in with @contoso.com credentials");
                    Console.WriteLine("🏢" + new string('=', 70));
                    Console.WriteLine($"   - Tenant ID: {contosoTenant.TenantId}");
                    Console.WriteLine($"   - Client ID: {contosoTenant.AppRegistration.ClientId}");
                    Console.WriteLine($"   - Using Device Code Flow (no browser popup required)");
                    Console.WriteLine();

                    try
                    {
                        var contosoToken = await AuthenticateAndGetToken(contosoTenant, config.AzureCommunicationServices.EndpointUrl, contosoTenant.AppRegistration.ClientId);
                        results.Add((contosoTenant.Name, "contoso", contosoToken));
                        Console.WriteLine($"✅ CONTOSO user authentication completed successfully!");
                        Console.WriteLine($"   📋 Token Length: {contosoToken.Token.Length} characters");
                        Console.WriteLine($"   ⏰ Token Expires: {contosoToken.ExpiresOn}");
                        Console.WriteLine();
                        
                        // Display full token payload immediately
                        Console.WriteLine("🎫 CONTOSO TOKEN PAYLOAD:");
                        Console.WriteLine(new string('=', 80));
                        DisplayTokenPayload(contosoToken.Token);
                        Console.WriteLine(new string('=', 80));
                        Console.WriteLine();
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"❌ CONTOSO user authentication failed: {ex.Message}");
                        Console.WriteLine();
                    }
                }

                // Step 3: Authenticate with Fabrikam (second tenant)
                if (config.Tenants.ContainsKey("fabrikam"))
                {
                    var fabrikamTenant = config.Tenants["fabrikam"];
                    var hostClientId = config.Tenants["contoso"].AppRegistration.ClientId;
                    Console.WriteLine("🏢" + new string('=', 70));
                    Console.WriteLine($"🔐 STEP 2B: Authenticating FABRIKAM USERS with {fabrikamTenant.Name}");
                    Console.WriteLine($"👤 Required: Sign in with @fabrikam.com credentials");
                    Console.WriteLine("🏢" + new string('=', 70));
                    Console.WriteLine($"   - Tenant ID: {fabrikamTenant.TenantId}");
                    Console.WriteLine($"   - Client ID: {hostClientId} (from host tenant)");
                    Console.WriteLine($"   - Using Device Code Flow (no browser popup required)");
                    Console.WriteLine();

                    try
                    {
                        // Use the host tenant's (Contoso) client ID for cross-tenant authentication
                        var fabrikamToken = await AuthenticateAndGetToken(fabrikamTenant, config.AzureCommunicationServices.EndpointUrl, hostClientId);
                        results.Add((fabrikamTenant.Name, "fabrikam", fabrikamToken));
                        Console.WriteLine($"✅ FABRIKAM user authentication completed successfully!");
                        Console.WriteLine($"   📋 Token Length: {fabrikamToken.Token.Length} characters");
                        Console.WriteLine($"   ⏰ Token Expires: {fabrikamToken.ExpiresOn}");
                        Console.WriteLine();
                        
                        // Display full token payload immediately
                        Console.WriteLine("🎫 FABRIKAM TOKEN PAYLOAD:");
                        Console.WriteLine(new string('=', 80));
                        DisplayTokenPayload(fabrikamToken.Token);
                        Console.WriteLine(new string('=', 80));
                        Console.WriteLine();
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"❌ FABRIKAM user authentication failed: {ex.Message}");
                        Console.WriteLine();
                    }
                }

                // Step 4: Display final results
                Console.WriteLine();
                Console.WriteLine("🎉 CROSS-TENANT AUTHENTICATION DEMO COMPLETED!");
                Console.WriteLine();
                Console.WriteLine(new string('=', 80));
                Console.WriteLine("🏆 FINAL RESULTS - ALL TENANTS");
                Console.WriteLine(new string('=', 80));

                if (results.Any())
                {
                    for (int i = 0; i < results.Count; i++)
                    {
                        var result = results[i];
                        Console.WriteLine($"\n🏢 TENANT {i + 1}: {result.TenantName} ({result.TenantKey.ToUpper()})");
                        Console.WriteLine($"   📋 Token Length: {result.Token.Token.Length} characters");
                        Console.WriteLine($"   ⏰ Token Expires: {result.Token.ExpiresOn}");
                        Console.WriteLine($"   ✅ Status: Successfully authenticated");
                    }
                }
                else
                {
                    Console.WriteLine("❌ No tenants were successfully authenticated");
                }

                Console.WriteLine("\n" + new string('=', 80));
                Console.WriteLine($"📊 Summary: {results.Count} out of {config.Tenants.Count} tenants authenticated successfully");
                Console.WriteLine(new string('=', 80));
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ CRITICAL ERROR: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                Console.WriteLine();
                Console.WriteLine("🔍 Troubleshooting tips:");
                Console.WriteLine("1. Ensure tenant-config.json is present and valid");
                Console.WriteLine("2. Verify app registrations are correctly configured in Azure AD");
                Console.WriteLine("3. Check network connectivity");
                Console.WriteLine("4. Ensure 'Allow public client flows' is enabled in Azure AD app registration");
                Console.WriteLine();
                Console.WriteLine("📋 Device Code Authentication Configuration:");
                Console.WriteLine("   In your Azure AD app registration, ensure:");
                Console.WriteLine("   1. 'Allow public client flows' is set to 'Yes'");
                Console.WriteLine("   2. Required API permissions are granted");
                Console.WriteLine("   3. No redirect URI is needed for device code flow");
            }

            Console.WriteLine("\nPress any key to exit...");
            Console.ReadKey();
        }

        private static TenantConfig LoadConfiguration()
        {
            Console.WriteLine("   📁 Reading tenant-config.json file...");
            
            if (!File.Exists("tenant-config.json"))
            {
                throw new FileNotFoundException("Configuration file 'tenant-config.json' not found in current directory");
            }

            var configContent = File.ReadAllText("tenant-config.json");
            Console.WriteLine($"   📄 File size: {configContent.Length} characters");

            var config = JsonConvert.DeserializeObject<TenantConfig>(configContent);
            if (config == null)
            {
                throw new InvalidOperationException("Failed to deserialize configuration file");
            }

            // Validate configuration
            ValidateConfiguration(config);
            
            Console.WriteLine("   ✅ Configuration validation passed");
            return config;
        }

        private static void ValidateConfiguration(TenantConfig config)
        {
            Console.WriteLine("   🔍 Validating configuration...");

            if (!config.Tenants.Any())
            {
                throw new InvalidOperationException("No tenants configured in configuration file");
            }

            if (string.IsNullOrEmpty(config.AzureCommunicationServices.EndpointUrl))
            {
                throw new InvalidOperationException("Azure Communication Services endpoint URL not configured");
            }

            foreach (var tenant in config.Tenants)
            {
                Console.WriteLine($"   🔍 Checking tenant '{tenant.Key}':");
                Console.WriteLine($"      - TenantId: '{tenant.Value.TenantId}' (Empty: {string.IsNullOrEmpty(tenant.Value.TenantId)})");
                Console.WriteLine($"      - ClientId: '{tenant.Value.AppRegistration?.ClientId}' (Empty: {string.IsNullOrEmpty(tenant.Value.AppRegistration?.ClientId)})");
                
                // All tenants must have TenantId
                if (string.IsNullOrEmpty(tenant.Value.TenantId))
                {
                    throw new InvalidOperationException($"Incomplete configuration for tenant '{tenant.Key}': TenantId is required");
                }
                
                // Only the host tenant (contoso) needs app registration details
                // External tenants (like fabrikam) only need name and tenantId for cross-tenant auth
                if (tenant.Key.ToLower() == "contoso" && string.IsNullOrEmpty(tenant.Value.AppRegistration?.ClientId))
                {
                    throw new InvalidOperationException($"Incomplete configuration for host tenant '{tenant.Key}': ClientId is required for host tenant");
                }
            }
        }

        private static KeyValuePair<string, TenantInfo> SelectTenant(TenantConfig config)
        {
            Console.WriteLine("🏢 Available tenants:");
            var tenants = config.Tenants.ToList();
            
            for (int i = 0; i < tenants.Count; i++)
            {
                Console.WriteLine($"   {i + 1}. {tenants[i].Value.Name} ({tenants[i].Key})");
            }

            Console.Write("\nSelect tenant (1-" + tenants.Count + "): ");
            
            if (int.TryParse(Console.ReadLine(), out int selection) && 
                selection >= 1 && selection <= tenants.Count)
            {
                return tenants[selection - 1];
            }
            else
            {
                Console.WriteLine("Invalid selection, defaulting to first tenant");
                return tenants[0];
            }
        }

        private static async Task<AccessToken> AuthenticateAndGetToken(TenantInfo tenantInfo, string resourceEndpoint, string clientId)
        {
            Console.WriteLine("   🖥️ Starting console-based device code authentication...");
            
            try
            {
                // Create the DeviceCodeCredential for Entra ID authentication
                Console.WriteLine("   🔧 Creating DeviceCodeCredential...");
                var entraTokenCredential = new DeviceCodeCredential(new DeviceCodeCredentialOptions
                {
                    TenantId = tenantInfo.TenantId,
                    ClientId = clientId, // Use the provided client ID (from host tenant for cross-tenant auth)
                    // Add token caching to prevent re-authentication
                    TokenCachePersistenceOptions = new TokenCachePersistenceOptions(),
                    DeviceCodeCallback = (deviceCodeInfo, cancellation) =>
                    {
                        Console.WriteLine();
                        Console.WriteLine("🔐 AUTHENTICATION REQUIRED");
                        Console.WriteLine("==========================");
                        Console.WriteLine($"🏢 TENANT: {tenantInfo.Name}");
                        Console.WriteLine($"🆔 TENANT ID: {tenantInfo.TenantId}");
                        Console.WriteLine();
                        Console.WriteLine($"📱 Please open a web browser and navigate to: {deviceCodeInfo.VerificationUri}");
                        Console.WriteLine($"🔑 Enter the following device code: {deviceCodeInfo.UserCode}");
                        Console.WriteLine();
                        Console.WriteLine("💡 Instructions:");
                        Console.WriteLine("   1. Open your web browser");
                        Console.WriteLine($"   2. Go to: {deviceCodeInfo.VerificationUri}");
                        Console.WriteLine($"   3. Enter device code: {deviceCodeInfo.UserCode}");
                        
                        // Make it explicit which tenant credentials to use
                        if (tenantInfo.Name.Contains("Contoso"))
                        {
                            Console.WriteLine("   4. 🏢 Sign in with your CONTOSO credentials (@contoso.com)");
                        }
                        else if (tenantInfo.Name.Contains("Fabrikam"))
                        {
                            Console.WriteLine("   4. 🏢 Sign in with your FABRIKAM credentials (@fabrikam.com)");
                        }
                        else
                        {
                            Console.WriteLine($"   4. 🏢 Sign in with your {tenantInfo.Name} credentials");
                        }
                        
                        Console.WriteLine("   5. Return to this console window");
                        Console.WriteLine();
                        Console.WriteLine($"⏳ Waiting for authentication to complete (expires: {deviceCodeInfo.ExpiresOn:HH:mm:ss})...");
                        Console.WriteLine($"   🎯 IMPORTANT: Use credentials for {tenantInfo.Name.ToUpper()}!");
                        Console.WriteLine();
                        return Task.CompletedTask;
                    }
                });
                Console.WriteLine("   ✅ DeviceCodeCredential created successfully");

                Console.WriteLine("   🎫 Setting up Communication Token Credential with EntraCommunicationTokenCredentialOptions...");

                // Set up CommunicationTokenCredential to request a Communication Services access token for a Microsoft Entra ID user
                var entraTokenCredentialOptions = new EntraCommunicationTokenCredentialOptions(
                    resourceEndpoint: resourceEndpoint,
                    entraTokenCredential: entraTokenCredential);

                var credential = new CommunicationTokenCredential(entraTokenCredentialOptions);
                Console.WriteLine("   ✅ Communication Token Credential created successfully");

                Console.WriteLine("   ⏳ Obtaining Communication Services access token...");
                Console.WriteLine("   💡 This will trigger device code authentication for Communication Services...");
                
                // Add longer timeout for token acquisition (5 minutes for ACS token)
                using var cts = new CancellationTokenSource(TimeSpan.FromMinutes(5));
                
                try
                {
                    // To obtain a Communication Services access token for Microsoft Entra ID call GetTokenAsync() method
                    Console.WriteLine("   🔄 Requesting ACS token (device code authentication will appear above)...");
                    var accessToken = await credential.GetTokenAsync(cts.Token);
                    
                    Console.WriteLine("   ✅ ACS Token obtained successfully!");
                    Console.WriteLine($"   📋 Token Length: {accessToken.Token.Length} characters");
                    Console.WriteLine($"   ⏰ Token Expires: {accessToken.ExpiresOn}");

                    return accessToken;
                }
                catch (Azure.RequestFailedException ex)
                {
                    Console.WriteLine($"   ❌ Azure Communication Services request failed: {ex.Message}");
                    Console.WriteLine($"   🔍 Status Code: {ex.Status}");
                    Console.WriteLine($"   🔍 Error Code: {ex.ErrorCode}");
                    
                    if (ex.Status == 403)
                    {
                        Console.WriteLine("   💡 403 Forbidden Error - Possible causes for ACS cross-tenant authentication:");
                        Console.WriteLine("      1. 🔑 ACS Resource Identity Configuration:");
                        Console.WriteLine("         - The ACS resource may not be configured to accept tokens from this tenant");
                        Console.WriteLine("         - Check if the ACS resource has the correct Managed Identity settings");
                        Console.WriteLine("      2. 🏢 Cross-Tenant Access Policy:");
                        Console.WriteLine($"         - Ensure the ACS resource allows access from tenant: {tenantInfo.TenantId}");
                        Console.WriteLine("         - The ACS resource may only be configured for external tenants");
                        Console.WriteLine("      3. 🔐 Azure AD App Registration:");
                        Console.WriteLine("         - Verify the app registration has 'https://communication.azure.com//' scope");
                        Console.WriteLine("         - Check if admin consent has been granted for ACS permissions");
                        Console.WriteLine("      4. 🎫 Token Audience Mismatch:");
                        Console.WriteLine("         - The Azure AD token might not have the correct audience for ACS");
                        Console.WriteLine("         - Verify the resource endpoint URL is correct");
                        Console.WriteLine();
                        Console.WriteLine("   � Troubleshooting Steps:");
                        Console.WriteLine("      1. Check ACS resource configuration in Azure Portal");
                        Console.WriteLine("      2. Verify cross-tenant access policies are enabled");
                        Console.WriteLine("      3. Ensure the app registration has correct API permissions");
                        Console.WriteLine("      4. Try testing with a user from a different tenant first");
                    }
                    else
                    {
                        Console.WriteLine("   �💡 This might be due to ACS permissions or configuration issues");
                    }
                    throw;
                }
                catch (OperationCanceledException)
                {
                    Console.WriteLine("   ❌ ACS token acquisition timed out after 5 minutes");
                    Console.WriteLine("   💡 The authentication may be stuck - check Azure AD app permissions");
                    throw new TimeoutException("ACS token acquisition timed out");
                }
            }
            catch (OperationCanceledException ex)
            {
                Console.WriteLine("   ❌ Authentication timeout");
                Console.WriteLine($"   🔍 Details: {ex.Message}");
                throw new TimeoutException("Authentication process timed out");
            }
            catch (Azure.Identity.AuthenticationFailedException ex)
            {
                Console.WriteLine($"   ❌ Authentication failed: {ex.Message}");
                Console.WriteLine("   💡 Common causes:");
                Console.WriteLine("      - Device code expired (15 minute limit)");
                Console.WriteLine("      - Incorrect tenant or client ID");
                Console.WriteLine("      - 'Allow public client flows' not enabled");
                Console.WriteLine("      - Required API permissions not granted");
                Console.WriteLine($"   🔍 Error Code: {ex.Data}");
                throw;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"   ❌ Unexpected error: {ex.Message}");
                Console.WriteLine($"   🔍 Exception type: {ex.GetType().Name}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"   🔍 Inner exception: {ex.InnerException.Message}");
                }
                throw;
            }
        }

        /// <summary>
        /// Displays the full token payload in a formatted manner
        /// </summary>
        /// <param name="token">The JWT token to display</param>
        private static void DisplayTokenPayload(string token)
        {
            try
            {
                Console.WriteLine("📄 RAW TOKEN:");
                Console.WriteLine();
                
                // Display token in chunks of 80 characters for readability
                const int chunkSize = 80;
                for (int i = 0; i < token.Length; i += chunkSize)
                {
                    int length = Math.Min(chunkSize, token.Length - i);
                    Console.WriteLine($"{token.Substring(i, length)}");
                }
                
                Console.WriteLine();
                Console.WriteLine("🔍 JWT TOKEN ANALYSIS:");
                
                // Split JWT token into parts
                var tokenParts = token.Split('.');
                if (tokenParts.Length >= 2)
                {
                    try
                    {
                        // Decode header
                        var header = DecodeJwtPart(tokenParts[0]);
                        Console.WriteLine($"📋 HEADER: {header}");
                        
                        // Decode payload
                        var payload = DecodeJwtPart(tokenParts[1]);
                        Console.WriteLine($"📦 PAYLOAD: {FormatJsonPayload(payload)}");
                        
                        if (tokenParts.Length >= 3)
                        {
                            Console.WriteLine($"🔐 SIGNATURE: {tokenParts[2].Substring(0, Math.Min(20, tokenParts[2].Length))}... ({tokenParts[2].Length} characters)");
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"⚠️ Could not decode JWT parts: {ex.Message}");
                        Console.WriteLine("📄 Displaying raw token parts:");
                        for (int i = 0; i < tokenParts.Length; i++)
                        {
                            Console.WriteLine($"Part {i + 1}: {tokenParts[i].Substring(0, Math.Min(50, tokenParts[i].Length))}...");
                        }
                    }
                }
                else
                {
                    Console.WriteLine("⚠️ Token does not appear to be a valid JWT format");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error displaying token: {ex.Message}");
                Console.WriteLine($"📄 Raw token: {token}");
            }
        }

        /// <summary>
        /// Decodes a Base64URL encoded JWT part
        /// </summary>
        /// <param name="base64UrlEncoded">The Base64URL encoded string</param>
        /// <returns>The decoded JSON string</returns>
        private static string DecodeJwtPart(string base64UrlEncoded)
        {
            // Convert Base64URL to Base64
            string base64 = base64UrlEncoded.Replace('-', '+').Replace('_', '/');
            
            // Add padding if needed
            switch (base64.Length % 4)
            {
                case 2: base64 += "=="; break;
                case 3: base64 += "="; break;
            }
            
            // Decode Base64 to bytes and then to string
            var bytes = Convert.FromBase64String(base64);
            return System.Text.Encoding.UTF8.GetString(bytes);
        }

        /// <summary>
        /// Formats JSON payload for better readability
        /// </summary>
        /// <param name="jsonString">The JSON string to format</param>
        /// <returns>Formatted JSON string</returns>
        private static string FormatJsonPayload(string jsonString)
        {
            try
            {
                // Parse and re-serialize with formatting
                var jsonObject = JsonConvert.DeserializeObject(jsonString);
                var formatted = JsonConvert.SerializeObject(jsonObject, Formatting.Indented);
                
                // Add proper indentation for console output
                var lines = formatted.Split('\n');
                var indentedLines = lines.Select(line => $"   {line}").ToArray();
                return "\n" + string.Join("\n", indentedLines);
            }
            catch
            {
                // If formatting fails, return the original string with basic formatting
                return $"\n   {jsonString}";
            }
        }
    }
}
