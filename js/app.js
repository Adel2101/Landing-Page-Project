/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
let landingPageSections = document.querySelectorAll("section");
let landingPageFragment = document.createDocumentFragment();
let landingPageNavigationList = document.getElementById("navbar__list");
let menuButton = document.getElementById("menuButton");
let menuButtonStatus = "notClicked";
let mobileDevicewidth = 480;
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
//this function alternate between two navigation configuration according to the diplay size
function navigationHeaderConfigutation() 
{
    if(window.innerWidth < mobileDevicewidth)
    {
        menuButton.style.display = "block"; //show menu button
        landingPageNavigationList.style.display ="none"; //hide navigation list
    }
    else
    {
        menuButtonStatus = "notClicked";
        menuButton.style.display = "none";//hide menu button
        landingPageNavigationList.style.display ="block"; //shownavigation menu
        landingPageNavigationList.style.marginTop ="0"; //ensure top margin is 0 in case screen resized while the list was displayed as blocks using the button because button will disappear
        let landingPageNavigationListItems = document.querySelectorAll("li");
        landingPageNavigationListItems.forEach(function(item) //ensure li elements are inline block in case screen resized while the list was displayed as blocks using the button
        {
            item.style.display = "inline-block";
        })
        
    }
}

//this function expand & collapse the menu in the small device screen mode
function menuButtonClicking(){
    if(menuButtonStatus === "notClicked") //if button last status is no clicked
        {
            menuButtonStatus = "clicked";
            landingPageNavigationList.style.display ="block"; //show the navigation menu
            landingPageNavigationList.style.marginTop ="55px"; //shift down to be below the button box
            menuButton.style.background = "rgb(0, 107, 126)"; //change color to indicate clicked button
            let landingPageNavigationListItems = document.querySelectorAll("li");
            landingPageNavigationListItems.forEach(function(item) //show the li elements as dropdown menu
            {
               item.style.display = "block";
            })
        }
        else //if button last status is  clicked --> hide the navigation menu & its items
        {
            menuButtonStatus ="notClicked";
            landingPageNavigationList.style.display ="none";
            landingPageNavigationList.style.marginTop ="0";
            menuButton.style.backgroundColor = "rgb(34, 32, 32)";
            let landingPageNavigationListItems = document.querySelectorAll("li");
            landingPageNavigationListItems.forEach(function(item)
            {
                item.style.display = "none";
            })
        }
}

//this function highlight the section in view and its menu item in top
function highlightSectionAndMenuIteminView(){
    landingPageSections.forEach(function(landingPageSection){
        let rectangle = landingPageSection.getBoundingClientRect(); //for each section, check its portion of the viewport
        if(rectangle.top>=-200 && rectangle.top<=200) //if section is in the view, highlight the section background and section menu item
        {
            landingPageSection.classList.add("your-active-class"); //set the active class to highlight the section background & play the animated balls
            
            //get the active section name, then add __menuItem to it to produce the section menu item ID then add the class menu__link__scrolling to it
            let landingPageSectionName =landingPageSection.getAttribute("data-nav");
            let navigationItem = document.getElementById(landingPageSectionName+"__menuItem");
            navigationItem.classList.add("menu__link__scrolling");

        }
        else //if the section is not inthe view, remove highlighting of the section background and section menu item
        {
            landingPageSection.classList.remove("your-active-class");
            let landingPageSectionName =landingPageSection.getAttribute("data-nav");
            let navigationItem = document.getElementById(landingPageSectionName+"__menuItem");
            navigationItem.classList.remove("menu__link__scrolling");
        }

    })
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
document.addEventListener("DOMContentLoaded",function()
{
    //intialization of the navigation menu dynamically & Setting the scrolling feature (Event Listerner) for each 
    //navigation menu item.
    landingPageSections.forEach(function(landingPageSection){
        let landingPageNavigationListItem = document.createElement("li"); //Navigation Menu item creation
        let landingPageNavigationListAnchor = document.createElement("a"); //Navigation Menu item Anchor creation
        let landingPageSectionName =landingPageSection.getAttribute("data-nav"); //getting the title of the section
        let landingPageSectionIdName ="#"+landingPageSection.id; //getting the #ID of the section

        landingPageNavigationListItem.className=("menu__link"); //setting <li class ="menu__link>"
        landingPageNavigationListItem.setAttribute("id",landingPageSectionName+"__menuItem"); //setting an id to the menu item <li class ="menu__link id= "#Section1__menuItem">

        /*preventing the default action of click because the action will be implemented before the smooth scrolling 
        function according to the queue. btw i tried to not to set href and avoid extra code lines but the mouse would't change when i move on the menu item.
        so, the below two lines are only to ensure the menu item is responsive to the mouse*/
        landingPageNavigationListAnchor.setAttribute("href",landingPageSectionIdName); //setting <a href="#section1">
        landingPageNavigationListAnchor.setAttribute("onclick","event.preventDefault()");

        landingPageNavigationListAnchor.textContent = landingPageSectionName; //setting the displayed name of the anchor --> <a href="#section1"> Section 1 </a>
        landingPageNavigationListAnchor.addEventListener("click",function(event)//upon clicking on the anchor, scroll to the related section.
        { 
            landingPageSection.scrollIntoView({behavior:'smooth' , block:'center'})
        })

        /*adding anchor as a child to the li. then append it to the document fragment.
        <li class ="menu__link id= "#Section1__menuItem">
            <a href="#section1" onclick="event.preventDefault()">Section 1</a>
        </li>*/
        landingPageNavigationListItem.appendChild(landingPageNavigationListAnchor); 
        landingPageFragment.appendChild(landingPageNavigationListItem);

        
        });
    landingPageNavigationList.appendChild(landingPageFragment);  //append all the items to the list

    navigationHeaderConfigutation(); //Intialize the menu style depending on the screensize (one time implementation)
    window.addEventListener("resize",navigationHeaderConfigutation); //Check if the menu style still suitable for the new resized screen
    document.addEventListener("scroll",highlightSectionAndMenuIteminView); //Activating the section in view feature.
    menuButton.addEventListener("click",menuButtonClicking); //expand & collapse the menu by button click
       

    
});
