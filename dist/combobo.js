!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Combobo=e():t.Combobo=e()}("undefined"!=typeof self?self:this,function(){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=2)}([function(t,e,n){"use strict";t.exports=s;var i=n(3),r=n(4),o=Array.prototype;function s(t){if(!(this instanceof s))return new s(t);var e,n=r(t.className).split(/\s+/);for(this._elem=t,this.length=0,e=0;e<n.length;e+=1)n[e]&&o.push.call(this,n[e])}s.prototype.add=function(){var t,e;for(e=0;e<arguments.length;e+=1)t=""+arguments[e],i(this,t)>=0||o.push.call(this,t);return this._elem.className=this.toString(),this},s.prototype.remove=function(){var t,e,n;for(n=0;n<arguments.length;n+=1)e=""+arguments[n],(t=i(this,e))<0||o.splice.call(this,t,1);return this._elem.className=this.toString(),this},s.prototype.contains=function(t){return i(this,t+="")>=0},s.prototype.toggle=function(t,e){return t+="",!0===e?this.add(t):!1===e?this.remove(t):this[this.contains(t)?"remove":"add"](t)},s.prototype.toString=function(){return o.join.call(this," ")}},function(t,e,n){"use strict";t.exports=function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:8;var n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";var i=n+"0123456789";var r=n.charAt(Math.floor(Math.random()*n.length));for(var o=1;o<e;o++)r+=i.charAt(Math.floor(Math.random()*i.length));if(document.getElementById(r))return t(e);return r}},function(t,e,n){"use strict";var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),o=w(n(0)),s=w(n(5)),u=w(n(6)),l=w(n(7)),a=w(n(8)),c=w(n(9)),f=w(n(10)),h=w(n(12)),p=w(n(14)),d=w(n(15)),v=w(n(17)),g=w(n(18)),m=w(n(19)),y=w(n(20)),b=w(n(21)),O=w(n(24)),x=w(n(1));function w(t){return t&&t.__esModule?t:{default:t}}t.exports=function(){function t(e){var n=this;if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),e=e||{},this.config=(0,b.default)(e),this.isOpen=!1,this.currentOption=null,this.selectElm=null,this.selected=[],this.inputElm=null,this.groups=[],this.isHovering=!1,this.autoFilter=this.config.autoFilter,this.optionsWithEventHandlers=new Set,this.optionsWithKeyEventHandlers=new Set,!this.config.internalCall){var i={},r=(0,d.default)(this.config.select,!0),o=(0,d.default)(this.config.input,!0);if(o&&o.length&&!this.config.select.startsWith("#")&&o.forEach(function(e){var r=Object.assign({},n.config);if(n.config.selectOnly&&(r.filter="starts-with",r.autoFilter=!1,"input"===e.tagName.toLowerCase())){r.inputElm=e;var o=document.createElement("div");[].concat(function(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}(e.attributes)).forEach(function(t){["type","value"].includes(t.name)||o.setAttribute(t.name,t.value)}),r.inputElm.style.display="none",r.inputElm.insertAdjacentElement("afterend",o),o.setAttribute("tabindex","0"),o.id=e.id+"-combobo",e=o}e.id=e.id||(0,x.default)(),r.input=e,r.internalCall=!0,i[e.id]=new t(r)}),r&&r.length&&!this.config.input.startsWith("#")&&r.forEach(function(e){e.id=e.id||(0,x.default)();var r=document.getElementById(e.id+"-combobo");r&&r.remove();var o=n.transformSelectElement(e);e.parentNode.insertBefore(o.comboElement,e.nextSibling);var s=Object.assign({},n.config);s.input=o.input,s.select=e,s.multiselect=e.multiple,s.internalCall=!0,e.style.display="none",i[e.id]=new t(s)}),Object.keys(i).length)return 1==Object.keys(i).length?i[Object.keys(i)[0]]:i}if(this.input=(0,d.default)(this.config.input),this.selectElm=(0,d.default)(this.config.select),this.toggleButtonIcon=this.config.toggleButtonIcon,this.input&&this.input.parentNode&&(this.list=(0,d.default)(this.config.list,!1,this.input.parentNode),this.toggleButton=(0,d.default)(this.config.toggleButton,!1,this.input.parentNode),this.config.toggleButtonIcon&&(this.toggleButton.innerHTML=this.config.toggleButtonIcon)),!this.input||!this.list)throw new Error("Unable to find required elements (list/input)");if(this.config.source&&Array.isArray(this.config.source)){for(this.emptyDropdownList();this.list.hasChildNodes();)this.list.removeChild(this.list.firstChild);this.currentOpts=[],this.config.source.forEach(function(t){if(t.label&&t.options){var e=n.createOptgroupElement(t.label);t.options.forEach(function(t){var i=n.createOptionElement(t.text,t.value,t.selected,t.disabled);e.appendChild(i),n.currentOpts.push(i)}),n.list.appendChild(e)}else{var i=n.createOptionElement(t.text,t.value,t.selected,t.disabled);n.list.appendChild(i),n.currentOpts.push(i)}}),this.cachedOpts=this.currentOpts}else this.cachedOpts=this.currentOpts=(0,d.default)(this.config.options,!0,this.list);if(this.config.groups){var s=(0,d.default)(this.config.groups,!0,this.list);this.groups=s.map(function(t){return{element:t,options:n.cachedOpts.filter(function(e){return t.contains(e)})}})}(0,m.default)(this.input,this.list,this.cachedOpts),this.config.useLiveRegion&&(this.liveRegion=new u.default({ariaLive:"assertive"})),this.initEvents();var l=!0,a=!1,c=void 0;try{for(var f,h=this.currentOpts[Symbol.iterator]();!(l=(f=h.next()).done);l=!0){var p=f.value;p.classList.contains(this.config.selectedClass)&&(this.currentOption=p,this.select())}}catch(t){a=!0,c=t}finally{try{!l&&h.return&&h.return()}finally{if(a)throw c}}}return r(t,[{key:"initEvents",value:function(){var t=this;(0,s.default)(this),this.optionsWithKeyEventHandlers.has(this.input)||(this.input.addEventListener("click",function(){t.openList().goTo(t.getOptIndex()||0)}),this.input.addEventListener("blur",function(){t.isHovering||t.closeList()}),this.input.addEventListener("focus",function(){t.selected.length&&(t.input.value=t.selected.length>=2?"":t.config.selectionValue(t.selected)),t.config.selectOnly||t.input.select()}),this.toggleButton&&this.toggleButton.addEventListener("click",function(e){e.stopPropagation(),t.isOpen?t.closeList():t.openList()}),document.addEventListener("click",function(e){!(0,p.default)(e.target,[t.input,t.list],!0)&&t.isOpen&&t.closeList()})),this.optionEvents(),this.initKeys()}},{key:"getOptIndex",value:function(){return this.currentOption&&this.currentOpts.indexOf(this.currentOption)}},{key:"optionEvents",value:function(){var t=this;this.cachedOpts.forEach(function(e){t.optionsWithEventHandlers.has(e.id)||t.selected.includes(e)||(e.addEventListener("click",function(){t.goTo(t.currentOpts.indexOf(e)).select()}),e.addEventListener("mouseover",function(){var n=t.currentOption;n&&(0,o.default)(n).remove(t.config.activeClass),(0,o.default)(e).add(t.config.activeClass),t.isHovering=!0}),e.addEventListener("mouseout",function(){(0,o.default)(e).remove(t.config.activeClass),t.isHovering=!1}),t.optionsWithEventHandlers.add(e.id))})}},{key:"openList",value:function(){(0,o.default)(this.list).add(this.config.openClass),this.input.setAttribute("aria-expanded","true"),this.isOpen||this.announceCount(),this.isOpen=!0,this.emit("list:open");var t=(0,c.default)(this.list);if(!t.visible){var e="bottom"===t.position?0-(window.innerHeight-(this.input.clientHeight+this.list.clientHeight)):0;(0,l.default)({element:this.input,offset:e,bezier:[.19,1,.22,1],duration:100})}return this}},{key:"closeList",value:function(t,e){return(0,o.default)(this.list).remove(this.config.openClass),this.input.setAttribute("aria-expanded","false"),this.isOpen=!1,t&&this.input.focus(),!this.multiselect&&this.selected.length&&(this.input.value=this.config.selectionValue(this.selected)),e&&!this.config.selectOnly&&this.input.select(),this.emit("list:close"),this}},{key:"getSearchString",value:function(t){var e=this;return t?("number"==typeof this.searchTimeout&&window.clearTimeout(this.searchTimeout),this.searchTimeout=window.setTimeout(function(){e.searchString=""},this.config.selectSearchTimeout),this.searchString=this.searchString?this.searchString+t:t,this.searchString.toLowerCase()):this.searchString}},{key:"initKeys",value:function(){var t=this;if(!this.optionsWithKeyEventHandlers.has(this.input)){this.optionsWithKeyEventHandlers.add(this.input),h.default.down(this.input,[{keys:["up","down"],callback:function(e,n){if(t.isOpen)return-1===t.currentOpts.indexOf(t.currentOption)?t.goTo(0,!0):t.goTo("down"===n?"next":"prev",!0);var i=t.selected.length?t.currentOpts.indexOf(t.selected[t.selected.length-1]):0;t.goTo(i,!0).openList()},preventDefault:!0},{keys:["enter"],callback:function(){t.isOpen?t.select():t.openList()}},{keys:["escape"],callback:function(e){t.isOpen&&(e.stopPropagation(),t.closeList(!0,!0))}},{keys:["backspace"],callback:function(){t.selected.length>=2&&(t.input.value="")}}]),h.default.down(window,function(e){" "===e.key&&e.target===t.input&&(t.config.selectOnly&&(e.preventDefault(),e.stopPropagation()),t.isOpen||t.openList())}),h.default.down(this.input,function(e){var n=e.key,i=e.metaKey,r=e.ctrlKey,o=e.altKey;i||r||o||n&&[" ","tab","backspace"].includes(n.toLowerCase())&&t.isOpen&&(e.preventDefault(),e.stopPropagation(),t.select(),t.closeList())}),this.config.selectOnly&&(h.default.up(this.input,function(e){var n=e.key,i=e.altKey,r=e.ctrlKey,o=e.metaKey;if(new Array(26).fill(1).map(function(t,e){return String.fromCharCode("a".charCodeAt(0)+e)}).includes(n)&&" "!==n&&!i&&!r&&!o){e.preventDefault(),e.stopPropagation();var s=t.getSearchString(n);t.isOpen||t.openList();var u=t.searchIndex(s);u>-1&&t.goTo(u)}}),this.input.addEventListener("blur",function(){t.searchString="",t.selected.length&&(t.input.innerText=t.config.selectionValue(t.selected))}));var e=[9,13,27,16];h.default.up(this.input,function(n){if(t.autoFilter){var i=t.config.filter,r=t.cachedInputValue;e.indexOf(n.which)>-1||!i||"div"===t.input.tagName.toLowerCase()||(t.freshSelection?(t.clearFilters(),r&&r.trim()!==t.input.value.trim()&&(t.filter().openList(),t.freshSelection=!1)):t.filter().openList(),(0,g.default)(t.list,t.currentOpts,t.config.noResultsText))}})}}},{key:"searchIndex",value:function(t){var e=this.getOptIndex(),n=t.trim(),i=n[0],r=n===i.repeat(n.length)&&n.length>1,o=this.currentOpts.filter(function(t){return t.textContent.toLowerCase().startsWith(r?i:n)});if(0===o.length)return-1;if(1===o.length)return this.currentOpts.indexOf(o[0]);if(-1===e)return this.currentOpts.indexOf(o[0]);var s=o.indexOf(this.currentOption);return r&&o.length>1?this.currentOpts.indexOf(o[s+1]||o[0]):-1!==s&&s<o.length-1?this.currentOpts.indexOf(o[0]):this.currentOpts.indexOf(o[s+1]||o[0])}},{key:"clearFilters",value:function(){return this.cachedOpts.forEach(function(t){return t.style.display=""}),this.groups.forEach(function(t){return t.element.style.display=""}),this.currentOpts=this.cachedOpts,this}},{key:"filter",value:function(t,e){var n=this;e||(e=this.config.selectOnly?this.input.innerText:this.input.value);var i=this.config.filter,r=this.currentOpts;return this.currentOpts="function"==typeof i?i(e.trim(),this.cachedOpts):f.default[i](e.trim(),this.cachedOpts),this.currentOpts=this.currentOpts||[],this.updateOpts(),r.every(function(t){return n.currentOpts.indexOf(t)>-1})||t||this.announceCount(),this}},{key:"announceCount",value:function(){var t=this.config.announcement&&this.config.announcement.count;return t&&this.liveRegion&&this.liveRegion.announce(t(this.currentOpts.length),500),this}},{key:"updateOpts",value:function(){var t=this,e=this.config.optionValue;return this.cachedOpts.forEach(function(n){n.style.display=-1===t.currentOpts.indexOf(n)?"none":"",n.innerHTML="string"==typeof e?(0,y.default)(n,"div"===t.input.tagName.toLowerCase()?t.getSearchString():t.input.value,e):e(n)}),this.updateGroups(),this}},{key:"updateGroups",value:function(){return this.groups.forEach(function(t){var e=t.options.filter(function(t){return""===t.style.display});t.element.style.display=e.length?"":"none"}),this}},{key:"select",value:function(){var t=this,e=this.currentOption;if(e){!this.config.multiselect&&this.selected.length&&(0,o.default)(this.selected[0]).remove(this.config.selectedClass);var n=this.selected.indexOf(e),i=n>-1;this.config.multiselect?i?this.selected.splice(n,1):this.selected.push(e):this.selected=this.config.allowEmpty&&i&&!this.config.selectOnly?[]:[e],this.cachedOpts.forEach(function(e){e.setAttribute("aria-selected",t.selected.indexOf(e)>-1?"true":"false")});var r=this.selected.length?this.config.selectionValue(this.selected):"";if(i?(e.classList.remove(this.config.selectedClass),this.emit("deselection",{text:r,option:e})):(e.classList.add(this.config.selectedClass),this.emit("selection",{text:r,option:e})),this.freshSelection=!0,this.config.selectOnly?(this.input.innerText=r,this.config.inputElm&&(this.config.inputElm.value=r)):this.input.value=r,this.cachedInputValue=r,this.filter(!0).clearFilters(),this.config.multiselect||(this.closeList(),this.config.selectOnly||this.input.select()),this.selectElm){var s=this.value(),u=!0,l=!1,a=void 0;try{for(var c,f=this.selectElm.options[Symbol.iterator]();!(u=(c=f.next()).done);u=!0){var h=c.value;this.config.multiselect?h.selected=-1!==s.indexOf(h.value):h.selected=h.value===s}}catch(t){l=!0,a=t}finally{try{!u&&f.return&&f.return()}finally{if(l)throw a}}}return this}}},{key:"reset",value:function(){var t=this;return this.clearFilters(),this.input.value="",this.updateOpts(),this.input.removeAttribute("aria-activedescendant"),this.input.removeAttribute("data-active-option"),this.currentOption=null,this.selected=[],this.cachedOpts.forEach(function(e){(0,o.default)(e).remove(t.config.selectedClass),(0,o.default)(e).remove(t.config.activeClass),e.setAttribute("aria-selected","false")}),this.searchString="",this}},{key:"goTo",value:function(t,e){var n=this;if("string"==typeof t){var i=this.getOptIndex();return this.goTo("next"===t?i+1:i-1,e)}var r=this.currentOpts[t],o=!1;if(!this.currentOpts[t])return 0===this.getOptIndex()&&(this.list.scrollTop=0),this;if(this.groups.length){var s=(0,v.default)(this.groups,r);o=s&&s!==this.currentGroup,this.currentGroup=s}return this.currentOption=r,this.pseudoFocus(o),this.currentOpts.forEach(function(t){t.classList.contains(n.config.activeClass)&&!(0,a.default)(n.list,t)&&(0,l.default)(t)}),this}},{key:"pseudoFocus",value:function(t){var e=this.currentOption,n=this.config.activeClass,i=this.input.getAttribute("data-active-option"),r=i&&document.getElementById(i);return r&&n&&(0,o.default)(r).remove(n),e&&(this.input.setAttribute("data-active-option",e.id),n&&(0,o.default)(e).add(n),this.liveRegion&&(0,O.default)(e,this.config,this.liveRegion.announce.bind(this.liveRegion),t,this.currentGroup&&this.currentGroup.element),this.input.setAttribute("aria-activedescendant",e.id),this.currentOption=e,this.emit("change")),this}},{key:"setOptions",value:function(t){return"object"===(void 0===t?"undefined":i(t))&&this.config.list.append(t),this.cachedOpts.push(t),-1===this.currentOpts.indexOf(t)&&this.currentOpts.push(t),this}},{key:"setCurrentOptions",value:function(){return this.currentOption=this.currentOpts[0],this}},{key:"updateSelectedOptions",value:function(){var t=this,e=document.getElementById(this.config.list.id),n=this.selected;for(this.emptyDropdownList();e.hasChildNodes();)e.removeChild(e.firstChild);return n.length>0&&n.forEach(function(e){t.setOptions(e)}),this}},{key:"emptyDropdownList",value:function(){return this.currentOpts=[],this.cachedOpts=[],this.optionsWithEventHandlers.clear(),this}},{key:"setNoResultFound",value:function(){(0,g.default)(this.list,this.currentOpts,this.config.noResultsText)}},{key:"value",value:function(){var t=[];return this.selected.forEach(function(e){e.hasAttribute("data-value")?t.push(e.dataset.value):t.push(e.innerText)}),this.config.multiselect?t:t&&t.length?t[0]:null}},{key:"transformSelectElement",value:function(t){var e=this,n=document.createElement("div");n.className=this.config.wrapClass,n.id=t.id+"-combobo",t.multiple&&n.classList.add("multiselect");var i=this.config.selectOnly?"div":"input",r=document.createElement(i);if(r.setAttribute("tabindex","0"),r.type="text",r.className=this.config.inputClass,r.id=t.id+"-input",n.appendChild(r),t.labels.length){t.labels[0].htmlFor=r.id}else{var o=t.previousElementSibling;o&&"label"===o.tagName.toLowerCase()&&(o.htmlFor=r.id)}var s=document.createElement("span");s.setAttribute("aria-hidden","true"),s.className=this.config.toggleButtonClass,n.appendChild(s);var u=document.createElement("div");u.className=this.config.listClass,n.appendChild(u);var l=!1;return Array.from(t.children).forEach(function(t){if("optgroup"===t.tagName.toLowerCase()){l=!0;var n=document.createElement("div");n.className=e.config.optgroupClass,n.setAttribute("role","group");var i=(0,x.default)();n.setAttribute("aria-labelledby",i);var r=document.createElement("div");r.className=e.config.optgroupLabelClass,r.id=i,r.textContent=t.label,n.appendChild(r),Array.from(t.children).forEach(function(t){var i={text:t.textContent,value:t.value,selected:t.hasAttribute("selected"),disabled:t.hasAttribute("disabled")};n.appendChild(e.createOptionElement(i.text,i.value,i.selected,i.disabled))}),u.appendChild(n)}else{var o={text:t.textContent,value:t.value,selected:t.hasAttribute("selected"),disabled:t.hasAttribute("disabled")};u.appendChild(e.createOptionElement(o.text,o.value,o.selected,o.disabled))}}),l&&n.classList.add("has-groups"),{comboElement:n,input:r}}},{key:"createOptionElement",value:function(t,e,n,i){var r=document.createElement("div");return r.className=this.config.optionsClass,r.textContent=t,r.dataset.value=e,n&&r.classList.add(this.config.selectedClass),i&&r.classList.add("disabled"),r}},{key:"createOptgroupElement",value:function(t){var e=document.createElement("div");e.className=this.config.optgroupClass,e.setAttribute("role","group");var n=(0,x.default)();e.setAttribute("aria-labelledby",n);var i=document.createElement("div");return i.className=this.config.optgroupLabelClass,i.id=n,i.textContent=t,e.appendChild(i),e}}]),t}()},function(t,e){t.exports=function(t,e){if(t.indexOf)return t.indexOf(e);for(var n=0;n<t.length;++n)if(t[n]===e)return n;return-1}},function(t,e){(e=t.exports=function(t){return t.replace(/^\s*|\s*$/g,"")}).left=function(t){return t.replace(/^\s*/,"")},e.right=function(t){return t.replace(/\s*$/,"")}},function(t,e,n){function i(t){if(t)return function(t){for(var e in i.prototype)t[e]=i.prototype[e];return t}(t)}t.exports=i,i.prototype.on=i.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(e),this},i.prototype.once=function(t,e){function n(){this.off(t,n),e.apply(this,arguments)}return n.fn=e,this.on(t,n),this},i.prototype.off=i.prototype.removeListener=i.prototype.removeAllListeners=i.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var n,i=this._callbacks["$"+t];if(!i)return this;if(1==arguments.length)return delete this._callbacks["$"+t],this;for(var r=0;r<i.length;r++)if((n=i[r])===e||n.fn===e){i.splice(r,1);break}return this},i.prototype.emit=function(t){this._callbacks=this._callbacks||{};var e=[].slice.call(arguments,1),n=this._callbacks["$"+t];if(n)for(var i=0,r=(n=n.slice(0)).length;i<r;++i)n[i].apply(this,e);return this},i.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks["$"+t]||[]},i.prototype.hasListeners=function(t){return!!this.listeners(t).length}},function(t,e,n){"use strict";function i(t){this.region=document.createElement("div"),this.options=t||{},this.configure(),document.body.appendChild(this.region)}i.prototype.configure=function(){var t=this.options,e=this.region;e.setAttribute("aria-live",t.ariaLive||"polite"),e.setAttribute("role",t.role||"log"),e.setAttribute("aria-relevant",t.ariaRelevant||"additions"),e.setAttribute("aria-atomic",t.ariaAtomic||"false"),this.region.style.position="absolute",this.region.style.width="1px",this.region.style.height="1px",this.region.style.marginTop="-1px",this.region.style.clip="rect(1px, 1px, 1px, 1px)",this.region.style.overflow="hidden"},i.prototype.announce=function(t,e){var n=document.createElement("div");n.innerHTML=t,this.region.appendChild(n),(e||void 0===e)&&setTimeout(function(){this.region.removeChild(n)}.bind(this),e||7e3)},t.exports=i},function(t,e,n){var i;i=function(){return function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=1)}([function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function r(){}Object.defineProperty(e,"__esModule",{value:!0});var o=i(n(4)),s=i(n(7)),u=n(2),l=i(n(3)),a=[.19,1,.22,1];e.default=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,n=0,i=void 0,c=void 0;if((0,u.isElement)(t))i=o.default.apply(void 0,a),c=r;else{if(!(0,u.isObject)(t))throw new TypeError("The first argument must be HTMLElement or Object.");if(!(0,u.isElement)(t.element))throw new TypeError("`element` must be HTMLElement.");n=(0,u.isNumeric)(t.offset)?t.offset:0,i=(0,u.isArray)(t.bezier)&&4===t.bezier.length?o.default.apply(void 0,function(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}(t.bezier)):o.default.apply(void 0,a),e=t.duration,c=(0,u.isFunction)(t.then)?t.then:r,t=t.element}(!(0,u.isNumeric)(e)||e<0)&&(e=100);var f=(0,l.default)(t),h=f.scrollTop,p=f.offsetTop,d=null,v=("BODY"===f.nodeName?t.getBoundingClientRect().top+(window.scrollY||window.pageYOffset||document.body.scrollTop)-p:t.offsetTop-p)-h+n;(0,s.default)(function t(n){null===d&&(d=n);var r=n-d,o=i(r/e)*v;f.scrollTop=Math.round(h+o),r<e?(0,s.default)(t):c()})}},function(t,e,n){"use strict";var i=function(t){return t&&t.__esModule?t:{default:t}}(n(0));t.exports=i.default},function(t,e,n){"use strict";function i(t){return Object.prototype.toString.call(t)}function r(t){return!isNaN(parseFloat(t))&&isFinite(t)}Object.defineProperty(e,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.isObject=function(t){return"[object Object]"===i(t)},e.isArray=function(t){return null!=t&&"[object Array]"===i(t)},e.isNumeric=r,e.isPositive=function(t){return r(t)&&t>=0},e.isFunction=function(t){return null!=t&&"[object Function]"===i(t)},e.isElement=function(t){return"object"===o(window.HTMLElement)?t instanceof window.HTMLElement:!!t&&"object"===(void 0===t?"undefined":o(t))&&null!==t&&1===t.nodeType&&"string"==typeof t.nodeName}},function(t,e,n){"use strict";function i(t,e){return window.getComputedStyle(t,null).getPropertyValue(e)}function r(t){if(1===t.nodeType)return o.test(function(t){return i(t,"overflow")+i(t,"overflow-y")}(t))&&t.scrollHeight>t.clientHeight}Object.defineProperty(e,"__esModule",{value:!0});var o=/(auto|scroll)/;e.default=function(t){for(var e=function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],i=e.parentNode;return null===i||"HTML"===i.nodeName?n:t(i,n.concat(i))}(t),n=document.body,i=0,o=e.length;i<o;i++)if(r(e[i])){n=e[i];break}return n}},function(t,e){function n(t,e){return 1-3*e+3*t}function i(t,e){return 3*e-6*t}function r(t){return 3*t}function o(t,e,o){return((n(e,o)*t+i(e,o))*t+r(e))*t}function s(t,e,o){return 3*n(e,o)*t*t+2*i(e,o)*t+r(e)}function u(t,e,n,i,r){var s,u,l=0;do{(s=o(u=e+(n-e)/2,i,r)-t)>0?n=u:e=u}while(Math.abs(s)>c&&++l<f);return u}function l(t,e,n,i){for(var r=0;r<a;++r){var u=s(e,n,i);if(0===u)return e;e-=(o(e,n,i)-t)/u}return e}var a=4,c=1e-7,f=10,h=11,p=1/(h-1),d="function"==typeof Float32Array;t.exports=function(t,e,n,i){function r(e){for(var i=0,r=1,o=h-1;r!==o&&a[r]<=e;++r)i+=p;var c=i+(e-a[--r])/(a[r+1]-a[r])*p,f=s(c,t,n);return f>=.001?l(e,c,t,n):0===f?c:u(e,i,i+p,t,n)}if(!(0<=t&&t<=1&&0<=n&&n<=1))throw new Error("bezier x values must be in [0, 1] range");var a=d?new Float32Array(h):new Array(h);if(t!==e||n!==i)for(var c=0;c<h;++c)a[c]=o(c*p,t,n);return function(s){return t===e&&n===i?s:0===s?0:1===s?1:o(r(s),e,i)}}},function(t,e,n){(function(e){(function(){var n,i,r,o,s,u;"undefined"!=typeof performance&&null!==performance&&performance.now?t.exports=function(){return performance.now()}:void 0!==e&&null!==e&&e.hrtime?(t.exports=function(){return(n()-s)/1e6},i=e.hrtime,o=(n=function(){var t;return 1e9*(t=i())[0]+t[1]})(),u=1e9*e.uptime(),s=o-u):Date.now?(t.exports=function(){return Date.now()-r},r=Date.now()):(t.exports=function(){return(new Date).getTime()-r},r=(new Date).getTime())}).call(this)}).call(e,n(6))},function(t,e){function n(){throw new Error("setTimeout has not been defined")}function i(){throw new Error("clearTimeout has not been defined")}function r(t){if(a===setTimeout)return setTimeout(t,0);if((a===n||!a)&&setTimeout)return a=setTimeout,setTimeout(t,0);try{return a(t,0)}catch(e){try{return a.call(null,t,0)}catch(e){return a.call(this,t,0)}}}function o(){d&&h&&(d=!1,h.length?p=h.concat(p):v=-1,p.length&&s())}function s(){if(!d){var t=r(o);d=!0;for(var e=p.length;e;){for(h=p,p=[];++v<e;)h&&h[v].run();v=-1,e=p.length}h=null,d=!1,function(t){if(c===clearTimeout)return clearTimeout(t);if((c===i||!c)&&clearTimeout)return c=clearTimeout,clearTimeout(t);try{c(t)}catch(e){try{return c.call(null,t)}catch(e){return c.call(this,t)}}}(t)}}function u(t,e){this.fun=t,this.array=e}function l(){}var a,c,f=t.exports={};!function(){try{a="function"==typeof setTimeout?setTimeout:n}catch(t){a=n}try{c="function"==typeof clearTimeout?clearTimeout:i}catch(t){c=i}}();var h,p=[],d=!1,v=-1;f.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];p.push(new u(t,e)),1!==p.length||d||r(s)},u.prototype.run=function(){this.fun.apply(null,this.array)},f.title="browser",f.browser=!0,f.env={},f.argv=[],f.version="",f.versions={},f.on=l,f.addListener=l,f.once=l,f.off=l,f.removeListener=l,f.removeAllListeners=l,f.emit=l,f.binding=function(t){throw new Error("process.binding is not supported")},f.cwd=function(){return"/"},f.chdir=function(t){throw new Error("process.chdir is not supported")},f.umask=function(){return 0}},function(t,e,n){(function(e){for(var i=n(5),r="undefined"==typeof window?e:window,o=["moz","webkit"],s="AnimationFrame",u=r["request"+s],l=r["cancel"+s]||r["cancelRequest"+s],a=0;!u&&a<o.length;a++)u=r[o[a]+"Request"+s],l=r[o[a]+"Cancel"+s]||r[o[a]+"CancelRequest"+s];if(!u||!l){var c=0,f=0,h=[];u=function(t){if(0===h.length){var e=i(),n=Math.max(0,1e3/60-(e-c));c=n+e,setTimeout(function(){var t=h.slice(0);h.length=0;for(var e=0;e<t.length;e++)if(!t[e].cancelled)try{t[e].callback(c)}catch(t){setTimeout(function(){throw t},0)}},Math.round(n))}return h.push({handle:++f,callback:t,cancelled:!1}),f},l=function(t){for(var e=0;e<h.length;e++)h[e].handle===t&&(h[e].cancelled=!0)}}t.exports=function(t){return u.call(r,t)},t.exports.cancel=function(){l.apply(r,arguments)},t.exports.polyfill=function(){r.requestAnimationFrame=u,r.cancelAnimationFrame=l}}).call(e,n(8))},function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n}])},t.exports=i()},function(t,e,n){"use strict";t.exports=function(t,e){var n=t.clientHeight,i=e.clientHeight,r=t.scrollTop,o=e.offsetTop;return!(r>o)&&!(r+n-i<o)}},function(t,e,n){"use strict";t.exports=function(t){var e=window.innerHeight,n=t.getBoundingClientRect(),i=n.top<0,r=n.bottom>e,o=!i&&!r,s={visible:o};return o||(s.position=i?"top":"bottom"),s}},function(t,e,n){"use strict";var i,r=n(11),o=(i=r)&&i.__esModule?i:{default:i};t.exports={contains:function(t,e){return e.filter(function(e){return(0,o.default)(e).toLowerCase().indexOf(t.toLowerCase())>-1})},equals:function(t,e){return e.filter(function(e){return(0,o.default)(e).toLowerCase()===t.toLowerCase()})},"starts-with":function(t,e){return e.filter(function(e){return 0===(0,o.default)(e).toLowerCase().indexOf(t.toLowerCase())})}}},function(t,e,n){"use strict";t.exports=function(t){return t.getAttribute("data-value")||t.innerText}},function(t,e,n){"use strict";var i,r=n(13),o=(i=r)&&i.__esModule?i:{default:i};e.attach=function(t,e,n){if("function"==typeof n)return e.addEventListener(t,n);n&&n.length&&e.addEventListener(t,function(t){var e=o.default[t.which];n.forEach(function(n){n.keys.indexOf(e)>-1&&(n.preventDefault&&t.preventDefault(),n.callback(t,e))})})},e.up=function(t,n){return e.attach("keyup",t,n)},e.down=function(t,n){return e.attach("keydown",t,n)},e.press=function(t,n){return e.attach("keypress",t,n)}},function(t,e,n){"use strict";t.exports={8:"backspace",9:"tab",13:"enter",27:"escape",32:"space",37:"left",38:"up",39:"right",40:"down"}},function(t,e,n){"use strict";t.exports=function(t,e,n){if(e=e.length?e:[e],n&&e.indexOf(t)>-1)return!0;for(var i=t.parentNode;i&&"HTML"!==i.tagName;){if(e.indexOf(i)>-1)return!0;i=i.parentNode}return!1}},function(t,e,n){"use strict";var i,r=n(16),o=(i=r)&&i.__esModule?i:{default:i};t.exports=function(t,e,n){return n=n||document,"string"==typeof t?e?o.default.all(t,n):(0,o.default)(t,n):t}},function(t,e,n){"use strict";(t.exports=function(t,e){return(e=e||document).querySelector(t)}).all=function(t,e){return e=e||document,Array.prototype.slice.call(e.querySelectorAll(t))}},function(t,e,n){"use strict";t.exports=function(t,e){var n=t.filter(function(t){return t.options.indexOf(e)>-1});return n.length&&n[0]}},function(t,e,n){"use strict";var i,r=n(0),o=(i=r)&&i.__esModule?i:{default:i};t.exports=function(t,e,n){var i=t.querySelector(".combobo-no-results");!n||e.length||i?i&&e.length&&t.removeChild(i):(i=document.createElement("div"),(0,o.default)(i).add("combobo-no-results"),i.innerHTML=n,t.appendChild(i))}},function(t,e,n){"use strict";var i,r=n(1),o=(i=r)&&i.__esModule?i:{default:i};t.exports=function(t,e,n){e.id=e.id||(0,o.default)(),t.setAttribute("role","combobox"),e.setAttribute("role","listbox"),t.setAttribute("aria-controls",e.id),t.setAttribute("aria-autocomplete","list"),t.setAttribute("aria-expanded","false"),n.forEach(function(t){t.setAttribute("role","option"),t.id=t.id||(0,o.default)()})}},function(t,e,n){"use strict";t.exports=function(t,e,n){e=e||"";var i=t.innerText,r=i.toLowerCase().indexOf(e.toLowerCase()),o=e.length;return e&&r>=0?i.substring(0,r)+'<span class="'+n+'">'+i.substr(r,o)+"</span>"+i.substring(r+o):i}},function(t,e,n){"use strict";var i,r=n(22),o=(i=r)&&i.__esModule?i:{default:i};var s={select:"select.combobo",input:".combobox",list:".listbox",toggleButton:".trigger",options:".option",groups:null,wrapClass:"combo-wrap",inputClass:"combobox",listClass:"listbox",toggleButtonClass:"trigger",toggleButtonIcon:null,optgroupClass:"optgroup",optgroupLabelClass:"optgroup-label",optionsClass:"option",openClass:"open",activeClass:"active",selectedClass:"selected",useLiveRegion:!0,allowEmpty:!0,multiselect:!1,noResultsText:null,selectionValue:function(t){return t.map(function(t){return t.innerText.trim()}).join(" - ")},optionValue:function(t){return t.innerHTML},announcement:{count:function(t){return t+" options available"},selected:"Selected."},filter:"contains",autoFilter:!0,selectOnly:!1,selectSearchTimeout:500};t.exports=function(t){var e={},n={};return t.announcement=t.announcement||{},(0,o.default)(n,s.announcement,t.announcement),(0,o.default)(e,s,t),e.announcement=n,e}},function(t,e,n){"use strict";var i=n(23);function r(t,e){for(var n in e)o(e,n)&&(t[n]=e[n])}function o(t,e){return Object.prototype.hasOwnProperty.call(t,e)}t.exports=function(t){i(t)||(t={});for(var e=arguments.length,n=1;n<e;n++){var o=arguments[n];i(o)&&r(t,o)}return t}},function(t,e,n){"use strict";t.exports=function(t){return void 0!==t&&null!==t&&("object"==typeof t||"function"==typeof t)}},function(t,e,n){"use strict";t.exports=function(t,e,n,i,r){var o="true"===t.getAttribute("aria-selected"),s=e.announcement.selected,u=t.innerText;u=i&&e.announcement&&e.announcement.groupChange?e.announcement.groupChange(r)+" "+u:u,n(u=o&&s?u+" "+s:u,500)}}])});