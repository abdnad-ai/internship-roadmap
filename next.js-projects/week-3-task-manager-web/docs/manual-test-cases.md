\# Manual Test Cases



Some UI pieces can't be meaningfully covered by automated component tests, usually because they depend on real browser APIs (WebGL, canvas) that jsdom doesn't implement. These are tested manually instead.



\## HeroScene (3D gem animation)



\*\*Why manual:\*\* Renders a Three.js WebGL canvas via react-three-fiber, jsdom has no WebGL context, so an automated render test would either fail or need to mock the entire 3D pipeline, which wouldn't verify anything meaningful.



\*\*Steps:\*\*

1\. Navigate to `/chat` or `/support`

2\. Confirm the rotating glass gem renders in the background, not a blank space or broken canvas

3\. Confirm it continues rotating smoothly for at least 5 seconds

4\. Resize the browser window and confirm the canvas resizes without distortion or errors in the browser console



\*\*Expected result:\*\* A smoothly rotating, correctly lit glass icosahedron with a green and maroon wireframe outline, no console errors.



\## Support agent empty query validation



\*\*Why manual:\*\* Covered by exploratory testing during Week 5 Day 5 rather than an automated test, documenting here for completeness.



\*\*Steps:\*\*

1\. Navigate to `/support`

2\. Leave the input field empty

3\. Press Enter or click Submit



\*\*Expected result:\*\* A message reading "Please enter a question first." appears, no request is sent to the backend.

