# Technical Debt & Shortcuts

## Active Shortcuts (Intentional for POC)

### Typography

- [ ] **Logo font**: Using close match (Bebas Neue/Oswald) instead of actual brand font
  - **Reason**: Speed - don't have the exact font file
  - **Future**: Replace with official Rewall logo/font when available

### Branding

- [ ] **Logo as text**: Rendering "REWALL" in font instead of logo image
  - **Reason**: Speed + flexibility during iteration
  - **Future**: Switch to proper logo image asset (may need background removal)

### Data

- [ ] **Mock data**: All users, discussions, groups are hardcoded JSON
  - **Reason**: No backend, POC only
  - **Future**: Real database + API integration

### Authentication

- [ ] **No auth**: No login/users/credentials
  - **Reason**: Not needed for pitch demo
  - **Future**: Implement if product goes forward

---

## Future Considerations

_Items discovered during development that should be addressed post-POC_

(To be populated as we build)
