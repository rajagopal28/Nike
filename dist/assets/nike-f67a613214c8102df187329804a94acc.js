"use strict"
define("nike/app",["exports","ember","nike/resolver","ember-load-initializers","nike/config/environment"],function(e,i,t,n,a){Object.defineProperty(e,"__esModule",{value:!0})
var r=i.default.Application.extend({modulePrefix:a.default.modulePrefix,podModulePrefix:a.default.podModulePrefix,Resolver:t.default});(0,n.default)(r,a.default.modulePrefix),e.default=r}),define("nike/helpers/app-version",["exports","ember","nike/config/environment","ember-cli-app-version/utils/regexp"],function(e,i,t,n){function a(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
return i.hideSha?r.match(n.versionRegExp)[0]:i.hideVersion?r.match(n.shaRegExp)[0]:r}Object.defineProperty(e,"__esModule",{value:!0}),e.appVersion=a
var r=t.default.APP.version
e.default=i.default.Helper.helper(a)}),define("nike/helpers/pluralize",["exports","ember-inflector/lib/helpers/pluralize"],function(e,i){Object.defineProperty(e,"__esModule",{value:!0}),e.default=i.default}),define("nike/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],function(e,i){Object.defineProperty(e,"__esModule",{value:!0}),e.default=i.default}),define("nike/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","nike/config/environment"],function(e,i,t){Object.defineProperty(e,"__esModule",{value:!0})
var n=t.default.APP,a=n.name,r=n.version
e.default={name:"App Version",initialize:(0,i.default)(a,r)}}),define("nike/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],function(e,i){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0]
e.register("container-debug-adapter:main",i.default),e.inject("container-debug-adapter:main","namespace","application:main")}}}),define("nike/initializers/data-adapter",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"data-adapter",before:"store",initialize:function(){}}}),define("nike/initializers/ember-data",["exports","ember-data/setup-container","ember-data"],function(e,i){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"ember-data",initialize:i.default}}),define("nike/initializers/export-application-global",["exports","ember","nike/config/environment"],function(e,i,t){function n(){var e=arguments[1]||arguments[0]
if(!1!==t.default.exportApplicationGlobal){var n
if("undefined"!=typeof window)n=window
else if("undefined"!=typeof global)n=global
else{if("undefined"==typeof self)return
n=self}var a,r=t.default.exportApplicationGlobal
a="string"==typeof r?r:i.default.String.classify(t.default.modulePrefix),n[a]||(n[a]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete n[a]}}))}}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=n,e.default={name:"export-application-global",initialize:n}}),define("nike/initializers/injectStore",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"injectStore",before:"store",initialize:function(){}}}),define("nike/initializers/store",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"store",after:"ember-data",initialize:function(){}}}),define("nike/initializers/transforms",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"transforms",before:"store",initialize:function(){}}}),define("nike/instance-initializers/ember-data",["exports","ember-data/instance-initializers/initialize-store-service"],function(e,i){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"ember-data",initialize:i.default}}),define("nike/resolver",["exports","ember-resolver"],function(e,i){Object.defineProperty(e,"__esModule",{value:!0}),e.default=i.default}),define("nike/router",["exports","ember","nike/config/environment"],function(e,i,t){Object.defineProperty(e,"__esModule",{value:!0})
var n=i.default.Router.extend({location:t.default.locationType,rootURL:t.default.rootURL})
n.map(function(){this.route("home",{path:"/home"})}),e.default=n}),define("nike/routes/home",["exports","ember"],function(e,i){Object.defineProperty(e,"__esModule",{value:!0}),e.default=i.default.Route.extend({model:function(){return["Marie Curie","Mae Jemison","Albert Hofmann"]}})}),define("nike/services/ajax",["exports","ember-ajax/services/ajax"],function(e,i){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return i.default}})}),define("nike/templates/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"jsP/uLyX",block:'{"statements":[[1,[26,["outlet"]],false],[0,"\\n"]],"locals":[],"named":[],"yields":[],"hasPartials":false}',meta:{moduleName:"nike/templates/application.hbs"}})}),define("nike/templates/home",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"PVcOO/71",block:'{"statements":[[11,"h2",[]],[13],[0,"List of Scientists"],[14],[0,"\\n"],[11,"ul",[]],[13],[0,"\\n"],[6,["each"],[[28,["model"]]],null,{"statements":[[0,"    "],[11,"li",[]],[13],[1,[28,["scientist"]],false],[14],[0,"\\n"]],"locals":["scientist"]},null],[14],[0,"\\n"],[1,[26,["outlet"]],false],[0,"\\n"]],"locals":[],"named":[],"yields":[],"hasPartials":false}',meta:{moduleName:"nike/templates/home.hbs"}})}),define("nike/config/environment",["ember"],function(e){try{var i="nike/config/environment",t=document.querySelector('meta[name="'+i+'"]').getAttribute("content"),n=JSON.parse(unescape(t)),a={default:n}
return Object.defineProperty(a,"__esModule",{value:!0}),a}catch(e){throw new Error('Could not read config from meta tag with name "'+i+'".')}}),runningTests||require("nike/app").default.create({name:"nike",version:"1.0.0+7b90a04b"})