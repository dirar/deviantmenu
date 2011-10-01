/*
---
description:     a Javascript class for Mootools framework that creates a dynamic menu from a ul list and has a similar effect as the devianttart menu <http://www.devianttart.com>

authors:
  - Dirar Abu Kteish (http://www.developer.ps)

license:
  - MIT-style license

requires:
<<<<<<< HEAD
  core/1.4: [Core,Browser,Array,Function,Number,String,Hash,Element,Class,Class_Extras,Element_Style,Fx,Fx_CSS,Event,Element_Event, DomReady]
  more/1.4: [Scroller]
=======
  core/1.2.3:   [Core,Browser,Array,Function,Number,String,Hash,Element,Class,Class_Extras,Element_Style,Fx,Fx_CSS,Event,Element_Event, DomReady]
>>>>>>> c487b599697adc9d4395a93b6774d16f2d00ca91
provides:
  - deviantMenu
...
*/
var deviantMenu = new Class({
    Implements: [Events, Options],
    initialize: function(element, options) {
        this.setOptions({
            itemContainer: 'deviantMenu-menu-item',//items container class
            idPrefix: 'deviantMenuid',//prefix for unique ids
<<<<<<< HEAD
            menuListClass: 'menuList',
            position: 0,//depends on width style for the menu 
            direction: 'left',//direction, right or left
            duration: 250,//menu tween duration
            updateHeight: true,//change height automatically            
            usebreadcrumbs: true,
            breadcrumbsSeparator: ', ',
            carouselScroller: false,
            scrollerArea: 60,
            scrollerVelocity: 0.3
        }, options);
        this.breadcrumbs = [];
=======
            position: 0,//depends on width style for the menu 
            direction: 'left',//direction, right or left
            duration: 250,//scroll duration
            updateHeight: true,//change height automatically
            menuListClass: 'menuList'
        }, options);
>>>>>>> c487b599697adc9d4395a93b6774d16f2d00ca91
        this.menuElement = element;
        if(typeOf(this.menuElement) != 'element'){this.menuElement = $(element);}
        this.options.position  = this.menuElement.getSize().x;
        this.multipleBy = (this.options.direction == 'right') ? 1 : -1;
        if(this.options.updateHeight){this.menuElement.set('tween', {duration: this.options.duration});}
        this.menuWarpper = new Element('div', {'class' : 'warpper1', 'id' : 'deviantMenu-warpper', 'tween' : {duration: this.options.duration}});
<<<<<<< HEAD
        this.scroll = null;
=======
>>>>>>> c487b599697adc9d4395a93b6774d16f2d00ca91
        this.constructMenu();
    },
    constructMenu: function(){
        //create a unique id for the ul elements
        this.menuElement.getElements('ul').each(function(el, i){
            el.set('id', this.options.idPrefix + i);
        }.bind(this));
        //create a separat div for each list without children
        this.menuElement.getElements('ul').each(function(el, i){
<<<<<<< HEAD
            this.parseElements(el, (el.getParent('ul') ? el.getParent('ul').get('id') : null));
        }.bind(this));
        this.menuElement.getElement('ul').destroy();
        this.breadcrumbs = null;
=======
            this.parseElements(el, ( el.getParent('ul') ? el.getParent('ul').get('id') : null));
        }.bind(this));
        this.menuElement.getElement('ul').destroy();
        //this.menuElement.getElements('ul').destroy();//destroy ul elements before adding the new list
>>>>>>> c487b599697adc9d4395a93b6774d16f2d00ca91
        this.menuWarpper.inject(this.menuElement);
        if($(this.options.idPrefix + '0div')){//show 1st menu and update it's height
            $(this.options.idPrefix + '0div').removeClass('hide');
            if(this.options.updateHeight){this.menuWarpper.setStyle('height', $(this.options.idPrefix + '0div').offsetHeight);}
        }
<<<<<<< HEAD
        if(this.menuElement.getElement('.selected')){//auto scroll to selected 
            this.menuWarpper.tween(this.options.direction, this.multipleBy * this.menuElement.getElement('.selected').getParent('div').offsetLeft);
        }
=======
        if(this.menuElement.getElement('.selected')){
            this.menuWarpper.tween(this.options.direction, this.multipleBy * this.menuElement.getElement('.selected').getParent('div').offsetLeft);
        }//auto scroll to selected 
>>>>>>> c487b599697adc9d4395a93b6774d16f2d00ca91
        //show menu
        this.menuElement.setStyle('visibility', 'visible');
    },
    parseElements: function(ulO, parentID){
        var id = ulO.get('id');//parent ul id
        var divItem = new Element('div', {'class' : this.options.itemContainer + " level" + ulO.getParents('ul').length, 'id': id + 'div'});//new list container
<<<<<<< HEAD
        //this.menuElement.addEvent('mouseout', this.scroll.stop.bind(this.scroll));  
        
=======
>>>>>>> c487b599697adc9d4395a93b6774d16f2d00ca91
        if(!ulO.getElement('.selected')){divItem.addClass('hide');}
        var position = ulO.getParents('ul').length * this.options.position;
        divItem.setStyle(this.options.direction, position);//set position
        var parent = ulO.getParent().clone();//parent li
<<<<<<< HEAD
        var header = null;
        if(parent.get('tag') == 'li'){
            if(parent.getFirst('ul')){parent.getFirst('ul').destroy();}
            header = new Element('div', {'class' : 'list-header'});
            if(this.options.usebreadcrumbs){
                this.breadcrumbs[ulO.getParents('ul').length] = [];
                this.breadcrumbs[ulO.getParents('ul').length][0] = parent.get('text').trim();
                this.breadcrumbs[ulO.getParents('ul').length][1] = ulO.getParent('ul').get('id');
                var breadcrumbslnks = new Element('div', {'class' : 'breadcrumbs-conatiner'});
                for(var i = 1; i < ulO.getParents('ul').length + 1; i++){
                    var link = new Element('a', 
                        {   'text' : this.breadcrumbs[i][0]
                            , 'class' : 'breadcrumbs', 'id' : this.breadcrumbs[i][1]
                        }
                    ).inject(breadcrumbslnks);
                    link.addEvent('click', function(event){
                        this.backTo($(event.target.get('id') + 'div'));                                                
                    }.bind(this));                    
                    if(i < ulO.getParents('ul').length){
                        new Element('span', {'html' : this.options.breadcrumbsSeparator ,'class' : 'breadcrumbs-separator'}).inject(breadcrumbslnks);
                    }
                }
                breadcrumbslnks.inject(header);                
            }else{
                //create link to parent
                var link = new Element('a', {'text' : parent.get('text').trim(), 'class' : 'back'}).inject(header);
                new Element('div', {'class' : (this.options.direction == 'right') ? 'left' : 'right'}).inject(link);
                link.addEvent('click', function(event){
                     this.backTo($(parentID + 'div'));
                }.bind(this));                
            }
            header.inject(divItem);
        }
        var ul = new Element('ul', {'class' : this.options.menuListClass});//create new list
        var scroll = null;
        if(this.options.carouselScroller){
            var ullistHeight = this.menuElement.offsetHeight - ((header) ? header.getStyle('height').toInt() : 0);//subtract the header menu height cuz it's fixed
            ul.setStyles({
                'height' : ullistHeight,
                'position': 'absolute',
                'overflow': 'hidden'
            });
            scroll = new Scroller(ul, {area: this.options.scrollerArea, velocity: this.options.scrollerVelocity});
            ul.addEvent('mouseover', scroll.start.bind(scroll));
        }
=======
        if(parent.get('tag') == 'li'){
            if(parent.getFirst('ul')){parent.getFirst('ul').destroy();}
            //create link to parent
            var link = new Element('a', {'text' : parent.get('text'), 'class' : 'back'}).inject(divItem);
            //link.addClass();
            new Element('div', {'class' : (this.options.direction == 'right') ? 'left' : 'right'}).inject(link);
            link.addEvent('click', function(event){
                var parent = $(parentID + 'div');
                this.menuWarpper.tween(this.options.direction, this.multipleBy * parent.offsetLeft);
                if(this.options.updateHeight){this.menuElement.tween('height', parent.offsetHeight);}                        
            }.bind(this));
        }
        var ul = new Element('ul');//create new list
        ul.addClass(this.options.menuListClass);
>>>>>>> c487b599697adc9d4395a93b6774d16f2d00ca91
        $$('#' + id + '> li').each(function(el, i){
            var li = el.clone();
            if(li.getFirst('ul')){li.getFirst('ul').destroy();}
            if(el.getElement('ul')){//if li has children
                var childID = el.getChildren('ul')[0].get('id') + 'div';
                var pnum = el.getParents('ul').length;
                li.addEvent('click', function(event){
                    event = new Event(event);
                    if($(event.target).get('tag') != 'a'){//ignore effect if element is a link
                        var child = $(childID);
                        $$('.level' + pnum).addClass('hide');//hide all containers on the same level
                        child.removeClass('hide');
                        //this.menuWarpper.tween(this.options.direction, this.multipleBy * child.offsetLeft);
                        this.menuWarpper.tween(this.options.direction, [this.menuWarpper.offsetLeft, this.multipleBy * child.offsetLeft]);
                        if(this.options.updateHeight){this.menuElement.tween('height', child.offsetHeight);}                                                
<<<<<<< HEAD
                        if(this.options.carouselScroller){
                            scroll.stop.bind(scroll);
                        }
=======
>>>>>>> c487b599697adc9d4395a93b6774d16f2d00ca91
                    }
                }.bind(this));
                new Element('div', {'class' : this.options.direction}).inject(li);
            }
            //fire click event on link click
            li.addEvent('click', function(event){
                if($(event.target).get('tag') == 'a'){this.fireEvent('click');}
            }.bind(this));
            li.inject(ul);
        }.bind(this));
        ul.inject(divItem);
        divItem.inject(this.menuWarpper);
<<<<<<< HEAD
    }, backTo: function(parent){
        this.menuWarpper.tween(this.options.direction, this.multipleBy * parent.offsetLeft);
        if(this.options.updateHeight){this.menuElement.tween('height', parent.offsetHeight);}
=======
>>>>>>> c487b599697adc9d4395a93b6774d16f2d00ca91
    }
}); 
