# Azure Communication Services + Microsoft Entra ID Demo - Milestone 1

**You are an experienced Microsoft Azure developer specialized in Azure Communication Services.**

---

## 🔧 Milestone 1: Backend Token Generation with Entra ID

**Prompt:**

> Create a .NET project from scratch based on this sample:  
> https://github.com/Azure-Samples/communication-services-dotnet-quickstarts/tree/main/EntraIdUsersSupportQuickstart  
> 
> Use my `.json` config file to load tenant IDs, client secrets, and ACS endpoints.  
> 
> Implement the login flow for both Fabrikam and Contoso users using Microsoft Entra ID.  Make sure to stick as much as possible to the Quickstart provided, including being a console app
> 
> After login, generate and log the ACS access token and user ID.  
> 
> Add debug logs to show each step: config loading, auth request, token generation, and response payload.  
> 
> ✅ Constraints:
> - Only use ACS for auth.
> - Include debug logs.
> - Use production/live environment.
> - No in-house auth logic.
> - Use provided `tenant-config.json` config.
> - Use the https://github.com/Azure-Samples/communication-services-dotnet-quickstarts/blob/main/EntraIdUsersSupportQuickstart/ManageEntraUserAccess.cs as is, no changes
> - Use the https://github.com/Azure-Samples/communication-services-dotnet-quickstarts/blob/main/EntraIdUsersSupportQuickstart/Program.cs as based
> ✅ Output:
> - Console output showing token, user ID, and payload.
> - Debug logs for each step.