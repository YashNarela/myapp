# Guard Patrol - Final (Frontend-verifies QR using public key)

Summary:
- Roles: admin, employee, guard.
- Admin can create employees and QR checkpoints.
- Employee can create/update/delete guards.
- QR payloads are signed using RSA private key on server; frontend verifies using public key (safe).
- Frontend does basic verification (Option 1) before calling backend. Backend **also** re-verifies signature.
- Patrol logs stored in MongoDB.

Quick start:
1. npm install
2. node seedAdmin.js   (creates admin@company.com / admin123)
3. npm start
