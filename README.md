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
    * Progress bar: the HTML video/audio DOM `timeupdate` event is fired whenever the playing position of an audio/video has been changed. It is invoked by playing the audio or when a user moves the playback position. The event listener is added to the audio element and triggers an `updateProgress` function. This function takes in the event object and extracts the values of the `duration` and `currentTime` properties (which are audio/video properties) with destructured assignment from the source element that triggered the event (the audio elemenet - this could also be written simply as the `audio` variable or `e.target`). Then it sets the width of the progress bar, which is an empty, 100% height div with a background-color and a transition set on it's width property to make the progress update visually smooth. The equation for setting the width divides the `currentTime` by the total `duration` of the track multiplied by 100 to get a percentage. If the user clicks on the progress container to move the playback, a `click` event listener triggeres the function `setProgress`. This function update the `currentTime` property by dividing the x offset (where the user clicked) by the full width of the progress container (set to 100% in CSS) and multiplying by the full duration of the audio. Since the `currentTime` is updated, it causes the `timeupdate` event to fire again, and update the progress bar's width. 

* **Typewriter:** The phrases to type out are stored in an array. The `textContent` property of the empty `p` element within the intro content will be updated with these phrases letter by letter at a set time delay. The `typeEffect` function is an IIFE which will execute as soon as it is read. The `currentPhrase` variable is set to whichever phrase index we are on (starting from index 0 of phrases array), and the `letter` variable is a substring of the current phrase, starting at index 0 and incrementing the end index by 1 in order to add a letter at a time. There is an `isDeleting` Boolean flag which is used in an if statement to initiate deleting the letters by decrementing the letter index within the substring method called on `letter`. There is another if statement that checks if the last phrase has been typed out - at which point we stop deleting. Another if statement checks if the deletion of characters in a phrase is complete (`isDeleting` is true and `letter` is be an empty string), and if so, increments the `phraseIndex` and resets `letterIndex` to 0 to type characters beginning from index 0 of the next phrase. 

## What could be improved
* Accessibility: although I kept this in mind whilst developing, some features fall short when it comes to accessibility. One example is that in the coding journey timeline, each entry contains a list which contains `<span>` elements and `<a>` tags. This has been flagged as an issue in the Lighthouse report as lists should only contain `<li>`, `<script>` or `<template>` elements.
* Projects section: 
    * Currently it is not responsive as the viewport element width is fixed to one width on mobile, and another on desktop - this is part of how the infinite slider functionality works, as it shifts the cards by the their width on the x axis. It is currently too wide for some mobile screens. 
    * Although I set negative `tabIndex` on clone cards so that users don't have to tab through the same information twice, tabbing for sighted users in this section is still quite a hot mess!

* Design: If I were to start again from scratch, I would try designing the site first on Figma or similar tool and then building it. I was designing as I went along and that made the developing process slower and more difficult as I would find myself distracted by design decisions.

* Features to add: 
    * Light/dark mode with a toggle button - I want to learn how to create a toggle button look in CSS.
    * Custom cursor that changes when hovered on certain elements.
    * Touch screen functionality for mobile with touch event listeners.
    * Random personal fact generator - I thought it might be a fun way to share some facts about me while learning more about `Math.random`. 

## Learnings 
A non-exhaustive list of new information learned and 'ah-ha!':point_up: moments I had while building this site: 

1. **General JavaScript:** 
* How to create deep node clones with `cloneNode(true)`
* I tried to append multiple clones with `appendChild()` and learned that this method can only append one child at a time (It's kind of in the name I guess!), but `append()` can append multiple elements! 
* Setting a CSS variable dynamically through JavaScript: I needed to get an element's `clientHeight` property dynamically and set that value as a CSS variable using `setProperty()`. In the end I discarded this code but it was good to learn how to do it!
* Using a flag variable that is set to a Boolean value to control which code blocks should be triggered. 
* Selecting an element via it's correlating button's `[aria-controls]` attribute. 

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
* How to use Pseudo-elements for design purposes.  

4. **HTML**
* HTML5 DOM has methods, properties and events for video and audio elements.
* Using the `tabindex` attribute to set or remove focus from an element.
* Semantic use of headings and sections. Appropriate use of divs.   
* Ordering the document flow in such a way that focus moves correctly from one focusable element to the next. 

and many more...

**Thank you for considering my application! :bouquet:** 