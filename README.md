# Founders and Coders Application Website 

My application website for the FAC September 2021 cohort :tada:

## Structure  and design
The site is structured as a basic developer portfolio with a simple, one-page design. My intention is to demonstrate my current knowledge and abilities with HTML, CSS and JavaScript, to share my personal and career background, my coding journey so far as well as future aspirations, and the reasons why I am passionate about applying for FAC. 

## Approach
One of my main goals was to build the site with a 'mobile-first' approach. I have included a one main CSS media query condition for desktop/laptop screens and in the process I learned how to use JavaScript Media Queries. I also wanted to make the site as progressively enhanced and accessible as I can using semantic HTML and aria-labels and keeping in mind how the site would look and function for users that have JavaScript disabled in the browser. 

## Features 
The main JavaScript features on this site are: 
- [X] Hamburger menu (mobile)
- [X] Typwriter effect on intro page
- [X] Reveal/hide text buttons
- [X] Infinite slider to display project cards 
- [X] Music player 
- [X] Pop-up modals in coding journey timeline

## Resources
I drew on many online resources during the process of building this site, both for JavaScript functionality and design inspiration. Along with MDN, w3schools and CSS-tricks, I used video tutorials as the base of many of the site features and built upon them based on my specific needs. Below is a list of some of those resources:

* [Animated intro screen](https://youtu.be/2ak37WrbSDg)
* [Typewriter effect](https://youtu.be/PuOGBacTYAY)
* [Accessible hamburger menu](https://youtu.be/5ewZ5ej1rmo)
* [Image slider](https://youtu.be/KcdBOoK3Pfw)
* [Responsive grid cards](https://youtu.be/k3YHfp8Bp_E)
* [Music player](https://youtu.be/QTHRWGn_sJw)
* [CSS card design](https://freefrontend.com/css-cards/)

## How it works
A brief summary of the features I find more complex: 
* **Projects slider:** the slider is achieved by using the CSS property `transform: translateX()` to move the cards on the x axis when the slider controls are clicked. The 'infinite' effect is achieved by cloning the project cards. On mobile, the first and last cards are cloned and inserted at the beginning (last card clone) and end (first card clone) of the cards container. The cards are contained within a viewport which is a fixed width and has it's `overflow` property set to hidden. Only the card that is currently aligned with the viewport is visibile to the user. When the user clicks on the slider navigation buttons, a `transitionCard` function is triggered which applies a transition class and shifts the element on the x axis. After the user navigates beyond the last real card to the clone of the first card or before the real first card to the clone of the last card, a `transitionend` event listener fires. It removes the transition class and updates the x axis position of the card based on the card index * card width. This way the user sees the clone briefly before 'jumping' to the real card. With the viewport hiding the other cards the result is a seemingly infinite, smooth transition from the last card to the first card and vice versa. 

* **Music Player:** The song titles are stored as strings in an array. The correlating image and audio files are named exactly as the strings in the array. A function called `loadSong` updates the song title text content and artwork and audio sources based on the song title via a template literal that contains the relative file path. Each song has a correlating background color, progress bar color and box shadow. These are also stored in arrays and their indices are the same as their correlating song, which is what allows the `changeTheme` function to update the correct theme based on the song index. These styles are applied and changed by adding and removing CSS classes. The music player play/pause button functionality is controlled by an `isPlaying` flag whose boolean value is the result of checking whether the music player contains the class 'play'. The 'play' class is added in the `playSong` function when the 'play' button is clicked. If the element contains the 'play' class, then the song is paused. Else, the song resumes playing. The progress bar is set and updated using the `timeupdate` event listener and `duration` property for HTML5 audio and video elements. If the user listens to a song through to the end, the `ended` event listener triggers a function to play the next song (same as the 'next' button does).   

## Learnings 
Some of the new information learned and 'ah-ha!' :point_up: moments I had while building this site: 

1. **General JavaScript:** 
* How to create deep node clones with `cloneNode(true)`
* I tried to append multiple clones with `appendChild()` and learned that this method can only append one child at a time (It's kind of in the name I guess!), but `append()` can append multiple elements! 
* Setting a CSS variable dynamically through JavaScript: I needed to get an element's `clientHeight` property dynamically and set that value as a CSS variable using `setProperty()`. In the end I discarded this code but it was good to learn how to do it!
* Using a flag variable that is set to a Boolean value to control which code blocks should be triggered. 
 

2. **JavaScript Media Queries:**
* How to use the value (Boolean) of the `matches` property of the `MediaQueryList` Object returned by the `matchMedia()` method as a condition for the execution of code.
* Attaching a 'change' event listener to the variable that has been assigned the `MediaQueryList` to track the change specified in the media query.
* Calling the function for initial media query condition check when the script loads. (e.g to check if the size of the screen is mobile, tablet or desktop).
* What happens in the media query...happens again when `matches` is true! In the media query for the projects slider, clones of cards are created and inserted into the DOM. For mobile, there are only two clones. For desktop, there are six. This is all good and well until the user resizes their window. Every time the resize from mobile to desktop and vice versa occurs, new clones are created and inserted, resulting in unwanted clones that break the slider functionality. I ammended this by adding an 'if' statement in the media query to check whether the window has previously been classed as 'mobile' or 'desktop' and removing the previously added clones before generating new ones. 

3. **CSS**
* CSS variables: how to set and use CSS variables in style declarations.
* `Calc()` function: although I eventually discarded this in my code it was a great revelation that CSS has this functionality! 
* `mix-blend-mode` property that defines how element colors should be blended with the backdrop.
* How to create mailto and telephone anchor links.
* How to use CSS focus states to improve tabbing through site. 









