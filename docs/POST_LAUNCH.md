# Post-Launch Support & Maintenance

## Daily Tasks
-   **Check Analytics:** Monitor real-time users and event counts in Google Analytics.
-   **Review Feedback:** Check entries from the Feedback Form.
-   **Error Logs:** Review Sentry/Vercel logs for new errors.

## Weekly Tasks
-   **Security Audit:** Review the automated GitHub Action audit report.
-   **Content Review:** Ensure loan rates and offers are up-to-date.
-   **Backup:** (If applicable) Verify database backups.

## Monthly Tasks
-   **Dependency Updates:** Run `npm outdated` and update packages.
-   **Performance Optimization:** Re-run Lighthouse scores.
-   **SEO Audit:** Check Google Search Console for crawl errors.

## Maintenance Mode
To enable maintenance mode:
1.  Set `MAINTENANCE_MODE=true` in Vercel Environment Variables.
2.  Redeploy the application.
3.  All traffic will be redirected to `/maintenance`.
