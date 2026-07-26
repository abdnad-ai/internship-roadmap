# Rollback Notes - SkillForge 

## When to Roll Back
- A merged deploy breaks a core flow (auth, tasks, AI features) in production
- A deploy introduces a regression not caught by CI or manual testing
- A bad environment variable change causes the service to fail to start

## Render Rollback (Backend or Frontend)
Render keeps a history of previous successful deploys per service.

1. Go to the Render dashboard for the affected service.
2. Open the "Deploys" tab.
3. Find the last known-good deploy (before the broken one).
4. Click "Rollback to this deploy" (or "Redeploy" on that specific commit, depending on Render's current UI).
5. Confirm the service restarts and responds correctly at its live URL.

## Git-Level Rollback (if Render rollback isn't enough)
If the bad code needs to be reverted at the source level too:

1. Identify the bad commit on main:
   git log --oneline -10

2. Revert it (creates a new commit undoing the changes, keeps history intact):
   git revert <bad-commit-hash>
   git push origin main

3. Render will auto-deploy the revert commit.

Avoid force-pushing or rewriting main history - always use git revert, not git reset --hard on a shared branch.

## Database Rollback
Prisma migrations are additive by default. If a migration needs to be undone:

1. Check migration history:
   npx prisma migrate status

2. Manually write a down-migration SQL file matching the change, or restore from a Neon database backup/snapshot if the schema change is destructive.

3. Never edit a migration file that has already been applied to production - create a new migration to reverse it instead.

## Post-Rollback Verification
- [ ] Backend root route responds
- [ ] Login and register work
- [ ] Task CRUD works end to end
- [ ] No new errors appearing in Render logs