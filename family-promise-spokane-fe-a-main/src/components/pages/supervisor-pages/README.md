SupervisorGuestLogs.jsx Bugs

1. family member info should be a modal
2. information action is not pulling correct person's info
3. checkin function working but not persisting data in the table column
4. note function has modal but needs functionality
5. checkin action has an onClick function in SupervisorAnalytics.jsx line 148-158. We suggest changing table fields on the back end to be able to update check-in per member. Possibly not nesting the check-in per member data.
6. Starting on line 74 the handleCheckinClick function will update the checkin number, but when naving away from SupervisorAnalytics the check-in column on the table does not persist.

SupervisorAnalytics.jsx Bugs

1. Monlthy stat data does not work on deployed site we think because it is not sercured? Some security issue with the DS API? But it works locally.

General Notes:

1. Too many api calls. Fix the backend so that you are getting the info in one call.
2. On deployed site some filtering functions for the logs are not working from the back end.
3. The log table is the reservation list. Logs are made each time a guest makes a reservation. If they cancel the log will still exist, it will just have a reservation status of false which is why we are filtering the globalLogs by their reservation status on the front end.
4. Uncomment line 349 in SupervisorAnalytics to display all of the daily logs for development purposes.

You can do it!
