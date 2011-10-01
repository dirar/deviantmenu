/*
---
description:     a Javascript class for Mootools framework that creates a dynamic menu from a ul list and has a similar effect as the devianttart menu <http://www.devianttart.com>

authors:
  - Dirar Abu Kteish (http://www.developer.ps)

license:
  - MIT-style license

requires:
  core/1.4: [Core,Browser,Array,Function,Number,String,Hash,Element,Class,Class_Extras,Element_Style,Fx,Fx_CSS,Event,Element_Event, DomReady]
  more/1.4: [Scroller]
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
        this.instantcount = 0;
        this.breadcrumbs = [];
        this.menuElement = element;
        if(typeOf(this.menuElement) != 'element'){this.menuElement = $(element);}
        this.options.position  = this.menuElement.getSize().x;
        this.multipleBy = (this.options.direction == 'right') ? 1 : -1;
        if(this.options.updateHeight){this.menuElement.set('tween', {duration: this.options.duration});}
        this.menuWarpper = new Element('div', {'class' : 'warpper1', 'id' : 'deviantMenu-warpper' + this.options.idPrefix, 'tween' : {duration: this.options.duration}});
        this.scroll = null;
        this.constructMenu();
    },
    constructMenu: function(){
        var self = this;
        //create a unique id for the ul elements
        this.menuElement.getElements('ul').each(function(el, i){
            el.set('id', self.options.idPrefix + i);
        });
        //create a separat div for each list without children
        this.menuElement.getElements('ul').each(function(el, i){
            self.parseElements(el, (el.getParent('ul') ? el.getParent('ul').get('id') : null));
        });
        this.menuElement.getElement('ul').destroy();
        this.breadcrumbs = null;
        this.menuWarpper.inject(this.menuElement);
        if($(this.options.idPrefix + '0div')){//show 1st menu and update it's height
            $(this.options.idPrefix + '0div').removeClass('hide');
            if(this.options.updateHeight){this.menuWarpper.setStyle('height', $(this.options.idPrefix + '0div').offsetHeight);}
        }
        if(this.menuElement.getElement('.selected')){//auto scroll to selected 
            this.menuWarpper.tween(this.options.direction, this.multipleBy * this.menuElement.getElement('.selected').getParent('div').offsetLeft);
        }
        //show menu
        this.menuElement.setStyle('visibility', 'visible');
    },
    parseElements: function(ulO, parentID){
        var self = this;
        var id = ulO.get('id');//parent ul id
        var divItem = new Element('div', {'class' : this.options.itemContainer + " level" + this.options.idPrefix + ulO.getParents('ul').length, 'id': id + 'div'});//new list container
        //this.menuElement.addEvent('mouseout', this.scroll.stop.bind(this.scroll));  
        
        if(!ulO.getElement('.selected')){divItem.addClass('hide');}
        var position = ulO.getParents('ul').length * this.options.position;
        divItem.setStyle(this.options.direction, position);//set position
        var parent = ulO.getParent().clone();//parent li
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
                        self.backTo($(event.target.get('id') + 'div'));                                                
                    });                    
                    if(i < ulO.getParents('ul').length){
                        new Element('span', {'html' : self.options.breadcrumbsSeparator ,'class' : 'breadcrumbs-separator'}).inject(breadcrumbslnks);
                    }
                }
                breadcrumbslnks.inject(header);                
            }else{
                //create link to parent
                var link = new Element('a', {'text' : parent.get('text').trim(), 'class' : 'back'}).inject(header);
                new Element('div', {'class' : (this.options.direction == 'right') ? 'left' : 'right'}).inject(link);
                link.addEvent('click', function(event){
                     self.backTo($(parentID + 'div'));
                });                
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
                        $$('.level' + self.options.idPrefix + pnum).addClass('hide');//hide all containers on the same level
                        child.removeClass('hide');
                        //self.menuWarpper.tween(this.options.direction, this.multipleBy * child.offsetLeft);
                        self.menuWarpper.tween(self.options.direction, [self.menuWarpper.offsetLeft, self.multipleBy * child.offsetLeft]);
                        if(self.options.updateHeight){self.menuElement.tween('height', child.offsetHeight);}                                                
                        if(self.options.carouselScroller){
                            scroll.stop.bind(scroll);
                        }
                    }
                });
                new Element('div', {'class' : self.options.direction}).inject(li);
            }
            //fire click event on link click
            li.addEvent('click', function(event){
                if($(event.target).get('tag') == 'a'){self.fireEvent('click');}
            });
            li.inject(ul);
        });
        ul.inject(divItem);
        divItem.inject(this.menuWarpper);
    }, backTo: function(parent){
        this.menuWarpper.tween(this.options.direction, this.multipleBy * parent.offsetLeft);
        if(this.options.updateHeight){this.menuElement.tween('height', parent.offsetHeight);}
    }
}); 
