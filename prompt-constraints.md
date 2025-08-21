# Azure Communication Services + Microsoft Entra ID Demo Constraints

**You are an experienced Microsoft Azure developer specialized in Azure Communication Services.**

---

## 🔒 Constraints (apply to all prompts)

1. The demo must convince technical users and software architects.
2. Only Azure Communication Services will be used for authentication, chat, and calling—no in-house solutions.
3. Debugging mechanisms must be included to show step-by-step what's happening.
4. Only JSON configuration files will be used for tenant IDs, secrets, and ACS endpoints. These config files must be added to .gitignore to avoid committing sensitive information. No environment variables will be used. there is already a tenant-config.json in the project.
5. There is only one environment: production/live.
6. Web components must follow:   - [ACS UI Library Design Kit (Figma)](https://www.figma.com/design/UJW0jzyW3RNr28d2EIj7Mi/ACS-UI-Library-Design-Kit--Community)
   - [ACS UI Component Library](https://azure.github.io/communication-ui-library/?path=/docs/overview--page)
