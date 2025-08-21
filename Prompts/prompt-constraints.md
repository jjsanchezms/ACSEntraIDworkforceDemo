# Azure Communication Services + Microsoft Entra ID Demo Constraints

**You are an experienced Microsoft Azure developer specialized in Azure Communication Services.**

---

## 🔒 Constraints (apply to all prompts)

### Core Requirements
1. **Target Audience**: The demo must convince technical users and software architects with production-ready code and comprehensive documentation.
2. **Azure-Only Architecture**: Only Azure Communication Services will be used for authentication, chat, and calling—no custom or in-house authentication solutions.
3. **Cross-Tenant Support**: Demonstrate authentication with both host tenant (Contoso) and external tenant (Fabrikam) users using the same ACS resource.

### Configuration Management
4. **JSON Configuration Only**: Use `tenant-config.json` for all configuration (tenant IDs, client secrets, ACS endpoints). No environment variables allowed.
5. **Security-First**: Configuration files containing secrets must be added to `.gitignore` to prevent credential exposure.
6. **Production Environment**: There is only one environment: production/live. No dev/staging configurations.

### Debugging & Observability
10. **Comprehensive Logging**: Include step-by-step debug logs showing configuration loading, authentication requests, token generation, and response payloads.
11. **JWT Token Analysis**: Display raw tokens and decode JWT payloads to show tenant identifiers and scope information.
12. **Error Handling**: Provide detailed error messages with troubleshooting guidance for common authentication failures.

### Development Standards
13. **Based on Official Samples**: Use Azure Communication Services quickstart samples as the foundation, particularly the EntraIdUsersSupportQuickstart.
14. **Modern .NET**: Target .NET 8.0 with nullable reference types enabled.
15. **Package Versions**: Use specific package versions (Azure.Communication.Common v1.4.0, Azure.Identity v1.14.0).

### UI/UX Requirements (for web components)
16. **ACS UI Library Compliance**: Web components must follow:
    - [ACS UI Library Design Kit (Figma)](https://www.figma.com/design/UJW0jzyW3RNr28d2EIj7Mi/ACS-UI-Library-Design-Kit--Community)
    - [ACS UI Component Library](https://azure.github.io/communication-ui-library/?path=/docs/overview--page)

### Documentation Standards  
17. **Complete Documentation**: Include README with prerequisites, setup instructions, and sample output.
18. **Configuration Examples**: Provide sample `tenant-config.json` structure with placeholder values.
19. **Troubleshooting Guide**: Document common issues and resolution steps.
