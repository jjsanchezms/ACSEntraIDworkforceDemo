# Azure Communication Services + Microsoft Entra ID Demo Prompts

This prompt series guides GitHub Copilot to help build a cross-tenant demo using Azure Communication Services (ACS) with Microsoft Entra ID authentication. The demo follows the Fabrikam/Contoso analogy and is structured into four milestones.

**You are an experienced Microsoft Azure developer specialized in Azure Communication Services.**

---

## 🔒 Constraints (apply to all prompts)

1. The demo must convince technical users.
2. Only Azure Communication Services will be used for authentication, chat, and calling—no in-house solutions.
3. Debugging mechanisms must be included to show step-by-step what's happening.
4. Only JSON configuration files will be used for tenant IDs, secrets, and ACS endpoints. These config files must be added to .gitignore to avoid committing sensitive information. No environment variables will be used.
5. There is only one environment: production/live.
6. Web components must follow:
   - [ACS UI Library Design Kit (Figma)](https://www.figma.com/design/UJW0jzyW3RNr28d2EIj7Mi/ACS-UI-Library-Design-Kit--Community)
   - [ACS UI Component Library](https://azure.github.io/communication-ui-library/?path=/docs/overview--page)

---

## 🔧 Milestone 1: Backend Token Generation with Entra ID

**Prompt:**

> Create a .NET project from scratch based on this sample:  
> https://github.com/Azure-Samples/communication-services-dotnet-quickstarts/tree/main/EntraIdUsersSupportQuickstart  
> 
> Use my `.json` config file to load tenant IDs, client secrets, and ACS endpoints.  
> 
> Implement the login flow for both Fabrikam and Contoso users using Microsoft Entra ID.  
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
> - Use provided `.json` config.
> 
> ✅ Output:
> - Console output showing token, user ID, and payload.
> - Debug logs for each step.

---

## 🌐 Milestone 2: Web Login UI with Token Display

**Prompt:**

> Create a new web project that replicates the functionality from Milestone 1.  
> 
> Add two buttons: “Login with Fabrikam” and “Login with Contoso.”  
> 
> When clicked, authenticate using Microsoft Entra ID and ACS, just like in Milestone 1.  
> 
> After login, display the following on the page:
> - ACS access token
> - User ID
> - Full payload
> 
> Add debug logs in the browser console for each step: button click, redirect, token request, and response.  
> 
> ✅ Constraints:
> - Only use ACS for auth.
> - Include debug logs.
> - Use production/live environment.
> - No in-house auth logic.
> - Use provided `.json` config.
> - Follow ACS UI Library and Figma design kit.
> 
> ✅ Output:
> - Web page with login buttons and token info.
> - Console logs for each step.

---

## 📞 Milestone 3: Add Calling Between Fabrikam and Contoso

**Prompt:**

> Copy the project from Milestone 2.  
> 
> Add ACS calling functionality so that:
> - A user logged in as Fabrikam can call a user logged in as Contoso (and vice versa).
> - Both users can join the same call from different browser tabs.
> 
> Use ACS Calling SDK and UI components.  
> 
> Add a “Start Call” button after login.  
> 
> Show call status, participant info, and debug logs in the console.  
> 
> ✅ Constraints:
> - Only use ACS for calling.
> - Include debug logs.
> - Use production/live environment.
> - No in-house calling logic.
> - Use provided `.json` config.
> - Follow ACS UI Library and Figma design kit.
> 
> ✅ Output:
> - Web app with login and calling.
> - Console logs for call setup, join, and status.

---

