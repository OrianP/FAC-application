# Founders and Coders Application Website 

My application website for the FAC January 2022 cohort :tada:

## Structure  and design
The site is structured as a basic developer portfolio site with a minimal design the includes light and dark modes. My intention is to demonstrate my current knowledge and abilities with HTML, CSS and JavaScript to share my personal and career background, my coding journey so far as well as future aspirations, and the resons why I am passionate about applying for FAC. 

## Approach
One of my main goals was to build the site with a 'mobile-first' approach. I have included a single CSS media query condition for desktop/laptop screens and in the process I learned how to use JavaScript Media Queries. I also wanted to make the site as progressively enhanced and accessible as possible using semantic HTML and aria-labels and keeping in mind how the site would look and function for users that have JavaScript disabled in the browser. 

## Features 
The main JavaScript features on this site are: 
- [ ] Hamburger menu (mobile)
- [ ] Typwriter effect on landing page
- [ ] Light and dark mode toggle
- [ ] Infinite slider to display project cards 
- [ ] Music player 
- [ ] Video carousel

## Learning Outcomes 
Below is a list of new information learned and 'ah-ha!' :point_up: moments I had while building this site. I thought it would be beneficial to write down every new piece of knowledge to help it sink in and to show the learning process: 

1. **General JavaScript:** 
* How to create deep node clones with `cloneNode(true)`
* I tried to append multiple clones with `appendChild()` and learned that this method can only append one child at a time (It's kind of in the name I guess!), but `append()` can append multiple elements! 
* Setting a CSS variable dynamically through JavaScript: I needed to get an element's `clientHeight` property dynamically and set that value as a CSS variable using `setProperty()`.  

2. **JavaScript Media Queries:**
* How to use the value (Boolean) of the `matches` property of the `MediaQueryList` Object returned by the `matchMedia()` method as a condition for the execution of code.
* Attaching a 'change' event listener to the variable that has been assigned the `MediaQueryList` to track the change specified in the media query.
* Calling the function for initial media query condition check when the script loads. (e.g to check if the size of the screen is mobile, tablet or desktop).

3. **CSS**
* CSS variables
* `Calc()` function 

## To Do
My ongoing To Do list for each section of the website and including tasks that have not been completed yet.   
- [ ] Set project wide CSS variables - find a colour palette and try it out







