deviantMenu
===========

deviantMenu creates an images rotator that can be easily customized

![Screenshot](http://www.developer.ps/moo/deviantmenu/images/sc1.jpg)

How to use
----------

<ol>
	<li>
		Simply create the menu structure with ul li elements
	</li>
	<li>
		To have the menu automaticly navigate to an item just add to it 'selected' class
	</li>
	<li>
		Include mootols-core file and deviantMenu.js and deviantMenu.css file
	</li>
	<li>
		window.addEvent('domready', function(){
                var devmenu = new deviantMenu('deviantMenu-main-conatiner');
        });
	</li>
</ol>
Options:
<ul>
	<li>itemContainer, items container class, default: 'deviantMenu-menu-item'</li>
	<li>position, depends on width style for the menu</li>
	<li>direction, right or left</li>
	<li>duration, scroll duration</li>
	<li>updateHeight, change height automatically, default: true</li>
</ul>

Screenshots
-----------

![Screenshot](http://www.developer.ps/moo/deviantmenu/images/sc1.jpg)
