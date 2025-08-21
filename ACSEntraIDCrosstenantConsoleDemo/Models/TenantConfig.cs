using Newtonsoft.Json;

namespace ACSEntraIDCrosstenantConsoleDemo.Models
{
    /// <summary>
    /// Configuration model for tenant and Azure Communication Services settings
    /// </summary>
    public class TenantConfig
    {
        [JsonProperty("tenants")]
        public Dictionary<string, TenantInfo> Tenants { get; set; } = new();

        [JsonProperty("azureCommunicationServices")]
        public AzureCommunicationServicesConfig AzureCommunicationServices { get; set; } = new();

        [JsonProperty("keyVault")]
        public KeyVaultConfig KeyVault { get; set; } = new();
    }

    public class TenantInfo
    {
        [JsonProperty("name")]
        public string Name { get; set; } = string.Empty;

        [JsonProperty("tenantId")]
        public string TenantId { get; set; } = string.Empty;

        [JsonProperty("appRegistration")]
        public AppRegistrationInfo AppRegistration { get; set; } = new();
    }

    public class AppRegistrationInfo
    {
        [JsonProperty("clientId")]
        public string ClientId { get; set; } = string.Empty;

        [JsonProperty("clientSecret")]
        public string ClientSecret { get; set; } = string.Empty;

        [JsonProperty("redirectUri")]
        public string RedirectUri { get; set; } = string.Empty;
    }

    public class AzureCommunicationServicesConfig
    {
        [JsonProperty("connectionString")]
        public string ConnectionString { get; set; } = string.Empty;

        [JsonProperty("endpointUrl")]
        public string EndpointUrl { get; set; } = string.Empty;

        [JsonProperty("resourceId")]
        public string ResourceId { get; set; } = string.Empty;
    }

    public class KeyVaultConfig
    {
        [JsonProperty("vaultUri")]
        public string VaultUri { get; set; } = string.Empty;
    }
}