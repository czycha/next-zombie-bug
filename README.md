# Next.js iOS zombie page bug

## Steps to reproduce

1. `cd ./old && yarn build && yarn start`
2. Navigate to `localhost:3000/zombie` on Safari on your iOS device (or simulator).
  1. You should expect to see a page that says "Received ID: zombie" with props:
      ```json
      {
        "id": "zombie",
        "isOld": true,
        "isDynamicRoute": true
      }
      ```
3. Close Safari, but don't exit the tab.
4. `cd ../new && yarn build && yarn start`
5. On your iOS device, reopen Safari.
  1. You should now see "Received ID: " with no ID provided. This is **not expected.** It should either say "zombie" for the old version of the page of "new-zombie" for the new. The props are:
      ```json
      {
        "isNew": true,
        "isDynamicRoute": false
      }
      ```
6. Refresh the page.
  1. You should see "Received ID: new-zombie" with props:
      ```json
      {
        "isNew": true,
        "isDynamicRoute": false
      }
      ```

## This is a weird process. What are you simulating?

This is simulating a real experience that a user had. The user had opened a page a month ago and kept it in their iOS tabs. The page at the time was dynamically routed. In the interim, we released a change that required the page to be statically routed and changed the page props. When the user revived the tab, the page was completely broken because it was serving new props to old JS.

## What is happening here?

It seems that the /zombie path is still loading JS from `[id].tsx` when it should be loading from `zombie.tsx`. It would typically be OK to serve stale content in this situation, but the issue arises from the fact that the revived page is receiving the props generated for `zombie.tsx`, which is incompatible with `[id].tsx`.
